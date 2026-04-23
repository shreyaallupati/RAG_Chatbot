"use client";

import { useState } from "react";
import { processPDF } from "./actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, FileUp } from "lucide-react";

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await processPDF(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "PDF processed successfully",
        });
        e.target.value = "";
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to process PDF",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "An error occurred while processing the PDF",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 1. REMOVED bg-background from here
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      
      {/* 2. ADDED pointer-events-auto, bg-background/80, and backdrop-blur-sm here */}
      <Card className="w-full max-w-md shadow-lg border-border/50 pointer-events-auto bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <FileUp className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">Upload Document</CardTitle>
          <CardDescription>Upload a PDF file to index it into your knowledge base.</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pdf-upload" className="sr-only">Upload PDF File</Label>
            <Input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="cursor-pointer file:cursor-pointer hover:bg-muted/50 transition-colors"
            />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground p-4 bg-muted/20 rounded-md">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Extracting and embedding text...</span>
            </div>
          )}

          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className={message.type === "success" ? "border-green-500/50 text-green-600 bg-green-500/10 dark:text-green-400" : ""}
            >
              <AlertTitle>
                {message.type === "error" ? "Upload Failed" : "Success"}
              </AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}