"use client";
import React, { useState, ChangeEvent } from "react";
import { diffLines, Change } from "diff";
import InputField from "./components/InputField";
import Output from "./components/Output";

type DiffPart = {
  value: string;
  type: "added" | "removed" | "unchanged";
  lineNumber1?: number;
  lineNumber2?: number;
};

export default function Home() {
  const [file1Content, setFile1Content] = useState<string>("");
  const [file2Content, setFile2Content] = useState<string>("");
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [diffOutput, setDiffOutput] = useState<DiffPart[]>([]);

  const formatJSON = (text: string): string => {
    try {
      const parsed = JSON.parse(text);
      return JSON.stringify(parsed, null, 2); // Pretty-print JSON with 2 spaces
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return text; // Return the original text if it's not valid JSON
    }
  };

  const handleFileUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    setFileContent: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      setFileContent(formatJSON(text));
    }
  };

  const handleCompare = () => {
    const text1 = formatJSON(file1Content || input1).split("\n");
    const text2 = formatJSON(file2Content || input2).split("\n");

    const diff: Change[] = diffLines(text1.join("\n"), text2.join("\n"));
    const diffParts: DiffPart[] = [];

    let lineNumber1 = 1;
    let lineNumber2 = 1;

    diff.forEach((part) => {
      const lines = part.value.split("\n").filter((line) => line !== "");
      lines.forEach((line) => {
        if (part.added) {
          diffParts.push({ value: line, type: "added", lineNumber2 });
          lineNumber2++;
        } else if (part.removed) {
          diffParts.push({ value: line, type: "removed", lineNumber1 });
          lineNumber1++;
        } else {
          diffParts.push({
            value: line,
            type: "unchanged",
            lineNumber1,
            lineNumber2,
          });
          lineNumber1++;
          lineNumber2++;
        }
      });
    });

    setDiffOutput(diffParts);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">
        Text and JSON Difference Finder
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
        {/* Left Input */}
        <div>
          <InputField
            fileContent={file1Content}
            setFileContent={setFile1Content}
            inputValue={input1}
            setInput={setInput1}
            handleFileUpload={handleFileUpload}
            placeholder="Enter text or upload a file"
          />
        </div>

        {/* Right Input */}
        <div>
          <InputField
            fileContent={file2Content}
            setFileContent={setFile2Content}
            inputValue={input2}
            setInput={setInput2}
            handleFileUpload={handleFileUpload}
            placeholder="Enter text or upload a file"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 text-white font-medium px-6 py-2 mt-4 rounded-lg hover:bg-blue-600"
        onClick={handleCompare}
      >
        Compare
      </button>
      <div className="mt-6 grid grid-cols-2 gap-6 w-full ">
        {/* Left Diff Output */}
        <div className="p-4 border rounded-lg bg-white">
          <h2 className="text-xl font-bold mb-4">File 1 / JSON Differences:</h2>
          <Output output={diffOutput} section="first" />
        </div>
        {/* Right Diff Output */}
        <div className="p-4 border rounded-lg bg-white">
          <h2 className="text-xl font-bold mb-4">File 2 / JSON Differences:</h2>
          <Output output={diffOutput} section="second" />
        </div>
      </div>
    </div>
  );
}
