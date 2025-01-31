import generalUtils from "@/utils/generalUtils";
import React, { ChangeEvent, useRef, useEffect, useState } from "react";

interface IInputFieldProps {
  fileContent: string;
  placeholder: string;
  setFileContent: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleFileUpload: (
    event: ChangeEvent<HTMLInputElement>,
    setFileContent: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
}

const InputField: React.FC<IInputFieldProps> = ({
  fileContent,
  setFileContent,
  inputValue,
  setInput,
  handleFileUpload,
  placeholder,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);

  // Function to sync scrolling between textarea and line numbers
  const handleScrollSync = () => {
    if (textAreaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  // Function to update line numbers dynamically
  useEffect(() => {
    const lines = (fileContent || inputValue)
      .split("\n")
      .map((_, i) => `${i + 1}`);
    setLineNumbers(lines);
  }, [fileContent, inputValue]);

  return (
    <div className="relative w-full">
      {/* File Upload */}
      <input
        type="file"
        accept=".txt,application/json"
        onChange={(e) => handleFileUpload(e, setFileContent)}
        className="mb-4 block cursor-pointer file:bg-blue-500 file:text-white file:px-3 file:py-1 file:border-none file:rounded-md"
      />

      <div className="relative flex border rounded-lg overflow-hidden">
        {/* Line Numbers */}
        <div
          ref={lineNumberRef}
          className="no-scrollbar bg-gray-200 text-right font-mono text-sm pr-2 py-4 overflow-auto scroll-"
          style={{
            minWidth: "50px",
            height: "200px",
            lineHeight: "1.5rem",
          }}
        >
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Text Input Area */}
        <textarea
          ref={textAreaRef}
          className="p-4 border-l w-full font-mono text-sm resize-none overflow-auto"
          style={{
            height: "200px",
            lineHeight: "1.5rem",
          }}
          placeholder={placeholder}
          value={fileContent || inputValue}
          onChange={(e) => {
            setInput(generalUtils.formatJSON(e.target.value));
            setFileContent("");
          }}
          onScroll={handleScrollSync}
        />
      </div>
    </div>
  );
};

export default InputField;
