import React from "react"
import { Stack as MuiStack, StackProps as MuiStackProps, styled } from "@mui/material"
import { getSize } from "@src/shared/lib/mui/getSize"

export type StackProps = Omit<MuiStackProps, "width"> & {
	width?: string | number
}
 
function Stack(props: StackProps) {
	const { children, width, ...otherProps } = props

	const innerWidth = getSize(width)

	return (
		<MuiStack {...otherProps} style={{ width: innerWidth }}>
			{children}
		</MuiStack>
	)
}

export { Stack }
