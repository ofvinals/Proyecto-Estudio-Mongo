/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/Header.css';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getGastos, deleteGasto } from '../../hooks/UseBills.js';
import { Table } from '../../components/Gestion/Table';
import { Detail } from '../../components/Gestion/Detail';
import { VerGasto } from '../../components/Modals/Views/VerGasto';
import { EditarGastos } from '../../components/Modals/Edits/EditarGastos';
import { CargaGastos } from '../../components/Modals/News/CargaGastos';
import { Pagos } from '../../components/Pagos';
import { Box } from '@mui/material';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';

export const GestionGastos = () => {
	const { currentUser } = useAuth();
	const [data, setData] = useState([]);
	const user = currentUser.email;
	const admin = currentUser.admin;
	const coadmin = currentUser.coadmin;
	const [openViewModal, setopenViewModal] = useState(false);
	const [openEditModal, setopenEditModal] = useState(false);
	const [openPayModal, setopenPayModal] = useState(false);
	const [openNewModal, setopenNewModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [reloadTable, setReloadTable] = useState(false);

	const handleOpenNewModal = () => {
		setopenNewModal(true);
	};

	const handleOpenPayModal = () => {
		setopenPayModal(true);
	};

	const handleOpenViewModal = (rowId) => {
		setopenViewModal(true);
		setRowId(rowId);
	};

	const handleOpenEditModal = (rowId) => {
		setopenEditModal(true);
		setRowId(rowId);
	};

	const handleCloseModal = () => {
		setopenViewModal(false);
		setopenEditModal(false);
		setopenPayModal(false);
		setopenNewModal(false);
		setReloadTable((prevState) => !prevState);
	};

	useEffect(() => {
		const loadGastos = async () => {
			try {
				const gastos = await getGastos();
				const fetchedGastos = gastos.map((doc) => {
					return { ...doc, _id: doc._id };
				});
				const filteredByEstado = fetchedGastos.filter(
					(gasto) => gasto.estado !== 'Cancelado'
				);
				const filteredGastos = admin
					? filteredByEstado
					: filteredByEstado.filter((gasto) => gasto.cliente === user);
				setData(filteredGastos);
			} catch (error) {
				console.error('Error al obtener gastos', error);
			}
		};
		loadGastos();
	}, [reloadTable]);

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
				accessorKey: 'fileUrl',
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
				<Tooltip title='Colocar como tarea pendiente' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				handleOpenViewModal(row.original._id);
			},
		},
		{
			text: 'Editar',
			icon: admin || coadmin && (
				<Tooltip title='Colocar como tarea pendiente' arrow>
					<EditIcon color='success' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				handleOpenEditModal(row.original._id);
			},
		},
		{
			text: 'Eliminar',
			icon: admin && (
				<Tooltip title='Colocar como tarea pendiente' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => borrarGasto(row.original._id),
		},
	];

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	// funcion para eliminar gastos
	async function borrarGasto(id) {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion del gasto',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				await deleteGasto(id);
				Swal.fire({
					icon: 'success',
					title: 'Gasto eliminado correctamente',
					showConfirmButton: false,
					timer: 1500,
				});
				setData((prevData) => prevData.filter((gasto) => gasto._id !== id));
			}
		} catch (error) {
			console.error('Error al eliminar el gasto:', error);
		}
	}

	return (
		<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-32'>
			<Header />
			<div className=' rounded-xl container-lg mb-1 '>
				<Detail modulo={'Gastos'} />
			</div>

			<hr className='linea text-white mx-3' />

			<div className='container-lg '>
				<div>
					<div className='flex justify-around flex-row  items-center flex-wrap my-3'>
						{admin || coadmin ? (
							<button
								type='button'
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[210px] mb-3 border-primary rounded-xl font-semibold'
								onClick={() => handleOpenNewModal()}>
								<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>
								Agregar gastos
							</button>
						) : null}

						<button
							type='button'
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[210px] mb-3 border-primary rounded-xl font-semibold'
							onClick={() => handleOpenPayModal()}>
							<i className='text-xl pe-2 bi bi-cash-coin'></i>
							Medios de pago
						</button>

						{admin || coadmin && (
							<Link
								to='/gastosarchivados'
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[210px] mb-3 border-primary rounded-xl font-semibold'>
								<i className='text-xl pe-2 bi bi-archive'></i>
								Gastos Cancelados
							</Link>
						)}
						<Link
							to={admin ? '/Admin' : '/AdminUsu'}
							className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[200px] mb-3 border-white rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>
					<hr className='linea mx-3' />

					<div>
						<p className='my-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
							Gastos Pendientes de Cobro
						</p>
					</div>

					<div className='table-responsive'>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Table
								columns={columns}
								data={data}
								actions={actions}
								borrarGasto={borrarGasto}
							/>
						</ThemeProvider>
					</div>
				</div>
			</div>
			{openPayModal && (
				<Pagos showModal={openPayModal} onClose={handleCloseModal} />
			)}
			{openNewModal && (
				<CargaGastos showModal={openNewModal} onClose={handleCloseModal} />
			)}
			{openViewModal && (
				<VerGasto
					rowId={rowId}
					showModal={openViewModal}
					onClose={handleCloseModal}
				/>
			)}
			{openEditModal && (
				<EditarGastos
					rowId={rowId}
					showModal={openEditModal}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};
