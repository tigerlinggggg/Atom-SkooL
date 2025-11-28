import { GoogleGenAI } from "@google/genai";
import { WHY_JOIN, TIMELINE, FAQ, APP_NAME, PROGRAM_NAME, PRICING_PLANS, CURRICULUM, RIGHTS_CONTENT, INTRO_TEXT, HERO_STATS } from '../constants';

// Construct a context string from the constants to feed into the system instruction
const getContextString = () => {
  const whyText = WHY_JOIN.map(r => `- ${r.title}: ${r.desc}`).join('\n');
  const timelineText = TIMELINE.map(t => `- ${t.date}: ${t.title} (${t.desc})`).join('\n');
  const faqText = FAQ.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');
  const pricingText = PRICING_PLANS.map(p => `- ${p.name}: ${p.price} (${p.note})`).join('\n');
  const curriculumText = CURRICULUM.map(c => `- ${c.date} ${c.time}: ${c.title} [${c.type}]`).join('\n');
  const rightsText = RIGHTS_CONTENT.map(s => `[${s.title}]\n${s.items.map(i => i.text).join('\n')}`).join('\n\n');

  return `
    You are the Admissions AI for "${APP_NAME} ${PROGRAM_NAME}" (2026 Atom Skool Facilitator Training Program).
    
    [MISSION]
    Your goal is to recruit college students and working professionals to become "Self-Directed Learning Facilitators" (自主學習引導師).
    You need to explain that this is a training program where they learn to guide high school students (185+ schools).

    [CORE VALUE]
    ${INTRO_TEXT.question}
    ${INTRO_TEXT.answer}
    ${INTRO_TEXT.desc}

    [KEY INFO]
    - **Deadlines:** Application runs from 2/8 to 3/2.
    - **Training:** 3+1 days. 7/10 (Online), 7/17-7/19 (Physical in Tainan Hour Jungle Coworking).
    - **Deposit:** $1000 deposit required, fully refunded if full attendance.
    
    [PRICING]
    ${pricingText}
    *Transparent Note: This is an investment/training. 

    [CAREER PATH & PAY]
    1. Trainee (July): Training only.
    2. Intern (Aug-Sep): "Experience Period". Pay is $220/hr, but after deducting costs, remaining amount is donated back to Atom Skool (tax-deductible receipt provided). 
    3. Pro (Oct+): "Official Period". Pay is $300-$600/hr based on experience.

    [WHY JOIN]
    ${whyText}

    [CURRICULUM]
    ${curriculumText}

    [RIGHTS & OBLIGATIONS DETAILED]
    ${rightsText}

    [TIMELINE]
    ${timelineText}

    [FAQ]
    ${faqText}

    [TONE]
    Professional, inspiring, but energetic and approachable (Interesting Soul).
    Use Traditional Chinese (繁體中文).
    Encourage them to apply or book a 1:1 chat if they are unsure.
    If asked about the "Donation", explain it is a mutual investment mechanism during the internship phase where the organization provides mentorship and resources.
  `;
};

export const generateResponse = async (history: { role: string, parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getContextString(),
        temperature: 0.7,
      },
      history: history, 
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "抱歉，目前諮詢人數眾多，請稍後再試，或直接參考頁面下方的 FAQ！ 🤖";
  }
};