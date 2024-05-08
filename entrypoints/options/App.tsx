import { STORAGE } from "@/utils";
import { useEffect, useState } from "react";
import { storage } from "wxt/storage";

function App() {
  const [baseUrl, setBaseUrl] = useState("https://api.openai.com/v1");
  const [key, setKey] = useState("");

  useEffect(() => {
    initConfig();
  }, []);

  const initConfig = async () => {
    const baseURL = await storage.getItem(STORAGE.baseUrl);
    const apiKey = await storage.getItem(STORAGE.key);
    setBaseUrl(baseURL as string);
    setKey(apiKey as string);
  };

  const saveConfig = () => {
    storage.setItems([
      {
        key: STORAGE.baseUrl,
        value: baseUrl,
      },
      {
        key: STORAGE.key,
        value: key,
      },
    ]);
    window.close()
  };

  return (
    <div className="p-2 flex flex-col">
      <div className="flex items-center my-2">
        <label className="text-sm mr-2">baseUrl:</label>
        <input
          className="flex-1 p-1 border border-solid border-gray-300"
          type="text"
          placeholder="baseUrl"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
        />
      </div>
      <div className="flex items-center my-2">
        <label className="text-sm mr-2">key:</label>
        <input
          type="text"
          className="flex-1 p-1 border border-solid border-gray-300"
          placeholder="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={saveConfig}
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-blue-800"
        >
          保存
        </button>
      </div>
    </div>
  );
}

export default App;
