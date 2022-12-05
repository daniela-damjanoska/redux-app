import React from "react";
import { useNavigate } from "react-router-dom";
import useHandleInputValue from "../Hooks/useHandleInputValue";

import SignInSignUpWrapper from "../Components/SignInSignUpWrapper";
import TextInput from "../Components/TextInput";
import EmailInput from "../Components/EmailInput";
import PassInput from "../Components/PassInput";

import Button from "@mui/material/Button";

const SignUpPage: React.FC = () => {
  let emailSuccess: boolean | null, passSuccess: boolean | null;

  const { value: firstName, onChange: onChangeFirstName } =
    useHandleInputValue();
  const { value: lastName, onChange: onChangeLastName } = useHandleInputValue();

  const isSignIn = false;

  const navigate = useNavigate();

  const getEmailSuccess = (value: boolean | null) => (emailSuccess = value);
  const getPassSuccess = (value: boolean | null) => (passSuccess = value);

  const fetchAvatarAndNavigate = () => {
    fetch("https://randomuser.me/api")
      .then((data) => data.json())
      .then((data) =>
        localStorage.setItem("avatar", data.results[0].picture.thumbnail)
      )
      .then(() => navigate("/Blog"))
      .catch((err) => alert(err.message));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailSuccess && passSuccess) fetchAvatarAndNavigate();
  };

  return (
    <SignInSignUpWrapper
      title="SIGN UP"
      desc=" Already have an account?"
      linkTo="/"
      linkDesc="Sign in please."
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          id="firstName"
          label="First name"
          value={firstName}
          onChange={onChangeFirstName}
        />
        <TextInput
          id="lastName"
          label="Last name"
          value={lastName}
          onChange={onChangeLastName}
        />
        <EmailInput onGetEmailSuccess={getEmailSuccess} isSignIn={isSignIn} />
        <PassInput onGetPassSuccess={getPassSuccess} isSignIn={isSignIn} />
        <Button variant="contained" type="submit">
          Sign up
        </Button>
      </form>
    </SignInSignUpWrapper>
  );
};

export default SignUpPage;
