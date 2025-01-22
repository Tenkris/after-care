'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CaseSubmitted() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  
  return (
    <div className="container mx-auto p-4 md:py-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Case Submitted Successfully</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {status === 'public' 
              ? 'Your case has been made public and is now visible to lawyers on our platform. They will be able to review your case and reach out if interested.'
              : 'Your case has been saved privately. You can review it anytime and choose to make it public later.'}
          </p>
          
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/victim/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
