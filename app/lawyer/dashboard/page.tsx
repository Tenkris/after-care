'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LawyerDashboard() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold">Lawyer Dashboard</h1>
        </div>

        <Tabs defaultValue="new-cases" className="space-y-4">
          <TabsList className="w-full sm:w-auto flex justify-start overflow-x-auto">
            <TabsTrigger value="new-cases" className="flex-1 sm:flex-none">New Cases</TabsTrigger>
            <TabsTrigger value="my-cases" className="flex-1 sm:flex-none">My Cases</TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1 sm:flex-none">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="new-cases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Available Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No new cases available at the moment.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-cases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">My Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">You haven't accepted any cases yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Case Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
