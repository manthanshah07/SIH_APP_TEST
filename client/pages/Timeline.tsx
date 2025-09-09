import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { TIMELINE_EVENTS } from "@/lib/dummyData";

export default function TimelinePage() {
  const [type, setType] = useState<string>("All");
  const [state, setState] = useState<string>("All");

  const EVENTS = TIMELINE_EVENTS;

  function formatDateForGoogle(date: Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`;
  }

  function formatDateTimeISO(date: Date) {
    // Return in YYYYMMDDTHHMMSSZ (UTC)
    const d = new Date(date.getTime());
    return d.toISOString().replace(/[-:]/g, "").split('.')[0] + 'Z';
  }

  function addToGoogleCalendar(event: any) {
    // Use all-day event: start date and end date (end is next day)
    const start = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate());
    const end = new Date(start.getTime());
    end.setDate(end.getDate() + 1);

    const dates = `${formatDateForGoogle(start)}/${formatDateForGoogle(end)}`;
    const text = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description || "Admission event");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&dates=${dates}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function generateICS(event: any) {
    const uid = `${Date.now()}@one-stop-advisor`;
    const start = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate());
    const end = new Date(start.getTime());
    end.setDate(end.getDate() + 1);

    const dtstamp = formatDateTimeISO(new Date());
    const dtstart = `${start.getFullYear()}${String(start.getMonth()+1).padStart(2,'0')}${String(start.getDate()).padStart(2,'0')}T000000Z`;
    const dtend = `${end.getFullYear()}${String(end.getMonth()+1).padStart(2,'0')}${String(end.getDate()).padStart(2,'0')}T000000Z`;

    return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//One-Stop Advisor//EN\nBEGIN:VEVENT\nUID:${uid}\nDTSTAMP:${dtstamp}\nDTSTART;VALUE=DATE:${dtstart.slice(0,8)}\nDTEND;VALUE=DATE:${dtend.slice(0,8)}\nSUMMARY:${event.title}\nDESCRIPTION:${(event.description || '').replace(/\n/g,'\\n')}\nEND:VEVENT\nEND:VCALENDAR`;
  }

  function downloadICS(event: any) {
    const ics = generateICS(event);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <MainLayout>
      <section className="container py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue placeholder="Exam Type"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Exam">Exam</SelectItem>
                  <SelectItem value="Scholarship">Scholarship</SelectItem>
                  <SelectItem value="Counseling">Counseling</SelectItem>
                </SelectContent>
              </Select>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger><SelectValue placeholder="State"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All India</SelectItem>
                  <SelectItem value="MH">Maharashtra</SelectItem>
                  <SelectItem value="BR">Bihar</SelectItem>
                  <SelectItem value="RJ">Rajasthan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Timeline Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {EVENTS.map((e) => (
                    <div key={e.title} className="flex items-start justify-between rounded-md border p-4">
                      <div>
                        <div className="text-sm text-muted-foreground">{e.date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        <div className="font-medium">{e.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {"description" in e && typeof e.description === "string"
                            ? e.description
                            : "Important admission-related date"}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">Notify me</Button>
                        <Button size="sm" onClick={() => addToGoogleCalendar(e)}>Add to Google Calendar</Button>
                        <Button size="sm" variant="outline" onClick={() => downloadICS(e)}>Download .ics</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {EVENTS.map((e) => (
                    <li key={e.title} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{e.title}</div>
                        <div className="text-muted-foreground">{e.date.toLocaleDateString()}</div>
                      </div>
                      <Button size="sm" variant="outline">Notify me</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
