import styled from "@emotion/styled"
import { Box, Stack } from "@mui/material"
import { ui } from "@shared/index"
import React from "react"

const { Input } = ui

function RegisterScreen() {
	return (
		<RegisterWrapper>
			<Stack width={"50%"} spacing={2}>
				<Input fullWidth size='56' />
				<Input fullWidth size='56' />
			</Stack>
		</RegisterWrapper>
	)
}

const RegisterWrapper = styled(Box)(() => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}))

export { RegisterScreen }
