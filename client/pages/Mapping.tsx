import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";

import { MAPPING_DATA } from "@/lib/dummyData";

export default function MappingPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const rows = useMemo(() => {
    return MAPPING_DATA.filter((d) =>
      (filter === "All" || d.stream === filter) && d.degree.toLowerCase().includes(q.toLowerCase()),
    );
  }, [q, filter]);

  return (
    <MainLayout>
      <section className="container py-8">
        <div className="md:flex items-center gap-3">
          <div className="flex-1">
            <Input placeholder="Search degrees (e.g. B.Tech, B.Com)" value={q} onChange={(e)=>setQ(e.target.value)} />
          </div>
          <div className="mt-3 md:mt-0">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Stream"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Streams</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Commerce">Commerce</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          {rows.map((d) => (
            <Card key={d.degree}>
              <CardHeader>
                <CardTitle>{d.degree} <span className="text-sm text-muted-foreground font-normal">• {d.stream}</span></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 items-start">
                  <div className="rounded-md border p-4">
                    <div className="font-semibold">Degree</div>
                    <div className="text-sm text-muted-foreground">{d.degree}</div>
                  </div>
                  <div className="relative rounded-md border p-4">
                    <div className="font-semibold">Career Options</div>
                    <ul className="mt-2 list-disc pl-4 text-sm">
                      {d.careers.map((c) => (
                        <li key={c.name}>
                          <button className="underline hover:text-primary">{c.name}</button>
                        </li>
                      ))}
                    </ul>
                    <div className="hidden md:block absolute left-[-12px] top-1/2 -translate-y-1/2 h-0 w-6 border-t border-dashed" />
                    <div className="hidden md:block absolute right-[-12px] top-1/2 -translate-y-1/2 h-0 w-6 border-t border-dashed" />
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="font-semibold">Higher Studies</div>
                    <ul className="mt-2 list-disc pl-4 text-sm">
                      {d.careers.flatMap((career) => career.higherStudy).map((h) => <li key={h}>{h}</li>)}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
