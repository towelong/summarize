export const MessageType = {
  GET_SUMMARY: "GET_SUMMARY",
  GET_CONTENT: "GET_CONTENT",
  CONTENT_RESULT: "CONTENT_RESULT",
  SUMMARY_RESULT: "SUMMARY_RESULT",
};

export interface Message {
  type: string;
  content?: string;
}
