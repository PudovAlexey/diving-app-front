import { Typography, TypographyProps } from "@mui/material"
import { size } from './body'
import React from "react"

type HeadingProps = Omit<TypographyProps, "variant"> & {
	variant: "1" | '2' | '3' | '4'
	fontType: "primary" | "secondary"
}

function Body(props: HeadingProps) {
	const { fontType = "primary", variant, ...otherProps } = props

	return (
		<Typography
			sx={{ ...typographyTypes[fontType], ...size[variant] }}
			{...otherProps}
		/>
	)
}

export { Body }
