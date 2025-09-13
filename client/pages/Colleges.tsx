import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

import { COLLEGES } from "@/lib/dummyData";

export default function CollegesPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColleges, setFilteredColleges] = useState(COLLEGES);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = COLLEGES.filter(
      (college) =>
        college.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        college.location.toLowerCase().includes(lowerCaseSearchTerm) ||
        college.courses.some((course) =>
          course.toLowerCase().includes(lowerCaseSearchTerm)
        )
    );
    setFilteredColleges(filtered);
  }, [searchTerm]);

  const mapContainerStyle = { width: "100%", height: "100%" };
  const center = userLocation || { lat: 28.6139, lng: 77.209 }; // Example: Delhi coordinates

  return (
    <MainLayout>
      <section className="container py-8">
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="Search colleges"
            className="md:col-span-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select defaultValue="All">
            <SelectTrigger>
              <SelectValue placeholder="Course" />
            </SelectTrigger>
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
              <AspectRatio ratio={16 / 9}>
                <LoadScript googleMapsApiKey="AIzaSyBJWwJe24Iw-zQ55a8rI_kciYfclXyB_NU">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={11}
                  >
                    {userLocation && <Marker position={center} />}
                    {filteredColleges.map((college) => (
                      <Marker
                        key={college.name}
                        position={{ lat: college.lat, lng: college.lng }}
                        title={college.name}
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
              </AspectRatio>
            </div>
          </div>
          <div className="space-y-4">
            {filteredColleges.map((c) => (
              <Card key={c.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{c.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {c.location}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Courses:</span>{" "}
                    {c.courses.join(", ")}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Cut-off:</span> {c.cutoff}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Facilities:</span>{" "}
                    {c.facilities.join(", ")}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Get Directions</Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
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
