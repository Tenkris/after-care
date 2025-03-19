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
const MOCK_RESPONSES = [
  `เสียใจด้วยนะคะที่ได้ยินแบบนั้น ขอสอบถามข้อมูลเพิ่มเติมนะคะ ในตอนนั้นที่ไปรับการรักษา แพทย์ได้มีการแจ้งเพิ่มเติมเกี่ยวกับการผ่าตัด เช่น อธิบายให้ผู้ป่วยและญาติเข้าใจถึงผลข้างเคียงและภาวะแทรกซ้อนที่อาจเกิดขึ้นได้จากการผ่าตัด หรือมีให้เซ็นเอกสารยินยอมหรือไม่คะ`,

  `ต้องเสียใจด้วยอีกครั้งนะคะ ในกรณีนี้
☞ ประเด็นเรื่องของการตัดชิ้นเนื้อที่ตับไปตรวจและการให้ข้อมูลที่ไม่ครบถ้วนนี้อาจเกี่ยวข้องกับสิทธิของผู้ป่วยเรื่องการให้ข้อมูลก่อนการรักษา (Informed Consent) และข้อบกพร่องทางการแพทย์ (Medical Negligence)
📌 กรณีที่คล้ายกัน:
คดีผ่าตัดในช่องท้องที่ไม่ได้แจ้ง Informed Consent ก่อนการรักษา
คดีที่แพทย์ตัดอวัยวะเพิ่มเติมโดยไม่ได้รับอนุญาต
📜 กฎหมายที่เกี่ยวข้อง:
ประมวลกฎหมายแพ่งและพาณิชย์ มาตรา 420: การกระทำละเมิดที่ทำให้เกิดความเสียหาย
พระราชบัญญัติวิชาชีพเวชกรรม พ.ศ. 2525 มาตรา 31: แพทย์ต้องรักษาจริยธรรมทางการแพทย์
ประมวลกฎหมายอาญา มาตรา 269: การบันทึกข้อมูลทางการแพทย์เป็นเท็จ
☞ ประเด็นเรื่องการใส่ท่อช่วยหายใจและปั๊มหัวใจฉุกเฉิน: อาจไม่ได้เกี่ยวข้องกับการรักษาผิดพลาดไปโดนหลอดลม เนื่องจากการใส่ท่อช่วยหายใจและปั๊มหัวใจเป็นการให้การรักษามาตรฐานในกรณีที่ผู้ป่วยมีภาวะหัวใจหยุดเต้น ซึ่งอาจเกิดได้จากหลายสาเหตุ`,

  `จากข้อมูลที่ให้มา อาจจะยังไม่เพียงพอในการให้คำตอบที่แม่นยำ เนื่องจากต้องมีรายละเอียดและข้อมูลในบางส่วนที่มากขึ้น จึงยังอาจจะตอบได้ไม่แน่ชัดค่ะ`,

  `คุณสามารถรวบรวมเอกสารสำคัญเพื่อใช้เป็นหลักฐานค่ะ

📄 เอกสารที่ควรเตรียม:

เวชระเบียน (Medical Records)
ผลตรวจทางห้องปฏิบัติการ เช่น ผลเลือด ภาพถ่ายรังสี
ใบรายงานการผ่าตัด (Operation Note)
บันทึกการพยาบาล
ใบเสร็จค่ารักษาพยาบาล
ใบเซ็นยินยอม

หากต้องการผู้ช่วยในการเรียกร้องค่าชดเชยหรือดำเนินการทางกฎหมาย Aftercare สามารถช่วยคุณหาทนายที่เชี่ยวชาญด้านนี้ผ่านแพลตฟอร์มของเราได้ค่ะ สนใจไหมคะ?`,

  `ได้เลยค่ะ → link to the next page`,
];
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
  const [showCaseOptions, setShowCaseOptions] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showCaseOptions]);

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

      if (userMessageCount === 3) {
        setShowCaseOptions(true);
      }

      setIsLoading(false);
    }, 1000);
  };

  const handlePublishCase = () => {
    router.push("/victim/case-submitted?visibility=public");
  };

  const handlePrivateCase = () => {
    router.push("/victim/case-submitted?visibility=private");
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

                {showCaseOptions && (
                  <Alert className="mt-4">
                    <AlertTitle>
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
                        onClick={handlePrivateCase}
                        variant="outline"
                        className="flex-1"
                      >
                        ยังไม่ต้องการส่งข้อมูล
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
