"use client";

import {
  LucidePhone,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Message } from "ai";
import { vapi } from "@/lib/vapi";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "ai";
  content: string;
}

function SessionComponent({
  coupleId,
  type,
  userImage,
}: {
  coupleId: string;
  type: "new" | "continue";
  userImage: string;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const router = useRouter();

  const handleStartCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    await vapi.start(process.env.NEXT_PUBLIC_VAPI_ONBOARDING_WORKFLOW!, {
      variableValues: {
        clerkid: coupleId,
      },
    });
  };

  const handleStopCall = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.type === "final") {
        const newMessage: SavedMessage = {
          role: message.role,
          content: message.transcript,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: any) => console.error("[Session]", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) router.replace("/");
  }, [messages, callStatus, coupleId, type]);

  return (
    <div className="flex flex-col h-screen">
      {/* Meeting header */}
      <div className="bg-background border-b p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">Call in progress</h1>
        <div className="flex items-center gap-2">
          {/* <span className="text-sm text-muted-foreground">00:12:34</span> */}
        </div>
      </div>

      {/* Main content - video grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* First caller */}
          <div className="relative rounded-lg overflow-hidden bg-muted aspect-video flex items-center justify-center">
            <div className="relative w-18 h-18">
              {!isSpeaking && callStatus === CallStatus.ACTIVE && (
                <span className="absolute inset-0 rounded-full animate-ping bg-green-400/75 opacity-95"></span>
              )}

              {/* <div className="relative flex items-center justify-center w-18 h-18 rounded-full bg-green-600/70 text-white font-bold">
                SN
              </div> */}

              <Image
                src={userImage}
                width={18}
                height={18}
                className="w-18 h-18 relative rounded-full"
                alt="image"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-background/80 px-2 py-1 rounded-md text-sm">
              You
            </div>
          </div>

          {/* Second caller */}
          <div className="relative rounded-lg overflow-hidden bg-muted aspect-video flex items-center justify-center">
            <div className="relative w-18 h-18">
              {isSpeaking && callStatus === CallStatus.ACTIVE && (
                <span className="absolute inset-0 rounded-full animate-ping bg-green-400/75 opacity-95"></span>
              )}

              <div className="relative flex items-center justify-center w-18 h-18 rounded-full bg-green-600/70 text-white font-bold">
                S
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-background/80 px-2 py-1 rounded-md text-sm">
              Siv's Love Advisor
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center mb-2">
        {messages.length > 0 && (
          <p
            className={cn(
              "transition-opacity duration-500 opacity-0",
              "animate-in opacity-100"
            )}
          >
            {messages[messages.length - 1].content}
          </p>
        )}
      </div>

      {/* Controls - only drop call button */}
      <div className="bg-background border-t p-4 flex justify-center">
        {callStatus === "ACTIVE" && (
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={handleStopCall}
          >
            <Phone className="h-5 w-5 rotate-135" />
          </Button>
        )}

        {callStatus === "INACTIVE" && (
          <Button
            variant="default"
            size="icon"
            className="rounded-full h-12 w-12 bg-green-500"
            onClick={handleStartCall}
          >
            <LucidePhone className="h-5 w-5 rotate-135" />
          </Button>
        )}

        {callStatus === "CONNECTING" && <p>Connecting...</p>}
      </div>
    </div>
  );
}

export default SessionComponent;
