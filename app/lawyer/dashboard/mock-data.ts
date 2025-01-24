export interface Case {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'in_progress' | 'closed';
  severity: 'high' | 'medium' | 'low';
  patientAge: number;
  dateSubmitted: string;
  lastUpdate: string;
  type: string;
  location: string;
  potentialValue: string;
  matchScore: number;
  nextSteps?: string[];
  documents?: Document[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  dateUploaded: string;
  status: 'pending' | 'verified' | 'rejected';
}

export const newCases: Case[] = [
  {
    id: "nc1",
    title: "Surgical Error - Hip Replacement",
    description: "Patient experienced severe complications after hip replacement surgery due to improper surgical technique.",
    status: "new",
    severity: "high",
    patientAge: 65,
    dateSubmitted: "2024-03-18",
    lastUpdate: "2024-03-18",
    type: "Surgical Malpractice",
    location: "Boston, MA",
    potentialValue: "$500,000 - $750,000",
    matchScore: 92
  },
  {
    id: "nc2",
    title: "Delayed Cancer Diagnosis",
    description: "Multiple missed opportunities to diagnose breast cancer over 18-month period leading to advanced stage diagnosis.",
    status: "new",
    severity: "high",
    patientAge: 45,
    dateSubmitted: "2024-03-17",
    lastUpdate: "2024-03-17",
    type: "Diagnostic Error",
    location: "Chicago, IL",
    potentialValue: "$1,000,000+",
    matchScore: 88
  },
  {
    id: "nc3",
    title: "Medication Error in Hospital",
    description: "Patient given incorrect medication dosage leading to severe adverse reaction.",
    status: "new",
    severity: "medium",
    patientAge: 52,
    dateSubmitted: "2024-03-16",
    lastUpdate: "2024-03-16",
    type: "Medication Error",
    location: "Seattle, WA",
    potentialValue: "$250,000 - $400,000",
    matchScore: 85
  }
];

export const activeCases: Case[] = [
  {
    id: "ac1",
    title: "Birth Injury Case",
    description: "Complications during delivery resulting in cerebral palsy.",
    status: "in_progress",
    severity: "high",
    patientAge: 1,
    dateSubmitted: "2024-02-15",
    lastUpdate: "2024-03-18",
    type: "Birth Injury",
    location: "Miami, FL",
    potentialValue: "$2,000,000+",
    matchScore: 95,
    nextSteps: [
      "Review new medical records",
      "Schedule expert consultation",
      "Prepare settlement demand"
    ],
    documents: [
      {
        id: "doc1",
        name: "Medical Records",
        type: "PDF",
        dateUploaded: "2024-03-15",
        status: "verified"
      },
      {
        id: "doc2",
        name: "Expert Report",
        type: "PDF",
        dateUploaded: "2024-03-16",
        status: "pending"
      }
    ]
  },
  {
    id: "ac2",
    title: "Emergency Room Negligence",
    description: "Failure to diagnose heart attack symptoms leading to cardiac damage.",
    status: "in_progress",
    severity: "high",
    patientAge: 58,
    dateSubmitted: "2024-02-20",
    lastUpdate: "2024-03-17",
    type: "Emergency Care",
    location: "Houston, TX",
    potentialValue: "$750,000 - $1,000,000",
    matchScore: 90,
    nextSteps: [
      "Follow up with cardiology expert",
      "Request additional ER records",
      "Schedule client meeting"
    ],
    documents: [
      {
        id: "doc3",
        name: "ER Records",
        type: "PDF",
        dateUploaded: "2024-03-10",
        status: "verified"
      },
      {
        id: "doc4",
        name: "Patient Statement",
        type: "PDF",
        dateUploaded: "2024-03-12",
        status: "verified"
      }
    ]
  },
  {
    id: "ac3",
    title: "Surgical Instrument Error",
    description: "Retained surgical instrument discovered after abdominal surgery.",
    status: "in_progress",
    severity: "medium",
    patientAge: 42,
    dateSubmitted: "2024-02-25",
    lastUpdate: "2024-03-16",
    type: "Surgical Error",
    location: "Phoenix, AZ",
    potentialValue: "$400,000 - $600,000",
    matchScore: 88,
    nextSteps: [
      "Obtain follow-up surgery records",
      "Document additional procedures",
      "Calculate medical expenses"
    ],
    documents: [
      {
        id: "doc5",
        name: "Surgical Notes",
        type: "PDF",
        dateUploaded: "2024-03-14",
        status: "verified"
      }
    ]
  }
];

export interface AnalyticsSummary {
  totalCases: number;
  activeCases: number;
  successRate: number;
  averageSettlement: string;
  recentWins: number;
  pendingSettlements: number;
}

export const analyticsSummary: AnalyticsSummary = {
  totalCases: 45,
  activeCases: 12,
  successRate: 85,
  averageSettlement: "$850,000",
  recentWins: 3,
  pendingSettlements: 5
};
