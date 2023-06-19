const normalizeTagName = (name: string | null) => {
  if (!name || name.trim() === '') {
    return ''; // Return empty string for null or empty values
  }

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
