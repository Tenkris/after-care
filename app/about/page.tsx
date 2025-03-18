"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Stethoscope,
  Scale,
  Code,
  LineChart,
  Users,
  Heart,
  Lightbulb,
  Target,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            การปฏิวัติการสนับสนุนการฟ้องร้องทางการแพทย์
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            โครงการนวัตกรรมกฎหมายเทคโนโลยี จุฬาลงกรณ์มหาวิทยาลัย
          </p>
          <div className="flex justify-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <Scale className="h-6 w-6 text-primary" />
            <Code className="h-6 w-6 text-primary" />
            <LineChart className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Target className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">พันธกิจของเรา</h2>
                </div>
                <p className="text-muted-foreground">
                  เพื่อเชื่อมต่อช่องว่างระหว่างผู้เสียหายจากการรักษาพยาบาลที่ผิดพลาดกับการสนับสนุนทางกฎหมาย
                  ผ่านนวัตกรรมทางเทคโนโลยี
                  เพื่อให้การเข้าถึงความยุติธรรมเป็นไปอย่างมีประสิทธิภาพและทั่วถึงมากขึ้น
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Lightbulb className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">วิสัยทัศน์ของเรา</h2>
                </div>
                <p className="text-muted-foreground">
                  สร้างอนาคตที่ทุกผู้เสียหายจากการรักษาพยาบาลที่ผิดพลาดมีสิทธิเข้าถึงความยุติธรรม
                  รองรับด้วยเทคโนโลยีที่ทันสมัยและคำแนะนำที่เชี่ยวชาญ
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Tabs defaultValue="medical" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Our Interdisciplinary Team
            </h2>
            <p className="text-muted-foreground">
              รวมความเชี่ยวชาญจากคณะการแพทย์ จุฬาลงกรณ์มหาวิทยาลัย
            </p>
          </div>
          <div className="relative w-full overflow-auto">
            <TabsList className="flex w-full whitespace-nowrap overflow-x-auto md:justify-center justify-start px-1 no-scrollbar">
              <TabsTrigger
                value="medical"
                className="min-w-[120px] md:min-w-[140px] gap-2"
              >
                <Stethoscope className="h-4 w-4" />
                การแพทย์
              </TabsTrigger>
              <TabsTrigger
                value="legal"
                className="min-w-[120px] md:min-w-[140px] gap-2"
              >
                <Scale className="h-4 w-4" />
                กฎหมาย
              </TabsTrigger>
              <TabsTrigger
                value="tech"
                className="min-w-[120px] md:min-w-[140px] gap-2"
              >
                <Code className="h-4 w-4" />
                วิศวกรรม
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="min-w-[120px] md:min-w-[140px] gap-2"
              >
                <LineChart className="h-4 w-4" />
                ธุรกิจ
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="medical">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    ทีมการแพทย์
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    ทีมการแพทย์จากคณะการแพทย์ จุฬาลงกรณ์มหาวิทยาลัย
                    มีความเชี่ยวชาญใน
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">การวิเคราะห์กรณี</p>
                        <p className="text-sm text-muted-foreground">
                          การวิเคราะห์และประเมินกรณีทางการแพทย์โดยผู้เชี่ยวชาญ
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">มาตรฐานการดูแล</p>
                        <p className="text-sm text-muted-foreground">
                          การกำหนดและประเมินมาตรฐานทางการแพทย์
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">เอกสารทางการแพทย์</p>
                        <p className="text-sm text-muted-foreground">
                          การวิเคราะห์บันทึกทางการแพทย์อย่างมืออาชีพ
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">การสนับสนุนผู้ป่วย</p>
                        <p className="text-sm text-muted-foreground">
                          การสนับสนุนสิทธิและการดูแลผู้ป่วย
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    ทีมกฎหมาย
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    ทีมกฎหมายของเราจากคณะนิติศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                    มีความเชี่ยวชาญใน
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">กฎหมายการแพทย์</p>
                        <p className="text-sm text-muted-foreground">
                          ความเชี่ยวชาญด้านการฟ้องร้องทางการแพทย์
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">การประเมินกรณี</p>
                        <p className="text-sm text-muted-foreground">
                          การประเมินและกลยุทธ์ทางกฎหมาย
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">สิทธิผู้ป่วย</p>
                        <p className="text-sm text-muted-foreground">
                          กฎหมายด้านสุขภาพและการคุ้มครองผู้ป่วย
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">นวัตกรรมกฎหมาย</p>
                        <p className="text-sm text-muted-foreground">
                          โซลูชันเทคโนโลยีทางกฎหมายสมัยใหม่
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tech">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    ทีมวิศวกรรม
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    ทีมวิศวกรรมของเราจากคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                    พัฒนา
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">โซลูชันปัญญาประดิษฐ์</p>
                        <p className="text-sm text-muted-foreground">
                          การวิเคราะห์และจับคู่กรณีด้วยปัญญาประดิษฐ์
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">การพัฒนาแพลตฟอร์ม</p>
                        <p className="text-sm text-muted-foreground">
                          โซลูชันเว็บที่ปลอดภัยและมีประสิทธิภาพ
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">การวิเคราะห์ข้อมูล</p>
                        <p className="text-sm text-muted-foreground">
                          การวิเคราะห์รูปแบบกรณีขั้นสูง
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">ประสบการณ์ผู้ใช้</p>
                        <p className="text-sm text-muted-foreground">
                          การออกแบบส่วนต่อประสานที่ใช้งานง่าย
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    ทีมธุรกิจ
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    ทีมธุรกิจของเราจากคณะพาณิชยศาสตร์และการบัญชี
                    จุฬาลงกรณ์มหาวิทยาลัย มุ่งเน้นที่
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">การพัฒนากลยุทธ์</p>
                        <p className="text-sm text-muted-foreground">
                          นวัตกรรมโมเดลธุรกิจที่ยั่งยืน
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">การวิเคราะห์ตลาด</p>
                        <p className="text-sm text-muted-foreground">
                          การวิเคราะห์ตลาดเทคโนโลยีทางกฎหมายด้านสุขภาพ
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">
                          ความสัมพันธ์ผู้มีส่วนได้ส่วนเสีย
                        </p>
                        <p className="text-sm text-muted-foreground">
                          การพัฒนาความร่วมมือ
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">ผลกระทบทางสังคม</p>
                        <p className="text-sm text-muted-foreground">
                          การวัดและเพิ่มคุณค่าทางสังคม
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Values Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-8">Our Core Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">การเข้าถึง</h3>
                <p className="text-sm text-muted-foreground">
                  การทำให้การสนับสนุนทางกฎหมายเข้าถึงได้สำหรับทุกคน
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Scale className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">ความยุติธรรม</h3>
                <p className="text-sm text-muted-foreground">
                  การรับรองการปฏิบัติที่เป็นธรรมสำหรับผู้เสียหาย
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Code className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">นวัตกรรม</h3>
                <p className="text-sm text-muted-foreground">
                  การใช้เทคโนโลยีเพื่อผลลัพธ์ที่ดีขึ้น
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">ความเห็นอกเห็นใจ</h3>
                <p className="text-sm text-muted-foreground">
                  การเข้าใจและสนับสนุนผู้ป่วย
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
