import React from "react";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ISignInSignUpWrapper {
  children: JSX.Element;
  title: string;
  desc: string;
  linkTo: string;
  linkDesc: string;
}

const styles = {
  container: {
    maxWidth: 600,
  },
  box: {
    textAlign: "center",
  },
  img: {
    width: 150,
  },
};

const SignInSignUpWrapper: React.FC<ISignInSignUpWrapper> = ({
  children,
  title,
  desc,
  linkTo,
  linkDesc,
}) => {
  return (
    <Container maxWidth={false} sx={styles.container}>
      <Box pt={8} sx={styles.box}>
        <img src="./images/logo.png" alt="logo" style={styles.img} />
        <Typography variant="h5" component="h1" mt={8} mb={4}>
          {title}
        </Typography>
        {children}
        <Typography variant="body2" component="p" mt={2}>
          {desc}
        </Typography>
        <Link to={linkTo}>{linkDesc}</Link>
      </Box>
    </Container>
  );
};

export default SignInSignUpWrapper;
