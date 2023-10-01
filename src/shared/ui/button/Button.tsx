import React from "react"
import {
	Button as MuiButton,
	ButtonProps as MuiButtonProps,
} from "@mui/material"
import styled from "@emotion/styled"
import { buttonBySize } from "./buttonBySize"

export type ButtonProps = Omit<MuiButtonProps, "size"> & {
	size?: "56" | "44" | "32" | "24"
}

function Button(props: ButtonProps) {
	const { children, size = "44" } = props

	const ButtonComponent = StyledButton(size)

	return (
		<ButtonComponent>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			{children}
		</ButtonComponent>
	)
}

const StyledButton = (size: ButtonProps["size"]) =>
	styled(MuiButton)(({ theme }) => ({
		padding: "25px 30px",
		position: "relative",
		display: "inline-block",
		...buttonBySize[size],
		color: theme.palette.primary.contrastText,
		transition: "0.5s",
		overflow: "hidden",
		"& span": {
			position: "absolute",
			display: "block",
		},

		"&:hover span:nth-child(1)": {
			top: "0",
			left: "0",
			width: "100%",
			height: "2px",
			background: `linear-gradient(90deg,transparent, ${theme.palette.primary.contrastText})`,
			animation: "animate1 1s linear infinite",
		},

		"&:hover span:nth-child(2)": {
			top: "-100%",
			right: 0,
			width: "2px",
			height: "100%",
			background: `linear-gradient(180deg,transparent,${theme.palette.primary.contrastText})`,
			animation: "animate2 1s linear infinite",
			animationDelay: "0.25s",
		},

		"&:hover span:nth-child(3)": {
			bottom: 0,
			right: 0,
			width: "100%",
			height: "2px",
			background: `linear-gradient(270deg,transparent,${theme.palette.primary.contrastText})`,
			animation: "animate3 1s linear infinite",
			animationDelay: "0.50s",
		},

		"&:hover span:nth-child(4)": {
			bottom: "-100%",
			left: "0",
			width: "2px",
			height: "100%",
			background: `linear-gradient(360deg,transparent,${theme.palette.primary.contrastText})`,
			animation: "animate4 1s linear infinite",
			animationDelay: "0.75s",
		},

		"@keyframes animate1": {
			"0%": {
				left: "-100%",
			},
			"50%,100%": {
				left: "100%",
			},
		},

		"@keyframes animate2": {
			"0%": {
				top: "-100%",
			},
			"50%,100%": {
				top: "100%",
			},
		},

		"@keyframes animate3": {
			"0%": {
				right: "-100%",
			},
			"50%,100%": {
				right: "100%",
			},
		},

		"@keyframes animate4": {
			"0%": {
				bottom: "-100%",
			},
			"50%,100%": {
				bottom: "100%",
			},
		},
	}))

export { Button }
