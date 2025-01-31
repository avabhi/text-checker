import { DiffPart } from "@/types/schema";

const formatJSON = (text: string): string => {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2); // Pretty-print JSON with 2 spaces
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return text; // Return the original text if it's not valid JSON
  }
};

const findIdentity = (data: DiffPart[]) => {
  let result = true;
  data.forEach((part) => {
    if (part.type === "added" || part.type === "removed") {
      result = false;
      return;
    }
  });
  return result;
};

const generalUtils = {
    formatJSON,
    findIdentity
}



export default generalUtils;