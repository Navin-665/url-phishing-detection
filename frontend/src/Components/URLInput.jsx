function URLInput({ url, setUrl, checkURL, loading }) {
  return (
    <div className="flex flex-col items-center space-y-6">

      <input
        type="text"
        placeholder="Paste suspicious URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20"
      />

      <button
        onClick={checkURL}
        disabled={loading}
        className="px-6 py-2 bg-cyan-500 rounded text-white"
      >
        {loading ? "Scanning..." : "Scan URL"}
      </button>

    </div>
  );
}

export default URLInput;
