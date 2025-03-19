import CaseDetailClient from "./case-detail-client";
import type { CaseData } from "./case-detail-client";

// Mock data for static paths - in a real app, this would come from your data source
const mockCases: CaseData[] = [
  {
    id: "1",
    title: "การเจาะชิ้นเนื้อที่ตับโดยไม่ได้แจ้งข้อมูลครบถ้วน",
    date: "2024-03-15",
    status: "reviewing",
    flag: "red",
    description:
      "แพทย์ทำการเจาะชิ้นเนื้อที่ตับโดยไม่ได้แจ้งข้อมูลและความเสี่ยงให้ครบถ้วน ส่งผลให้เกิดภาวะเลือดออกรุนแรงจนเสียชีวิต",
    details: `ผู้ป่วยมีก้อนที่ชายโครงและก้อนในท้องที่มีขนาดใหญ่ขึ้น ร่วมกับกินอาหารได้น้อยลง น้ำหนักลด และมีอาการปวดท้องรุนแรง 
      แพทย์ทำการเจาะชิ้นเนื้อที่ตับโดยไม่ได้แจ้งข้อมูลและความเสี่ยงให้ครบถ้วน หลังทำหัตถการเกิดภาวะเลือดออกรุนแรงจนเสียชีวิต
      
      ประเด็นทางกฎหมายที่เกี่ยวข้อง:
      1. การละเมิดสิทธิผู้ป่วยในการให้ความยินยอม (Informed Consent)
      2. ความบกพร่องในการรักษาพยาบาล (Medical Negligence)
      3. การละเมิดจริยธรรมทางการแพทย์`,
    lawyerInterest: 2,
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
