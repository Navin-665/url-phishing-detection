function RiskMeter({ score }) {

  if (score === undefined) return null;

  // decide color based on risk
  let color = "bg-green-500";

  if (score > 70) color = "bg-red-500";
  else if (score > 40) color = "bg-yellow-500";

  return (
    <div className="mt-4 w-full">

      <p className="font-semibold mb-1">Risk Level</p>

      <div className="w-full bg-gray-200 rounded h-4">
        <div
          className={`${color} h-4 rounded`}
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <p className="text-sm mt-1">{score}%</p>

    </div>
  );
}

export default RiskMeter;
