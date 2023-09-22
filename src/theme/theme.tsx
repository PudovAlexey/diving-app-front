import { createTheme } from "@mui/material"

const theme = createTheme({
	palette: {
		primary: {
			light: "rgba(255, 255, 255, 1)",
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
					borderRadius: "12px",
					color: theme.palette.primary.light,
				}),
			},
		},
		MuiTypography: {
			styleOverrides: {
				h1: ({ theme }) => ({
					color: theme.palette.primary.light,
					fontSize: "64px",
					fontStyle: "normal",
					fontWeight: "700",
					lineHeight: "109px",
				}),
				h2: ({ theme }) => ({
					color: theme.palette.primary.light,
					fontSize: "48px",
					fontStyle: "normal",
					fontWeight: "700",
					lineHeight: "76px",
				}),
				h3: ({ theme }) => ({
					color: theme.palette.primary.light,
					fontSize: "40px",
					fontStyle: "normal",
					fontWeight: "700",
					lineHeight: "64px",
				}),
				h4: ({ theme }) => ({
					color: theme.palette.primary.light,
					fontSize: "32px",
					fontStyle: "normal",
					fontWeight: "700",
					lineHeight: "52px",
				}),
				h5: ({ theme }) => ({
					color: theme.palette.primary.light,
					fontSize: "24px",
					fontStyle: "normal",
					fontWeight: "700",
					lineHeight: "41px",
				}),
				h6: ({ theme }) => ({
					color: theme.palette.primary.light,
					fontSize: "18px",
					fontStyle: "normal",
					fontWeight: "700",
					lineHeight: "32px",
				}),
			},
		},
	},
})

export { theme }
