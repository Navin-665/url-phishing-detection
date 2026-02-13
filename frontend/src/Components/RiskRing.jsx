import { useEffect, useState } from "react";

function RiskRing({ score }) {

  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset =
      circumference - (score / 100) * circumference;
    setOffset(progressOffset);
  }, [score, circumference]);

  let color = "#51cf66";
  if (score > 80) color = "#ff6b6b";
  else if (score > 60) color = "#ff922b";
  else if (score > 30) color = "#ffd43b";

  return (
    <div className="relative flex items-center justify-center">

      <svg
        height={radius * 2}
        width={radius * 2}
        className="rotate-[-90deg]"
      >
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition: "stroke-dashoffset 1s ease"
          }}
        />
      </svg>

      <div className="absolute text-2xl font-bold">
        {score}%
      </div>

    </div>
  );
}

export default RiskRing;
