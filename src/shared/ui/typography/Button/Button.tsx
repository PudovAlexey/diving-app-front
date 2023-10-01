import { Typography, TypographyProps } from "@mui/material"
import { size } from "./button"
import { typographyTypes } from "../typographyTypes"
import React from "react"

export type ButtonProps = Omit<TypographyProps, "variant"> & {
	variant?: "1" | "2" | "3" | "4"
	fontType?: "primary" | "secondary"
}

function Button(props: ButtonProps) {
	const { fontType = "primary", variant = 2, ...otherProps } = props

	return (
		<Typography
			sx={{ ...typographyTypes[fontType], ...size[variant] }}
			{...otherProps}
		/>
	)
}

export { Button }
