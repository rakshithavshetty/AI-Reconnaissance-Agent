import socket


DEFAULT_PORTS = {
    22: "SSH",
    80: "HTTP",
    443: "HTTPS",
    3306: "MySQL",
    5432: "PostgreSQL",
    8080: "HTTP-Alt"
}


def scan_ports(target, ports=None):
    if ports is None:
        ports = DEFAULT_PORTS

    results = []

    try:
        ip_address = socket.gethostbyname(target)
    except socket.gaierror as e:
        return {
            "error": f"Unable to resolve target: {str(e)}",
            "target": target,
            "results": []
        }

    for port, service in ports.items():
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)

        try:
            result = sock.connect_ex((ip_address, port))

            if result == 0:
                results.append({
                    "port": port,
                    "service": service,
                    "state": "open"
                })
            else:
                results.append({
                    "port": port,
                    "service": service,
                    "state": "closed"
                })

        except socket.error:
            results.append({
                "port": port,
                "service": service,
                "state": "error"
            })

        finally:
            sock.close()

    return {
        "target": target,
        "ip_address": ip_address,
        "results": results
    }