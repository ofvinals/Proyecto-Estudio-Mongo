/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/UseContext.jsx';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import '../../css/Header.css';
import { getCajas, deleteCaja } from '../../hooks/UseCajas.js';
import { Detail } from '../../components/Gestion/Detail.jsx';
import { Table } from '../../components/Gestion/Table';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import Loader from '../../components/Loader.jsx';
import Modals from '../../components/Modals.jsx';
import CajaForm from '../../components/Forms/CajaForm.jsx';
import { DeleteConfirmation } from '../../components/Gestion/DeleteFunction.jsx';

export const GestionCaja = () => {
	const { currentUser } = useAuth();
	const [data, setData] = useState([]);
	const [openViewModal, setopenViewModal] = useState(false);
	const [openEditModal, setopenEditModal] = useState(false);
	const [openNewModal, setopenNewModal] = useState(false);
	const [reloadTable, setReloadTable] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [deleteInfo, setDeleteInfo] = useState({
		rowId: null,
		itemDescription: '',
	});
	const [loading, setLoading] = useState(true);
	const [rowId, setRowId] = useState(null);
	const admin = currentUser.admin;
	const coadmin = currentUser.coadmin;
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

	const handleDelete = async (rowId) => {
		try {
			await deleteCaja(rowId);
			setReloadTable((prevState) => !prevState);
		} catch (error) {
			console.error('Error al eliminar:', error);
		}
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
				setLoading(false);
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
				<Tooltip title='Ver Item de Caja' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				handleOpenViewModal(row.original._id);
			},
		},
		{
			text: 'Editar',
			icon:
				admin || coadmin ? (
					<Tooltip title='Editar Item de Caja' arrow>
						<EditIcon color='success' cursor='pointer' />
					</Tooltip>
				) : null,
			onClick: (row) => {
				handleOpenEditModal(row.original._id);
			},
		},
		{
			text: 'Eliminar',
			icon: admin ? (
				<Tooltip title='Eliminar Item de Caja' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			) : null,
			onClick: (row) => {
				setDeleteInfo({
					rowId: row.original._id,
					itemDescription: 'la Caja',
				});
				setConfirmDelete(true);
			},
		},
	];

	return (
		<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
			<Header />
			<div className=' rounded-xl container-lg mb-1 '>
				<Detail modulo={'Movimientos de Caja'} />
			</div>
			<hr className='linea text-white mx-3' />
			<div className='container-lg'>
				<div className='flex flex-wrap justify-around my-3'>
					{admin || coadmin ? (
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
				{loading ? (
					<Loader />
				) : (
					<Table
						columns={columns}
						data={data}
						actions={actions}
						handleOpenViewModal={handleOpenViewModal}
					/>
				)}
			</div>

			<div>
				<Modals
					isOpen={openEditModal}
					onClose={handleCloseModal}
					title='Editar Caja'>
					<CajaForm rowId={rowId} onClose={handleCloseModal} mode='edit' />
				</Modals>
				<Modals
					isOpen={openViewModal}
					onClose={handleCloseModal}
					title='Ver Caja'>
					<CajaForm rowId={rowId} onClose={handleCloseModal} mode='view' />
				</Modals>
				<Modals
					isOpen={openNewModal}
					onClose={handleCloseModal}
					title='Cargar Caja'>
					<CajaForm
						rowId={rowId}
						onClose={handleCloseModal}
						mode='create'
					/>
				</Modals>
				{confirmDelete && (
					<DeleteConfirmation
						rowId={deleteInfo.rowId}
						itemDescription={deleteInfo.itemDescription}
						onDelete={handleDelete}
						onCancel={() => setConfirmDelete(false)} 
					/>
				)}
			</div>
		</div>
	);
};
