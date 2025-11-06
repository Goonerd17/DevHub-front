import React, { useState } from "react";
import "../styles/common.css";
import PageLayout from "./PageLayout";

const Json = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");

  const formatJson = () => {
    try {
      const obj = JSON.parse(input);
      setFormatted(JSON.stringify(obj, null, 2));
    } catch {
      setFormatted("❌ Invalid JSON");
    }
  };

  return (
    <PageLayout>
      <div className="tool-container json-page">
        <h2 className="tool-title">📄 JSON Formatter</h2>
        <textarea
          placeholder="Paste your JSON here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="button-group">
          <button onClick={formatJson}>Format</button>
          <button onClick={() => setInput("")}>Clear</button>
        </div>
        <textarea readOnly value={formatted} placeholder="Formatted output..." />
      </div>
    </PageLayout>

  );
};

export default Json;
