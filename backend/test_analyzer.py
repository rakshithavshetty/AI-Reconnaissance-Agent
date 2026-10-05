from ai.groq_analyzer import analyze_recon


recon_data = {

    "target": "authorized-lab.example",

    "ip_addresses": [
        "192.0.2.10"
    ],

    "dns_records": {

        "A": [
            "192.0.2.10"
        ],

        "AAAA": [],

        "MX": [],

        "NS": [],

        "TXT": [],

        "CNAME": []

    },

    "subdomains": [],

    "open_ports": [],

    "technologies": []

}


result = analyze_recon(recon_data)


print("\n")
print("=" * 60)
print("AI RECONNAISSANCE ANALYSIS")
print("=" * 60)
print()

print("Risk Score:")
print(result["risk_score"])

print()

print("Risk Level:")
print(result["risk_level"])

print()

print("Summary:")
print(result["summary"])

print()

print("Findings:")

for finding in result["findings"]:

    print("\nSeverity:", finding["severity"])
    print("Title:", finding["title"])
    print("Description:", finding["description"])
    print("Recommendation:", finding["recommendation"])


print()

print("Recommendations:")

for recommendation in result["recommendations"]:

    print("-", recommendation)