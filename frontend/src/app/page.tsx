import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Pains } from "@/components/sections/Pains";
import { Pillars } from "@/components/sections/Pillars";
import { Founders } from "@/components/sections/Founders";
import { QuizCTA } from "@/components/sections/QuizCTA";
import { SocialProof } from "@/components/sections/SocialProof";
import { Differentials } from "@/components/sections/Differentials";
import { Cashback } from "@/components/sections/Cashback";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pains />
        <Pillars />
        <Founders />
        <QuizCTA />
        <SocialProof />
        <Differentials />
        <Cashback />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
