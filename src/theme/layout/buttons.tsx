import { Button } from "@mui/material";

const PrimaryButton = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export {
    PrimaryButton
}
