"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const FeatureItem = ({
  children,
  available = true,
  tooltip,
}: {
  children: React.ReactNode;
  available?: boolean;
  tooltip?: string;
}) => {
  const content = (
    <div
      className={`flex items-start space-x-3 ${!available ? "opacity-50" : ""}`}
    >
      <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
      <span className="text-base font-normal">{children}</span>
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-1 cursor-help">
              {content}
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

interface SubscriptionPlansProps {
  showHeading?: boolean;
  showFAQ?: boolean;
  className?: string;
}

export const SubscriptionPlans = ({
  showHeading = true,
  showFAQ = true,
  className = "",
}: SubscriptionPlansProps) => {
  return (
    <div className={`container mx-auto px-4 py-12 ${className}`}>
      {showHeading && (
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            แพ็กเกจสำหรับผู้ใช้ทุกประเภท
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            เลือกแพ็กเกจที่เหมาะสมกับความต้องการของคุณ
            ไม่ว่าจะเป็นทนายอิสระหรือสำนักงานกฎหมาย
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Basic Plan */}
        <Card className="flex flex-col border-2 transition-all duration-200 hover:border-primary/50 hover:shadow-md">
          <CardHeader className="flex flex-col space-y-1.5 p-6">
            <CardTitle className="text-2xl font-bold">Basic</CardTitle>
            <CardDescription className="text-base">
              สำหรับทนายอิสระ
            </CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">250฿</span>
              <span className="text-muted-foreground text-base ml-1">
                / เดือน
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 flex-grow">
            <Separator className="my-4" />
            <div className="space-y-4">
              <FeatureItem>
                ติดต่อกับลูกความอย่างมีประสิทธิภาพผ่านระบบ Dashboard
              </FeatureItem>
              <FeatureItem>
                สอบถาม MEDVISOR CHATBOT ได้ 100 ข้อความต่อเดือน
              </FeatureItem>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button className="w-full" size="lg">
              เริ่มต้นใช้งาน
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col relative border-2 border-primary transition-all duration-200 hover:shadow-lg">
          <Badge className="absolute -top-2 right-6 bg-primary">แนะนำ</Badge>
          <CardHeader className="flex flex-col space-y-1.5 p-6">
            <CardTitle className="text-2xl font-bold">Pro</CardTitle>
            <CardDescription className="text-base">
              สำหรับทนายอิสระ
            </CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">500฿</span>
              <span className="text-muted-foreground text-base ml-1">
                / เดือน
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 flex-grow">
            <Separator className="my-4" />
            <div className="space-y-4">
              <FeatureItem>
                ติดต่อกับลูกความอย่างมีประสิทธิภาพผ่านระบบ Dashboard
              </FeatureItem>
              <FeatureItem>
                สอบถาม MEDVISOR CHATBOT ได้ 500 ข้อความต่อเดือน
              </FeatureItem>
              <FeatureItem>ระบบช่วยจัดการเอกสาร</FeatureItem>
              <FeatureItem>รายงานสถิติและการวิเคราะห์</FeatureItem>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button className="w-full" size="lg" variant="default">
              เลือกแพ็กเกจนี้
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col border-2 transition-all duration-200 hover:border-primary/50 hover:shadow-md">
          <CardHeader className="flex flex-col space-y-1.5 p-6">
            <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
            <CardDescription className="text-base">
              สำหรับสำนักงานกฎหมาย
            </CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">ติดต่อเรา</span>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 flex-grow">
            <Separator className="my-4" />
            <div className="space-y-4">
              <FeatureItem>เข้าถึงฟีเจอร์ทุกอย่างในแพ็กเกจโปร</FeatureItem>
              <FeatureItem>สอบถาม Medvisor chatbot ได้ไม่จำกัด</FeatureItem>
              <FeatureItem>ระบบแชร์ข้อมูลภายในองค์กร</FeatureItem>
              <FeatureItem>การฝึกอบรมและการสนับสนุนแบบส่วนตัว</FeatureItem>
              <FeatureItem>API สำหรับการบูรณาการกับระบบภายใน</FeatureItem>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button className="w-full" size="lg" variant="outline" asChild>
              <Link href="/contact">
                ติดต่อฝ่ายขาย
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {showFAQ && (
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            ยังไม่แน่ใจว่าแพ็กเกจไหนเหมาะกับคุณ?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            เราพร้อมให้คำแนะนำเพื่อช่วยให้คุณเลือกแพ็กเกจที่เหมาะสมที่สุดสำหรับความต้องการของคุณ
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="mx-auto">
              ติดต่อเรา
            </Button>
          </Link>

          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              คำถามที่พบบ่อย
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  ฉันสามารถเปลี่ยนแพ็กเกจได้หรือไม่?
                </h3>
                <p className="text-base text-muted-foreground">
                  ได้
                  คุณสามารถอัปเกรดหรือดาวน์เกรดแพ็กเกจของคุณได้ทุกเมื่อผ่านหน้าการตั้งค่าบัญชีของคุณ
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  มีการผูกมัดสัญญาหรือไม่?
                </h3>
                <p className="text-base text-muted-foreground">
                  ไม่มี คุณสามารถยกเลิกการสมัครได้ทุกเมื่อโดยไม่มีค่าปรับ
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  เมื่อฉันเลือกแพ็กเกจแล้ว จะเริ่มใช้งานได้เมื่อไหร่?
                </h3>
                <p className="text-base text-muted-foreground">
                  คุณสามารถเริ่มใช้งานได้ทันทีหลังจากการชำระเงิน
                  ระบบจะเปิดใช้งานฟีเจอร์ต่างๆ ตามแพ็กเกจที่คุณเลือกโดยอัตโนมัติ
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
