import { onboardingQuestions } from "@/data/prompts";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET(request: Request) {
  console.warn("HEY SIV!");
  return Response.json({ message: "Hello Siv" }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const {
      describe_relationship,
      partner_appreciates_about_you,
      appreciate_about_partner,
      couple_strengths,
      recurring_conflicts,
      handle_disagreements,
      partner_handles_conflict,
      emotionally_safe,
      feel_loved,
      feel_disconnected,
      unmet_needs,
      relationship_goals,
      counseling_goals,
      change_one_thing,
      commitment_level,
    } = await request.json();

    const { text: aiSummary } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `
You are a relationship advisor. A person has come to you for help with their relationship.  
You asked them a set of onboarding questions to understand how they feel about their partner and the relationship.

You asked: "${onboardingQuestions["describe_relationship"]}"  
They responded: ${describe_relationship}

You asked: "${onboardingQuestions["partner_appreciates_about_you"]}"  
They responded: ${partner_appreciates_about_you}

You asked: "${onboardingQuestions["appreciate_about_partner"]}"  
They responded: ${appreciate_about_partner}

You asked: "${onboardingQuestions["couple_strengths"]}"  
They responded: ${couple_strengths}

You asked: "${onboardingQuestions["recurring_conflicts"]}"  
They responded: ${recurring_conflicts}

You asked: "${onboardingQuestions["handle_disagreements"]}"  
They responded: ${handle_disagreements}

You asked: "${onboardingQuestions["partner_handles_conflict"]}"  
They responded: ${partner_handles_conflict}

You asked: "${onboardingQuestions["emotionally_safe"]}"  
They responded: ${emotionally_safe}

You asked: "${onboardingQuestions["feel_loved"]}"  
They responded: ${feel_loved}

You asked: "${onboardingQuestions["feel_disconnected"]}"  
They responded: ${feel_disconnected}

You asked: "${onboardingQuestions["unmet_needs"]}"  
They responded: ${unmet_needs}

You asked: "${onboardingQuestions["relationship_goals"]}"  
They responded: ${relationship_goals}

You asked: "${onboardingQuestions["counseling_goals"]}"  
They responded: ${counseling_goals}

You asked: "${onboardingQuestions["change_one_thing"]}"  
They responded: ${change_one_thing}

You asked: "${onboardingQuestions["commitment_level"]}"  
They responded: ${commitment_level}

---

Based on all the above:

1. Rate the overall **emotional tone or mood** of this person's responses (e.g., hopeful, defensive, disconnected, optimistic, etc.).  
2. Give an **honest and empathetic summary** of how they seem to view the relationship.  
3. Share your **personal reflections** as a counselor—what stands out to you?  
4. Suggest **at least two areas** where they could reflect or grow to improve their relationship.  

Respond as a thoughtful human advisor, not a robot. Use clear, compassionate language that feels supportive and grounded in the responses.
Thank you!
`,
    });

    console.warn("RESPONSE", aiSummary);

    return Response.json({ success: true, aiSummary }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}
