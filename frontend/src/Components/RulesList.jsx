function RulesList({ rules }) {
  if (!rules || rules.length === 0) return null;

  return (
    <div className="mt-6">

      <h3 className="font-semibold mb-2">Triggered Rules</h3>

      <div className="space-y-2">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="bg-red-100 text-red-700 p-2 rounded"
          >
            {rule}
          </div>
        ))}
      </div>

    </div>
  );
}

export default RulesList;
