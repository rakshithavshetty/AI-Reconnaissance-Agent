from recon.dns import get_dns_records


domain = "example.com"

result = get_dns_records(domain)

print("\n========== DNS RECONNAISSANCE ==========\n")

for record_type, values in result.items():

    print(f"{record_type}:")

    if values:

        for value in values:
            print(f"  {value}")

    else:
        print("  No records found")