import React, { useState } from "react";

type InputFormProps = {
  onSubmit: (input: string) => void;
};

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    onSubmit(input);
  };

  return (
    <div className="flex w-full justify-center space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter movie ID"
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default InputForm;
