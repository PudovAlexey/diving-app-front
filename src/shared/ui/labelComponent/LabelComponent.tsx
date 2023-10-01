import { Box, Stack } from "@mui/material"
import React, { PropsWithChildren } from "react"
import { CaptionProps, Caption } from "../typography/Caption/Caption"

export type LabelComponentProps = {
	label?: React.ReactNode | string
	labelSize?: CaptionProps["variant"]
}

function LabelComponent(props: PropsWithChildren<LabelComponentProps>) {
	const { label, labelSize, children } = props
	return (
		<Box>
			<Stack>
				<Caption variant={labelSize}>{label}</Caption>
				{children}
			</Stack>
		</Box>
	)
}

export { LabelComponent }
