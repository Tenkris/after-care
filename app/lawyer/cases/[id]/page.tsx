"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  User,
  FileText,
  MessageSquareText,
  Scale,
} from "lucide-react";
import { newCases, timelines } from "../../dashboard/mock-data";

export default function CaseReview({ params }: { params: { id: string } }) {
  const router = useRouter();
  const caseData = newCases.find((c) => c.id === params.id);
  const timeline = timelines.find((t) => t.caseId === params.id);

  if (!caseData) {
    return <div>Case not found</div>;
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="secondary">New</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return null;
    }
  };

  const handleChatClick = () => {
    router.push(`/lawyer/chat?caseId=${params.id}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Case Review</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              className="flex-1 sm:flex-none"
              variant="outline"
              onClick={handleChatClick}
            >
              <MessageSquareText className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Case Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {getSeverityIcon(caseData.severity)}
                  <h3 className="font-semibold">{caseData.title}</h3>
                  {getStatusBadge(caseData.status)}
                  <Badge variant="outline">Match: {caseData.matchScore}%</Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {caseData.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span className="truncate">
                      Submitted: {caseData.dateSubmitted}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="truncate">{caseData.location}</span>
                  </div>
                  {caseData.patientAge && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        Patient Age: {caseData.patientAge}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="documents" className="space-y-4">
            <TabsList>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Case Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.documents?.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • Uploaded: {doc.dateUploaded}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            doc.status === "verified"
                              ? "default"
                              : doc.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Case Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeline?.events.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-3 border rounded-lg"
                      >
                        <div className="mt-1">
                          <Scale className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
