"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  FileText,
  User,
} from "lucide-react";
import Link from "next/link";
import { myCases, messages, timelines } from "./mock-data";

export default function VictimDashboard() {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "red":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "yellow":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "green":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
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
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold">My Dashboard</h1>
          <Button asChild>
            <Link href="/victim/onboarding">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start New Case
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="cases" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cases">My Cases</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {myCases.map((case_) => (
                    <Card key={case_.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {getSeverityIcon(case_.severity)}
                            <h3 className="font-semibold">{case_.title}</h3>
                            {getStatusBadge(case_.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {case_.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Last updated {case_.lastUpdate}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {case_.interestedLawyers} lawyer
                              {case_.interestedLawyers !== 1 ? "s" : ""}{" "}
                              interested
                            </div>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-sm font-semibold mb-2">
                              Next Steps:
                            </h4>
                            <ul className="space-y-1">
                              {case_.nextSteps.map((step, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-muted-foreground flex items-center gap-2"
                                >
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Button variant="outline" asChild>
                          <Link href={`/victim/cases/${case_.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{message.from}</h3>
                          <span className="text-sm text-muted-foreground">
                            {message.date}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{message.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {message.content}
                        </p>
                        {!message.read && (
                          <Badge variant="secondary">New</Badge>
                        )}
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
                  Case Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {myCases.map((case_) => (
                    <div key={case_.id}>
                      <h3 className="font-semibold mb-2">{case_.title}</h3>
                      <div className="grid gap-2">
                        {case_.documents.map((doc) => (
                          <Card key={doc.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {doc.type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {doc.dateUploaded}
                                </span>
                                <Badge
                                  variant={
                                    doc.status === "verified"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {doc.status.charAt(0).toUpperCase() +
                                    doc.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </Card>
                        ))}
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
  );
}
