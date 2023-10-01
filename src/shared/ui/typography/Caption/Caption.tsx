import { Typography, TypographyProps } from "@mui/material"
import { typographyTypes } from "../typographyTypes"
import { size } from "./caption"
import React from "react"

export type CaptionProps = Omit<TypographyProps, "variant"> & {
	variant?: "1" | "2" | "3" | "4"
	fontType?: "primary" | "secondary"
}

function Caption(props: CaptionProps) {
	const { fontType = "primary", variant = 2, ...otherProps } = props

	return (
		<Typography
			sx={{ ...typographyTypes[fontType], ...size[variant] }}
			{...otherProps}
		/>
	)
}

export { Caption }
