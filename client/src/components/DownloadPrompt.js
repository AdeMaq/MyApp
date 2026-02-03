import React from "react";
import "./DownloadPrompt.css";

const DownloadPrompt = () => {
  return (
    <div className="download-prompt-container">
      <div className="download-prompt-left">
        <span className="download-prompt-question">
          Don’t have our mobile app yet?
        </span>
      </div>
      <div className="download-prompt-right">
        <span>
          Download now on{" "}
          <span className="download-prompt-link download-prompt-ios">iOS</span>
          {" "}or{" "}
          <span className="download-prompt-link download-prompt-android">Android</span>
          {", "}
          <span className="download-prompt-link download-prompt-signup">Sign up</span>
          , and earn rewards!
        </span>
        <span className="download-prompt-cart" role="img" aria-label="cart">
          🛒
        </span>
      </div>
      <span className="download-prompt-tag" role="img" aria-label="tag">
        🏷️
      </span>
    </div>
  );
};

export default DownloadPrompt;
