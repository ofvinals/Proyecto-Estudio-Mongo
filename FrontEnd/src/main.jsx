import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import { AppProvider } from './context/AppContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<ToastProvider>
				<AppProvider>
					<App />
				</AppProvider>
			</ToastProvider>
		</Provider>
	</React.StrictMode>
);
