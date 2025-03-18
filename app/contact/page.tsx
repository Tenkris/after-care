"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    interest: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, topic: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, interest: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "ส่งข้อความสำเร็จ",
        description: "เราจะติดต่อกลับโดยเร็วที่สุด",
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <HeartPulse className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">ติดต่อเรา</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          มีคำถามเกี่ยวกับบริการของเรา? ต้องการข้อมูลเพิ่มเติมเกี่ยวกับแพ็กเกจ?
          หรือต้องการปรึกษากับทีมงานของเรา? ติดต่อเราได้เลย
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                ส่งข้อความถึงเรา
              </CardTitle>
              <CardDescription>
                กรอกข้อมูลด้านล่างเพื่อส่งข้อความถึงทีมงานของเรา
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    ขอบคุณที่ติดต่อเรา
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    เราได้รับข้อความของคุณแล้ว
                    ทีมงานของเราจะติดต่อกลับโดยเร็วที่สุด
                  </p>
                  <Button
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    ส่งข้อความอีกครั้ง
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="ชื่อ-นามสกุลของคุณ"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">อีเมล *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="อีเมลของคุณ"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">หมายเลขโทรศัพท์</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="หมายเลขโทรศัพท์ของคุณ"
                        value={formState.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic">หัวข้อที่ต้องการติดต่อ *</Label>
                      <Select
                        onValueChange={handleSelectChange}
                        defaultValue=""
                        required
                      >
                        <SelectTrigger id="topic">
                          <SelectValue placeholder="เลือกหัวข้อ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="billing">การชำระเงิน</SelectItem>
                          <SelectItem value="pricing">สอบถามแพ็กเกจ</SelectItem>
                          <SelectItem value="support">
                            ความช่วยเหลือทางเทคนิค
                          </SelectItem>
                          <SelectItem value="partnership">
                            การเป็นพันธมิตร
                          </SelectItem>
                          <SelectItem value="other">อื่นๆ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>คุณสนใจแพ็กเกจใด</Label>
                    <RadioGroup
                      defaultValue="general"
                      onValueChange={handleRadioChange}
                      className="flex flex-col md:flex-row gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general" className="cursor-pointer">
                          ข้อมูลทั่วไป
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="basic" id="basic" />
                        <Label htmlFor="basic" className="cursor-pointer">
                          Basic
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pro" id="pro" />
                        <Label htmlFor="pro" className="cursor-pointer">
                          Pro
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="enterprise" id="enterprise" />
                        <Label htmlFor="enterprise" className="cursor-pointer">
                          Enterprise
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">ข้อความ *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="รายละเอียดที่ต้องการติดต่อ"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "กำลังส่ง..." : "ส่งข้อความ"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                ข้อมูลติดต่อ
              </CardTitle>
              <CardDescription>
                ติดต่อเราโดยตรงได้ตามช่องทางด้านล่าง
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">อีเมล</h3>
                  <p className="text-muted-foreground">info@aftercare.co.th</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">โทรศัพท์</h3>
                  <p className="text-muted-foreground">02-123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">ที่อยู่</h3>
                  <p className="text-muted-foreground">
                    123 อาคารไทยซัมมิท ชั้น 15
                    <br />
                    ถนนสีลม แขวงสีลม
                    <br />
                    เขตบางรัก กรุงเทพฯ 10500
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">ชั่วโมงทำการ</h3>
                  <div className="text-muted-foreground">
                    <p>จันทร์ - ศุกร์: 9:00 - 18:00 น.</p>
                    <p>เสาร์: 9:00 - 15:00 น.</p>
                    <p>อาทิตย์: ปิดทำการ</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl">คำถามที่พบบ่อย</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">
                  ฉันสามารถทดลองใช้งานฟรีได้หรือไม่?
                </h3>
                <p className="text-sm text-muted-foreground">
                  ได้ เรามีแพ็กเกจทดลองใช้งานฟรี 7 วัน สำหรับแพ็กเกจ Basic และ
                  Pro
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">
                  มีส่วนลดสำหรับการชำระรายปีหรือไม่?
                </h3>
                <p className="text-sm text-muted-foreground">
                  มี เมื่อชำระค่าบริการรายปี คุณจะได้รับส่วนลด 15% จากราคาปกติ
                </p>
              </div>

              <Button
                variant="link"
                className="p-0 h-auto text-primary"
                asChild
              >
                <a href="/pricing">ดูคำถามที่พบบ่อยทั้งหมด</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
