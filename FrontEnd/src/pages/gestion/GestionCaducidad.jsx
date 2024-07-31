/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../../css/Header.css';
import { filterExpedientes, getExptes } from '../../hooks/UseExptes.js';
import { Table } from '../../components/Gestion/Table.jsx';
import { Detail } from '../../components/Gestion/Detail.jsx';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import Loader from '../../components/Loader.jsx';

export const GestionCaducidad = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loadExptes = async () => {
			try {
				const expedientes = await getExptes();
				const filteredExpedientes = filterExpedientes(expedientes);
				setData(filteredExpedientes);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener expedientes', error);
			}
		};
		loadExptes();
	}, []);

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
			<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
				<Header />
				<div className=' rounded-xl container-lg mb-1 '>
					<Detail modulo={'Expedientes Sin Movimientos'} />
				</div>

				<hr className='linea text-white mx-3' />

				<div className='container-lg'>
					<div className='flex justify-around flex-wrap my-3'>
						<Link
							to='/gestionexpedientes'
							className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[220px] mb-3 border-white rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>

					<hr className='linea mx-3' />

					<h2 className='my-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
						Expedientes con mas de 60 dias sin movimientos
					</h2>
					{loading ? (
						<Loader />
					) : (
						<div className='table-responsive'>
							<ThemeProvider theme={darkTheme}>
								<CssBaseline />
								<Table
									columns={columns}
									data={data}
									actions={actions}
								/>
							</ThemeProvider>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
