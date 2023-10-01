import { Typography, TypographyProps } from "@mui/material"
import { size } from './heading';
import React from "react"

type HeadingProps = Omit<TypographyProps, "variant"> & {
	variant: "1" | "2" | "3" | "4" | "5" | "6"
	fontType: "primary" | "secondary"
}

function Heading(props: HeadingProps) {
	const { fontType = 'secondary', variant, ...otherProps } = props

	return <Typography sx={{ ...typographyTypes[fontType], ...size[variant] }} {...otherProps} />
}

export { Heading }
