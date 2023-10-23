import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { ui } from "@shared/index"
import { Button, Paper, Stack } from "@src/shared/ui"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import React, { useMemo, useState } from "react"
import { confirmPasswordState, emailState, nameState, passwordState, patronymicState, surnameState } from "../modal/registerSlice"

const { Input } = ui

function RegisterScreen() {
	const [nameValue, setNameValue] = useAtom(nameState)
	const [surnameValue, setSurnameValue] = useAtom(surnameState)
	const [patronymicValue, setPatronymicValue] = useAtom(patronymicState)
	const [emailStateValue, setEmailStateValue] = useAtom(emailState)
	const [passwordStateValue, setPasswordStateValue] = useAtom(passwordState)
	const [confirmPasswordValue, setconfirmPasswordValueValue] = useAtom(confirmPasswordState)

	return (
		<Root>
			<Paper width={"50vw"}>
				<Stack alignItems={'center'} spacing={5} direction={'row'}>
					<Box>Тут картиночка</Box>
					<Stack justifyContent='center' spacing={3}>
						<Stack direction={"row"} spacing={1} justifyContent={"center"}>
							<Input onChange={(e) => setNameValue(e.target.value)} value={nameValue} required label='Имя' fullWidth size='56' />
							<Input onChange={(e) => setSurnameValue(e.target.value)} value={surnameValue} label='Фамилия' fullWidth size='56' />
						</Stack>
						<Input onChange={(e) => setPatronymicValue(e.target.value)} value={patronymicValue} label='Отчество' fullWidth size='56' />
						<Input onChange={(e) => setEmailStateValue(e.target.value)} value={emailStateValue} required label='почта' fullWidth size='56' />
						<Stack direction={"row"} spacing={1} justifyContent={"center"}>
							<Input type="password" onChange={(e) => setPasswordStateValue(e.target.value)} value={passwordStateValue} label='пароль' fullWidth size='56' />
							<Input type="password" onChange={(e) => setconfirmPasswordValueValue(e.target.value)} value={confirmPasswordValue} label='Подтвердить пароль' fullWidth size='56' />
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
