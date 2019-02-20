import Head from 'next/head'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'polished'

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    font-family: 'Roboto', sans-serif;
  }

  body {
    background: #303030;
  }
`

const Container = styled.main`
	align-items: flex-start;
	background-color: ${props => props.theme.palette.backgroundColor};
	color: ${props => props.theme.palette.textColor};
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	margin-top: 7rem;
	min-height: 100vh;
	font-family: 'Roboto', sans-serif;
`

const Nav = styled.nav`
	color: white;
	background: #282828;
	height: 3rem;
	width: 100%;
	padding: 2.3rem;
	font-family: 'Press Start 2P', cursive;
	font-size: 55px;
`

export default ({ children, theme, title = 'Dashboard' }) => (
	<ThemeProvider theme={theme}>
		<>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/static/favicon.png" />
				<link
					href="https://fonts.googleapis.com/css?family=Press+Start+2P|Roboto:300,400,500"
					rel="stylesheet"
				/>

				<script src="https://www.gstatic.com/charts/loader.js" />
			</Head>

			<Nav>Dev Team Dashboard</Nav>

			<Container>{children}</Container>

			<GlobalStyle />
		</>
	</ThemeProvider>
)
