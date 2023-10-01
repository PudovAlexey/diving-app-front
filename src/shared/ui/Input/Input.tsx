import React from "react"
import { Input as MuiInput, InputProps as MuiInputProps } from "@mui/material"
import styled from "@emotion/styled"
import { InputBySize } from "./InputBySize"
import {
	LabelComponent,
	LabelComponentProps,
} from "../labelComponent/LabelComponent"

export type InputProps = Omit<MuiInputProps, "size"> & {
	size?: "56" | "44" | "32" | "24"
	label?: LabelComponentProps["label"]
	validationText?: LabelComponentProps["validationText"]
	validationStatus?: LabelComponentProps['validationStatus']
}

function Input(props: InputProps) {
	const { size, label, required, validationText, validationStatus, ...otherProps } = props
	const InputComponent = StyledInput(size)

	return (
		<LabelComponent validationText={validationText} validationStatus={validationStatus} required={required} label={label}>
			<InputComponent required={required} {...otherProps} />
		</LabelComponent>
	)
}

const StyledInput = (size: InputProps["size"]) =>
	styled(MuiInput)(({}) => InputBySize(size))

export { Input }
