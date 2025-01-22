'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, MessageSquare, AlertTriangle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';

// Mock data
const cases = [
  {
    id: 1,
    title: 'Surgical Complication Case',
    date: '2024-03-15',
    status: 'reviewing',
    flag: 'red',
    description: 'Post-surgical complications following knee replacement surgery.',
    lawyerInterest: 3,
    lastUpdate: '2 hours ago'
  },
  {
    id: 2,
    title: 'Medication Error Case',
    date: '2024-03-10',
    status: 'pending',
    flag: 'yellow',
    description: 'Incorrect medication dosage prescribed by physician.',
    lawyerInterest: 1,
    lastUpdate: '1 day ago'
  }
];

const getFlagIcon = (flag: string) => {
  switch (flag) {
    case 'red':
      return <XCircle className="h-4 w-4 text-destructive" />;
    case 'yellow':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'green':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'reviewing':
      return <Badge variant="secondary">Under Review</Badge>;
    case 'pending':
      return <Badge variant="outline">Pending</Badge>;
    case 'matched':
      return <Badge className="bg-green-500">Matched</Badge>;
    default:
      return null;
  }
};

export default function VictimDashboard() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold">My Dashboard</h1>
          <Button asChild>
            <Link href="/victim/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start New Case
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="cases" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cases">My Cases</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {cases.map((case_) => (
                      <Card key={case_.id} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              {getFlagIcon(case_.flag)}
                              <h3 className="font-semibold">{case_.title}</h3>
                              {getStatusBadge(case_.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">{case_.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Last updated {case_.lastUpdate}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {case_.lawyerInterest} lawyer{case_.lawyerInterest !== 1 ? 's' : ''} interested
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/victim/cases/${case_.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
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
                <p className="text-muted-foreground">No documents uploaded yet.</p>
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
                <p className="text-muted-foreground">No messages yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
