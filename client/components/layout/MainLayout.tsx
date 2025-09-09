import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "@/components/Chatbot";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
