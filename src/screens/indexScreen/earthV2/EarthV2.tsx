import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { earthSlice } from "@src/store/slices/earth/earth";
import { useAtomValue, useSetAtom } from "jotai";
import { testPoints } from "./testPoints";
import { getSunrice } from "@src/utils/geo";
import styled from "@emotion/styled";
import { EARTH_CONSTS } from "./constants";
import { transform } from "typescript";

export function EarthV2() {
  const { state, actions } = earthSlice;
  const points = useAtomValue(state.points);
  const isLoading = useAtomValue(state.isCanvasLoading);

  const onInit = useSetAtom(actions.onInit);
  const onExit = useSetAtom(actions.onExit);
  const onAddPoints = useSetAtom(actions.onAddPoints);

  const canvasElement = useRef<HTMLElement>();

  const addTestPoint = () => {
    const point = testPoints;

    onAddPoints({
      points: point,
    });
  };

  useEffect(() => {
    const canvas = canvasElement.current;
    if (!canvas) return;

    onInit({
      points: testPoints,
      canvasElement: canvas,
    });

    return () => {
      onExit();
    };
  }, []);
  return (
    <Root>
      <CanvasBox isLoading={isLoading} ref={canvasElement}>
        <Typography>CANVAS ISN'T SUPPORTING</Typography>
      </CanvasBox>
      <LoadingBox isLoading={isLoading}>
        <CircularProgress color="secondary" />
      </LoadingBox>
    </Root>
  );
}

const Root = styled(Box)({
  overflow: "hidden",
  height: EARTH_CONSTS.SIZE,
  width: EARTH_CONSTS.SIZE,
  position: "relative",
  flex: 'none',
});

const CanvasBox = styled(Box)((theme: { isLoading: boolean }) => {
  return {
    width: EARTH_CONSTS.SIZE,
    height: EARTH_CONSTS.SIZE,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: "transform .3s",
    transform: !theme.isLoading ? "scale(1)" : "scale(0)",
  };
});

const LoadingBox = styled(Box)((theme: { isLoading: boolean }) => {
  return {
    width: EARTH_CONSTS.SIZE,
    height: EARTH_CONSTS.SIZE,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: "transform .3s",
    transform: !theme.isLoading ? "translateY(100vh)" : "translateY(0)",
  };
});
