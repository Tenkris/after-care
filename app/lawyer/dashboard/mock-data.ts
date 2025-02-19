export interface LawyerCase {
  id: string;
  title: string;
  description: string;
  status: "new" | "in_progress" | "closed";
  severity: "high" | "medium" | "low";
  dateSubmitted: string;
  lastUpdate: string;
  type: string;
  location: string;
  matchScore: number;
  patientAge?: number;
  nextSteps?: string[];
  documents?: Document[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  dateUploaded: string;
  status: "pending" | "verified" | "rejected";
}

export const newCases: LawyerCase[] = [
  {
    id: "nc1",
    title: "ผ่าตัดไส้ติ่งโดยไม่ได้รับการยินยอม",
    description:
      "แพทย์ทำการผ่าตัดไส้ติ่งโดยไม่ได้แจ้งและขอความยินยอมก่อน ส่งผลให้เกิดภาวะแทรกซ้อนหลังผ่าตัด",
    status: "new",
    severity: "high",
    dateSubmitted: "2024-03-15",
    lastUpdate: "2024-03-18",
    type: "Informed Consent & Surgical Error",
    location: "กรุงเทพมหานคร",
    matchScore: 95,
    patientAge: 35,
    documents: [
      {
        id: "doc1",
        name: "ใบรายงานการผ่าตัด",
        type: "Operation Note",
        dateUploaded: "2024-03-15",
        status: "verified",
      },
      {
        id: "doc2",
        name: "เวชระเบียน",
        type: "Medical Record",
        dateUploaded: "2024-03-16",
        status: "verified",
      },
    ],
  },
  {
    id: "nc2",
    title: "วินิจฉัยมะเร็งล่าช้า",
    description:
      "แพทย์วินิจฉัยมะเร็งล่าช้าเป็นเวลา 6 เดือน ทำให้โรคลุกลามรุนแรง",
    status: "new",
    severity: "high",
    dateSubmitted: "2024-03-17",
    lastUpdate: "2024-03-17",
    type: "Diagnostic Error",
    location: "เชียงใหม่",
    matchScore: 88,
    patientAge: 45,
  },
];

export const activeCases: LawyerCase[] = [
  {
    id: "ac1",
    title: "ความผิดพลาดในการคลอด",
    description: "ทารกได้รับบาดเจ็บระหว่างการคลอด ส่งผลให้เกิดภาวะสมองพิการ",
    status: "in_progress",
    severity: "high",
    dateSubmitted: "2024-02-15",
    lastUpdate: "2024-03-18",
    type: "Birth Injury",
    location: "ขอนแก่น",
    matchScore: 92,
    patientAge: 0,
    nextSteps: [
      "ตรวจสอบเวชระเบียนเพิ่มเติม",
      "นัดปรึกษาผู้เชี่ยวชาญ",
      "เตรียมเอกสารเรียกร้องค่าเสียหาย",
    ],
    documents: [
      {
        id: "doc1",
        name: "บันทึกการคลอด",
        type: "Medical Record",
        dateUploaded: "2024-03-15",
        status: "verified",
      },
      {
        id: "doc2",
        name: "รายงานผู้เชี่ยวชาญ",
        type: "Expert Report",
        dateUploaded: "2024-03-16",
        status: "pending",
      },
    ],
  },
];

export interface Timeline {
  caseId: string;
  events: TimelineEvent[];
}

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "submission" | "update" | "document" | "client" | "status";
}

export const timelines: Timeline[] = [
  {
    caseId: "nc1",
    events: [
      {
        id: "ev1",
        date: "2024-03-15",
        title: "รับคดีใหม่",
        description: "ได้รับข้อมูลคดีและเอกสารประกอบการพิจารณา",
        type: "submission",
      },
      {
        id: "ev2",
        date: "2024-03-16",
        title: "ตรวจสอบเอกสาร",
        description: "ตรวจสอบเวชระเบียนและใบรายงานการผ่าตัด",
        type: "document",
      },
      {
        id: "ev3",
        date: "2024-03-18",
        title: "แสดงความสนใจรับคดี",
        description: "ส่งข้อเสนอรับคดีให้ผู้เสียหาย",
        type: "status",
      },
    ],
  },
];

export const analyticsSummary = {
  totalCases: 25,
  recentWins: 12,
};
