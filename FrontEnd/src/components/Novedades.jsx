/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../context/UseContext.jsx';
import '../css/Header.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { Table } from './Gestion/Table.jsx';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { novedadesExpedientes } from '../hooks/useExptesFilter.js';
import { useExpteActions } from '../../hooks/UseExptes.js';
import { useSelector } from 'react-redux';

export const Novedades = () => {
	const { currentUser } = useAuth({});
	const { getExptes } = useExpteActions();
	const [data, setData] = useState([]);
	const navigate = useNavigate();
	const admin = currentUser.admin;
	const coadmin = currentUser.coadmin;
	const user = currentUser.email;
	const exptes = useSelector((state) => state.exptes.exptes);

	useEffect(() => {
		const loadExptes = async () => {
			try {
				getExptes();
				const filteredByClientExptes =
					admin || coadmin
						? exptes
						: exptes.filter((expte) => expte.cliente === user);
				const filteredExpedientes = novedadesExpedientes(
					filteredByClientExptes
				);
				setData(filteredExpedientes);
			} catch (error) {
				console.error('Error al obtener expedientes', error);
			}
		};
		loadExptes();
	}, [user]);

	const columns = useMemo(
		() => [
			{
				header: 'Expte',
				accessorKey: 'nroexpte',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Caratula',
				accessorKey: 'caratula',
				enableColumnOrdering: false,
				size: 300,
			},
			{
				header: 'Fuero',
				accessorKey: 'radicacion',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Juzgado',
				accessorKey: 'juzgado',
				enableColumnOrdering: false,
				size: 50,
			},
		],
		[]
	);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Ver expediente' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				navigate(`/gestionmovimientos/${row.original._id}`);
			},
		},
	];

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<>
			<div className='py-3'>
				<h2 className='mt-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
					Novedades de tus expedientes
				</h2>
				<p className='text-center text-[12px] mb-4'>(Ultimas 48 horas)</p>
				<div className='table-responsive container-lg'>
					<div className='table-responsive'>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Table columns={columns} data={data} actions={actions} />
						</ThemeProvider>
					</div>
				</div>
			</div>
		</>
	);
};
