import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ADMIN_DATA } from "@/lib/dummyData";

const COLLEGES = ADMIN_DATA.colleges;
const DEADLINES = ADMIN_DATA.events;
const MATERIALS = ADMIN_DATA.materials;

export default function AdminDashboardPage() {
  const [open, setOpen] = useState(false);

  return (
    <MainLayout>
      <section className="container py-6">
        <div className="md:hidden mb-4">
          <Button onClick={() => setOpen((v) => !v)}>{open ? "Hide" : "Show"} Menu</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <aside className={`rounded-lg border p-4 h-max ${open ? "block" : "hidden"} md:block`}>
            <nav className="grid gap-2 text-sm">
              <a className="hover:text-primary" href="#colleges">Colleges</a>
              <a className="hover:text-primary" href="#courses">Courses</a>
              <a className="hover:text-primary" href="#deadlines">Deadlines</a>
              <a className="hover:text-primary" href="#scholarships">Scholarships</a>
              <a className="hover:text-primary" href="#materials">Study Materials</a>
              <a className="hover:text-primary" href="#analytics">Analytics</a>
            </nav>
          </aside>

          <div className="grid gap-6" id="content">
            <Card id="colleges">
              <CardHeader>
                <CardTitle>Manage Colleges</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COLLEGES.map((c) => (
                      <TableRow key={c.id || c.name}>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.city}</TableCell>
                        <TableCell>{Array.isArray(c.courses) ? c.courses.join(", ") : c.courses}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="secondary" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card id="deadlines">
              <CardHeader>
                <CardTitle>Deadlines & Scholarships</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {DEADLINES.map((d) => (
                      <TableRow key={d.id || d.title}>
                        <TableCell>{d.title}</TableCell>
                        <TableCell>{d.date}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card id="materials">
              <CardHeader>
                <CardTitle>Study Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Stream</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MATERIALS.map((m) => (
                      <TableRow key={m.id || m.title}>
                        <TableCell>{m.title}</TableCell>
                        <TableCell>{m.stream || "General"}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
