export type DiffPart = {
    value: string;
    type: "added" | "removed" | "unchanged";
    lineNumber1?: number;
    lineNumber2?: number;
  };