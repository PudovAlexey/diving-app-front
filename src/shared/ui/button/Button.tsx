import React from "react"
import {
	Button as MuiButton,
	ButtonProps as MuiButtonProps,
} from "@mui/material"
import styled from "@emotion/styled"

export type ButtonProps = MuiButtonProps & {}

function Button(props: ButtonProps) {
	const { children } = props
	return (
		<StyledButton>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			{children}
		</StyledButton>
	)
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: 0,
	position: "relative",
	display: "inline-block",
	padding: "25px 30px",
	margin: "40px 0",
	color: "#03e9f4",
	transition: "0.5s",
	letterSpacing: "4px",
	overflow: "hidden",
	marginRight: "50px",
	"& span": {
		position: "absolute",
		display: "block",
	},

	"&:hover span:nth-child(1)": {
		top: "0",
		left: "0",
		width: "100%",
		height: "2px",
		background: "linear-gradient(90deg,transparent,#03e9f4)",
		animation: "animate1 1s linear infinite",
	},

  "&:hover span:nth-child(2)": {
    top: "-100%",
    right: 0,
    width: "2px",
    height: "100%",
    background: "linear-gradient(180deg,transparent,#03e9f4)",
    animation: "animate2 1s linear infinite",
    animationDelay: "0.25s",
},

"&:hover span:nth-child(3)":{
    bottom: 0,
    right: 0,
    width: '100%',
    height: '2px',
    background: "linear-gradient(270deg,transparent,#03e9f4)",
    animation: 'animate3 1s linear infinite',
    animationDelay: '0.50s',
},

"&:hover span:nth-child(4)":{
    bottom: "-100%",
    left: "0",
    width: '2px',
    height: '100%',
    background: 'linear-gradient(360deg,transparent,#03e9f4)',
    animation: 'animate4 1s linear infinite',
    animationDelay: '0.75s',
},

  "@keyframes animate1":{
    "0%": {
        left: "-100%",
    },
    "50%,100%": {
        left: "100%",
    }
},

"@keyframes animate2": {
    "0%":{
        top: "-100%",
    },
    "50%,100%": {
        top: "100%",
    }
},

"@keyframes animate3":{
    "0%":{
        right: "-100%",
    },
    "50%,100%": {
        right: "100%",
    }
},

"@keyframes animate4": {
    "0%": {
        bottom: "-100%",
    },
    "50%,100%": {
        bottom: "100%",
    },
  }
}))

export { Button }
