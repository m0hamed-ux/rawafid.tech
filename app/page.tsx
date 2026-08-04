import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Approach } from "@/components/approach";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Process } from "@/components/process";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Approach />
        <Services />
        <Projects />
        <Process />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
