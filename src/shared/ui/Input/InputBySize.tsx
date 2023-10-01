import { Input } from "@mui/material"
import { InputProps } from "./Input"
import { Typography } from "../typography"
import styled from "@emotion/styled"

const InputBySize = (size: InputProps["size"]) => {
	const types = {
		"56": {
			"& input": {
				paddingTop: `14px`,
				paddingBottom: `14px`,
				...Typography.sizes.bodySize[1]
			},
		},

		"44": {
			"& input": {
				paddingTop: `8px`,
				paddingBottom: `8px`,
				...Typography.sizes.bodySize[2]
			},
		},

		"32": {
			"& input": {
				paddingTop: `3px`,
				paddingBottom: `3px`,
				...Typography.sizes.bodySize[3]
			},
		},

		"24": {
			"& input": {
				paddingTop: `1px`,
				paddingBottom: `1px`,
				...Typography.sizes.bodySize[4]
			},
		},
	}

	return types[size]
}

export { InputBySize }
