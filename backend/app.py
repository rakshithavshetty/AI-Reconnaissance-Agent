from flask import Flask, request, jsonify
from flask_cors import CORS

from recon.dns import get_dns_records
from recon.whois import get_whois_info
from recon.subdomain import find_subdomains
from recon.ports import scan_ports
from ai.groq_analyzer import analyze_recon


app = Flask(__name__)

CORS(app)


@app.route("/")
def home():

    return jsonify({
        "message": "AI Reconnaissance Agent API",
        "status": "running"
    })


@app.route("/api/scan", methods=["POST"])
def scan():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "error": "Request body is empty"
            }), 400


        target = data.get("target")

        authorized = data.get("authorized", False)


        if not target:

            return jsonify({
                "success": False,
                "error": "Target is required"
            }), 400


        if authorized is not True:

            return jsonify({
                "success": False,
                "error": "Authorization confirmation is required"
            }), 403


        # -------------------------
        # DNS RECONNAISSANCE
        # -------------------------

        dns_records = get_dns_records(target)

        whois_info = get_whois_info(target)

        subdomains = find_subdomains(target)

        port_scan = scan_ports(target)
        # -------------------------
        # CREATE RECON DATA
        # -------------------------

        recon_data = {

            "target": target,

            "dns_records": dns_records,

            "whois": whois_info,

            "subdomains": subdomains,

            "ports": port_scan

        }


        # -------------------------
        # GROQ AI ANALYSIS
        # -------------------------

        ai_analysis = analyze_recon(recon_data)


        # -------------------------
        # RESPONSE
        # -------------------------

        return jsonify({

            "success": True,

            "target": target,

            "reconnaissance": recon_data,

            "ai_analysis": ai_analysis

        })


    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500


if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )