import styled from "@emotion/styled"
import { Box, Stack } from "@mui/material"
import { ui } from "@shared/index"
import { Button } from "@src/shared/ui"
import React from "react"

const { Input } = ui

function RegisterScreen() {
	return (
		<RegisterWrapper>
			<Stack width={"50%"} spacing={3}>
				<Input validationText="Привет" required label='почта' fullWidth size='56' />
				<Input required label='Имя' fullWidth size='56' />
				<Input label='Фамилия' fullWidth size='56' />
				<Input label='Отчество' fullWidth size='56' />
				<Input label='пароль' fullWidth size='56' />
				<Input label='Подтвердить пароль' fullWidth size='56' />
				<Stack justifyContent={"end"} spacing={2} width='100%' direction='row'>
					<Button>Зарегистрироваться</Button>
				</Stack>
			</Stack>
		</RegisterWrapper>
	)
}

const RegisterWrapper = styled(Box)(() => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	// TODO add variable
	height: "calc(100vh - 350px)",
}))

export { RegisterScreen }
