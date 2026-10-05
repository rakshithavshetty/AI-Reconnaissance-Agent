import dns.resolver


def get_dns_records(domain):

    records = {}

    record_types = [
        "A",
        "AAAA",
        "MX",
        "NS",
        "TXT",
        "CNAME"
    ]

    for record_type in record_types:

        try:

            answers = dns.resolver.resolve(
                domain,
                record_type,
                lifetime=5
            )

            records[record_type] = []

            for answer in answers:
                records[record_type].append(str(answer))

        except Exception:

            records[record_type] = []

    return records