import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { translateMock } from "@/services/azureTranslator.mock";
import { Loader2 } from "lucide-react";

const languages = [
  { code: "hi", name: "Hindi" },
  { code: "kn", name: "Kannada" },
  { code: "mr", name: "Marathi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "gu", name: "Gujarati" }
];

export function AzureTranslatorDemo() {
  const [inputText, setInputText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim() || !targetLanguage) return;

    setIsLoading(true);
    try {
      const result = await translateMock(inputText, targetLanguage);
      setTranslatedText(result);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Error occurred during translation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Azure (Mock) Translator Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="input-text" className="block text-sm font-medium mb-2">
            Enter text to translate:
          </label>
          <Textarea
            id="input-text"
            placeholder="Type your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="target-language" className="block text-sm font-medium mb-2">
            Select target language:
          </label>
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleTranslate} 
          disabled={!inputText.trim() || !targetLanguage || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Translating...
            </>
          ) : (
            "Translate (Mock Azure)"
          )}
        </Button>

        {translatedText && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Translation result:
            </label>
            <div className="p-3 bg-muted rounded-md border">
              <p className="text-sm">{translatedText}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}