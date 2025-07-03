import { git } from "./git";
import { OpenAIApi } from "openai";
import { addCommentToPR } from "./pr";
import { Agent } from "https";
import * as tl from "azure-pipelines-task-lib/task";

export async function reviewFile(
  targetBranch: string,
  fileName: string,
  httpsAgent: Agent,
  apiKey: string,
  openai: OpenAIApi | undefined
) {
  console.log(`Start reviewing ${fileName} ...`);

  const defaultOpenAIModel = "gpt-3.5-turbo";
  const patch = await git.diff([targetBranch, "--", fileName]);

  const instructions = tl.getInput('ai_instructions')

  try {
    let choices: any;

    if (!openai){
      throw("OpenAi fail to initialize");
    }

    const response = await openai.createChatCompletion({
      model: tl.getInput("model") || defaultOpenAIModel,
      messages: [
        {
          role: "system",
          content: instructions,
        },
        {
          role: "user",
          content: patch,
        },
      ],
      max_tokens: 500,
    });

    choices = response.data.choices;

    if (choices && choices.length > 0) {
      const review = choices[0].message?.content as string;

      if (review.trim() !== "No feedback.") {
        await addCommentToPR(fileName, review, httpsAgent);
      }
    }

    console.log(`Review of ${fileName} completed.`);
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
