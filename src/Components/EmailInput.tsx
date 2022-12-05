import React, { useState } from "react";
import useHandleInputValue from "../Hooks/useHandleInputValue";

import TextField from "@mui/material/TextField";

interface IEmailInput {
  onGetEmailSuccess: (emailSuccess: boolean | null) => void;
  isSignIn: boolean;
}

const styles = {
  marginBotttom: {
    mb: 3,
  },
};

const EmailInput: React.FC<IEmailInput> = ({ onGetEmailSuccess, isSignIn }) => {
  const [emailSuccess, setEmailSuccess] = useState<boolean | null>(null),
    [helperTextEmail, setHelperTextEmail] = useState<string>("");

  const { value: email, onChange } = useHandleInputValue();

  const validateEmailSignUp = () => {
    if (!email) return;
    if (
      !email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      setEmailSuccess(false);
      setHelperTextEmail("Please enter a valid e-mail address");
    } else {
      setEmailSuccess(true);
      localStorage.setItem("email", JSON.stringify(email));
    }
  };

  const validateEmailSignIn = () => {
    if (!email) return;

    // @ts-ignore
    const emailFromLS = JSON.parse(localStorage.getItem("email"));

    if (emailFromLS && emailFromLS === email) {
      setEmailSuccess(true);
    } else {
      setEmailSuccess(false);
      setHelperTextEmail("The e-mail address does not exist, please try again");
    }
  };

  onGetEmailSuccess(emailSuccess);

  return (
    <TextField
      id="email"
      label="Email"
      variant="outlined"
      fullWidth
      size="small"
      required
      error={emailSuccess === false ? true : false}
      helperText={emailSuccess === false ? helperTextEmail : ""}
      onBlur={
        isSignIn ? () => validateEmailSignIn() : () => validateEmailSignUp()
      }
      onFocus={() => setEmailSuccess(null)}
      value={email}
      onChange={onChange}
      sx={styles.marginBotttom}
    />
  );
};

export default EmailInput;
