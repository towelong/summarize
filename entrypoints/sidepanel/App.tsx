import { useEffect, useState } from "react";
import { parse } from "best-effort-json-parser";

interface Summary {
  summary: string;
  abstract: string;
  keyPoints: string[];
}

function App() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendMessageToBackground = async () => {
    const message = {
      type: MessageType.GET_SUMMARY,
    };
    setLoading(true);
    let res = await browser.runtime.sendMessage("", message);
    if (res == "error") {
      setError(true);
    } else {
      res = res.replaceAll("```json\n", "");
      setSummary(parse(res));
    }
    setLoading(false);
  };

  useEffect(() => {
    sendMessageToBackground();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">请检查Options配置</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mt-4 text-green-400">Summarizer</h1>
      {loading && (
        <div className="mt-8 animate-pulse">
          <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
          <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
        </div>
      )}
      {!loading && summary && (
        <div className="text-base">
          <div className="text-lg font-bold mt-8 mb-4">总结</div>
          <div className="text-slate-500">{summary.summary}</div>
          <div className="text-lg font-bold mt-8 mb-4">摘要</div>
          <div className="text-slate-500">{summary.abstract}</div>
          <div className="text-lg font-bold mt-8 mb-4">要点</div>
          <ul className="marker:text-green-400 list-disc pl-5 space-y-3 text-slate-500">
            {(summary.keyPoints || []).map(
              (keyPoint: string, index: number) => (
                <li key={index}>{keyPoint}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
