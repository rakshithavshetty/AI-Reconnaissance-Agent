import { useState } from "react";
import axios from "axios";
import { validateTarget } from "./utils/targetValidation";
import { generatePDFReport } from "./utils/pdfReport";

import reconLogo from "./assets/recon-logo.png";

import TargetInput from "./components/TargetInput";
import RiskCard from "./components/RiskCard";
import ReconSection from "./components/ReconSection";
import Findings from "./components/Findings";
import Recommendations from "./components/Recommendations";
import SummaryCards from "./components/SummaryCards";
import ScanHistory from "./components/ScanHistory";

function App() {
  const [target, setTarget] = useState("example.com");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [scanHistory, setScanHistory] = useState([]);

  const startScan = async () => {
  const validation = validateTarget(target);

  if (!validation.valid) {
    setError(validation.message);
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/scan",
      {
        target: target.trim(),
        authorized: true
      },
        {
            timeout: 60000
        }
    );

    if (response.data?.success) {
      setResult(response.data);

      const newScan = {
        id: Date.now(),
        target: response.data.target,
        riskLevel:
          response.data.ai_analysis?.risk_level ||
          "UNKNOWN",
        riskScore:
          typeof response.data.ai_analysis?.risk_score ===
          "number"
            ? response.data.ai_analysis.risk_score
            : 0,
        findings:
          response.data.ai_analysis?.findings?.length || 0,
        timestamp: new Date().toLocaleString()
      };

      setScanHistory((previousHistory) => [
        newScan,
        ...previousHistory
      ]);
    } else {
      setError(
        response.data?.error ||
        "The reconnaissance scan could not be completed."
      );
    }

 } catch (error) {
  console.error("Scan error:", error);

  if (error.code === "ECONNABORTED") {
    setError(
      "The scan is taking longer than expected. Please try again."
    );

  } else if (error.response) {
    setError(
      error.response.data?.error ||
      `Server error (${error.response.status}). Please try again.`
    );

  } else if (error.request) {
    setError(
      "Unable to connect to the backend. Please make sure the Flask server is running."
    );

  } else {
    setError(
      "An unexpected error occurred. Please try again."
    );
  }

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app" id="dashboard">

      <div className="app-header">
        <img
          src={reconLogo}
          alt="AI Reconnaissance Agent Logo"
          className="app-logo"
        />

        <div className="header-text">
          <h1>AI Reconnaissance Agent</h1>
          <p>
            Automated reconnaissance and AI-based risk assessment
          </p>
        </div>
      </div>

      <nav className="app-nav">
        <a href="#dashboard">Dashboard</a>
        <a href="#reconnaissance">Reconnaissance</a>
        <a href="#findings">Security Findings</a>
      </nav>

      <TargetInput
        target={target}
        setTarget={setTarget}
        onScan={startScan}
        loading={loading}
      />

      {error && (
        <div className="error-message">
          <strong>⚠️ Scan Error</strong>
          <p>{error}</p>
        </div>
      )}

      {result && result.success && (
              <div className="scan-result">

                <div className="results-header">
                  <div className="results-title">
                    <div className="results-title-row">
                      <h2>Scan Results</h2>

                      <span className="scan-status">
                        ✓ Completed
                      </span>
                    </div>

                    <p>
                      Security reconnaissance assessment
                    </p>
                  </div>

                <div className="results-actions">
                    <button
                      className="download-pdf-button"
                      onClick={() => generatePDFReport(result)}
                    >
                      ↓ Download PDF
                    </button>


                  <button
                    className="new-scan-button"
                    onClick={() => {
                      setResult(null);
                      setError("");
                    }}
                  >
                    + New Scan
                  </button>
                </div>

                <div className="target-summary">
                  <span className="target-summary-label">
                    TARGET
                  </span>

                  <span className="target-summary-value">
                    {result.target}
                  </span>
                </div>
                </div>
          {!result.reconnaissance && (
            <div className="error-message">
              <strong>⚠️ Reconnaissance Data Unavailable</strong>
              <p>
                The scan completed, but reconnaissance data
                could not be retrieved.
              </p>
            </div>
          )}

            {!result.ai_analysis && (
            <div className="ai-warning">
              ⚠️ AI analysis was not available for this scan.
              The reconnaissance results are still displayed below.
            </div>
          )}

          <RiskCard
            riskLevel={
              result.ai_analysis?.risk_level || "UNKNOWN"
            }
            riskScore={
              typeof result.ai_analysis?.risk_score === "number"
                ? result.ai_analysis.risk_score
                : 0
            }
          />


          {result.reconnaissance && (
            <SummaryCards
              reconnaissance={result.reconnaissance}
            />
          )}

          <div className="ai-summary">
            <div className="ai-summary-header">
              <div className="ai-summary-title">
                <div className="ai-icon">
                  🤖
                </div>

                <div>
                  <span className="ai-label">
                    ARTIFICIAL INTELLIGENCE
                  </span>

                  <h3>AI Security Summary</h3>
                </div>
              </div>

              <span className="ai-status">
                ✓ Analysis Complete
              </span>
            </div>

            <div className="ai-summary-content">
              <p>
                {result.ai_analysis?.summary ||
                  "AI analysis is currently unavailable for this scan."}
              </p>
            </div>

            <div className="ai-summary-footer">
              <span>
                Analysis based on collected reconnaissance data
              </span>
            </div>
          </div>

          <div id="reconnaissance">
            {result.reconnaissance && (
              <ReconSection
                reconnaissance={result.reconnaissance}
              />
            )}
          </div>

          <div id="findings">
            <Findings
                findings={result.ai_analysis?.findings}
            />
          </div>

          <Recommendations
             recommendations={result.ai_analysis?.recommendations}
          />
          <footer className="app-footer">
            <div className="footer-content">
            <div className="footer-brand">
                <span className="footer-title">
                      AI Reconnaissance Agent
                </span>
                <span className="footer-divider">•</span>
                     <span className="footer-author">
                          Developed by Rakshitha Shetty
                     </span>
            </div>

              <p className="footer-description">
                  AI-powered reconnaissance and security risk assessment
               </p>

              <p className="footer-copyright">
                  © 2026 AI Reconnaissance Agent. For authorized security assessments only.
              </p>
            </div>
          </footer>
      </div>
      )}
        <ScanHistory
          history={scanHistory}
          onSelectScan={(scan) => {
            setTarget(scan.target);
            setError("");
          }}
        />
    </div>
  );
}

export default App;