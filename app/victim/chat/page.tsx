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

const INITIAL_MESSAGE = `สวัสดีค่ะ ฉันคือ AfterCare Assistant ผู้ช่วยให้คำปรึกษาด้านกฎหมายการแพทย์ หากคุณกำลังเจอเหตุการณ์ที่ทำให้คุณสงสัยว่ากำลังเผชิญกับการกระทำผิดทางการแพทย์ คุณสามารถพิมพ์ข้อมูลเบื้องต้นดังต่อไปนี้เพื่อให้ Aftercare ช่วยประเมินข้อมูลเบื้องต้นและให้คำปรึกษาได้อย่างแม่นยำมากขึ้น

☞ ประเภทของการรักษาที่ได้รับ เช่น ผู้ป่วยใน (นอนโรงพยาบาล) / ผู้ป่วยนอก (ได้รับการรักษาที่ OPD ของโรงพยาบาล) / ผู้ป่วยที่รับบริการที่คลินิคนอกโรงพยาบาล
☞ อาการเจ็บป่วยที่ทำให้ไปพบแพทย์ เช่น ปวดท้อง ท้องเสีย มีก้อนที่คอโต หายใจหอบเหนื่อย
☞ หัตถการที่ทำหรือยาที่ได้ เช่น ฉีดยา เจาะตับ เจาะปอด ได้ยาละลายลิ่มเลือด
☞ ความผิดพลาดทางการแพทย์ที่คิดว่ากำลังเผชิญ เช่น หมอวินิจฉัยผิด หมอผ่าตัดโดยไม่ได้รับอนุญาต
☞ ภาวะแทรกซ้อนที่เกิดขึ้นหรือความเสียหายที่ได้รับ เช่น เสียชีวิต พิการ ตาบอด ติดเชื้อรุนแรง`;

// System prompt for Claude
const SYSTEM_PROMPT = `คุณเป็นผู้เชี่ยวชาญด้านกฎหมายการแพทย์ในประเทศไทย ที่ชื่อ AfterCare Assistant มีหน้าที่ให้คำปรึกษาเกี่ยวกับกรณีการรักษาพยาบาลที่ผิดพลาด (Medical Malpractice) 

คุณจะต้อง:
1. สอบถามข้อมูลที่จำเป็นเพื่อประเมินกรณี
2. ให้คำแนะนำเกี่ยวกับสิทธิทางกฎหมายและขั้นตอนการเรียกร้องค่าเสียหาย
3. อธิบายกฎหมายที่เกี่ยวข้องในภาษาที่เข้าใจง่าย
4. ช่วยผู้ใช้ในการรวบรวมเอกสารและหลักฐานที่จำเป็น
5. แสดงความเห็นอกเห็นใจและเข้าใจต่อความเครียดของผู้ใช้

คุณจะต้องไม่:
1. ให้คำปรึกษาทางการแพทย์หรือวินิจฉัยอาการ
2. รับประกันผลลัพธ์ของการฟ้องร้อง
3. เลือกข้าง ไม่ว่าจะเป็นผู้ป่วยหรือบุคลากรทางการแพทย์
4. ให้คำแนะนำที่อาจขัดต่อกฎหมาย`;

// Few-shot examples to guide Claude's responses
const FEW_SHOT_EXAMPLES = [
  {
    user: "ฉันไปผ่าตัดไส้ติ่ง แต่หมอผ่าตัดผิดข้าง",
    assistant:
      "เสียใจด้วยนะคะที่คุณต้องประสบเหตุการณ์แบบนี้ กรณีการผ่าตัดผิดตำแหน่งถือเป็นความผิดพลาดทางการแพทย์ที่ชัดเจน (Never Event) ตามมาตรฐานสากล\n\nขอสอบถามข้อมูลเพิ่มเติมเพื่อประเมินกรณีของคุณค่ะ:\n\n1. เหตุการณ์นี้เกิดขึ้นเมื่อไหร่?\n2. คุณมีอาการแทรกซ้อนหรือความเสียหายอื่นๆ จากการผ่าตัดผิดข้างหรือไม่?\n3. ทางโรงพยาบาลได้แจ้งหรือยอมรับความผิดพลาดนี้หรือไม่?\n\nคุณควรรวบรวมเอกสารการรักษาทั้งหมด รวมถึงใบให้ความยินยอม (Consent Form) และประวัติการรักษาค่ะ",
  },
  {
    user: "หมอให้ยาผิด ทำให้ผมแพ้ยาอย่างรุนแรง",
    assistant:
      "ขอแสดงความเสียใจกับเหตุการณ์ที่เกิดขึ้นนะคะ การให้ยาผิดหรือไม่ตรวจสอบประวัติการแพ้ยาอาจเข้าข่ายการละเลยหน้าที่ทางการแพทย์ได้\n\nขอทราบรายละเอียดเพิ่มเติมค่ะ:\n\n1. คุณเคยแจ้งประวัติการแพ้ยาไว้กับโรงพยาบาลหรือไม่?\n2. มีการสวมสายรัดข้อมือที่ระบุการแพ้ยาหรือไม่?\n3. อาการแพ้ยาที่เกิดขึ้นรุนแรงถึงขั้นต้องนอนโรงพยาบาลหรือใช้เวลารักษานานเท่าไร?\n\nในกรณีนี้ คุณมีสิทธิเรียกร้องค่าเสียหายตามมาตรา 420 ประมวลกฎหมายแพ่งและพาณิชย์ ซึ่งครอบคลุมการกระทำโดยประมาทเลินเล่อค่ะ",
  },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

// API interface types
type ClaudeMessage = {
  role: "user" | "assistant";
  content: string;
};

type ClaudeRequest = {
  model: string;
  system: string;
  messages: ClaudeMessage[];
  temperature: number;
  max_tokens: number;
};

type ClaudeResponse = {
  content: string;
};

type FlagAnalysis = {
  flag: "red" | "yellow" | "green";
  title: string;
  description: string;
};

const analyzeCaseStrength = (messages: Array<Message>): FlagAnalysis => {
  const userMessages = messages.filter((m) => m.role === "user");
  const combinedContent = userMessages
    .map((m) => m.content.toLowerCase())
    .join(" ");

  if (
    combinedContent.includes("เสียชีวิต") ||
    combinedContent.includes("ถาวร") ||
    combinedContent.includes("รุนแรง")
  ) {
    return {
      flag: "red",
      title: "พบข้อบ่งชี้ที่รุนแรง",
      description:
        "จากข้อมูลที่ได้รับ กรณีของคุณมีข้อบ่งชี้ที่ชัดเจนของการละเมิดทางการแพทย์ แนะนำให้ปรึกษาทนายความโดยเร็ว",
    };
  } else if (
    combinedContent.includes("ปวด") ||
    combinedContent.includes("ผิดพลาด") ||
    combinedContent.includes("ไม่แจ้ง")
  ) {
    return {
      flag: "yellow",
      title: "มีความเป็นไปได้ - ต้องตรวจสอบเพิ่มเติม",
      description:
        "กรณีของคุณมีความเป็นไปได้ แต่ต้องการข้อมูลเพิ่มเติม แนะนำให้ปรึกษาผู้เชี่ยวชาญเพื่อประเมินรายละเอียด",
    };
  } else {
    return {
      flag: "green",
      title: "ข้อบ่งชี้ไม่ชัดเจน",
      description:
        "จากข้อมูลปัจจุบัน อาจมีข้อจำกัดในการดำเนินคดี กรุณาให้ข้อมูลเพิ่มเติมหรือปรึกษาทนายความเพื่อการประเมินที่ละเอียดขึ้น",
    };
  }
};

// Format messages for Claude API
const formatMessagesForClaude = (messages: Message[]): ClaudeMessage[] => {
  // Create the messages array for Claude API
  return messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
};

// ThinkingDots component for animated thinking indicator
const ThinkingDots = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return <span className="inline-block ml-1">{dots}</span>;
};

export default function VictimChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: INITIAL_MESSAGE,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCaseOptions, setShowCaseOptions] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error("Error parsing saved messages:", error);
      }
    }
  }, []);

  // Save chat history to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showCaseOptions]);

  const callClaudeAPI = async (messages: Message[]): Promise<string> => {
    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          system: SYSTEM_PROMPT,
          messages: formatMessagesForClaude(messages),
          temperature: 0.7,
          max_tokens: 1024,
        } as ClaudeRequest),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = (await response.json()) as ClaudeResponse;
      return data.content;
    } catch (error) {
      console.error("Error calling Claude API:", error);
      return "ขออภัยค่ะ เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ กรุณาลองใหม่อีกครั้ง";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message to chat
    const userMsg: Message = { role: "user", content: userMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    // Check if we should show case options after 3 user messages
    const userMessageCount = updatedMessages.filter(
      (m) => m.role === "user"
    ).length;

    try {
      const assistantResponse = await callClaudeAPI(updatedMessages);

      // Add assistant response to chat
      const assistantMsg: Message = {
        role: "assistant",
        content: assistantResponse,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      if (userMessageCount >= 3 && !showCaseOptions) {
        setShowCaseOptions(true);
      }
    } catch (error) {
      console.error("Error in chat submission:", error);

      // Add error message from assistant
      const errorMsg: Message = {
        role: "assistant",
        content:
          "ขออภัยค่ะ เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ กรุณาลองใหม่อีกครั้ง",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishCase = () => {
    router.push("/victim/case-submitted?visibility=public");
  };

  const handlePrivateCase = () => {
    router.push("/victim/case-submitted?visibility=private");
  };

  const handleClearChat = () => {
    if (confirm("ต้องการลบประวัติการสนทนาทั้งหมดใช่หรือไม่?")) {
      setMessages([
        {
          role: "assistant",
          content: INITIAL_MESSAGE,
        },
      ]);
      localStorage.removeItem("chatHistory");
    }
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
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <Bot className="h-5 w-5 text-primary" />
                AfterCare Assistant
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCaseOptions(true)}
                className="text-xs"
              >
                ส่งข้อมูลเข้าระบบ
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4 min-h-0">
            <ScrollArea className="flex-1 pr-4 min-h-0">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <ChatMessage key={i} message={message} />
                ))}

                {showCaseOptions && (
                  <Alert className="mt-4 border-primary/20 bg-primary/5">
                    <AlertTitle className="text-lg">
                      คุณต้องการส่งข้อมูลเข้าสู่ระบบเพื่อดำเนินการต่อหรือไม่?
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      การส่งข้อมูลเข้าระบบจะทำให้ทนายความสามารถเข้าถึงข้อมูลของคุณ
                      รวมถึงมีกระบวนการที่ให้คุณได้รับความเป็นธรรมได้รวดเร็วขึ้น
                    </AlertDescription>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button onClick={handlePublishCase} className="flex-1">
                        ส่งข้อมูลเข้าระบบ
                      </Button>
                      <Button
                        onClick={() => setShowCaseOptions(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        ยังไม่ต้องการส่งข้อมูล
                      </Button>
                    </div>
                  </Alert>
                )}

                {isLoading && (
                  <div className="flex flex-col space-y-2.5 animate-in fade-in-50 duration-300">
                    <div className="flex gap-3 items-start">
                      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="rounded-lg bg-muted p-3 text-sm">
                          <div className="flex items-center">
                            <span>กำลังคิด</span>
                            <ThinkingDots />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                placeholder="พิมพ์ข้อความของคุณ..."
                className="flex-1 text-base"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
              >
                <SendHorizontal className="h-5 w-5" />
                <span className="sr-only">ส่งข้อความ</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
