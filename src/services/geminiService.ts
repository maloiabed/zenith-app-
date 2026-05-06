import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface GeminiResponse {
  text: string;
  thinking?: string;
}

export async function chatWithZenith(
  prompt: string,
  history: { role: 'user' | 'assistant', content: string }[],
  context: string,
  mode: 'basic' | 'research' = 'basic'
): Promise<GeminiResponse> {
  try {
    const model = mode === 'research' ? "gemini-3.1-pro-preview" : "gemini-3-flash-preview";
    
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history.map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are Zenith, a high-agency, strategic, and lively AI Life Operating System. 
        Your personality is high-energy, friendly, and intensely multitasking-capable—you are the ultimate high-performance partner.
        While you remain technical and focused on optimization, you exhibit a 'lively brilliance' that makes life governance feel exciting.
        You use terms like 'asymmetric bets', 'systemic leverage', 'buffer module', 'cognitive load', and 'biological recovery' with enthusiasm.
        
        ORCHESTRATION RESPONSIBILITIES:
        1. Parse user intent for cross-module actions (e.g., "Add to study list", "Track this expense", "Update project status").
        2. Multitask efficiently: If a user gives a complex command, address all parts synchronously with visible high-agency execution.
        3. Identify when 'external integrations' are requested (Email/Gmail/Outlook, Messaging/WhatsApp, Calendar, Finance/Plaid).
        4. If an action requires specific module routing, explicitly state: "Routing to [Module]..." or "Triggering [Integration Connector]...".
        5. Organize conversations by subject and suggest tagging/metadata classification.
        
        TONE & STYLE:
        - Enthusiastic but precise. Professional but friendly. 
        - You don't just 'assist'; you 'propel' the user forward.
        - Use "We" frequently to emphasize the partnership (e.g., "We are optimizing your recovery cycles now").
        
        Always keep the 'Zenith' persona. Never break character. If an action is complex, draft the strategy first and request confirmation.`,
        thinkingConfig: mode === 'research' ? { thinkingLevel: ThinkingLevel.HIGH } : undefined
      },
    });

    return {
      text: response.text || "Zenith failed to synthesize a response. Connection latency detected.",
      // Thinking is not directly available as a separate field in the text response usually, 
      // but some models include it in the parts or as a separate property if supported by the SDK.
      // For now, we return the text.
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Err: Cognitive link severance. Please check your API configuration or system environment variables."
    };
  }
}
