"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bot, SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat/chat-message";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const INITIAL_MESSAGE = `สวัสดีค่ะ ฉันคือ AfterCare Assistant สำหรับทนายความ ฉันจะช่วยคุณวิเคราะห์และประเมินคดีการฟ้องร้องทางการแพทย์ ทั้งการรวบรวมข้อมูล การประเมินความเป็นไปได้ของคดี และการเตรียมเอกสารทางกฎหมาย คุณสามารถถามคำถามเกี่ยวกับคดีที่คุณกำลังดูแล หรือสอบถามข้อกฎหมายที่เกี่ยวข้องได้ค่ะ`;

// System prompt for Claude - Lawyer version
const SYSTEM_PROMPT = `คุณเป็น AfterCare Assistant ผู้เชี่ยวชาญด้านกฎหมายการแพทย์สำหรับทนายความในประเทศไทย คุณมีความรู้เชี่ยวชาญเกี่ยวกับคดีการแพทย์ กฎหมายที่เกี่ยวข้อง และขั้นตอนการดำเนินคดี

คุณจะต้อง:
1. ช่วยทนายความวิเคราะห์ความเป็นไปได้ของคดีการฟ้องร้องทางการแพทย์
2. ให้คำแนะนำในการรวบรวมเอกสารและหลักฐานที่จำเป็น
3. แนะนำขั้นตอนการดำเนินคดีที่เหมาะสม
4. อธิบายกฎหมายที่เกี่ยวข้องและบรรทัดฐานคดีที่เคยเกิดขึ้น
5. ช่วยระบุผู้เชี่ยวชาญทางการแพทย์ที่สามารถให้ความเห็นทางวิชาการได้
6. ให้คำแนะนำในการเตรียมคำฟ้องและเอกสารทางกฎหมาย

คุณจะต้องไม่:
1. ให้คำวินิจฉัยทางการแพทย์
2. รับประกันผลการตัดสินของศาล
3. แนะนำวิธีการที่ผิดกฎหมายหรือผิดจรรยาบรรณของทนายความ
4. เปิดเผยข้อมูลส่วนตัวของลูกความหรือผู้เสียหาย

คุณพูดในฐานะผู้ช่วยที่เป็นมืออาชีพ ใช้ภาษาทางกฎหมายที่เหมาะสม และอ้างอิงกฎหมายที่เกี่ยวข้องเมื่อจำเป็น`;

// Few-shot examples to guide Claude's responses
const FEW_SHOT_EXAMPLES = [
  {
    user: "ฉันมีคดีที่ผู้ป่วยเสียชีวิตหลังการผ่าตัด ทำอย่างไรดี",
    assistant:
      "ในกรณีผู้ป่วยเสียชีวิตหลังการผ่าตัด จำเป็นต้องรวบรวมเอกสารและข้อมูลเพื่อประเมินว่ามีการกระทำที่ละเมิดมาตรฐานการรักษาหรือไม่\n\nเอกสารสำคัญที่ควรขอ:\n1. เวชระเบียนผู้ป่วยทั้งหมด\n2. บันทึกการผ่าตัด (Operation Note)\n3. บันทึกการให้ยาระงับความรู้สึก (Anesthetic Record)\n4. บันทึกการพยาบาล\n5. ผลตรวจทางห้องปฏิบัติการและภาพถ่ายรังสี\n6. ใบยินยอมรับการรักษา (Informed Consent)\n7. ใบมรณบัตร\n8. รายงานการชันสูตรพลิกศพ (ถ้ามี)\n\nขั้นตอนต่อไปคือการขอความเห็นจากผู้เชี่ยวชาญทางการแพทย์ว่ามีการละเลยหรือกระทำผิดมาตรฐานทางการแพทย์หรือไม่ ซึ่งสามารถใช้เป็นพยานผู้เชี่ยวชาญในคดีได้",
  },
  {
    user: "เราสามารถฟ้องร้องโรงพยาบาลกรณีแพทย์วินิจฉัยผิดได้หรือไม่",
    assistant:
      "การฟ้องร้องกรณีแพทย์วินิจฉัยผิดสามารถดำเนินการได้ แต่มีความซับซ้อนและต้องพิสูจน์องค์ประกอบสำคัญดังนี้:\n\n1. การกระทำ: ต้องพิสูจน์ว่าแพทย์วินิจฉัยผิดพลาดจริง โดยเปรียบเทียบกับมาตรฐานวิชาชีพ\n2. ความเสียหาย: ต้องแสดงให้เห็นถึงความเสียหายที่เกิดขึ้นจากการวินิจฉัยผิด\n3. ความสัมพันธ์ระหว่างเหตุและผล: ต้องพิสูจน์ว่าความเสียหายเกิดจากการวินิจฉัยผิดโดยตรง\n\nฐานทางกฎหมายที่สามารถใช้:\n1. ประมวลกฎหมายแพ่งและพาณิชย์ มาตรา 420 (ละเมิด)\n2. พระราชบัญญัติวิธีพิจารณาคดีผู้บริโภค พ.ศ. 2551\n3. พระราชบัญญัติความรับผิดทางละเมิดของเจ้าหน้าที่ พ.ศ. 2539 (กรณีโรงพยาบาลรัฐ)\n\nข้อควรตระหนัก: การวินิจฉัยทางการแพทย์เป็นเรื่องทางวิชาชีพที่มีความซับซ้อน ศาลมักให้ความสำคัญกับความเห็นของผู้เชี่ยวชาญ จึงจำเป็นต้องมีพยานผู้เชี่ยวชาญที่น่าเชื่อถือในการสนับสนุนข้อกล่าวหา",
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

// Format messages for Claude API
const formatMessagesForClaude = (messages: Message[]): ClaudeMessage[] => {
  // Create the messages array for Claude API
  return messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
};

export default function LawyerChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: INITIAL_MESSAGE,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFinishOptions, setShowFinishOptions] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showFinishOptions]);

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

    try {
      const assistantResponse = await callClaudeAPI(updatedMessages);

      // Add assistant response to chat
      const assistantMsg: Message = {
        role: "assistant",
        content: assistantResponse,
      };
      setMessages((prev) => [...prev, assistantMsg]);
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

  const handleReturnToDashboard = () => {
    router.push("/lawyer/dashboard");
  };

  const handleClearChat = () => {
    if (confirm("ต้องการลบประวัติการสนทนาทั้งหมดใช่หรือไม่?")) {
      setMessages([
        {
          role: "assistant",
          content: INITIAL_MESSAGE,
        },
      ]);
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
                onClick={() => setShowFinishOptions(true)}
                className="text-xs"
              >
                บันทึกและกลับ
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4 min-h-0">
            <ScrollArea className="flex-1 pr-4 min-h-0">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <ChatMessage key={i} message={message} />
                ))}

                {showFinishOptions && (
                  <Alert className="mt-4 border-primary/20 bg-primary/5">
                    <AlertTitle className="text-lg">
                      ต้องการบันทึกและออกจากการสนทนาใช่หรือไม่?
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      บันทึกการสนทนาจะถูกเก็บไว้ในระบบและคุณสามารถกลับมาดูได้ในภายหลัง
                    </AlertDescription>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button
                        onClick={handleReturnToDashboard}
                        className="flex-1"
                      >
                        บันทึกและกลับ Dashboard
                      </Button>
                      <Button
                        onClick={() => setShowFinishOptions(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        ยกเลิก
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
                disabled={isLoading || showFinishOptions}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim() || showFinishOptions}
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
