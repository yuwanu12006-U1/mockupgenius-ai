import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

// Initialize Gemini Client
// IMPORTANT: Using the specific Nano Banana model requested: gemini-2.5-flash-image
const MODEL_NAME = 'gemini-2.5-flash-image';

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found in environment variables");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateMockup = async (
  imageBase64: string,
  prompt: string,
  aspectRatio: AspectRatio
): Promise<string> => {
  const client = getClient();

  // Strip prefix if present (e.g., "data:image/png;base64,")
  const base64Data = imageBase64.split(',')[1] || imageBase64;
  
  // Detect mime type roughly (defaulting to png if unknown, though usually handled by split)
  const mimeType = imageBase64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0] || 'image/png';

  try {
    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          // imageSize is NOT supported by gemini-2.5-flash-image, only Pro.
        },
      },
    });

    // Parse response for image
    // The model might return text if it refuses, or multiple parts.
    // We look for inlineData.
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated. The model might have refused the request or returned only text.");

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};