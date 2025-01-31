import React from "react";

type OutputType = "added" | "removed" | "unchanged";

interface IOutoutProps {
  output: {
    value: string;
    type: OutputType;
    lineNumber1?: number;
    lineNumber2?: number;
  }[];
  section: "first" | "second";
}

const Output: React.FC<IOutoutProps> = ({ output, section }) => {
  return (
    <pre className="flex flex-col ">
      {output.map((part, index) => (
        <div
          key={index}
          className={`text-wrap flex gap-x-[1rem] text-sm break-all overflow-w trasnaparent ${
            part.type === "added" && section === "second" ? "bg-green-200" : ""
          } ${
            part.type === "removed" && section === "first" ? "bg-red-200" : ""
          }
          ${part.type === "added" && section === "first" ? "w-0 h-0" : ""}
          ${part.type === "removed" && section === "second" ? "w-0 h-0" : ""}
          `}
        >
          {section === "first" && part.type !== "added" && (
            <TextContent text={part.value} lineNumber={part.lineNumber1} />
          )}
          {section === "second" && part.type !== "removed" && (
            <TextContent text={part.value} lineNumber={part.lineNumber2} />
          )}
        </div>
      ))}
    </pre>
  );
};
interface ITextContentProps {
  text: string;
  lineNumber?: number;
}

const TextContent: React.FC<ITextContentProps> = ({ text, lineNumber }) => {
  return (
    <div className="flex gap-x-2 p-[0.25rem]">
      <p className="text-gray-600">
        {lineNumber !== undefined ? `${lineNumber}: ` : ""}
      </p>
      <p className=""> {text}</p>
    </div>
  );
};

export default Output;
