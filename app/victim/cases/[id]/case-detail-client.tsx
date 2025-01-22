"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Upload,
  User,
} from "lucide-react";

interface Lawyer {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  status: string;
}

interface TimelineEvent {
  date: string;
  event: string;
  type: string;
}

export interface CaseData {
  id: string;
  title: string;
  date: string;
  status: string;
  flag: string;
  description: string;
  details: string;
  lawyerInterest: number;
  lastUpdate: string;
  timeline: TimelineEvent[];
  interestedLawyers: Lawyer[];
}

const getFlagIcon = (flag: string) => {
  switch (flag) {
    case "red":
      return <XCircle className="h-5 w-5 text-destructive" />;
    case "yellow":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "green":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "reviewing":
      return <Badge variant="secondary">Under Review</Badge>;
    case "pending":
      return <Badge variant="outline">Pending</Badge>;
    case "matched":
      return <Badge className="bg-green-500">Matched</Badge>;
    default:
      return null;
  }
};

export default function CaseDetailClient({ caseData }: { caseData: CaseData }) {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getFlagIcon(caseData.flag)}
                    <CardTitle>{caseData.title}</CardTitle>
                    {getStatusBadge(caseData.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Last updated {caseData.lastUpdate}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Button>
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Lawyers
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{caseData.details}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="timeline" className="space-y-4">
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="lawyers">Interested Lawyers</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Case Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {caseData.timeline.map((event, index) => (
                        <div
                          key={index}
                          className="flex gap-4 pb-4 border-b last:border-0"
                        >
                          <div className="w-32 flex-shrink-0 text-sm text-muted-foreground">
                            {event.date}
                          </div>
                          <div>
                            <p>{event.event}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lawyers">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interested Lawyers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.interestedLawyers.map((lawyer) => (
                      <Card key={lawyer.id} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="rounded-full bg-primary/10 p-2">
                              <User className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{lawyer.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {lawyer.specialty} • {lawyer.experience}{" "}
                                experience
                              </p>
                              <Badge variant="secondary" className="mt-2">
                                {lawyer.status}
                              </Badge>
                            </div>
                          </div>
                          <Button size="sm">View Profile</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No documents uploaded yet.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
