export interface VictimCase {
  id: string;
  title: string;
  description: string;
  status: 'reviewing' | 'pending' | 'matched' | 'in_progress' | 'closed';
  severity: 'red' | 'yellow' | 'green';
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
  status: 'pending' | 'verified' | 'rejected';
}

export const myCases: VictimCase[] = [
  {
    id: "vc1",
    title: "Post-Surgery Complications",
    description: "Severe infection and complications following knee replacement surgery.",
    status: "reviewing",
    severity: "red",
    dateSubmitted: "2024-03-15",
    lastUpdate: "2024-03-18",
    type: "Surgical Error",
    interestedLawyers: 3,
    nextSteps: [
      "Upload recent medical records",
      "Schedule consultation with interested lawyer",
      "Gather pre-surgery documentation"
    ],
    documents: [
      {
        id: "doc1",
        name: "Surgery Report",
        type: "Medical Record",
        dateUploaded: "2024-03-15",
        status: "verified"
      },
      {
        id: "doc2",
        name: "Post-Op Photos",
        type: "Image",
        dateUploaded: "2024-03-16",
        status: "pending"
      }
    ]
  },
  {
    id: "vc2",
    title: "Medication Reaction",
    description: "Allergic reaction to prescribed medication despite documented allergies.",
    status: "matched",
    severity: "yellow",
    dateSubmitted: "2024-03-10",
    lastUpdate: "2024-03-17",
    type: "Medication Error",
    interestedLawyers: 2,
    nextSteps: [
      "Complete medical release forms",
      "Provide pharmacy records",
      "Document ongoing symptoms"
    ],
    documents: [
      {
        id: "doc3",
        name: "Prescription Records",
        type: "Medical Record",
        dateUploaded: "2024-03-10",
        status: "verified"
      }
    ]
  },
  {
    id: "vc3",
    title: "Misdiagnosed Fracture",
    description: "Wrist fracture missed on initial ER visit leading to complications.",
    status: "in_progress",
    severity: "yellow",
    dateSubmitted: "2024-03-05",
    lastUpdate: "2024-03-16",
    type: "Diagnostic Error",
    interestedLawyers: 1,
    nextSteps: [
      "Collect follow-up x-rays",
      "Document work limitations",
      "Schedule follow-up with orthopedist"
    ],
    documents: [
      {
        id: "doc4",
        name: "ER Records",
        type: "Medical Record",
        dateUploaded: "2024-03-05",
        status: "verified"
      },
      {
        id: "doc5",
        name: "Follow-up X-rays",
        type: "Image",
        dateUploaded: "2024-03-15",
        status: "pending"
      }
    ]
  }
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
    subject: "Case Review Update - Post-Surgery Complications",
    content: "I've reviewed your case details and would like to schedule a consultation to discuss further steps.",
    date: "2024-03-18",
    read: false,
    caseId: "vc1"
  },
  {
    id: "msg2",
    from: "Medical Records Department",
    subject: "Document Verification Complete",
    content: "Your submitted medical records have been verified and added to your case file.",
    date: "2024-03-17",
    read: true,
    caseId: "vc1"
  },
  {
    id: "msg3",
    from: "David Miller, Esq.",
    subject: "Interest in Your Case - Medication Error",
    content: "I specialize in medication error cases and would like to discuss your situation.",
    date: "2024-03-16",
    read: false,
    caseId: "vc2"
  }
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
  type: 'submission' | 'update' | 'document' | 'lawyer' | 'status';
}

export const timelines: Timeline[] = [
  {
    caseId: "vc1",
    events: [
      {
        id: "ev1",
        date: "2024-03-15",
        title: "Case Submitted",
        description: "Initial case details and documentation submitted for review.",
        type: "submission"
      },
      {
        id: "ev2",
        date: "2024-03-16",
        title: "Documents Uploaded",
        description: "Post-operative photos added to case file.",
        type: "document"
      },
      {
        id: "ev3",
        date: "2024-03-18",
        title: "Lawyer Interest",
        description: "Three lawyers have expressed interest in your case.",
        type: "lawyer"
      }
    ]
  }
];
