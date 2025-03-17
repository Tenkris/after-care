"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, HeartPulse, Check } from "lucide-react";

type FacilityType = "clinic" | "outpatient" | "inpatient" | null;
type ProblemType =
  | "surgery"
  | "obstetrics"
  | "bloodTest"
  | "misdiagnosis"
  | null;

export default function VictimOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [facilityType, setFacilityType] = useState<FacilityType>(null);
  const [problemType, setProblemType] = useState<ProblemType>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (facilityType) {
      localStorage.setItem("victimFacilityType", facilityType);
    }
    if (problemType) {
      localStorage.setItem("victimProblemType", problemType);
    }
  }, [facilityType, problemType]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save all data and redirect to chat
      router.push("/victim/chat");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 1) return facilityType !== null;
    if (step === 2) return problemType !== null;
    if (step === 4) return acceptTerms;
    return true;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6 sm:mb-8">
          <HeartPulse className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
        </div>

        <div className="flex justify-between mb-6 sm:mb-8 overflow-x-auto pb-2 sm:pb-0 px-2 sm:px-0">
          <div className="flex flex-col items-center min-w-[80px] sm:min-w-0">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-primary text-white" : "bg-muted"
              }`}
            >
              {step > 1 ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : "1"}
            </div>
            <span className="text-xs sm:text-sm mt-2 text-center font-normal">
              ประเภทสถานพยาบาล
            </span>
          </div>
          <div className="flex-1 flex items-center mx-2 sm:mx-4">
            <div
              className={`h-1 w-full ${step > 1 ? "bg-primary" : "bg-muted"}`}
            ></div>
          </div>
          <div className="flex flex-col items-center min-w-[80px] sm:min-w-0">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-primary text-white" : "bg-muted"
              }`}
            >
              {step > 2 ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : "2"}
            </div>
            <span className="text-xs sm:text-sm mt-2 text-center font-normal">
              ประเภทปัญหาที่พบ
            </span>
          </div>
          <div className="flex-1 flex items-center mx-2 sm:mx-4">
            <div
              className={`h-1 w-full ${step > 2 ? "bg-primary" : "bg-muted"}`}
            ></div>
          </div>
          <div className="flex flex-col items-center min-w-[80px] sm:min-w-0">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-primary text-white" : "bg-muted"
              }`}
            >
              {step > 3 ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : "3"}
            </div>
            <span className="text-xs sm:text-sm mt-2 text-center font-normal">
              ข้อมูลเพิ่มเติม
            </span>
          </div>
          <div className="flex-1 flex items-center mx-2 sm:mx-4">
            <div
              className={`h-1 w-full ${step > 3 ? "bg-primary" : "bg-muted"}`}
            ></div>
          </div>
          <div className="flex flex-col items-center min-w-[80px] sm:min-w-0">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                step >= 4 ? "bg-primary text-white" : "bg-muted"
              }`}
            >
              4
            </div>
            <span className="text-xs sm:text-sm mt-2 text-center font-normal">
              ข้อตกลง
            </span>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="text-xl sm:text-2xl text-center sm:text-left font-semibold">
              {step === 1 && "เลือกประเภทสถานพยาบาล"}
              {step === 2 && "เลือกประเภทปัญหาที่พบ"}
              {step === 3 && "ข้อมูลสำคัญสำหรับผู้เสียหาย"}
              {step === 4 && "ข้อตกลงและเงื่อนไขการใช้บริการ"}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 py-4 sm:py-6">
            {step === 1 && (
              <RadioGroup
                value={facilityType || ""}
                onValueChange={(value) =>
                  setFacilityType(value as FacilityType)
                }
                className="space-y-3 sm:space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="clinic" id="clinic" />
                  <Label
                    htmlFor="clinic"
                    className="cursor-pointer text-base sm:text-lg font-normal"
                  >
                    คลินิกเสริมความงาม
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="outpatient" id="outpatient" />
                  <Label
                    htmlFor="outpatient"
                    className="cursor-pointer text-base sm:text-lg font-normal"
                  >
                    คนไข้นอก
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="inpatient" id="inpatient" />
                  <Label
                    htmlFor="inpatient"
                    className="cursor-pointer text-base sm:text-lg font-normal"
                  >
                    คนไข้ใน
                  </Label>
                </div>
              </RadioGroup>
            )}

            {step === 2 && (
              <RadioGroup
                value={problemType || ""}
                onValueChange={(value) => setProblemType(value as ProblemType)}
                className="space-y-3 sm:space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="surgery" id="surgery" />
                  <Label
                    htmlFor="surgery"
                    className="cursor-pointer text-base sm:text-lg font-normal"
                  >
                    การผ่าตัด
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="obstetrics" id="obstetrics" />
                  <Label
                    htmlFor="obstetrics"
                    className="cursor-pointer text-base sm:text-lg font-normal"
                  >
                    สูตินารี
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="bloodTest" id="bloodTest" />
                  <Label
                    htmlFor="bloodTest"
                    className="cursor-pointer text-base sm:text-lg font-normal"
                  >
                    เจาะเลือด
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="misdiagnosis" id="misdiagnosis" />
                  <Label
                    htmlFor="misdiagnosis"
                    className="cursor-pointer text-base sm:text-lg font-normal"
                  >
                    วินิจฉัยผิด
                  </Label>
                </div>
              </RadioGroup>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-base sm:text-lg font-normal">
                  ขอบคุณที่ให้ข้อมูลเบื้องต้น
                  ข้อมูลที่คุณให้จะช่วยให้เราสามารถให้คำแนะนำที่เหมาะสมกับสถานการณ์ของคุณได้ดียิ่งขึ้น
                </p>

                <div className="bg-muted p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-lg sm:text-xl">
                    ขั้นตอนต่อไป
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-2 text-base sm:text-lg font-normal">
                    <li>คุณจะได้พูดคุยกับ AI ผู้ช่วยของเรา</li>
                    <li>AI จะถามข้อมูลเพิ่มเติมเกี่ยวกับกรณีของคุณ</li>
                    <li>
                      คุณจะได้รับข้อมูลกฎหมายที่เกี่ยวข้องกับกรณีที่ใกล้เคียง
                      รวมถึงการวิเคราะห์ตามแนวทางการรักษาทางการแพทย์ของไทย
                    </li>
                    <li>
                      หากคุณมั่นใจว่าคดีสามารถดำเนินการได้ คุณสามารถ submit case
                      เข้าสู่ระบบได้
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/5 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-lg sm:text-xl">
                    เอกสารสำคัญสำหรับการดำเนินการคดีทางการแพทย์
                  </h3>
                  <p className="text-base sm:text-lg mb-3 font-normal">
                    เอกสารที่ทนายความต้องการจากผู้เสียหายเพื่อวิเคราะห์และดำเนินคดี:
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-2">
                        เอกสารสำคัญเบื้องต้น:
                      </h4>
                      <ul className="list-disc pl-5 text-base sm:text-lg font-normal">
                        <li>
                          <span className="font-medium">ใบเสร็จการรักษา</span>
                        </li>
                      </ul>
                      <ul className="list-disc pl-5 text-base sm:text-lg font-normal">
                        <li>
                          <span className="font-medium">
                            เอกสารรายงานเวชระเบียน
                          </span>{" "}
                          - ประวัติการรักษาทั้งหมด
                        </li>
                        <li>
                          <span className="font-medium">ใบรับรองแพทย์</span> -
                          แสดงการวินิจฉัยและการรักษา
                        </li>
                        <li>
                          <span className="font-medium">ใบรับรองผลการตรวจ</span>{" "}
                          - ผลการตรวจทางห้องปฏิบัติการต่างๆ
                        </li>
                        <li>
                          <span className="font-medium">
                            เอกสารการสั่งจ่ายยา
                          </span>{" "}
                          - รายการยาที่ได้รับ
                        </li>
                      </ul>
                      <ul className="list-disc pl-5 text-base sm:text-lg font-normal">
                        <li>
                          <span className="font-medium">เอกสารโฆษณา</span> -
                          คำโฆษณาต่างๆ อาจใช้เป็นหลักฐานประกอบได้
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-primary/5 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 sm:mb-4 text-lg sm:text-xl">
                    ข้อตกลงและเงื่อนไขการใช้บริการ
                  </h3>
                  <div className="text-base sm:text-lg space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-base sm:text-lg">
                        1. การให้ข้อมูล
                      </h4>
                      <p className="text-muted-foreground font-normal text-base sm:text-lg">
                        ข้อมูลที่ท่านให้กับ AfterCare
                        จะถูกใช้เพื่อวัตถุประสงค์ในการให้คำปรึกษาและวิเคราะห์กรณีของท่านเท่านั้น
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-base sm:text-lg">
                        2. การรักษาความลับ
                      </h4>
                      <p className="text-muted-foreground font-normal text-base sm:text-lg">
                        ข้อมูลของท่านจะถูกเก็บเป็นความลับตามมาตรฐานการรักษาความปลอดภัยของข้อมูล
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-base sm:text-lg">
                        3. ขอบเขตความรับผิดชอบ
                      </h4>
                      <p className="text-muted-foreground font-normal text-base sm:text-lg">
                        คำแนะนำที่ได้รับจาก AfterCare เป็นเพียงข้อมูลเบื้องต้น
                        ไม่ใช่คำปรึกษาทางกฎหมายอย่างเป็นทางการ
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-base sm:text-lg">
                        4. การแบ่งปันข้อมูล
                      </h4>
                      <p className="text-muted-foreground font-normal text-base sm:text-lg">
                        หากท่านเลือกส่งข้อมูลเข้าระบบ
                        ข้อมูลของท่านอาจถูกแบ่งปันกับทนายความที่เกี่ยวข้องเพื่อวัตถุประสงค์ในการให้คำปรึกษา
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-base sm:text-lg">
                        5. การยกเลิก
                      </h4>
                      <p className="text-muted-foreground font-normal text-base sm:text-lg">
                        ท่านสามารถขอลบข้อมูลของท่านออกจากระบบได้ตลอดเวลา
                        โดยติดต่อผ่านช่องทางที่ระบุในเว็บไซต์
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start sm:items-center space-x-2 p-3 sm:p-4 bg-muted rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) =>
                      setAcceptTerms(checked === true)
                    }
                    className="mt-1 sm:mt-0"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-base sm:text-lg cursor-pointer font-normal"
                  >
                    ฉันได้อ่านและยอมรับข้อตกลงและเงื่อนไขการใช้บริการ
                  </Label>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6 sm:mt-8">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" /> ย้อนกลับ
                </Button>
              ) : (
                <div></div>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3"
              >
                {step < 4 ? "ถัดไป" : "เริ่มการสนทนา"}{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
