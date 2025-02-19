import CaseDetailClient from "./case-detail-client";
import type { CaseData } from "./case-detail-client";

// Mock data for static paths - in a real app, this would come from your data source
const mockCases: CaseData[] = [
  {
    id: "1",
    title: "ผ่าตัดไส้ติ่งโดยไม่ได้รับการยินยอม",
    date: "2024-03-15",
    status: "reviewing",
    flag: "red",
    description:
      "แพทย์ทำการผ่าตัดไส้ติ่งโดยไม่ได้แจ้งและขอความยินยอมก่อน ส่งผลให้เกิดภาวะแทรกซ้อนหลังผ่าตัด",
    details: `คนไข้เข้ารับการผ่าตัดไส้ติ่งเมื่อวันที่ 15 มกราคม 2567 โดยไม่ได้รับการแจ้งและขอความยินยอมก่อน 
      หลังการผ่าตัดเกิดภาวะแทรกซ้อนที่รุนแรง ต้องเข้ารับการรักษาต่อเนื่อง 
      
      ประเด็นทางกฎหมายที่เกี่ยวข้อง:
      1. การละเมิดสิทธิผู้ป่วยในการให้ความยินยอม (Informed Consent)
      2. ความบกพร่องในการรักษาพยาบาล (Medical Negligence)
      3. การละเมิดจริยธรรมทางการแพทย์`,
    lawyerInterest: 3,
    lastUpdate: "2024-03-18",
    timeline: [
      {
        date: "2024-03-15",
        event: "ยื่นเรื่องร้องเรียน",
        type: "submission",
      },
      {
        date: "2024-03-15",
        event: "AI วิเคราะห์คดี - ระดับความรุนแรงสูง",
        type: "analysis",
      },
      {
        date: "2024-03-16",
        event: "อัพโหลดเอกสารทางการแพทย์",
        type: "document",
      },
      {
        date: "2024-03-17",
        event: "ตรวจสอบเอกสารเพิ่มเติม",
        type: "document",
      },
      {
        date: "2024-03-18",
        event: "ทนายความแสดงความสนใจรับคดี",
        type: "review",
      },
    ],
    interestedLawyers: [
      {
        id: 1,
        name: "Sarah Johnson",
        specialty: "Medical Malpractice",
        experience: "15 years",
        status: "Reviewing",
      },
      {
        id: 2,
        name: "Michael Chen",
        specialty: "Personal Injury",
        experience: "8 years",
        status: "Interested",
      },
      {
        id: 3,
        name: "สมศักดิ์ รักความยุติธรรม",
        specialty: "Medical Negligence",
        experience: "12 years",
        status: "Interested",
      },
    ],
  },
];

export async function generateStaticParams() {
  // In a real app, this would fetch from your API or database
  return mockCases.map((case_) => ({
    id: case_.id,
  }));
}

export default function CaseDetail({ params }: { params: { id: string } }) {
  // Find the case data
  const caseData = mockCases.find((c) => c.id === params.id) ?? mockCases[0];

  if (!caseData) {
    throw new Error("Case not found");
  }

  return <CaseDetailClient caseData={caseData} />;
}
