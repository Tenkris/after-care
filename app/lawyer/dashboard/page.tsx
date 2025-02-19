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
  Scale,
  TrendingUp,
  DollarSign,
  Award,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";
import { newCases, activeCases, analyticsSummary } from "./mock-data";

export default function LawyerDashboard() {
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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Lawyer Dashboard</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button className="flex-1 sm:flex-none" variant="outline">
              Filter Cases
            </Button>
            <Button className="flex-1 sm:flex-none">New Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    Total Cases
                  </p>
                  <p className="text-lg md:text-2xl font-bold">
                    {analyticsSummary.totalCases}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    Success Rate
                  </p>
                  <p className="text-lg md:text-2xl font-bold">
                    {analyticsSummary.successRate}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    Avg. Settlement
                  </p>
                  <p className="text-lg md:text-2xl font-bold">
                    {analyticsSummary.averageSettlement}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    Recent Wins
                  </p>
                  <p className="text-lg md:text-2xl font-bold">
                    {analyticsSummary.recentWins}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="new-cases" className="space-y-4">
          <TabsList>
            <TabsTrigger value="new-cases">New Cases</TabsTrigger>
            <TabsTrigger value="active-cases">Active Cases</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="new-cases">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                  <div className="space-y-4">
                    {newCases.map((case_) => (
                      <Card key={case_.id} className="p-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              {getSeverityIcon(case_.severity)}
                              <h3 className="font-semibold">{case_.title}</h3>
                              {getStatusBadge(case_.status)}
                              <Badge
                                variant="outline"
                                className="hidden sm:inline-flex"
                              >
                                Match: {case_.matchScore}%
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {case_.description}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 shrink-0" />
                                <span className="truncate">
                                  Submitted: {case_.dateSubmitted}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 shrink-0" />
                                <span className="truncate">
                                  {case_.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4 shrink-0" />
                                <span className="truncate">
                                  Patient Age: {case_.patientAge}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full md:w-auto">
                            <Button
                              className="flex-1 md:flex-none"
                              variant="outline"
                            >
                              Details
                            </Button>
                            <Button className="flex-1 md:flex-none">
                              Review Case
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active-cases">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {activeCases.map((case_) => (
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 shrink-0" />
                              <span className="truncate">
                                Updated: {case_.lastUpdate}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 shrink-0" />
                              <span className="truncate">{case_.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4 shrink-0" />
                              <span className="truncate">
                                Patient Age: {case_.patientAge}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                          <Button
                            className="flex-1 md:flex-none"
                            variant="outline"
                          >
                            View Details
                          </Button>
                          <Button className="flex-1 md:flex-none">
                            Update Case
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground">
                  Detailed analytics dashboard coming soon.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
