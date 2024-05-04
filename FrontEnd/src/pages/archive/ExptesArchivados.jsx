import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../../css/Header.css';
import { getExptes } from '../../hooks/UseExptes.js';
import { Detail } from '../../components/Gestion/Detail';
import { Table } from '../../components/Gestion/Table';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';

export const ExptesArchivados = () => {
	const [data, setData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const expedientes = await getExptes();
				const fetchedExptes = expedientes.map((doc) => {
					return { ...doc, id: doc.id };
				});
				const filteredByEstado = fetchedExptes.filter(
					(expte) => expte.estado === 'Terminado'
				);
				setData(filteredByEstado);
			} catch (error) {
				console.error('Error al obtener expedientes archivados', error);
			}
		};
		fetchData();
	}, []);

	const columns = React.useMemo(
		() => [
			{
				header: 'Nro Expte',
				accessorKey: 'nroexpte',
			},
			{
				header: 'Caratula',
				accessorKey: 'caratula',
			},
			{
				header: 'Fuero',
				accessorKey: 'radicacion',
			},
			{
				header: 'Juzgado',
				accessorKey: 'juzgado',
			},
		],
		[]
	);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Ver expediente' arrow>
					<VisibilityIcon color='primary' cursor='pointer'/>
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
			<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-32'>
				<Header />
				<div className=' rounded-xl container-lg mb-1 '>
					<Detail modulo={'Expedientes Archivados'} />
				</div>

				<hr className='linea text-white mx-3' />
				<div className='container-lg'>
					<div className='flex justify-around py-3'>
						<Link
							to='/gestionexpedientes'
							className='bg-background shadow-3xl btnAdmin text-white text-center p-2 border-2 w-[190px] mb-3 border-white rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>
					<hr className='linea mx-3' />

					<div>
						<p className='font-semibold py-3 text-3xl text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
							Expedientes Archivados
						</p>
					</div>

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
