import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
}
