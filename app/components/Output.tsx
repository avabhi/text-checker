import React from "react";

type OutputType = "added" | "removed" | "unchanged";

interface IOutoutProps {
  output: { value: string; type: OutputType }[];
}

const Output: React.FC<IOutoutProps> = ({ output }) => {
  return (
    <pre className="text-lg font-mono">
      {output.map((part, index) => (
        <div
          key={index}
          className={`text-wrap trasnaparent ${
            part.type === "added" ? "bg-green-200" : ""
          } ${part.type === "removed" ? "bg-red-200" : ""}`}
        >
          {part.value}
        </div>
      ))}
    </pre>
  );
};

export default Output;
