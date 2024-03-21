import Guarantee from "@/components/Guarantee";
import Hero from "@/components/Hero";
import Otherinfo from "@/components/Otherinfo";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <Guarantee />
      <Otherinfo />
    </main>
  );
}
