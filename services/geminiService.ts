
import { GoogleGenAI } from "@google/genai";

const getModelForTier = async () => {
  if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
    try {
      const isPro = await window.aistudio.hasSelectedApiKey();
      return isPro ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    } catch (e) {
      return 'gemini-3-flash-preview';
    }
  }
  return 'gemini-3-flash-preview';
};

export const getMedicalOrientation = async (prompt: string, history: { role: string; text: string }[]) => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY não configurada.");
    return "O serviço de orçamento inteligente está temporariamente instável. Por favor, clique no botão de WhatsApp para falar direto com nossa equipe em SP.";
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelName = await getModelForTier();
  
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        ...history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.text }] 
        })),
        { parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Você é o Coordenador Técnico da OBRA LIMPA SP (obralimpa.sp).
        Sua função é gerar orçamentos estimativos e fornecer orientação técnica especializada para serviços de Limpeza Pós-Obra, Dedetização e Caçambas.

        REGRAS DE CONTEÚDO SEO LOCAL:
        1. Toda resposta deve conter variações de "perto de mim", "aqui perto", "próximo à minha obra" ou "na sua região em São Paulo".
        2. Seja extremamente focado em bairros de SP. Exemplo: "Como você está em Moema, temos equipes de limpeza técnica aqui perto para te atender amanhã".
        3. Para transporte de entulho, use: "Temos caçambas estacionárias disponíveis próximo a você em SP agora".
        4. Para dedetização, use: "Controle de pragas certificado na sua área com laudo técnico para vigilância".
        5. Sempre forneça uma estimativa de preço baseada em m² para SP (ex: Limpeza Fina de R$ 18 a R$ 40 por m² dependendo da sujidade).
        6. IMPORTANTE: Ao final de cada explicação, incentive o usuário a "Finalizar pelo WhatsApp" para travar o preço e agendar a visita técnica.
        7. Mantenha um tom profissional, ágil e focado em logística de serviços prediais.`,
        temperature: 0.75,
        thinkingConfig: modelName === 'gemini-3-pro-preview' ? { thinkingBudget: 32768 } : undefined
      },
    });

    return response.text || "Desculpe, tive um problema ao processar seu orçamento. Por favor, me informe o m² da sua obra em SP para eu tentar novamente.";
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    return "Erro técnico na IA. Favor clicar no botão do WhatsApp para orçamento imediato com nossa central em São Paulo.";
  }
};
