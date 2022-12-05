import React, { useState } from "react";
import useHandleInputValue from "../Hooks/useHandleInputValue";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";

interface IPassInput {
  onGetPassSuccess: (passwordSuccess: boolean | null) => void;
  isSignIn: boolean;
}

const styles = {
  marginBotttom: {
    mb: 7,
  },
};

const PassInput: React.FC<IPassInput> = ({ onGetPassSuccess, isSignIn }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false),
    [passwordSuccess, setPasswordSuccess] = useState<boolean | null>(null),
    [helperTextPassword, setHelperTextPassword] = useState<string>("");

  const { value: password, onChange } = useHandleInputValue();

  const validatePasswordSignUp = () => {
    if (!password) return;

    if (password.length < 8) {
      setPasswordSuccess(false);
      setHelperTextPassword("Password must be at least 8 characters");
    } else if (!password.match(/^(?=.*?[#!@$%^&*]).{8,}$/)) {
      setPasswordSuccess(false);
      setHelperTextPassword(
        "Password must contains at least one of this characters: !@#$%^&*"
      );
    } else if (password.length > 32) {
      setPasswordSuccess(false);
      setHelperTextPassword("Password must be less than 32 characters");
    } else {
      setPasswordSuccess(true);
      localStorage.setItem("password", JSON.stringify(password));
    }
  };

  const validatePasswordSignIn = () => {
    if (!password) return;

    // @ts-ignore
    const passFromLS = JSON.parse(localStorage.getItem("password"));

    if (passFromLS === password) {
      setPasswordSuccess(true);
    } else {
      setPasswordSuccess(false);
      setHelperTextPassword("Your password is incorrect, please try again");
    }
  };

  onGetPassSuccess(passwordSuccess);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      size="small"
      required
      sx={styles.marginBotttom}
    >
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? "text" : "password"}
        value={password}
        error={passwordSuccess === false ? true : false}
        onBlur={
          isSignIn
            ? () => validatePasswordSignIn()
            : () => validatePasswordSignUp()
        }
        onFocus={() => setPasswordSuccess(null)}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {passwordSuccess === false && (
        <FormHelperText error id="password-error">
          {helperTextPassword}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PassInput;
