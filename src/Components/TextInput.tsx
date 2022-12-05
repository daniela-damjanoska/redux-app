import React from "react";
import TextField from "@mui/material/TextField";

interface ITextInput {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const styles = {
  marginBottom: { mb: 3 },
};

const TextInput: React.FC<ITextInput> = ({ id, label, value, onChange }) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      fullWidth
      size="small"
      required
      value={value}
      onChange={onChange}
      sx={styles.marginBottom}
    />
  );
};

export default TextInput;
