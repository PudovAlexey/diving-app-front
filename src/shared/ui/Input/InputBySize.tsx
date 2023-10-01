import { InputProps } from "./Input"
import { Typography } from "../typography"

const InputBySize = (size: InputProps["size"]) => {
	const types = {
		"56": {
			"& input": {
				padding: "14px 12px",
				...Typography.sizes.bodySize[1],
			},
		},

		"44": {
			"& input": {
				padding: "8px 12px",
				...Typography.sizes.bodySize[2],
			},
		},

		"32": {
			"& input": {
				padding: "3px 12px",
				...Typography.sizes.bodySize[3],
			},
		},

		"24": {
			"& input": {
				padding: "1px 12px",
				...Typography.sizes.bodySize[4],
			},
		},
	}

	return types[size]
}

export { InputBySize }
