import { getClerkUser } from "@/lib/auth";
import { UserButton } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import React from "react";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Summary from "@/components/Summary";

async function Home() {
  const user = await getClerkUser();

  if (!user) {
    notFound();
  }

  const summary = await prisma.onboardingSummary.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  return (
    <div className="min-h-screen px-6">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="mt-6 text-xl sm:text-2xl md:text-2xl md:leading-[1.2] font-medium text-gray-600">
            Hey there,
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-3xl md:leading-[1.2] font-bold">
            {user?.firstName} {user?.lastName}
          </h1>
        </div>
        <UserButton />
      </div>

      {summary === null ? (
        <div className="flex flex-col min-h-screen flex-1 justify-center items-center">
          <PackageOpen className="animate-bounce" size={90} />
          <h1 className="text-xl sm:text-2xl md:text-2xl md:leading-[1.2] font-semibold text-center my-4">
            Looks like you have not taken the interview yet.
          </h1>

          <Link href={"/session"}>
            <Button size="lg" className="rounded-full text-base">
              Take the Interview
            </Button>
          </Link>

          <p className="text-center text-gray-600 text-xs mt-4">
            If you've recently taken an interview please refresh the page in few
            seconds.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <Summary summary={summary.summary} />
        </div>
      )}
    </div>
  );
}

export default Home;
