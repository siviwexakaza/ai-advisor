"use client";
import Features01Page from "@/components/features-01/features-01";
import Footer04Page from "@/components/footer-04/footer-04";
import Hero01 from "@/components/hero-01/hero-01";
import Team01Page from "@/components/team-01/team-01";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/home");
    }
  }, [isSignedIn]);
  return (
    <div>
      <Hero01 />
      <Features01Page />
      <Team01Page />
      <Footer04Page />
    </div>
  );
}
