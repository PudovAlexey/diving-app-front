import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Logo } from "../icons/Logo";
import { ArcDivider } from "./ArcDivider";
import { ContentLayout } from "@src/theme/layout/Layout";

const headerItems = [
  { pathname: "/", label: "Home" },
  { pathname: "/book", label: "Book" },
  { pathname: "/dive_sites", label: "Dive sites" },
  { pathname: "/help", label: "Help" },
  { pathname: "/contact", label: "Contact" },
];

function Header() {
  const { query } = useRouter();
  return (
    <ContentLayout>
      <Root>
        <ContentWrapper>
          <Logo with={150} height={150} />
          <MenuList>
            {headerItems.map(({ pathname, label }) => (
              <MenuItem key={label} href={pathname}>
                <Typography>{label}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        </ContentWrapper>
        <ArcDivider />
      </Root>
    </ContentLayout>
  );
}

const Root = styled(Box)({
  width: "100%",
});

const ContentWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: 'center'
});

const MenuItem = styled(Link)({
  textTransform: "uppercase",
  textDecoration: "none",
});

const MenuList = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "60%",
});

export { Header };
