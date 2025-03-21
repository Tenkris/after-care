"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartPulse, Scale } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultType = searchParams.get("type") || "victim";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState(defaultType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirect based on active tab
    if (activeTab === "victim") {
      router.push("/victim/onboarding");
    } else {
      router.push("/lawyer/dashboard");
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <HeartPulse className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to AfterCare
          </CardTitle>
          <CardDescription className="text-center">
            Choose your account type to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={defaultType}
            className="space-y-4"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="victim" className="gap-2">
                <HeartPulse className="h-4 w-4" />
                Patient
              </TabsTrigger>
              <TabsTrigger value="lawyer" className="gap-2">
                <Scale className="h-4 w-4" />
                Lawyer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="victim">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="victim-email">Email</Label>
                  <Input
                    id="victim-email"
                    type="email"
                    placeholder="patient@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="victim-password">Password</Label>
                  <Input
                    id="victim-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as Patient
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="lawyer">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lawyer-email">Email</Label>
                  <Input
                    id="lawyer-email"
                    type="email"
                    placeholder="lawyer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lawyer-password">Password</Label>
                  <Input
                    id="lawyer-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as Lawyer
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Button variant="link" className="p-0 h-auto font-normal">
              Register here
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
