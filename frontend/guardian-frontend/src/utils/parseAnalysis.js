// frontend/src/utils/parseAnalysis.js
export function parseAnalysis(rawAnalysis) {
  if (!rawAnalysis) return null;

  try {
    // If it's already an object, just return it
    if (typeof rawAnalysis === 'object') return rawAnalysis;

    // If it's a string, clean and parse
    const cleanJson = rawAnalysis
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to parse analysis:", error);
    return null;
  }
}