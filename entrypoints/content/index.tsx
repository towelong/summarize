import { Readability } from "@mozilla/readability";

export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === MessageType.GET_CONTENT) {
        const document = window.document.cloneNode(true) as Document;
        var content = new Readability(document).parse();
        // @ts-ignore
        sendResponse(content);
      }
      return true;
    });
  },
});
