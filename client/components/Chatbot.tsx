import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X, MessageCircle, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import FeedbackDialog from "./FeedbackDialog";

// Define your Django API base URL and chat path here
const DJANGO_API_BASE = "http://localhost:8000"; // Change to your Django server URL
const DJANGO_CHAT_PATH = "/api/chat/"; // Change to your chat endpoint path

type Msg = { id: string; from: "bot" | "user"; text: string; quick?: string[] };

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function Chatbot() {
  const [fabOpen, setFabOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Load persisted chat from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("one_stop_chat_history");
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        if (parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {} // eslint-disable-next-line react-hooks/exhaustive-deps

    // Initialize greeting once when component mounts
    const welcome: Msg = {
      id: uid(),
      from: "bot",
      text: "Hi, I\'m your Career Advisor! How can I help you today?",
      quick: [
        "Aptitude Quiz",
        "Course to Career Mapping",
        "Nearby Colleges",
        "Scholarship Dates",
      ],
    };
    setMessages([welcome]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist chat to sessionStorage and scroll
  useEffect(() => {
    try {
      sessionStorage.setItem("one_stop_chat_history", JSON.stringify(messages));
    } catch {} // eslint-disable-next-line react-hooks/exhaustive-deps
    if (chatOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  function pushMessage(msg: Msg) {
    setMessages((m) => [...m, msg]);
  }

  function handleQuick(q: string) {
    if (q === "Aptitude Quiz") navigate("/quiz");
    else if (q === "Course to Career Mapping") navigate("/mapping");
    else if (q === "Nearby Colleges") navigate("/colleges");
    else if (q === "Scholarship Dates") navigate("/timeline");
    pushMessage({ id: uid(), from: "user", text: q });
    // small demo response
    setTimeout(() => {
      pushMessage({ id: uid(), from: "bot", text: `Opening ${q}...` });
    }, 400);
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg: Msg = { id: uid(), from: "user", text };
    pushMessage(userMsg);
    setInput("");
    setSending(true);

    try {
      const N = 6;
      const recent = messages
        .slice(-N)
        .map((m) => ({
          role: m.from === "bot" ? "assistant" : "user",
          content: m.text,
        }));

      const res = await fetch(DJANGO_API_BASE + DJANGO_CHAT_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: recent }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const err = data?.error || `${res.status} ${res.statusText}`;
        pushMessage({
          id: uid(),
          from: "bot",
          text: `Sorry, chat service unavailable (${err}).\nTry: 'Suggest a course' or 'Show colleges near me'.`,
        });
      } else {
        const data = await res.json();
        const reply =
          data.reply || "I couldn't get a response. Try again later.";
        pushMessage({ id: uid(), from: "bot", text: reply });
      }
    } catch (err) {
      pushMessage({
        id: uid(),
        from: "bot",
        text: "Network error. Please try again later.",
      });
    } finally {
      setSending(false);
    }
  }

  function onFabToggle() {
    setFabOpen((v) => !v);
  }

  function onChatOpen() {
    setFabOpen(false);
    setChatOpen(true);
  }

  function onFeedbackOpen() {
    setFabOpen(false);
    setFeedbackOpen(true);
  }

  return (
    <div>
      {/* Floating Action Button Menu */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-center gap-2">
        {fabOpen && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-card px-3 py-2 text-sm shadow-lg">
                Give Feedback
              </span>
              <Button
                aria-label="Give Feedback"
                onClick={onFeedbackOpen}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg bg-secondary text-secondary-foreground"
              >
                <Pencil className="h-6 w-6 z-10" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-card px-3 py-2 text-sm shadow-lg">
                Ask Advisor
              </span>
              <Button
                aria-label="Open chat"
                onClick={onChatOpen}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg bg-secondary text-secondary-foreground"
              >
                <MessageCircle className="h-6 w-6 z-10" />
              </Button>
            </div>
          </div>
        )}

        <button
          aria-label={fabOpen ? "Close menu" : "Open menu"}
          onClick={onFabToggle}
          className={cn(
            "group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg bg-primary text-white focus:outline-none",
            "hover:scale-105 transform transition-transform",
            fabOpen && "rotate-45",
          )}
        >
          <span
            className="absolute -inset-1 animate-ping rounded-full bg-primary/40 opacity-70"
            aria-hidden
          />
          <X
            className={cn(
              "h-7 w-7 z-10 transition-transform",
              !fabOpen && "rotate-45 scale-0",
            )}
          />
          <MessageSquare
            className={cn(
              "h-7 w-7 z-10 absolute transition-transform",
              fabOpen && "rotate-45 scale-0",
            )}
          />
        </button>
      </div>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex flex-col w-[360px] max-w-[92vw] rounded-xl shadow-2xl bg-card text-card-foreground overflow-hidden",
          chatOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0 pointer-events-none",
        )}
        style={{ transition: "all 200ms ease" }}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5" />
            <div className="font-medium">Ask Career Advisor</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Close chat"
              onClick={() => setChatOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="min-h-[160px] max-h-[360px] overflow-auto p-4 space-y-3 bg-background"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.from === "bot" ? "flex gap-3" : "flex gap-3 justify-end"
              }
            >
              {m.from === "bot" && (
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  A
                </div>
              )}
              <div
                className={
                  m.from === "bot"
                    ? "max-w-[78%] rounded-lg bg-card p-3 shadow-sm"
                    : "max-w-[78%] rounded-lg bg-primary text-primary-foreground p-3 shadow-sm"
                }
              >
                <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                {m.quick && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.quick.map((q) => (
                      <button
                        key={q}
                        className="rounded-md bg-secondary/10 px-3 py-1 text-xs"
                        onClick={() => handleQuick(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {m.from === "user" && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                  U
                </div>
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-3 border-t bg-background"
        >
          <input
            className="flex-1 rounded-md border px-3 py-2 text-sm outline-none"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            aria-label="Send"
            type="submit"
            disabled={sending}
            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-white"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Feedback Dialog */}
      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </div>
  );
}
