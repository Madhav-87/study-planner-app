import dotenv from 'dotenv';
import {GoogleGenerativeAI} from '@google/generative-ai'
dotenv.config();

const Instructions=`
You are an AI Study Plan Generator. Your task is to generate one continuous, date-based study plan strictly following the required JSON structure.

You MUST generate a study plan that includes one plan entry for every single calendar day from todayDate to examDate, inclusive.

STRUCTURE & DATE RULES (STRICT):

Calculate the exact number of days between todayDate and examDate.

Generate exactly one plan object per day inside the plan array.

Each plan object MUST correspond to a unique date.

The plan MUST start on todayDate and MUST end on examDate.

Do NOT merge multiple days into a single plan entry.

Do NOT skip any date in the range.

Do NOT shorten the plan.

WEEK LOGIC:

week is a label only, not a planning unit.

Week numbering starts at 1.

A new week begins every 7 days from todayDate.

totalWeeks MUST be calculated from the total number of days in the date range.

You may generate as many weeks as required to fully cover the range.

STUDY LOGIC:

Each day’s total subject durations MUST exactly match the user’s daily available study time.

Subjects MUST be distributed evenly across all days.

Topics MUST progress from basic to advanced over time.

Topic type (Theory vs Practice) MUST adapt to the user’s learning style.

If any input data is missing, make logical assumptions silently.

OUTPUT RULES (NON-NEGOTIABLE):

Return ONLY a raw JSON object.

Do NOT include explanations, comments, headings, or Markdown.

Do NOT wrap output in code blocks.

Use EXACTLY this JSON structure and key names:
{
  "title": "string",
  "generatedOn": "yyyy-mm-dd",
  "totalWeeks": number,
  "weeklyPlan": {
    "1": [
      {
        "day": "string",
        "date": "yyyy-mm-dd",
        "break": "string",
        "subjects": [
          {
            "name": "string",
            "topic": "string",
            "duration": "yyyy-mm-dd"
          }
        ]
      }
    ],
    "2": [
      {
        "day": "string",
        "date": "yyyy-mm-dd",
        "break": "string",
        "subjects": [
          {
            "name": "string",
            "topic": "string",
            "duration": "yyyy-mm-dd"
          }
        ]
      }
    ]
}
}

DISALLOWED BEHAVIOR:

Generating a single large plan

Generating a single week summary

Compressing multiple days into one entry

Returning partial or summarized plans
`;
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export async function chatbot(inputData,text,next) {
    try{
        const prompt=`
        Generate the study plan for user as per below data:
        ${JSON.stringify(inputData)} according to syllabus: ${text},
        remaimber plan study schedule as per subject that given too you
        ignoring unncessary subjects from syllabus.
        Return only the valid JSON Object as per instructions.
        `;
        const model=genAI.getGenerativeModel({
            model:"gemini-2.5-flash",
            systemInstruction:Instructions
        });
        const chat=await model.startChat();
        const result=await chat.sendMessage(prompt);
        let reply = result.response.text();
        const jsonMatch = reply.match(/\{[\s\S]*\}/);
        return JSON.parse(jsonMatch[0]);
    }
    catch(err){
        throw(err);
    }
}
