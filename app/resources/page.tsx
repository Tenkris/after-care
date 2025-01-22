import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Scale, FileText, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What is medical malpractice?",
    answer: "Medical malpractice occurs when a healthcare provider's negligence leads to patient injury or harm. This happens when the care provided falls below the accepted standard of medical practice and results in injury, worsened condition, or death."
  },
  {
    question: "How do I know if I have a medical malpractice case?",
    answer: "A valid medical malpractice case typically requires four elements: 1) A doctor-patient relationship existed, 2) The doctor was negligent, 3) The negligence caused an injury, and 4) The injury led to specific damages."
  },
  {
    question: "What is the statute of limitations for medical malpractice?",
    answer: "The statute of limitations varies by state but typically ranges from 1-3 years from the date of injury or from when the injury was discovered. It's important to consult with a lawyer as soon as possible to understand the deadlines that apply to your case."
  },
  {
    question: "What types of damages can I recover?",
    answer: "You may be able to recover economic damages (medical bills, lost wages) and non-economic damages (pain and suffering, emotional distress). In some cases, punitive damages may also be available."
  }
];

const legalTerms = [
  {
    term: "Standard of Care",
    definition: "The level of care that a reasonably competent healthcare provider would have provided under similar circumstances."
  },
  {
    term: "Negligence",
    definition: "Failure to provide care that meets the accepted standard of medical practice."
  },
  {
    term: "Informed Consent",
    definition: "A patient's agreement to medical treatment after understanding the risks and benefits."
  },
  {
    term: "Causation",
    definition: "The direct link between a healthcare provider's negligence and the patient's injury."
  }
];

const evidenceTypes = [
  {
    title: "Medical Records",
    description: "Complete records of your treatment, including doctor's notes, test results, and prescriptions."
  },
  {
    title: "Expert Testimony",
    description: "Statements from medical experts about the standard of care and how it was breached."
  },
  {
    title: "Documentation of Damages",
    description: "Bills, receipts, and records showing financial losses and medical expenses."
  },
  {
    title: "Witness Statements",
    description: "Accounts from family members, friends, or healthcare workers about your condition."
  }
];

export default function Resources() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Legal Resources</h1>
          <p className="text-muted-foreground">
            Essential information about medical malpractice cases
          </p>
        </div>

        <Tabs defaultValue="guide" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="guide" className="flex gap-2">
              <BookOpen className="h-4 w-4" />
              Guide
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex gap-2">
              <Scale className="h-4 w-4" />
              Legal Terms
            </TabsTrigger>
            <TabsTrigger value="evidence" className="flex gap-2">
              <FileText className="h-4 w-4" />
              Evidence Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Medical Malpractice</CardTitle>
                <CardDescription>
                  A comprehensive guide to medical malpractice cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    <section>
                      <h3 className="text-lg font-semibold mb-2">What Constitutes Medical Malpractice?</h3>
                      <p className="text-muted-foreground">
                        Medical malpractice occurs when a healthcare provider's negligence results in injury or harm to a patient. This can happen through various forms of medical errors, including misdiagnosis, surgical mistakes, medication errors, or failure to provide appropriate treatment.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">Key Elements of a Case</h3>
                      <div className="space-y-2">
                        <p className="text-muted-foreground">To prove medical malpractice, four key elements must be established:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Duty: A doctor-patient relationship existed</li>
                          <li>Breach: The provider failed to meet the standard of care</li>
                          <li>Causation: This failure directly caused harm</li>
                          <li>Damages: The harm resulted in specific damages</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">The Legal Process</h3>
                      <p className="text-muted-foreground">
                        Medical malpractice cases typically follow these steps:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 mt-2 text-muted-foreground">
                        <li>Initial consultation with a lawyer</li>
                        <li>Investigation and gathering of medical records</li>
                        <li>Expert review of the case</li>
                        <li>Filing of the lawsuit</li>
                        <li>Discovery phase</li>
                        <li>Negotiations or trial</li>
                      </ol>
                    </section>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions about medical malpractice cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle>Legal Terminology</CardTitle>
                <CardDescription>
                  Important terms used in medical malpractice cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {legalTerms.map((term, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-semibold mb-1">{term.term}</h3>
                      <p className="text-muted-foreground">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence">
            <Card>
              <CardHeader>
                <CardTitle>Evidence Guide</CardTitle>
                <CardDescription>
                  Types of evidence needed for medical malpractice cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {evidenceTypes.map((evidence, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-semibold">{evidence.title}</h3>
                      <p className="text-muted-foreground">{evidence.description}</p>
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
