import { Message, getSummary } from "@/utils";

export default defineBackground(() => {
  browser.action.onClicked.addListener((tab) => {
    // @ts-ignore
    browser.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      // @ts-ignore
      .catch((error) => console.error(error));
  });

  browser.runtime.onMessage.addListener(
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
                // @ts-ignore
                sendResponse(summary.choices[0].message.content);
              } catch (e) {}
              // @ts-ignore
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

  browser.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
      // if (currentTabId != 0 && tabId !== currentTabId) {
      //   // @ts-ignore
      //   // await browser.sidePanel.setOptions({
      //   //   tabId,
      //   //   enabled: false,
      //   // });
      // }
    }
  });
});

async function sendMessage(message: Message): Promise<any> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tabs.length) {
    return;
  }
  const tabId = tabs[0].id;
  if (!tabId) {
    return;
  }
  const res = await browser.tabs.sendMessage(tabId!, message);
  return res;
}
