import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/globalStyles.js';
import AppPovider from './hooks/index.jsx';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './config/stripeConfig.js';
import { ThemeProvider } from 'styled-components';
import { standardTheme } from './styles/themes/standard.js';
import { Router } from './routes/index.jsx';


ReactDom.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={standardTheme}>
			<AppPovider>
				<Elements stripe={stripePromise}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</Elements>
				<GlobalStyles />
				<ToastContainer autoClose={3000} theme="colored" />
			</AppPovider>
		</ThemeProvider>
	</React.StrictMode>,
);
