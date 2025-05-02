"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

function SessionComponent({
  coupleId,
  type,
}: {
  coupleId: string;
  type: "new" | "continue";
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.ACTIVE);
  const [messages, setMessages] = useState<string[]>([
    "Hello",
    "Hey how are you?",
  ]);
  return (
    <div className="flex flex-col h-screen">
      {/* Meeting header */}
      <div className="bg-background border-b p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">Call in progress</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">00:12:34</span>
        </div>
      </div>

      {/* Main content - video grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* First caller */}
          <div className="relative rounded-lg overflow-hidden bg-muted aspect-video flex items-center justify-center">
            <div className="relative w-18 h-18">
              {isSpeaking && (
                <span className="absolute inset-0 rounded-full animate-ping bg-green-400/75 opacity-95"></span>
              )}

              <div className="relative flex items-center justify-center w-18 h-18 rounded-full bg-green-600/70 text-white font-bold">
                SN
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-background/80 px-2 py-1 rounded-md text-sm">
              Siviwe & Nokwe
            </div>
          </div>

          {/* Second caller */}
          <div className="relative rounded-lg overflow-hidden bg-muted aspect-video flex items-center justify-center">
            <div className="relative w-18 h-18">
              {!isSpeaking && (
                <span className="absolute inset-0 rounded-full animate-ping bg-green-400/75 opacity-95"></span>
              )}

              <div className="relative flex items-center justify-center w-18 h-18 rounded-full bg-green-600/70 text-white font-bold">
                S
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-background/80 px-2 py-1 rounded-md text-sm">
              Sarah
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center mb-8">
        {messages.length > 0 && (
          <p
            className={cn(
              "transition-opacity duration-500 opacity-0",
              "animate-in opacity-100"
            )}
          >
            {messages[messages.length - 1]}
          </p>
        )}
      </div>

      {/* Controls - only drop call button */}
      <div className="bg-background border-t p-4 flex justify-center">
        {callStatus === "ACTIVE" ? (
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full h-12 w-12"
          >
            <Phone className="h-5 w-5 rotate-135" />
          </Button>
        ) : (
          <p>Connecting...</p>
        )}
      </div>
    </div>
  );
}

export default SessionComponent;
