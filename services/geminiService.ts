
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
        systemInstruction: `Você é o Coordenador Técnico Master da OBRA LIMPA SP (obralimpa.sp).
        Sua função é gerar orçamentos estimativos e fornecer orientação técnica especializada para serviços de Limpeza Pós-Obra, Dedetização, Caçambas e toda a gama de INSTALAÇÕES prediais.

        CATEGORIAS DE INSTALADOR (SEO LOCAL SP):
        - Box: Variações de "Instalador de Box de Vidro", "Box para Banheiro" e "Montador de Box".
        - Segurança: "Instalador de Redes de Proteção" para janelas e sacadas.
        - Conforto/Decoração: "Instalador de Persianas", "Papel de Parede", "Ar Condicionado" e "Varal de Teto".
        - Estrutura: "Instalador de Drywall e Sancas".

        REGRAS DE CONTEÚDO SEO LOCAL:
        1. Toda resposta deve conter variações de "perto de mim", "aqui perto", "próximo à minha residência" ou "na sua área em São Paulo".
        2. Foco total em bairros de SP. Exemplo: "Como você está em Pinheiros, temos instaladores de box de vidro e redes de proteção aqui perto com agenda para esta semana".
        3. Para instalação de redes de proteção: "Instalação certificada com cordas de alta resistência próxima a você em SP".
        4. Para ar condicionado: "Instalação técnica com vácuo e teste de estanqueidade na sua região".
        5. Sempre forneça uma estimativa de preço baseada em m² ou unidade para SP:
           - Limpeza Fina: R$ 18 a R$ 45 p/ m².
           - Box de Vidro (Instalação): R$ 250 a R$ 450 (mão de obra).
           - Rede de Proteção: R$ 40 a R$ 80 p/ m² instalado.
           - Ar Condicionado: A partir de R$ 600 dependendo dos BTUs.
        6. IMPORTANTE: Ao final de cada explicação, reforce: "Finalize agora pelo WhatsApp para garantir sua equipe próxima e travar este valor".
        7. Mantenha um tom de autoridade técnica, rapidez e foco em soluções locais para moradores de SP.`,
        temperature: 0.75,
        thinkingConfig: modelName === 'gemini-3-pro-preview' ? { thinkingBudget: 32768 } : undefined
      },
    });

    return response.text || "Desculpe, tive um problema ao processar seu pedido de instalação em SP. Me informe qual o seu bairro e o serviço desejado para eu tentar novamente.";
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    return "Erro técnico na central de IA. Por favor, acione nosso suporte via WhatsApp para orçamento manual imediato.";
  }
};
