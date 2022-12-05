import React from "react";
import { useNavigate } from "react-router-dom";

import EmailInput from "../Components/EmailInput";
import PassInput from "../Components/PassInput";
import SignInSignUpWrapper from "../Components/SignInSignUpWrapper";

import Button from "@mui/material/Button";

const SignInPage: React.FC = () => {
  let emailSuccess: boolean | null, passSuccess: boolean | null;

  const isSignIn = true;

  const navigate = useNavigate();

  const getEmailSuccess = (value: boolean | null) => (emailSuccess = value);
  const getPassSuccess = (value: boolean | null) => (passSuccess = value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailSuccess && passSuccess) navigate("/Blog");
  };

  return (
    <SignInSignUpWrapper
      title="SIGN IN"
      desc="Don't have an account yet?"
      linkTo="/SignUp"
      linkDesc="Sign up now, it is free"
    >
      <form onSubmit={handleSubmit}>
        <EmailInput onGetEmailSuccess={getEmailSuccess} isSignIn={isSignIn} />
        <PassInput onGetPassSuccess={getPassSuccess} isSignIn={isSignIn} />
        <Button variant="contained" type="submit">
          Sign in
        </Button>
      </form>
    </SignInSignUpWrapper>
  );
};

export default SignInPage;
