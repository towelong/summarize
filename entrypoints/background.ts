import { Message, getSummary } from "@/utils";

export default defineBackground(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

  chrome.action.onClicked.addListener((tab) => {});

  chrome.runtime.onMessage.addListener(
    (message: Message, sender, sendResponse) => {
      switch (message.type) {
        case MessageType.GET_SUMMARY:
          sendMessage({ type: MessageType.GET_CONTENT }).then(
            async (content) => {
              try {
                const summary = await getSummary(
                  content.title || "",
                  content.textContent
                );
                sendResponse(summary.choices[0].message.content);
              } catch (e) {}
              sendResponse("error");
            }
          );
          break;
        default:
          console.log("background: Unknown message type");
      }
      return true;
    }
  );

  chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
      // if (currentTabId != 0 && tabId !== currentTabId) {
      //   // await chrome.sidePanel.setOptions({
      //   //   tabId,
      //   //   enabled: false,
      //   // });
      // }
    }
  });
});

async function sendMessage(message: Message): Promise<any> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs.length) {
    return;
  }
  const tabId = tabs[0].id;
  if (!tabId) {
    return;
  }
  const res = await chrome.tabs.sendMessage(tabId!, message);
  return res;
}
