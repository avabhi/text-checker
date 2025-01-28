import generalUtils from "@/utils/generalUtils";
import React, { ChangeEvent } from "react";

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
  return (
    <>
      <input
        type="file"
        accept=".txt,application/json"
        onChange={(e) => handleFileUpload(e, setFileContent)}
        className="block mb-4"
      />
      <textarea
        className="p-4 border rounded-lg w-full h-40 font-mono"
        placeholder={placeholder}
        value={fileContent || inputValue}
        onChange={(e) => {
          setInput(generalUtils.formatJSON(e.target.value));
          setFileContent("");
        }}
      />
    </>
  );
};

export default InputField;
