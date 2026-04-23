import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    // No solid background here, so the Dither canvas shows through!
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      
      {/* The card gets pointer-events-auto so you can click things */}
      <div className="bg-background/80 backdrop-blur-md p-10 rounded-2xl border shadow-lg pointer-events-auto text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">RAG Chatbot</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Upload your PDF documents and instantly chat with them using AI.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/upload">
            <Button size="lg">Upload PDF</Button>
          </Link>
          <Link href="/chat">
            <Button size="lg" variant="outline">Go to Chat</Button>
          </Link>
        </div>
      </div>

    </div>
  );
}