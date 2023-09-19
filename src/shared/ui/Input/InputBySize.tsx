import { Input } from "@mui/material"
import { InputProps } from "./Input"
import styled from "@emotion/styled"

const InputBySize = (size: InputProps["size"]) => {
	const types = {
		"56": {
			"& input": {
				paddingTop: `56px`,
				paddingBottom: `56px`,
			},
		},

		"44": {
			"& input": {
				paddingTop: `44px`,
				paddingBottom: `44px`,
			},
		},

		"32": {
			"& input": {
				paddingTop: `32px`,
				paddingBottom: `32px`,
			},
		},

		"24": {
			"& input": {
				paddingTop: `24px`,
				paddingBottom: `24px`,
			},
		},
	}

	return types[size]
}

export { InputBySize }
