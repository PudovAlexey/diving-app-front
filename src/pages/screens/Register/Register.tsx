import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { ui } from "@shared/index"
import { Button, Paper, Stack } from "@src/shared/ui"
import React from "react"

const { Input } = ui

function RegisterScreen() {
	return (
		<Root>
			<Paper width={"50vw"}>
				<Stack alignItems={'center'} spacing={5} direction={'row'}>
					<Box>Тут картиночка</Box>
					<Stack justifyContent='center' spacing={3}>
						<Stack direction={"row"} spacing={1} justifyContent={"center"}>
							<Input required label='Имя' fullWidth size='56' />
							<Input label='Фамилия' fullWidth size='56' />
						</Stack>
						<Input label='Отчество' fullWidth size='56' />
						<Input required label='почта' fullWidth size='56' />
						<Stack direction={"row"} spacing={1} justifyContent={"center"}>
							<Input label='пароль' fullWidth size='56' />
							<Input label='Подтвердить пароль' fullWidth size='56' />
						</Stack>
						<Stack
							justifyContent={"end"}
							spacing={2}
							width='100%'
							direction='row'
						>
							<Button>Зарегистрироваться</Button>
						</Stack>
					</Stack>
				</Stack>
			</Paper>
		</Root>
	)
}

const Root = styled(Box)(() => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	// TODO add variable
	height: "calc(100vh - 350px)",
}))

export { RegisterScreen }
