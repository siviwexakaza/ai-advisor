import SessionComponent from "@/components/session/session-component";
import React from "react";

function Session() {
  return (
    <div className="min-h-screen bg-background">
      <SessionComponent coupleId="123" type="new" />
    </div>
  );
}

export default Session;
