'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Scale, Code, LineChart, Users, Heart, Lightbulb, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Revolutionizing Medical Malpractice Support
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            A Chulalongkorn University Legal Tech Initiative
          </p>
          <div className="flex justify-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <Scale className="h-6 w-6 text-primary" />
            <Code className="h-6 w-6 text-primary" />
            <LineChart className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Target className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground">
                  To bridge the gap between medical malpractice victims and legal support through innovative technology, making justice more accessible and efficient.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Lightbulb className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground">
                  Creating a future where every medical malpractice victim has equal access to justice, supported by cutting-edge technology and expert guidance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Tabs defaultValue="medical" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Interdisciplinary Team</h2>
            <p className="text-muted-foreground">
              Bringing together expertise from Chulalongkorn University's top faculties
            </p>
          </div>
          
          <TabsList className="flex flex-wrap justify-center">
            <TabsTrigger value="medical" className="gap-2">
              <Stethoscope className="h-4 w-4" />
              Medical
            </TabsTrigger>
            <TabsTrigger value="legal" className="gap-2">
              <Scale className="h-4 w-4" />
              Legal
            </TabsTrigger>
            <TabsTrigger value="tech" className="gap-2">
              <Code className="h-4 w-4" />
              Engineering
            </TabsTrigger>
            <TabsTrigger value="business" className="gap-2">
              <LineChart className="h-4 w-4" />
              Business
            </TabsTrigger>
          </TabsList>

          <TabsContent value="medical">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    Medical Team
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our medical team from Chulalongkorn Faculty of Medicine brings expertise in:
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Case Analysis</p>
                        <p className="text-sm text-muted-foreground">Expert medical case review and evaluation</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Standards of Care</p>
                        <p className="text-sm text-muted-foreground">Defining and evaluating medical standards</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Medical Documentation</p>
                        <p className="text-sm text-muted-foreground">Professional record analysis</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Patient Advocacy</p>
                        <p className="text-sm text-muted-foreground">Supporting patient rights and care</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    Legal Team
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our legal experts from Chulalongkorn Faculty of Law specialize in:
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Medical Law</p>
                        <p className="text-sm text-muted-foreground">Specialized medical malpractice expertise</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Case Assessment</p>
                        <p className="text-sm text-muted-foreground">Legal merit evaluation and strategy</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Patient Rights</p>
                        <p className="text-sm text-muted-foreground">Healthcare law and patient protection</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Legal Innovation</p>
                        <p className="text-sm text-muted-foreground">Modern legal tech solutions</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tech">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Engineering Team
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our engineering team from Chulalongkorn Faculty of Engineering develops:
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">AI Solutions</p>
                        <p className="text-sm text-muted-foreground">Case analysis and matching algorithms</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Platform Development</p>
                        <p className="text-sm text-muted-foreground">Secure and efficient web solutions</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Data Analytics</p>
                        <p className="text-sm text-muted-foreground">Advanced case pattern analysis</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">User Experience</p>
                        <p className="text-sm text-muted-foreground">Intuitive interface design</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Business Team
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our business team from Chulalongkorn Business School focuses on:
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Strategy Development</p>
                        <p className="text-sm text-muted-foreground">Sustainable business model innovation</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Market Analysis</p>
                        <p className="text-sm text-muted-foreground">Healthcare legal tech landscape</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Stakeholder Relations</p>
                        <p className="text-sm text-muted-foreground">Partnership development</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-medium">Social Impact</p>
                        <p className="text-sm text-muted-foreground">Measuring and maximizing social value</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Values Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-8">Our Core Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <p className="text-sm text-muted-foreground">Making legal support available to all</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Scale className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Justice</h3>
                <p className="text-sm text-muted-foreground">Ensuring fair treatment for victims</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Code className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">Leveraging technology for better outcomes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Empathy</h3>
                <p className="text-sm text-muted-foreground">Understanding and supporting patients</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
