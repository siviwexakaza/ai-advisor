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
      prompt: `You are a relationship advisor. A person has come to you for help with their relationship.
      You asked them the following onboarding questions to understand how they feel about their partner and their relationship. Here are their responses:
      1. ${onboardingQuestions["describe_relationship"]}
      Response: ${describe_relationship}
      2. ${onboardingQuestions["partner_appreciates_about_you"]}
      Response: ${partner_appreciates_about_you}
      3. ${onboardingQuestions["appreciate_about_partner"]}
      Response: ${appreciate_about_partner}
      4. ${onboardingQuestions["couple_strengths"]}
      Response: ${couple_strengths}
      5. ${onboardingQuestions["recurring_conflicts"]}
      Response: ${recurring_conflicts}
      6. ${onboardingQuestions["handle_disagreements"]}
      Response: ${handle_disagreements}
      7. ${onboardingQuestions["partner_handles_conflict"]}
      Response: ${partner_handles_conflict}
      8. ${onboardingQuestions["emotionally_safe"]}
      Response: ${emotionally_safe}
      9. ${onboardingQuestions["feel_loved"]}
      Response: ${feel_loved}
      10. ${onboardingQuestions["feel_disconnected"]}
      Response: ${feel_disconnected}
      11. ${onboardingQuestions["unmet_needs"]}
      Response: ${unmet_needs}
      12. ${onboardingQuestions["relationship_goals"]}
      Response: ${relationship_goals}
      13. ${onboardingQuestions["counseling_goals"]}
      Response: ${counseling_goals}
      14. ${onboardingQuestions["change_one_thing"]}
      Response: ${change_one_thing}
      15. ${onboardingQuestions["commitment_level"]}
      Response: ${commitment_level}
      ---
      Based on these responses:
      1. What is your overall impression of this person’s emotional state or mindset in the relationship?
      2. Provide a thoughtful and empathetic summary of what you believe they are experiencing.
      3. What patterns or themes do you notice in their responses?
      4. What specific areas do you think they could reflect on or work on?
      5. Offer advice or guidance in a human, supportive tone.
      Speak as a warm and experienced relationship counselor, not as an AI or chatbot.
      `,
    });

    console.warn(JSON.stringify(aiSummary));

    return Response.json({ success: true, aiSummary }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
