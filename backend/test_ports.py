from recon.ports import scan_ports


target = "example.com"

result = scan_ports(target)


print("\n")
print("=" * 60)
print("PORT & SERVICE RECONNAISSANCE")
print("=" * 60)

print("\nTarget:")
print(result.get("target"))

print("\nIP Address:")
print(result.get("ip_address"))

print("\nPorts:")

for item in result.get("results", []):
    print(
        f"Port {item['port']} | "
        f"{item['service']} | "
        f"{item['state']}"
    )