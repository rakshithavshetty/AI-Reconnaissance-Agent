import requests


def find_subdomains(domain):

    # Small list for the first version.
    # Later we can expand this.
    common_subdomains = [
        "www",
        "mail",
        "api",
        "dev",
        "test",
        "admin",
        "blog",
        "staging"
    ]

    discovered = []

    for subdomain in common_subdomains:

        full_domain = f"{subdomain}.{domain}"

        try:

            response = requests.get(
                f"https://{full_domain}",
                timeout=3
            )

            discovered.append({
                "subdomain": full_domain,
                "status_code": response.status_code
            })

        except requests.RequestException:

            # Domain may exist without accepting HTTPS,
            # so we don't consider it discovered here.
            continue

    return discovered