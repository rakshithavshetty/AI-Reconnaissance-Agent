from recon.whois import get_whois_info


domain = "example.com"

result = get_whois_info(domain)


print("\n")
print("=" * 60)
print("WHOIS RECONNAISSANCE")
print("=" * 60)


for key, value in result.items():

    print(f"\n{key}:")
    print(value)