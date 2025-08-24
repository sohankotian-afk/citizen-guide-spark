const languageMap: Record<string, string> = {
  hi: "Hindi",
  kn: "Kannada", 
  mr: "Marathi",
  bn: "Bengali",
  ta: "Tamil",
  te: "Telugu",
  ml: "Malayalam",
  gu: "Gujarati"
};

export async function translateMock(text: string, to: string): Promise<string> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const languageName = languageMap[to] || to;
  return `[Azure Translator MOCK → ${languageName}]: ${text}`;
}