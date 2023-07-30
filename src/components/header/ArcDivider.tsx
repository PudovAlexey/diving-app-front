import styled from "@emotion/styled";
import { Box, useTheme } from "@mui/material";

export function ArcDivider() {
  const { palette } = useTheme();
  return (
    <Root>
      <svg
      fill="rgba(0,0,0,0)"
      width={"100%"}
      height={"50px"}
      viewBox="0 0 220 100"
    >
      <rect
        fill="gray"
        x={"-1379"}
        y={"100px"}
        stroke={palette.primary.contrastText}
        width="1200"
        height="1"
      />
      <rect
        fill="gray"
        x={"0vw"}
        y={"0px"}
        stroke={palette.primary.contrastText}
        width="100vw"
        height="1"
      />

      <TransformRect
        fill="gray"
        x={"0vw"}
        y={"0px"}
        stroke={palette.primary.contrastText}
        width="100vw"
        height="1"
      />
    </svg>
    </Root>
  );
}

const TransformRect = styled("rect")({
  transform: "rotate(150deg)",
});

const Root = styled(Box)({
  position: 'relative',
})
