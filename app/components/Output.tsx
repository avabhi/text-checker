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
    <pre className="text-lg font-mono">
      {output.map((part, index) => (
        <div
          key={index}
          className={`text-wrap break-all overflow-w trasnaparent ${
            part.type === "added" ? "bg-green-200" : ""
          } ${part.type === "removed" ? "bg-red-200" : ""}`}
        >
          {section === "first" ? (
            <>
              <span className="text-gray-600">
                {part.lineNumber1 !== undefined ? `${part.lineNumber1}: ` : ""}
              </span>
              {part.type !== "added" && part.value}
            </>
          ) : (
            <>
              <span className="text-gray-600">
                {part.lineNumber2 !== undefined ? `${part.lineNumber2}: ` : ""}
              </span>
              {part.type !== "removed" && part.value}
            </>
          )}

          {/* {part.value} */}
        </div>
      ))}
    </pre>
  );
};

export default Output;
