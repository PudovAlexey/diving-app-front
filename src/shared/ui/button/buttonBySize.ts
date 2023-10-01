import { Typography } from "../typography"

const buttonBySize = {
	"56": {
		padding: "16px 44px",
    		borderRadius: 0,
		...Typography.sizes.buttonSize[1],
	},
	"44": {
		padding: "10px 24px",
    		borderRadius: 0,
		...Typography.sizes.buttonSize[2],
	},
	"32": {
		padding: "5px 12px",
    		borderRadius: 0,
		...Typography.sizes.buttonSize[3],
	},
	"24": {
		padding: "2px 6px",
    		borderRadius: 0,
		...Typography.sizes.buttonSize[4],
	},
}

export { buttonBySize }
