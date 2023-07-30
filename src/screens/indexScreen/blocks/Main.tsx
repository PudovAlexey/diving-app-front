import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { Earth } from "../earth/Earth";
import { ContentLayout } from "@src/theme/layout/Layout";
import { EarthV2 } from "../earthV2/EarthV2";

export function Main() {
  return (
    <ContentLayout>
      <Root>
        <ContentBox>
          <TitlesBlock>
            <PlanetText variant="h1">Planet</PlanetText>
            <Typography variant="h1">EARTH</Typography>
          </TitlesBlock>
          <TextBlock>
            <Typography variant="h2">BECOME A MARTIAN</Typography>
            <Typography color={"secondary"}>
              Embark on an extraordinary journey to Mars and unlock the secrets
              of the Red Planet's captivating landscapes and ancient mysteries
            </Typography>
          </TextBlock>
          <ButtonBox>
            <Button>BOOK TICKET</Button>
            <Button>WATCH VIDEOS</Button>
          </ButtonBox>
        </ContentBox>
        <EarthV2/>
      </Root>
    </ContentLayout>
  );
}

const Root = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "50px",
});

const ContentBox = styled(Box)({});

const TitlesBlock = styled(Box)({
  marginBottom: "50px",
});

const TextBlock = styled(Box)({});

const ButtonBox = styled(Box)({});

const PlanetText = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  position: "relative",
  width: "max-content",
  "&:after": {
    content: '""',
    position: "absolute",
    border: `1px solid ${theme.palette.primary.contrastText}`,
    transform: "rotate(180deg)",
    width: "fill-available",
    display: "block",
  },
}));
