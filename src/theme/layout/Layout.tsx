import styled from "@emotion/styled";
import { Box } from "@mui/material";

export function Layout({ children }) {
  return <LayoutBox>{children}</LayoutBox>;
}

const LayoutBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
}));

export const ContentLayout = styled(Box)({
    padding: '16px'
})
