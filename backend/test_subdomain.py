from recon.subdomain import find_subdomains


domain = "example.com"

result = find_subdomains(domain)


print("\n")
print("=" * 60)
print("SUBDOMAIN RECONNAISSANCE")
print("=" * 60)


if result:

    for item in result:

        print("\nSubdomain:")
        print(item["subdomain"])

        print("Status Code:")
        print(item["status_code"])

else:

    print("\nNo subdomains discovered.")