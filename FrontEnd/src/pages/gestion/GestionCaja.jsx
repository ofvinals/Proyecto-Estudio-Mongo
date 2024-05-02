/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Swal from 'sweetalert2';
import '../../css/Header.css';
import { getCajas, deleteCaja } from '../../hooks/UseCajas.js';
import { Detail } from '../../components/Gestion/Detail.jsx';
import { Table } from '../../components/Gestion/Table';
import { VerCaja } from '../../components/Modals/Views/VerCaja';
import { EditarCajas } from '../../components/Modals/Edits/EditarCajas';
import { CargaCajas } from '../../components/Modals/News/CargaCajas';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';

export const GestionCaja = () => {
	const { currentUser } = useAuth();
	const [data, setData] = useState([]);
	const [openViewModal, setopenViewModal] = useState(false);
	const [openEditModal, setopenEditModal] = useState(false);
	const [openNewModal, setopenNewModal] = useState(false);
	const [reloadTable, setReloadTable] = useState(false);
	const [rowId, setRowId] = useState(null);
	const admin = currentUser.admin;
	const meses = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];

	const handleOpenNewModal = () => {
		setopenNewModal(true);
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
		setopenNewModal(false);
		setopenEditModal(false);
		setReloadTable((prevState) => !prevState);
	};

	useEffect(() => {
		const loadCajas = async () => {
			try {
				const cajas = await getCajas();
				const fetchedCajas = cajas.map((doc) => {
					const cajaData = { ...doc, id: doc.id };
					return cajaData;
				});
				const mesActual = (new Date().getMonth() + 1).toString();
				const cajasMesActual = fetchedCajas.filter((caja) => {
					const mesCaja = caja.mes.toString();
					return mesCaja === mesActual;
				});
				setData(cajasMesActual);
			} catch (error) {
				console.error('Error al obtener caja', error);
			}
		};
		loadCajas();
	}, [reloadTable]);

	const formatValue = (value) => {
		if (value instanceof Date) {
			return value.toLocaleDateString('es-AR');
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

	const calcularSumaPorMes = (tipo, mes, data) => {
		const elementosFiltrados = data.filter(
			(item) => item.tipo === tipo && item.mes === mes
		);
		return elementosFiltrados.reduce((acc, item) => acc + item.monto, 0);
	};

	function renderAggregatedCell(cell, table, data) {
		const mesActual = cell.row.original.mes;
		const totalIngresos = calcularSumaPorMes('INGRESO', mesActual, data);
		const totalEgresos = calcularSumaPorMes('EGRESO', mesActual, data);
		const totalMonto = totalIngresos - totalEgresos;

		return (
			<Box
				sx={{
					fontSize: '16px',
					padding: '5px',
					color: 'success.main',
					fontWeight: 'bold',
				}}>
				Total mes {meses[mesActual - 1]}: {formatValue(totalMonto)}
			</Box>
		);
	}

	const columns = React.useMemo(() => {
		return [
			{
				header: 'Fecha',
				accessorKey: 'fecha',
				Cell: ({ cell }) => <>{formatValue(cell.getValue())}</>,
				size: 50,
			},
			{
				header: 'Mes',
				accessorKey: 'mes',
				show: false,
				Cell: ({ cell }) => <>{meses[cell.getValue() - 1]}</>,
				size: 50,
			},
			{
				header: 'Concepto',
				accessorKey: 'concepto',
				size: 250,
			},
			{
				header: 'Tipo',
				accessorKey: 'tipo',
				size: 50,
			},
			{
				header: 'Monto',
				accessorKey: 'monto',
				size: 50,
				aggregationFn: 'mean',
				AggregatedCell: ({ cell, table }) => (
					<>{renderAggregatedCell(cell, table, data)}</>
				),
				Cell: ({ cell }) => <>{formatValue(cell.getValue())}</>,
			},
			{
				header: 'Adjunto',
				accessorKey: 'fileUrl',
				size: 30,
				Cell: ({ row }) => {
					if (row.original.fileUrl) {
						return <i className='iconavbar bi bi-paperclip'></i>;
					}
					return null;
				},
			},
			{
				header: 'Estado',
				accessorKey: 'estado',
				size: 50,
			},
		];
	}, [data]);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Tarea realizada' arrow>
					<VisibilityIcon color='primary' cursor='pointer'/>
				</Tooltip>
			),
			onClick: (row) => {
				handleOpenViewModal(row.original._id);
			},
		},
		{
			text: 'Editar',
			icon: admin && (
				<Tooltip title='Tarea realizada' arrow>
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
				<Tooltip title='Tarea realizada' arrow>
					<DeleteIcon color='error' cursor='pointer'/>
				</Tooltip>
			),
			onClick: (row) => borrarCaja(row.original._id),
		},
	];

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	// funcion para eliminar movimientos de caja
	async function borrarCaja(id) {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion del movimiento de la caja?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				await deleteCaja(id);
				Swal.close();
				Swal.fire({
					icon: 'success',
					title: 'Movimiento de caja eliminado correctamente',
					showConfirmButton: false,
					timer: 1500,
				});

				setData((prevData) => prevData.filter((caja) => caja._id !== id));
			}
		} catch (error) {
			console.error('Error al eliminar el movimiento:', error);
		}
	}

	return (
		<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3'>
			<Header />
			<div className=' rounded-xl container-lg mb-1 '>
				<Detail modulo={'Caja'} />
			</div>

			<hr className='linea text-white mx-3' />

			<div className='container-lg'>
				<div className='flex justify-around my-3'>
					{admin ? (
						<button
							type='button'
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[210px] mb-3 border-primary rounded-xl font-semibold'
							onClick={() => handleOpenNewModal()}>
							<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>
							Agregar Movimiento
						</button>
					) : null}
					{admin && (
						<Link
							to='/cajasarchivadas'
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[260px] mb-3 border-primary rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-archive'></i>
							Movimientos Archivados
						</Link>
					)}
					<Link
						to={'/admin'}
						className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[210px] mb-3 border-white rounded-xl font-semibold'>
						<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
						Volver al Panel
					</Link>
				</div>

				<hr className='linea mx-3 text-white' />

				<div>
					<p className='my-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
						Movimientos de Caja del mes
					</p>
				</div>
				<div className='table-responsive'>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Table
							columns={columns}
							data={data}
							actions={actions}
							borrarCaja={borrarCaja}
							handleOpenViewModal={handleOpenViewModal}
						/>
					</ThemeProvider>
				</div>
			</div>

			{openNewModal && (
				<CargaCajas showModal={openNewModal} onClose={handleCloseModal} />
			)}
			{openViewModal && (
				<VerCaja
					rowId={rowId}
					showModal={openViewModal}
					onClose={handleCloseModal}
				/>
			)}
			{openEditModal && (
				<EditarCajas
					rowId={rowId}
					showModal={openEditModal}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};
