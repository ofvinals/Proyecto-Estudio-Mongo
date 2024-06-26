/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAuth } from '../../context/UseContext.jsx';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../css/Header.css';
import { Box } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getGastos } from '../../hooks/UseBills.js';
import { Detail } from '../../components/Gestion/Detail';
import { Table } from '../../components/Gestion/Table';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import Loader from '../../components/Loader.jsx';
import Modals from '../../components/Modals.jsx';
import { GastoForm } from '../../components/Forms/GastoForm.jsx';

export const GastosArchivados = () => {
	const [openViewModal, setopenViewModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const { currentUser } = useAuth();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const admin = currentUser.admin;
	const user = currentUser.user;

	const handleOpenViewModal = (rowId) => {
		setopenViewModal(true);
		setRowId(rowId);
	};

	const handleCloseModal = () => {
		setopenViewModal(false);
	};

	useEffect(() => {
		const loadGastos = async () => {
			try {
				const gastos = await getGastos();
				const fetchedGastos = gastos.map((doc) => {
					return { ...doc, id: doc.id };
				});
				const filteredByEstado = fetchedGastos.filter(
					(gasto) => gasto.estado === 'Cancelado'
				);
				const filteredGastos = admin
					? filteredByEstado
					: filteredByEstado.filter((gasto) => gasto.cliente === user);
				setData(filteredGastos);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener gastos', error);
			}
		};
		loadGastos();
	}, []);

	const formatValue = (value) => {
		if (value instanceof Date) {
			return value.toLocaleDateString('es-ES');
		} else if (value && value.toDate instanceof Function) {
			// Convert Firestore timestamp to Date
			const date = value.toDate();
			return date.toLocaleDateString('es-ES');
		} else {
			return value?.toLocaleString?.('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			});
		}
	};

	const columns = React.useMemo(
		() => [
			{
				header: 'Expte',
				accessorKey: 'nroexpte',
				size: 50,
			},
			{
				header: 'Caratula',
				accessorKey: 'caratula',
				size: 250,
				enableResizing: true,
			},
			{
				header: 'Concepto',
				accessorKey: 'concepto',
				size: 100,
			},
			{
				header: 'Adjunto',
				accessorKey: 'file',
				size: 50,
				Cell: ({ row }) => {
					if (row.original.fileUrl) {
						return <i className='iconavbar bi bi-paperclip'></i>;
					}
					return null;
				},
			},
			{
				header: 'Monto',
				accessorKey: 'monto',
				size: 50,
				Cell: ({ cell }) => <Box>{formatValue(cell.getValue())}</Box>,
			},
			{
				header: 'Estado',
				accessorKey: 'estado',
				size: 50,
			},
		],
		[]
	);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Ver gasto' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				handleOpenViewModal(row.original._id);
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
				<div className=' rounded-xl container-lg mb-1 '>
					<Detail modulo={'Gastos Cancelados'} />
				</div>
				<hr className='linea text-white mx-3' />
				<div className='container-lg'>
					<div className='flex justify-around py-3'>
						<Link
							to={'/gestiongastos'}
							className='bg-background shadow-3xl btnAdmin text-white text-center p-2 border-2 w-[200px] mb-3 border-white rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>
					<hr className='linea mx-3' />
					<div>
						<p className='text-center font-semibold py-3 text-3xl bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
							Gastos Cancelados
						</p>
					</div>
					<Header />
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

			<Modals
				isOpen={openViewModal}
				onClose={handleCloseModal}
				title='Ver Gasto'
				showSaveButton={false}>
				<GastoForm rowId={rowId} onClose={handleCloseModal} mode='view' />
			</Modals>
		</>
	);
};
