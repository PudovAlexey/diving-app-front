import { Typography, styled } from "@mui/material";

const PrimaryTypography = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};

const SecondaryTypography = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};
