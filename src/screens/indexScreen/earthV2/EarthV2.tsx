import { Box, Button, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { EarthController } from "./EarthController";
import { earthSlice } from "@src/store/slices/earth/earth";
import { useAtomValue, useSetAtom } from "jotai";
import { testPoints } from "./testPoints";
import { getSunrice } from "@src/utils/geo";

export function EarthV2() {
  const { state, actions } = earthSlice;
  const points = useAtomValue(state.points);

  const onInit = useSetAtom(actions.onInit);
  const onExit = useSetAtom(actions.onExit);
  const onAddPoints = useSetAtom(actions.onAddPoints);

  const canvasElement = useRef<HTMLElement>();

  const addTestPoint = () => {
    const point = [{ lat: 0, lon: 0, address: "CHINA" }];

    onAddPoints({
      points: point,
    });
  };

  useEffect(() => {
    (async function () {
      const geo = await getSunrice({lat: 0, lon: 0});

      console.log(geo);
    })();
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
    <Box>
      <Box ref={canvasElement}>
        <Typography>CANVAS ISN'T SUPPORTING</Typography>
      </Box>
      <Button onClick={addTestPoint}>Add test point</Button>
      <Button>remove test point</Button>
    </Box>
  );
}
