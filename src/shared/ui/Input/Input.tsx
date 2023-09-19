import React from "react"
import { Input as MuiInput, InputProps as MuiInputProps } from "@mui/material"
import styled from "@emotion/styled"
import { InputBySize } from "./InputBySize"

export type InputProps = Omit<MuiInputProps, "size"> & {
	size?: "56" | "44" | "32" | "24"
}

function Input(props: InputProps) {
	const { size, ...otherProps } = props
	const InputComponent = StyledInput(size)

	return <InputComponent {...otherProps} />
}

const StyledInput = (size: InputProps["size"]) =>
	styled(MuiInput)(({}) => InputBySize(size))

export { Input }
