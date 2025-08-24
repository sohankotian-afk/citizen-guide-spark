import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, MessageCircle, ArrowLeft, ExternalLink } from "lucide-react";
import { FAQ as FAQType } from "@/types";
import { faqData } from "@/data/mockData";

interface FAQProps {
  onBack: () => void;
  onOpenGuide?: (documentType: string) => void;
}

export function FAQ({ onBack, onOpenGuide }: FAQProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqData.map(faq => faq.category)));

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'aadhaar': 'bg-primary text-primary-foreground',
      'pan': 'bg-success text-success-foreground',
      'voting': 'bg-accent text-accent-foreground',
      'general': 'bg-muted text-muted-foreground'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Find quick answers to common questions about identity documents</p>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-gradient-primary" : ""}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gradient-primary" : ""}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            {filteredFAQs.length} Question{filteredFAQs.length !== 1 ? 's' : ''} Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No questions found matching your search.</p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{faq.question}</h3>
                      </div>
                      <Badge className={getCategoryColor(faq.category)} variant="secondary">
                        {faq.category}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-2 space-y-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                      
                      {faq.relatedDocuments.length > 0 && (
                        <div className="border-t pt-4">
                          <p className="text-sm font-medium text-foreground mb-2">Related Documents:</p>
                          <div className="flex flex-wrap gap-2">
                            {faq.relatedDocuments.map((doc) => (
                              <Button
                                key={doc}
                                variant="outline"
                                size="sm"
                                onClick={() => onOpenGuide?.(doc)}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                {doc.charAt(0).toUpperCase() + doc.slice(1)} Guide
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-gradient-subtle border-primary">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Still have questions?</h3>
            <p className="text-sm text-muted-foreground">
              Can't find what you're looking for? Visit the official government websites for more detailed information.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button asChild variant="outline">
                <a href="https://uidai.gov.in/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  UIDAI (Aadhaar)
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Income Tax (PAN)
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://www.nvsp.in/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  NVSP (Voter ID)
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}