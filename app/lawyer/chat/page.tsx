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
import { Alert, AlertDescription } from "@/components/ui/alert";

const INITIAL_MESSAGE = `สวัสดีค่ะ ฉันคือ AfterCare Assistant สำหรับทนายความ ฉันจะช่วยคุณรวบรวมข้อมูลเพิ่มเติมเกี่ยวกับคดีผ่าตัดไส้ติ่งนี้ค่ะ

ข้อมูลเบื้องต้น:
- ผู้ป่วยอายุ 35 ปี
- ผ่าตัดไส้ติ่งโดยไม่ได้รับการยินยอม
- เกิดภาวะแทรกซ้อนหลังผ่าตัด

คุณต้องการทราบข้อมูลเพิ่มเติมในประเด็นใดคะ?`;

const MOCK_RESPONSES = [
  `ขอสรุปข้อมูลสำคัญเพิ่มเติมค่ะ:
📋 ข้อมูลทางการแพทย์:
- วันที่เข้ารับการรักษา: 15 มกราคม 2567
- อาการแรกรับ: ปวดท้องบริเวณ RLQ
- การวินิจฉัย: Acute appendicitis
- ภาวะแทรกซ้อน: Surgical site infection, delayed healing
📑 เอกสารที่มีในระบบ:
- ใบรายงานการผ่าตัด (Operation Note)
- เวชระเบียน (Medical Records)
- ผลตรวจทางห้องปฏิบัติการ
- บันทึกการพยาบาล
คุณต้องการตรวจสอบเอกสารใดเพิ่มเติมไหมคะ?`,

  `เข้าใจค่ะ ขอสรุปประเด็นทางกฎหมายที่เกี่ยวข้อง:
⚖️ ประเด็นสำคัญ:
1. การละเมิดสิทธิผู้ป่วย (Informed Consent)
- ไม่มีการลงนามในใบยินยอม
- ไม่มีการอธิบายทางเลือกในการรักษา
- ไม่มีการแจ้งความเสี่ยงและภาวะแทรกซ้อน
2. ความบกพร่องในการรักษา
- การเกิดภาวะแทรกซ้อนที่รุนแรง
- การดูแลหลังผ่าตัดที่ไม่เพียงพอ
คุณต้องการสอบถามรายละเอียดเพิ่มเติมในประเด็นใดคะ?`,

  `ขอแนะนำขั้นตอนต่อไปค่ะ:
📝 การดำเนินการที่แนะนำ:
1. นัดสัมภาษณ์ผู้ป่วยเพิ่มเติม
2. ขอความเห็นผู้เชี่ยวชาญทางการแพทย์
3. รวบรวมเอกสารเพิ่มเติม:
   - ประวัติการรักษาก่อนหน้า
   - ภาพถ่ายแผลผ่าตัด
   - บันทึกการให้ข้อมูลก่อนผ่าตัด
ต้องการให้ช่วยประสานงานในส่วนใดเพิ่มเติมไหมคะ?`,
];

export default function LawyerChat() {
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
  const [showFinishOptions, setShowFinishOptions] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    const userMessageCount = messages.filter((m) => m.role === "user").length;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            MOCK_RESPONSES[
              Math.min(userMessageCount, MOCK_RESPONSES.length - 1)
            ],
        },
      ]);

      if (userMessageCount === 2) {
        setShowFinishOptions(true);
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleReturnToDashboard = () => {
    router.push("/lawyer/dashboard");
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

                {showFinishOptions && (
                  <Alert className="mt-4">
                    <AlertDescription className="mt-2">
                      ขอบคุณที่ใช้บริการ AfterCare Assistant
                      คุณสามารถกลับไปที่หน้า Dashboard
                      เพื่อดูข้อมูลคดีทั้งหมดได้ค่ะ
                    </AlertDescription>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button
                        onClick={handleReturnToDashboard}
                        className="flex-1"
                      >
                        กลับไปที่ Dashboard
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
                disabled={isLoading || showFinishOptions}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim() || showFinishOptions}
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
