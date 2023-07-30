import { Points } from "@src/types/geo";
import { atom } from "jotai";
import { getSliceById } from "./utils/utils";
import { serialize } from "v8";
import { EarthController } from "@src/screens/indexScreen/earthV2/EarthController";

const initialState = {
  points: atom<Points>([]),
  earthControl: atom(null),
};

export const earthSlice = {
  state: initialState,
  actions: {
    onInit: atom(
      null,
      (
        get,
        set,
        args: {
          points: Points;
          canvasElement: HTMLElement;
        }
      ) => {
        const earth = new EarthController(args.canvasElement);
        set(earthSlice.state.points, args.points);
        earth.init();
        set(earthSlice.state.earthControl, earth);
      }
    ),
    onAddPoints: atom(
      null,
      (
        get,
        set,
        args: {
          points: Points;
        }
      ) => {
        const points = get(earthSlice.state.points);
        const earthControl = get(earthSlice.state.earthControl);

        const newPoints = points.concat(args.points);
        console.log(earthControl, 'POINTS')
        earthControl.addMarkers(newPoints);
        set(earthSlice.state.points, newPoints);
      }
    ),
    onExit: atom(null, (get, set) => {
      earthSlice.state = initialState;
    }),
  },
};
