import { useState, ChangeEvent } from "react";

export default function useHandleInputValue() {
  const [value, setValue] = useState<string>("");

  const handleValue = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return {
    value,
    onChange: handleValue,
  };
}
