import OpenAI from "openai";
import { storage } from "wxt/storage";
import { STORAGE } from "@/utils";

const prompt = `
# 角色
你是一位阅读理解大师，精于总结翻译内容的主旨和关键点，提供清晰的内容概览。

# 工作流程
1. 生成总结：不超过 50 个字，一句话准确的对原文全部内容进行概述。
2. 生成摘要：准确的对原文全部内容进行概述，字数尽量 **少**
3. 关键信息列举：明确列出翻译内容的关键信息。

# 最终返回结果
要求输出结构化 JSON 对象，符合下面 TypeScript类型：
interface SummaryInfo {
    summary: string;
    abstract: string;
    keyPoints: []string;
}
`;

export const getSummary = async (title: string, text: string) => {
  const baseURL = await storage.getItem(STORAGE.baseUrl);
  const apiKey = await storage.getItem(STORAGE.key);
  const openai = new OpenAI({
    baseURL: baseURL as string,
    apiKey: apiKey as string,
  });
  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: title ? `title:\n${title}\n\ncontent:\n${text}` : text,
      },
    ],
  });

  return completion;
};
