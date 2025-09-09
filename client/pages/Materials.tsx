import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { STUDY_MATERIALS } from "@/lib/dummyData";

export default function MaterialsPage() {
  return (
    <MainLayout>
      <section className="container py-8">
        <Tabs defaultValue="Science">
          <TabsList className="flex flex-wrap">
            {Object.keys(STUDY_MATERIALS).map((k) => (
              <TabsTrigger key={k} value={k}>{k}</TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(STUDY_MATERIALS).map(([k, items]) => (
            <TabsContent key={k} value={k} className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item: any) => (
                  <Card key={item.title}>
                    <CardHeader>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-24 rounded-md bg-secondary flex items-center justify-center">
                        <img src={item.image} alt={item.title} className="h-16" />
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <a href={item.link} target="_blank" rel="noreferrer">
                        <Button size="sm">Download</Button>
                      </a>
                      <Button size="sm" variant="outline">Preview</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </MainLayout>
  );
}
