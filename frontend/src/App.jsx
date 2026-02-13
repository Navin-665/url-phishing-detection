import { useState } from "react";
import axios from "axios";

import URLInput from "./Components/URLInput";
import ResultCard from "./Components/ResultCard";
import Header from "./Components/Header";

function App() {

  // ---------- STATE ----------
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------- API ----------
  const API_URL = "http://localhost:8080/analyze";

  // ---------- FUNCTION ----------
  const checkURL = async () => {

    console.log("BUTTON CLICKED");

    // validation
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    console.log("CALLING API");

    setLoading(true);
    setError("");
    setResult(null);

    try {

      const response = await axios.get(API_URL, {
        params: {
         url: url  // ✅ IMPORTANT
        }
      });

      console.log("RESPONSE:", response.data);

      setResult(response.data);

    } catch (err) {

      console.log("ERROR:", err);

      if (err.response) {
        setError("Server error. Try again later.");
      } else if (err.request) {
        setError("Cannot connect to backend.");
      } else {
        setError("Something went wrong.");
      }

    } finally {
      setLoading(false);
    }
  };

  // ---------- UI ----------
  return (
    <div className="flex justify-center px-4">

      <div className="
        w-full max-w-3xl
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        shadow-2xl
        p-10
      ">

        {/* Header */}
        <Header />

        {/* Input */}
        <URLInput
          url={url}
          setUrl={setUrl}
          checkURL={checkURL}
          loading={loading}
        />

        {/* Error */}
        {error && (
          <p className="mt-4 text-red-400 font-semibold">
            {error}
          </p>
        )}

        {/* Loading */}
        {loading && (
          <p className="mt-4 text-cyan-400">
            Analyzing URL...
          </p>
        )}

        {/* Result */}
        {!loading && result && (
          <ResultCard result={result} />
        )}

      </div>

    </div>
  );
}

export default App;
``