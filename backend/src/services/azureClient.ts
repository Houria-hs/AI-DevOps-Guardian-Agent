import { AzureOpenAI } from "openai";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const apiKey = process.env.AZURE_OPENAI_KEY || "";
const apiVersion = "2024-10-21";
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "";

export const azureClient = new AzureOpenAI({
  endpoint,
  apiKey,
  apiVersion,
  deployment,
});

export async function getAzureCompletion(systemPrompt: string, userContent: string) {
  const response = await azureClient.chat.completions.create({
    model: deployment,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}