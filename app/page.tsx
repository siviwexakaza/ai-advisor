import Features01Page from "@/components/features-01/features-01";
import Footer04Page from "@/components/footer-04/footer-04";
import Hero01 from "@/components/hero-01/hero-01";
import Team01Page from "@/components/team-01/team-01";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero01 />
      <Features01Page />
      <Team01Page />
      <Footer04Page />
    </div>
  );
}
