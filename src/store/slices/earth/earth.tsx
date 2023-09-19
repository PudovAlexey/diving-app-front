import { Points } from "@src/types/geo"
import { atom } from "jotai"
import { EarthController } from "@src/pages/screens/indexScreen/earthV2/EarthController"

const initialState = {
	points: atom<Points>([]),
	earthControl: atom<EarthController | null>(null),
	isCanvasLoading: atom<boolean>(true),
}

export const earthSlice = {
	state: initialState,
	actions: {
		onInit: atom(
			null,
			(
				get,
				set,
				args: {
					points: Points
					canvasElement: HTMLElement
				}
			) => {
				const earth = new EarthController(args.canvasElement)
				set(earthSlice.state.points, args.points)
				set(earthSlice.state.earthControl, earth)

				earth.subscribe("isLoading", isLoading => {
					if (!isLoading) {
						set(earthSlice.state.isCanvasLoading, false)
					}
				})
			}
		),
		onAddPoints: atom(
			null,
			(
				get,
				set,
				args: {
					points: Points
				}
			) => {
				const points = get(earthSlice.state.points)
				const earthControl = get(earthSlice.state.earthControl)

				const newPoints = points.concat(args.points)
				if (earthControl) earthControl.addMarkers(newPoints)
				set(earthSlice.state.points, newPoints)
			}
		),
		onExit: atom(null, (get, set) => {
			const earthControl = get(earthSlice.state.earthControl)
			if (earthControl) earthControl.onExit()
			earthSlice.state = initialState
		}),
	},
}
