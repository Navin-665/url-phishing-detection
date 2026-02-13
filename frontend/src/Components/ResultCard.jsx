import { useEffect, useState } from "react";
import RiskRing from "./RiskRing";
import RulesList from "./RulesList";

function ResultCard({ result }) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setVisible(false);
      setTimeout(() => setVisible(true), 50);
    }
  }, [result]);

  if (!result) return null;

  const isHigh = result.score > 70;

  return (
    <div
      className={`
        mt-10
        p-8
        rounded-2xl
        bg-white/5
        border border-white/10
        backdrop-blur-md
        transform transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >

      <h2 className="text-2xl font-bold mb-4">
        Analysis Result
      </h2>

      <RiskRing score={result.score} />

      <div className={`mt-6 text-lg font-semibold ${isHigh ? "text-red-400" : "text-green-400"}`}>
        {result.verdict}
      </div>

      <RulesList rules={result.reasons} />

    </div>
  );
}

export default ResultCard;
