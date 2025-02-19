export interface VictimCase {
  id: string;
  title: string;
  description: string;
  status: "reviewing" | "pending" | "matched" | "in_progress" | "closed";
  severity: "red" | "yellow" | "green";
  dateSubmitted: string;
  lastUpdate: string;
  type: string;
  interestedLawyers: number;
  nextSteps: string[];
  documents: Document[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  dateUploaded: string;
  status: "pending" | "verified" | "rejected";
}

export const myCases: VictimCase[] = [
  {
    id: "vc1",
    title: "ผ่าตัดไส้ติ่งโดยไม่ได้รับการยินยอม",
    description:
      "แพทย์ทำการผ่าตัดไส้ติ่งโดยไม่ได้แจ้งและขอความยินยอมก่อน ส่งผลให้เกิดภาวะแทรกซ้อนหลังผ่าตัด",
    status: "reviewing",
    severity: "red",
    dateSubmitted: "2024-03-15",
    lastUpdate: "2024-03-18",
    type: "Informed Consent & Surgical Error",
    interestedLawyers: 2,
    nextSteps: [
      "รวบรวมเวชระเบียน (Medical Records)",
      "เตรียมใบรายงานการผ่าตัด (Operation Note)",
      "รวบรวมผลตรวจทางห้องปฏิบัติการ",
      "จัดเตรียมบันทึกการพยาบาล",
      "รวบรวมใบเสร็จค่ารักษาพยาบาล",
    ],
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
      {
        id: "doc3",
        name: "ผลตรวจทางห้องปฏิบัติการ",
        type: "Lab Results",
        dateUploaded: "2024-03-16",
        status: "pending",
      },
      {
        id: "doc4",
        name: "บันทึกการพยาบาล",
        type: "Nursing Record",
        dateUploaded: "2024-03-17",
        status: "pending",
      },
    ],
  },
];

export interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  caseId: string;
}

export const messages: Message[] = [
  {
    id: "msg1",
    from: "Sarah Johnson, Esq.",
    subject: "การตรวจสอบคดี - ผ่าตัดไส้ติ่งโดยไม่ได้รับความยินยอม",
    content:
      "ดิฉันได้ตรวจสอบรายละเอียดคดีของคุณแล้ว และสนใจที่จะนัดปรึกษาเพื่อหารือเกี่ยวกับขั้นตอนต่อไป โดยเฉพาะประเด็นเรื่อง Informed Consent",
    date: "2024-03-18",
    read: false,
    caseId: "nc1",
  },

  {
    id: "msg3",
    from: "สมศักดิ์ รักความยุติธรรม",
    subject: "สนใจรับคดีผ่าตัดไส้ติ่ง",
    content:
      "ผมมีประสบการณ์ด้านคดีละเมิดทางการแพทย์ โดยเฉพาะกรณี Informed Consent และสนใจที่จะรับคดีของคุณ",
    date: "2024-03-16",
    read: false,
    caseId: "nc1",
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
  type: "submission" | "update" | "document" | "lawyer" | "status";
}

export const timelines: Timeline[] = [
  {
    caseId: "vc1",
    events: [
      {
        id: "ev1",
        date: "2024-03-15",
        title: "Case Submitted",
        description:
          "Initial case details and documentation submitted for review.",
        type: "submission",
      },
      {
        id: "ev2",
        date: "2024-03-16",
        title: "Documents Uploaded",
        description: "Post-operative photos added to case file.",
        type: "document",
      },
      {
        id: "ev3",
        date: "2024-03-18",
        title: "Lawyer Interest",
        description: "Three lawyers have expressed interest in your case.",
        type: "lawyer",
      },
    ],
  },
];
