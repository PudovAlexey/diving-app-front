import { Typography, TypographyProps } from "@mui/material"
import React from "react"

type HeadingProps = Omit<TypographyProps, "variant"> & {
	variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	fontType: "primary" | "secondary"
}

function Heading(props: HeadingProps) {
	const { fontType = 'secondary', ...otherProps } = props

	return <Typography sx={{ ...typographyTypes[fontType] }} {...otherProps} />
}

export { Heading }
