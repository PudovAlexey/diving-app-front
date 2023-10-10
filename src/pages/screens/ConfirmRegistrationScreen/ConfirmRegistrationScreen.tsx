import styled from "@emotion/styled";
import { Box, Paper, Stack } from "@mui/material";
import { Typography } from "@src/shared/ui/typography";
import React from "react";

function ConfirmRegistrationScreen() {
  return (
    <Root>
      <Paper>
        <Stack>
          <Typography.Heading variant="2">
            Пожалуйста подтвердите свою электронную почту
          </Typography.Heading>
        </Stack>
      </Paper>
    </Root>
  );
}

const Root = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // TODO add variable
  height: "calc(100vh - 350px)",
}));

export { ConfirmRegistrationScreen };
