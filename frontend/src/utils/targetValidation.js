function isValidIPv4(target) {
  const parts = target.split(".");

  if (parts.length !== 4) {
    return false;
  }

  return parts.every((part) => {
    if (!/^\d+$/.test(part)) {
      return false;
    }

    const number = Number(part);

    return number >= 0 && number <= 255;
  });
}

function isValidDomain(target) {
  if (target.length > 253) {
    return false;
  }

  if (target.includes(" ")) {
    return false;
  }

  if (target.startsWith(".") || target.endsWith(".")) {
    return false;
  }

  const labels = target.split(".");

  if (labels.length < 2) {
    return false;
  }

  return labels.every((label) => {
    if (
      label.length < 1 ||
      label.length > 63
    ) {
      return false;
    }

    if (
      label.startsWith("-") ||
      label.endsWith("-")
    ) {
      return false;
    }

    return /^[a-zA-Z0-9-]+$/.test(label);
  });
}

export function validateTarget(target) {
  const value = target.trim();

  if (!value) {
    return {
      valid: false,
      message:
        "Please enter a target domain or IP address."
    };
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return {
      valid: false,
      message:
        "Enter only the domain name or IP address, without http:// or https://."
    };
  }

  if (value.includes("/") || value.includes(":")) {
    return {
      valid: false,
      message:
        "Enter only a domain name or IP address."
    };
  }

  if (isValidIPv4(value)) {
    return {
      valid: true,
      type: "IP"
    };
  }

  if (isValidDomain(value)) {
    return {
      valid: true,
      type: "DOMAIN"
    };
  }

  return {
    valid: false,
    message:
      "Please enter a valid domain name or IPv4 address."
  };
}