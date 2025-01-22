import CaseDetailClient from "./case-detail-client";
import type { CaseData } from "./case-detail-client";

// Mock data for static paths - in a real app, this would come from your data source
const mockCases: CaseData[] = [
  {
    id: "1",
    title: "Surgical Complication Case",
    date: "2024-03-15",
    status: "reviewing",
    flag: "red",
    description:
      "Post-surgical complications following knee replacement surgery.",
    details: `Patient underwent knee replacement surgery on January 15, 2024. Following the procedure, 
      severe complications arose including infection and limited mobility. Multiple follow-up surgeries 
      were required to address these issues.`,
    lawyerInterest: 3,
    lastUpdate: "2 hours ago",
    timeline: [
      {
        date: "2024-03-15",
        event: "Case submitted",
        type: "submission",
      },
      {
        date: "2024-03-15",
        event: "AI analysis completed - Red flag assigned",
        type: "analysis",
      },
      {
        date: "2024-03-16",
        event: "First lawyer review received",
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
    ],
  },
  {
    id: "2",
    title: "Medication Error Case",
    date: "2024-03-14",
    status: "pending",
    flag: "yellow",
    description: "Incorrect medication dosage administered in hospital.",
    details:
      "Patient received incorrect medication dosage during hospital stay, leading to adverse reactions.",
    lawyerInterest: 2,
    lastUpdate: "1 day ago",
    timeline: [
      {
        date: "2024-03-14",
        event: "Case submitted",
        type: "submission",
      },
    ],
    interestedLawyers: [
      {
        id: 3,
        name: "David Smith",
        specialty: "Medical Malpractice",
        experience: "10 years",
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
