"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  SendHorizontal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChatMessage } from "@/components/chat/chat-message";

const INITIAL_MESSAGE = `Hello! I'm the AfterCare Assistant, here to help evaluate your medical malpractice case. I'll guide you through the process and help determine if you have a potential case.

To get started, please describe your medical situation and any concerns you have about the care you received.`;

type FlagAnalysis = {
  flag: "red" | "yellow" | "green";
  title: string;
  description: string;
};

const analyzeCaseStrength = (
  messages: Array<{ role: string; content: string }>
): FlagAnalysis => {
  const userMessages = messages.filter((m) => m.role === "user");
  const combinedContent = userMessages
    .map((m) => m.content.toLowerCase())
    .join(" ");

  if (
    combinedContent.includes("death") ||
    combinedContent.includes("permanent") ||
    combinedContent.includes("severe")
  ) {
    return {
      flag: "red",
      title: "Strong Case Indicated",
      description:
        "Based on the information provided, your case shows strong indicators of medical malpractice. We recommend immediate legal consultation.",
    };
  } else if (
    combinedContent.includes("pain") ||
    combinedContent.includes("error") ||
    combinedContent.includes("mistake")
  ) {
    return {
      flag: "yellow",
      title: "Potential Case - Further Review Needed",
      description:
        "Your case shows potential merit but requires additional review. We recommend providing more details or consulting with a lawyer.",
    };
  } else {
    return {
      flag: "green",
      title: "Limited Case Indicators",
      description:
        "Based on current information, the case may face challenges. Consider providing more details or consulting with a lawyer for a thorough review.",
    };
  }
};

export default function VictimChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([
    {
      role: "assistant",
      content: INITIAL_MESSAGE,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<FlagAnalysis | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, analysis]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    const userMessageCount =
      messages.filter((m) => m.role === "user").length + 1;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I understand your situation. Let me analyze the details you've provided. Could you please provide more specific information about when this medical incident occurred and what specific complications or issues arose from it?",
        },
      ]);

      if (userMessageCount === 5) {
        const result = analyzeCaseStrength([
          ...messages,
          { role: "user", content: userMessage },
        ]);
        setAnalysis(result);
      }

      setIsLoading(false);
    }, 1000);
  };

  const handlePublishCase = () => {
    router.push("/victim/case-submitted?status=public");
  };

  const handlePrivateCase = () => {
    router.push("/victim/case-submitted?status=private");
  };

  const getFlagIcon = (flag: "red" | "yellow" | "green") => {
    switch (flag) {
      case "red":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "yellow":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "green":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
  };

  const getFlagColor = (flag: "red" | "yellow" | "green") => {
    switch (flag) {
      case "red":
        return "border-destructive/50 text-destructive";
      case "yellow":
        return "border-yellow-500/50 text-yellow-500";
      case "green":
        return "border-green-500/50 text-green-500";
    }
  };

  return (
    <div className="container mx-auto p-4 md:py-8 h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader className="border-b px-4 py-4">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Bot className="h-5 w-5 text-primary" />
              AfterCare Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4 min-h-0">
            <ScrollArea className="flex-1 pr-4 min-h-0">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <ChatMessage key={i} message={message} />
                ))}

                {analysis && (
                  <Alert
                    className={cn("mt-4 border-2", getFlagColor(analysis.flag))}
                  >
                    <div className="flex items-center gap-2">
                      {getFlagIcon(analysis.flag)}
                      <AlertTitle>{analysis.title}</AlertTitle>
                    </div>
                    <AlertDescription className="mt-2">
                      {analysis.description}
                    </AlertDescription>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button onClick={handlePublishCase} className="flex-1">
                        Make Case Public
                      </Button>
                      <Button
                        onClick={handlePrivateCase}
                        variant="outline"
                        className="flex-1"
                      >
                        Keep Case Private
                      </Button>
                    </div>
                  </Alert>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSubmit}
              className="flex gap-2 mt-4 pt-4 border-t"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-base"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
              >
                <SendHorizontal className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
