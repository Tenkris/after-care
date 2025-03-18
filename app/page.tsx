import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Scale, FileText, HeartPulse } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubscriptionPlans } from "@/components/layout/SubscriptionPlans";
import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="/icon/icon.webp"
              alt="AfterCare Logo"
              width={450}
              height={450}
              className="w-[250px] h-auto sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px]"
              priority
            />
          </div>
          <p className="text-xl md:text-2xl font-semibold mb-2">
            Medical Malpractice Support
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-8">
            สนับสนุนผู้ป่วยด้วยการวิเคราะห์กรณีด้วยปัญญาประดิษฐ์และคำแนะนำจากผู้เชี่ยวชาญทางกฎหมาย
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-12 md:mb-16">
          <Card className="relative overflow-hidden border-primary/20 transition-all hover:border-primary">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="h-5 w-5 text-primary" />
                For Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-muted-foreground text-sm md:text-base">
                <li className="flex items-center gap-2">
                  • การประเมินกรณีด้วย AI
                </li>
                <li className="flex items-center gap-2">
                  • เชื่อมต่อกับทนายความผู้เชี่ยวชาญ
                </li>
                <li className="flex items-center gap-2">
                  • ปรึกษาเบื้องต้นฟรี
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/victim/onboarding">
                  Start Your Case Evaluation
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-primary/20 transition-all hover:border-primary">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Scale className="h-5 w-5 text-primary" />
                For Lawyers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-muted-foreground text-sm md:text-base">
                <li className="flex items-center gap-2">
                  • กรณีที่ผ่านการคัดกรอง
                </li>
                <li className="flex items-center gap-2">
                  • การจับคู่กรณีอัตโนมัติ
                </li>
                <li className="flex items-center gap-2">
                  • การวิเคราะห์กรณีโดยละเอียด
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/lawyer/dashboard">Access Lawyer Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
            AfterCare ทำงานอย่างไร
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-center">
                  Share Your Experience
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  เล่าประสบการณ์ทางการแพทย์ของคุณในสภาพแวดล้อมที่ปลอดภัยและเป็นความลับ
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-center">
                  Get Expert Analysis
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  รับการวิเคราะห์ case ของคุณด้วย AI ที่มีความเชี่ยวชาญ
                </p>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-center">
                  Connect with Lawyers
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  จับคู่กับทนายความผู้เชี่ยวชาญด้านการฟ้องร้องทางการแพทย์
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="bg-muted/50 py-8 md:py-16 mt-12 md:mt-20">
        <SubscriptionPlans showFAQ={false} />
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">View All Plans</Link>
          </Button>
        </div>
      </div>

      <footer className="border-t mt-0">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2024 AfterCare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
