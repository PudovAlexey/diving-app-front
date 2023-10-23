import { atom } from "jotai";

 const nameState = atom('', (get, set, value: string) => {
  set(nameState, value)
})

const surnameState = atom('', (get, set, value: string) => {
  set(surnameState, value)
})

const patronymicState = atom('', (get, set, value: string) => {
  set(passwordState, value)
})

const emailState = atom('', (get, set, value: string) => {
  set(emailState, value)
})

const passwordState = atom('', (get, set, value: string) => {
  set(passwordState, value)
})

const confirmPasswordState = atom('', (get, set, value: string) => {
  set(confirmPasswordState, value)
})

export {
  nameState,
  surnameState,
  patronymicState,
  emailState,
  passwordState,
  confirmPasswordState
}