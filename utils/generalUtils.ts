
const formatJSON = (text: string): string => {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2); // Pretty-print JSON with 2 spaces
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return text; // Return the original text if it's not valid JSON
  }
};

const generalUtils = {
    formatJSON,
}

export default generalUtils;