import { Box, Stack, TypographyProps, useTheme } from "@mui/material"
import React, { PropsWithChildren } from "react"
import { CaptionProps, Caption } from "../typography/Caption/Caption"
import styled from "@emotion/styled"

export type LabelComponentProps = {
	label?: React.ReactNode | string
	labelSize?: CaptionProps["variant"]
	required?: boolean
	validationText?: string | React.ReactNode
	validationStatus?: "error" | "warning"
}

function LabelComponent(props: PropsWithChildren<LabelComponentProps>) {
	const {
		label,
		labelSize,
		required,
		validationText,
		validationStatus = "error",
		children,
	} = props

	const { palette } = useTheme()
	return (
		<LabelComponentWrapper>
			<Stack>
				<Stack direction='row' spacing={1}>
					<Caption variant={labelSize}>{label}</Caption>
					{required && (
						<sub>
							<Caption color={palette.error.main}>*</Caption>
						</sub>
					)}
				</Stack>
				{children}
				{validationText && (
					<ValidationTextWrapper>
						<Caption color={palette?.[validationStatus]?.main} variant='3'>
							{validationText}
						</Caption>
					</ValidationTextWrapper>
				)}
			</Stack>
		</LabelComponentWrapper>
	)
}

const LabelComponentWrapper = styled(Box)({
	position: "relative",
})

const ValidationTextWrapper = styled(Box)({
	position: "absolute",
	bottom: "-25px",
	left: "10px",
})

export { LabelComponent }
