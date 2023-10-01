import { createTheme } from "@mui/material"

const theme = createTheme({
	palette: {
		primary: {
			light: "rgba(255, 255, 255, 0.08)",
			main: "#000214",
			dark: "rgba(255, 255, 255, 0.06)",
			contrastText: "rgba(255, 255, 255, 1)",
		},
		secondary: {
			light: "#ff7961",
			main: "#41424F",
			dark: "#ba000d",
			contrastText: "#ffffff",
		},
		grey: {
			main: "#9A9A9A",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					borderRadius: "40px",
					padding: "0.4rem 4rem",
					fontFamily: "Roboto",
					fontSize: "16px",
					textTransform: "uppercase",
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: ({ hteme }) => ({
					background: theme.palette.primary.dark,
					color: theme.palette.primary.light,
				}),
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: theme.palette.primary.contrastText,
				}),
			},
		},
	},
})

export { theme }
