import SessionComponent from "@/components/session/session-component";
import { getClerkUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import React from "react";

async function Session() {
  const user = await getClerkUser();

  if (!user) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-background">
      <SessionComponent
        userImage={user.imageUrl}
        coupleId={user.id}
        type="new"
      />
    </div>
  );
}

export default Session;
