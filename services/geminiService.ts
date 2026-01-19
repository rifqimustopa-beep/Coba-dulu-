
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

export const analyzeMustahik = async (data: any): Promise<AIAnalysisResult> => {
  // Always use the API key directly from the environment variable
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analyze this potential zakat recipient (mustahik) data and provide a verification report based on Sharia principles (8 Asnaf). 
  Data: ${JSON.stringify(data)}
  
  Please evaluate the eligibility score (0-100), give a clear recommendation, provide reasoning points, and suggest the best BAZNAS program (Jambi Cerdas, Jambi Sehat, Jambi Makmur, Jambi Takwa, or Jambi Peduli).`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          eligibilityScore: { type: Type.NUMBER, description: "0 to 100 percentage" },
          recommendation: { type: Type.STRING, description: "Short overall verdict" },
          reasoning: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of reasons for the decision"
          },
          suggestedProgram: { type: Type.STRING, description: "One of the Jambi programs" }
        },
        required: ["eligibilityScore", "recommendation", "reasoning", "suggestedProgram"]
      }
    }
  });

  // Extracting text output via the .text property getter
  return JSON.parse(response.text || '{}') as AIAnalysisResult;
};