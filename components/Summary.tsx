"use client";
import React from "react";
import ReactMarkdown from "react-markdown";

function Summary({ summary }: { summary: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{JSON.parse(summary)}</ReactMarkdown>
    </div>
  );
}

export default Summary;
