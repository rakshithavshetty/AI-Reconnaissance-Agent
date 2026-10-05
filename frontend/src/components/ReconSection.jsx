function ReconSection({ reconnaissance }) {
  if (!reconnaissance) {
    return null;
  }

  const dnsRecords = reconnaissance.dns_records || {};
  const whois = reconnaissance.whois || {};
  const subdomains = reconnaissance.subdomains || [];
  const ports = reconnaissance.ports || {};

  const formatKey = (key) => {
    return key
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <section className="recon-section">
      <div className="section-heading">
        <div>
          <span className="section-label">
            RECONNAISSANCE DATA
          </span>

          <h2>Reconnaissance Details</h2>

          <p>
            Technical information collected from the
            authorized target.
          </p>
        </div>

        <div className="section-icon">
          🔎
        </div>
      </div>

      {/* DNS RECORDS */}

      <div className="recon-card">
        <div className="recon-card-header">
          <div className="recon-card-title">
            <div className="recon-icon">
              🌐
            </div>

            <div>
              <h3>DNS Records</h3>
              <p>
                Domain name system records discovered
                for the target.
              </p>
            </div>
          </div>

          <span className="recon-count">
            {Object.values(dnsRecords).reduce(
              (total, records) =>
                total + (records?.length || 0),
              0
            )}{" "}
            records
          </span>
        </div>

        <div className="dns-grid">
          {Object.entries(dnsRecords).map(
            ([recordType, values]) => (
              <div
                className="dns-item"
                key={recordType}
              >
                <div className="dns-type">
                  {recordType}
                </div>

                {values && values.length > 0 ? (
                  <div className="dns-values">
                    {values.map((value, index) => (
                      <span
                        className="dns-value"
                        key={index}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="dns-empty">
                    No records found
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* WHOIS */}

      <div className="recon-card">
        <div className="recon-card-header">
          <div className="recon-card-title">
            <div className="recon-icon">
              📋
            </div>

            <div>
              <h3>WHOIS Information</h3>
              <p>
                Domain registration information
                retrieved from WHOIS.
              </p>
            </div>
          </div>
        </div>

        {whois.error ? (
          <div className="recon-empty">
            <span>⚠️</span>

            <div>
              <strong>
                WHOIS information unavailable
              </strong>

              <p>
                The WHOIS information could not be
                retrieved for this target.
              </p>

              <small>{whois.error}</small>
            </div>
          </div>
        ) : Object.keys(whois).length > 0 ? (
          <div className="whois-grid">
            {Object.entries(whois).map(
              ([key, value]) => (
                <div
                  className="whois-item"
                  key={key}
                >
                  <span className="whois-label">
                    {formatKey(key)}
                  </span>

                  <span className="whois-value">
                    {String(value)}
                  </span>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="recon-empty">
            <span>ℹ️</span>

            <div>
              <strong>
                No WHOIS information available
              </strong>

              <p>
                No WHOIS data was returned for this
                target.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SUBDOMAINS */}

      <div className="recon-card">
        <div className="recon-card-header">
          <div className="recon-card-title">
            <div className="recon-icon">
              🔗
            </div>

            <div>
              <h3>Discovered Subdomains</h3>
              <p>
                Subdomains identified during
                reconnaissance.
              </p>
            </div>
          </div>

          <span className="recon-count">
            {subdomains.length} found
          </span>
        </div>

        {subdomains.length > 0 ? (
          <div className="table-container">
            <table className="recon-table">
              <thead>
                <tr>
                  <th>Subdomain</th>
                  <th>Status Code</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {subdomains.map(
                  (item, index) => (
                    <tr key={index}>
                      <td className="domain-cell">
                        {item.subdomain}
                      </td>

                      <td>
                        {item.status_code}
                      </td>

                      <td>
                        <span
                          className={
                            item.status_code >= 200 &&
                            item.status_code < 400
                              ? "status-success"
                              : "status-warning"
                          }
                        >
                          {item.status_code >= 200 &&
                          item.status_code < 400
                            ? "Reachable"
                            : "Response Received"}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="recon-empty">
            <span>🔍</span>

            <div>
              <strong>
                No subdomains discovered
              </strong>

              <p>
                No subdomains were identified from
                the configured reconnaissance checks.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* PORTS */}

      <div className="recon-card">
        <div className="recon-card-header">
          <div className="recon-card-title">
            <div className="recon-icon">
              🔌
            </div>

            <div>
              <h3>Port & Service Discovery</h3>
              <p>
                Network services observed during
                the configured port checks.
              </p>
            </div>
          </div>

          {ports.results && (
            <span className="recon-count">
              {
                ports.results.filter(
                  (port) => port.state === "open"
                ).length
              }{" "}
              open
            </span>
          )}
        </div>

        {ports.ip_address && (
          <div className="ip-address">
            <span>IP ADDRESS</span>

            <strong>
              {ports.ip_address}
            </strong>
          </div>
        )}

        {ports.error ? (
          <div className="recon-empty">
            <span>⚠️</span>

            <div>
              <strong>
                Port discovery unavailable
              </strong>

              <p>{ports.error}</p>
            </div>
          </div>
        ) : ports.results &&
          ports.results.length > 0 ? (
          <div className="table-container">
            <table className="recon-table">
              <thead>
                <tr>
                  <th>Port</th>
                  <th>Service</th>
                  <th>State</th>
                </tr>
              </thead>

              <tbody>
                {ports.results.map(
                  (item, index) => (
                    <tr key={index}>
                      <td className="port-number">
                        {item.port}
                      </td>

                      <td>
                        {item.service}
                      </td>

                      <td>
                        <span
                          className={`port-status port-${item.state}`}
                        >
                          <span className="status-dot"></span>

                          {item.state
                            .charAt(0)
                            .toUpperCase() +
                            item.state.slice(1)}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="recon-empty">
            <span>🔌</span>

            <div>
              <strong>
                No port information available
              </strong>

              <p>
                No port results were returned from
                the configured checks.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReconSection;