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
    title: "การเจาะชิ้นเนื้อที่ตับโดยไม่ได้แจ้งข้อมูลครบถ้วน",
    description:
      "คุณพ่อมีก้อนที่ชายโครงและในท้อง แพทย์ทำการเจาะชิ้นเนื้อที่ตับโดยไม่ได้แจ้งข้อมูลและความเสี่ยงให้ครบถ้วน ส่งผลให้เกิดภาวะเลือดออกรุนแรงจนเสียชีวิต",
    status: "reviewing",
    severity: "red",
    dateSubmitted: "2024-03-15",
    lastUpdate: "2024-03-18",
    type: "Informed Consent & Medical Negligence",
    interestedLawyers: 2,
    nextSteps: [
      "รวบรวมเวชระเบียน (Medical Records)",
      "เตรียมใบรายงานการผ่าตัด (Operation Note)",
      "รวบรวมผลตรวจทางห้องปฏิบัติการและภาพถ่ายรังสี",
      "จัดเตรียมบันทึกการพยาบาล",
      "รวบรวมใบเสร็จค่ารักษาพยาบาล",
      "รวบรวมใบเซ็นยินยอมการรักษา",
    ],
    documents: [
      {
        id: "doc1",
        name: "ใบรายงานการผ่าตัดและเจาะชิ้นเนื้อ",
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
        name: "ผลตรวจทางห้องปฏิบัติการและภาพถ่ายรังสี",
        type: "Lab Results",
        dateUploaded: "2024-03-16",
        status: "pending",
      },
      {
        id: "doc4",
        name: "บันทึกการพยาบาล ICU",
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
    subject: "การตรวจสอบคดี - การเจาะชิ้นเนื้อที่ตับโดยไม่ได้แจ้งข้อมูลครบถ้วน",
    content:
      "ดิฉันได้ตรวจสอบรายละเอียดคดีของคุณแล้ว และสนใจที่จะนัดปรึกษาเพื่อหารือเกี่ยวกับขั้นตอนต่อไป โดยเฉพาะประเด็นเรื่อง Informed Consent และการรักษาที่ผิดพลาด",
    date: "2024-03-18",
    read: false,
    caseId: "nc1",
  },

  {
    id: "msg3",
    from: "สมศักดิ์ รักความยุติธรรม",
    subject: "สนใจรับคดีการเจาะชิ้นเนื้อที่ตับ",
    content:
      "ผมมีประสบการณ์ด้านคดีละเมิดทางการแพทย์ โดยเฉพาะกรณี Medical Negligence และสนใจที่จะรับคดีของคุณ",
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
        title: "ส่งเรื่องเข้าระบบ",
        description:
          "ส่งรายละเอียดคดีและเอกสารเบื้องต้นเข้าสู่ระบบเพื่อการตรวจสอบ",
        type: "submission",
      },
      {
        id: "ev2",
        date: "2024-03-16",
        title: "อัปโหลดเอกสาร",
        description: "เพิ่มเอกสารทางการแพทย์และภาพถ่ายรังสีเข้าสู่ระบบ",
        type: "document",
      },
      {
        id: "ev3",
        date: "2024-03-18",
        title: "ทนายความสนใจ",
        description: "มีทนายความสองท่านแสดงความสนใจในการรับคดีของคุณ",
        type: "lawyer",
      },
    ],
  },
];
