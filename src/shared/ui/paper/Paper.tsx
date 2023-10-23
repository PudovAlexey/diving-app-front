import styled from "@emotion/styled"
import { Paper as MuiPaper, PaperProps as MuiPaperProps } from "@mui/material"
import { getSize } from "@src/shared/lib/mui/getSize"
import { size } from "./size"
import React, { useMemo } from "react"

export type PaperProps = MuiPaperProps & {
	width?: string | number
	size?: "large" | "medium" | "small" | "xs"
}

function Paper(props: PaperProps) {
	const { children, width, size = "medium", ...otherProps } = props

	const PaperComponent = useMemo(() => StyledPaper(size), [size]);

	const innerWidth = getSize(width)
	return (
		<PaperComponent
			sx={{
				width: innerWidth,
			}}
			{...otherProps}
		>
			{children}
		</PaperComponent>
	)
}

const StyledPaper = (sizing: PaperProps["size"]) =>
	styled(MuiPaper)(({ theme }) => ({
		background: theme.palette.primary.light,
		...size[sizing],
	}))

export { Paper }
