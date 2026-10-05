import jsPDF from "jspdf";

export function generatePDFReport(result) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const reconnaissance =
    result?.reconnaissance || {};

  const ai =
    result?.ai_analysis || {};

  const dnsRecords =
    reconnaissance.dns_records || {};

  const whois =
    reconnaissance.whois || {};

  const subdomains =
    reconnaissance.subdomains || [];

  const ports =
    reconnaissance.ports?.results || [];

  const riskLevel =
    ai.risk_level || "UNKNOWN";

  const riskScore =
    typeof ai.risk_score === "number"
      ? ai.risk_score
      : 0;

  const findings =
    ai.findings || [];

  const recommendations =
    ai.recommendations || [];

  let y = 20;

  const addText = (
    text,
    x,
    currentY,
    maxWidth = 180,
    fontSize = 10
  ) => {
    doc.setFontSize(fontSize);

    const lines = doc.splitTextToSize(
      String(text),
      maxWidth
    );

    doc.text(lines, x, currentY);

    return currentY + lines.length * 5;
  };

  const checkPage = (requiredSpace = 20) => {
    if (y + requiredSpace > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // ==============================
  // HEADER
  // ==============================

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");

  doc.text(
    "AI Reconnaissance Agent",
    pageWidth / 2,
    y,
    { align: "center" }
  );

  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Security Reconnaissance Report",
    pageWidth / 2,
    y,
    { align: "center" }
  );

  y += 15;

  doc.line(15, y, pageWidth - 15, y);

  y += 12;

  // ==============================
  // TARGET INFORMATION
  // ==============================

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text("Target Information", 15, y);

  y += 9;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  y = addText(
    `Target: ${result?.target || "Unknown"}`,
    15,
    y
  );

  y += 2;

  y = addText(
    `Scan Date: ${new Date().toLocaleString()}`,
    15,
    y
  );

  y += 10;

  // ==============================
  // RISK ASSESSMENT
  // ==============================

  checkPage(40);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text("Security Risk Assessment", 15, y);

  y += 10;

  doc.setFontSize(12);

  doc.text(
    `Risk Level: ${riskLevel}`,
    15,
    y
  );

  y += 7;

  doc.text(
    `Risk Score: ${riskScore}/100`,
    15,
    y
  );

  y += 12;

  // ==============================
  // AI SUMMARY
  // ==============================

  checkPage(50);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text("AI Security Summary", 15, y);

  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  y = addText(
    ai.summary ||
      "No AI summary was available.",
    15,
    y,
    180,
    10
  );

  y += 12;

  // ==============================
  // DNS RECORDS
  // ==============================

  checkPage(50);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text("DNS Records", 15, y);

  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  Object.entries(dnsRecords).forEach(
    ([type, values]) => {
      checkPage(15);

      const records =
        values && values.length > 0
          ? values.join(", ")
          : "No records found";

      y = addText(
        `${type}: ${records}`,
        15,
        y,
        180,
        9
      );

      y += 2;
    }
  );

  y += 8;

  // ==============================
  // WHOIS
  // ==============================

  checkPage(50);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text("WHOIS Information", 15, y);

  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  if (whois.error) {
    y = addText(
      `WHOIS unavailable: ${whois.error}`,
      15,
      y,
      180,
      9
    );
  } else {
    Object.entries(whois).forEach(
      ([key, value]) => {
        checkPage(15);

        y = addText(
          `${key}: ${value}`,
          15,
          y,
          180,
          9
        );

        y += 2;
      }
    );
  }

  y += 8;

  // ==============================
  // SUBDOMAINS
  // ==============================

  checkPage(40);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text("Discovered Subdomains", 15, y);

  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  if (subdomains.length === 0) {
    y = addText(
      "No subdomains discovered.",
      15,
      y
    );
  } else {
    subdomains.forEach((item) => {
      checkPage(15);

      y = addText(
        `${item.subdomain} - Status ${item.status_code}`,
        15,
        y,
        180,
        9
      );

      y += 2;
    });
  }

  y += 8;

  // ==============================
  // PORTS
  // ==============================

  checkPage(50);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text("Port & Service Discovery", 15, y);

  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  if (reconnaissance.ports?.ip_address) {
    y = addText(
      `IP Address: ${reconnaissance.ports.ip_address}`,
      15,
      y
    );

    y += 5;
  }

  ports.forEach((port) => {
    checkPage(15);

    y = addText(
      `Port ${port.port} - ${port.service} - ${port.state}`,
      15,
      y,
      180,
      9
    );

    y += 2;
  });

  y += 8;

  // ==============================
  // FINDINGS
  // ==============================

  checkPage(50);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text("Security Findings", 15, y);

  y += 10;

  if (findings.length === 0) {
    y = addText(
      "No significant findings were identified.",
      15,
      y
    );

    y += 8;
  } else {
    findings.forEach(
      (finding, index) => {
        checkPage(50);

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");

        y = addText(
          `${index + 1}. ${
            finding.title ||
            "Security Observation"
          }`,
          15,
          y,
          180,
          11
        );

        y += 3;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        y = addText(
          `Severity: ${
            finding.severity || "LOW"
          }`,
          15,
          y,
          180,
          9
        );

        y += 2;

        y = addText(
          `Description: ${
            finding.description ||
            "No description available."
          }`,
          15,
          y,
          180,
          9
        );

        y += 2;

        y = addText(
          `Recommendation: ${
            finding.recommendation ||
            "Review the identified observation."
          }`,
          15,
          y,
          180,
          9
        );

        y += 8;
      }
    );
  }

  // ==============================
  // RECOMMENDATIONS
  // ==============================

  checkPage(50);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text("Security Recommendations", 15, y);

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  if (recommendations.length === 0) {
    y = addText(
      "No additional recommendations were generated.",
      15,
      y
    );
  } else {
    recommendations.forEach(
      (recommendation, index) => {
        checkPage(20);

        y = addText(
          `${index + 1}. ${recommendation}`,
          15,
          y,
          180,
          9
        );

        y += 4;
      }
    );
  }

  // ==============================
  // FOOTER
  // ==============================

  const totalPages =
    doc.internal.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    doc.setPage(page);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    doc.text(
      "AI Reconnaissance Agent - Authorized Security Assessments Only",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );

    doc.text(
      `Page ${page} of ${totalPages}`,
      pageWidth - 15,
      pageHeight - 10,
      { align: "right" }
    );
  }

  // ==============================
  // DOWNLOAD
  // ==============================

  const safeTarget =
    (result?.target || "scan")
      .replace(/[^a-zA-Z0-9.-]/g, "_");

  doc.save(
    `AI-Reconnaissance-Report-${safeTarget}.pdf`
  );
}