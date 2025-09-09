import { RequestHandler } from "express";

// Simple in-memory rate limit map (per-IP). Not durable across restarts.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 60; // max requests per window
const rateMap = new Map<string, number[]>();

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress || "unknown";

    // Rate limiting
    const now = Date.now();
    const arr = rateMap.get(ip) || [];
    const filtered = arr.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (filtered.length >= RATE_LIMIT_MAX) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }
    filtered.push(now);
    rateMap.set(ip, filtered);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: "OpenAI API key not configured on server." });
    }

    // Accept either { prompt } or { messages: [{ role, content }] }
    const { prompt, messages } = req.body as { prompt?: string; messages?: { role: string; content: string }[] };

    let chatMessages: { role: string; content: string }[] = [];

    const systemMessage = {
      role: "system",
      content:
        "You are a helpful, concise career and education advisor for high-school and undergraduate students in India. Provide suggestions, nearby colleges, courses, deadlines, and short actionable steps. When asked, provide lists and include brief reasons.",
    };

    if (Array.isArray(messages) && messages.length > 0) {
      // Basic validation: ensure roles are user/assistant/system
      chatMessages = [systemMessage, ...messages.slice(-12)]; // send up to last 12 messages
    } else if (prompt) {
      chatMessages = [systemMessage, { role: "user", content: prompt }];
    } else {
      return res.status(400).json({ error: "Missing prompt or messages" });
    }

    console.log(`/api/chat request from ${ip}. messages=${chatMessages.length}`);

    const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("OpenAI error", txt);
      return res.status(502).json({ error: "OpenAI error", detail: txt });
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? null;

    // Basic usage logging
    console.log(`/api/chat reply length=${reply?.length || 0}`);

    return res.json({ reply });
  } catch (err: any) {
    console.error("/api/chat error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
