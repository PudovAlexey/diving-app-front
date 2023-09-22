import { Typography, TypographyProps } from "@mui/material"
import { captionSize } from "./caption"
import React from "react"

type HeadingProps = Omit<TypographyProps, "variant"> & {
	variant: "1" | "2" | "3" | "4"
	fontType: "primary" | "secondary"
}

function Caption(props: HeadingProps) {
	const { fontType = 'primary', variant, ...otherProps } = props

	return (
		<Typography
			sx={{ ...typographyTypes[fontType], ...captionSize[variant] }}
			{...otherProps}
		/>
	)
}

export { Caption }
