import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { COLLEGES } from "@/lib/dummyData";

export default function CollegesPage() {
  return (
    <MainLayout>
      <section className="container py-8">
        <div className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Search colleges" className="md:col-span-2" />
          <Select defaultValue="All">
            <SelectTrigger><SelectValue placeholder="Course" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Streams</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Commerce">Commerce</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-xl border overflow-hidden">
              <AspectRatio ratio={16/9}>
                <div className="h-full w-full bg-gradient-to-br from-primary/20 via-emerald-200/40 to-transparent flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-semibold">Map Placeholder</div>
                    <div className="text-sm text-muted-foreground">Google Maps API integration coming soon</div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
          <div className="space-y-4">
            {COLLEGES.map((c)=> (
              <Card key={c.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{c.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">{c.location}</div>
                  <div className="mt-2 text-sm"><span className="font-medium">Courses:</span> {c.courses.join(", ")}</div>
                  <div className="text-sm"><span className="font-medium">Cut-off:</span> {c.cutoff}</div>
                  <div className="text-sm"><span className="font-medium">Facilities:</span> {c.facilities.join(", ")}</div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Get Directions</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
