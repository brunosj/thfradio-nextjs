const normalizeTagName = (name: string) => {
  // Remove leading and trailing spaces
  let normalized = name.trim();

  // Remove hyphens
  normalized = normalized.replace(/-/g, '');

  // Remove spaces
  normalized = normalized.replace(/\s/g, '');

  // Convert to lowercase
  normalized = normalized.toLowerCase();

  return normalized;
};

export default normalizeTagName;
