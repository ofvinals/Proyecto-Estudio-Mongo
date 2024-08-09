/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import '../../css/Header.css';
import { useCashActions } from '../../hooks/UseCashs.js';
import { Detail } from '../../components/Gestion/Detail.jsx';
import { Table } from '../../components/Gestion/Table.jsx';
import { Header } from '../../components/header/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import Loader from '../../utils/Loader.jsx';
import Modals from '../../utils/Modals.jsx';
import CashForm from '../../components/Forms/CashForm.jsx';
import { useSelector } from 'react-redux';
import useModal from '../../hooks/useModal';
import { months } from '../../helpers/months.js';
import { Button } from 'react-bootstrap';

export const GestionCash = () => {
	const { loggedUser } = useAuth();
	const { getCashs, deleteCash } = useCashActions();
	const [data, setData] = useState([]);
	const [viewArchived, setViewArchived] = useState(false);
	const [rowId, setRowId] = useState(null);
	const cashs = useSelector((state) => state.cashs.cashs);
	const statusCash = useSelector((state) => state.cashs.statusCash);
	const statusUpdate = useSelector((state) => state.cashs.statusUpdate);
	const statusDelete = useSelector((state) => state.cashs.statusDelete);
	const viewModal = useModal();
	const editModal = useModal();
	const newModal = useModal();
	const admin = loggedUser.admin;
	const coadmin = loggedUser.coadmin;

	const dataCashs = async () => {
		try {
			await getCashs();
			const mesActual = (new Date().getMonth() + 1).toString();
			const filteredCashs = cashs.filter((cash) => {
				const mesCash = cash.mes.toString();
				if (viewArchived) {
					return mesCash < mesActual;
				} else {
					return mesCash === mesActual;
				}
			});
			setData(filteredCashs);
		} catch (error) {
			console.error('Error al obtener caja', error);
		}
	};

	useEffect(() => {
		dataCashs();
	}, [viewArchived, statusUpdate, statusDelete]);

	const formatValue = (value) => {
		if (value instanceof Date) {
			return value.toLocaleDateString('es-AR');
		} else if (value && value.toDate instanceof Function) {
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
				Total mes {months[mesActual - 1]}: {formatValue(totalMonto)}
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
				Cell: ({ cell }) => <>{months[cell.getValue() - 1]}</>,
				size: 50,
			},
			{ header: 'Concepto', accessorKey: 'concepto', size: 250 },
			{ header: 'Tipo', accessorKey: 'tipo', size: 50 },
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
			{ header: 'Estado', accessorKey: 'estado', size: 50 },
		];
	}, [data]);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Ver Caja' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				setRowId(row.original._id);
				viewModal.openModal();
			},
		},
		{
			text: 'Editar',
			icon:
				admin || coadmin ? (
					<Tooltip title='Editar Caja' arrow>
						<EditIcon color='success' cursor='pointer' />
					</Tooltip>
				) : null,
			onClick: (row) => {
				setRowId(row.original._id);
				editModal.openModal();
			},
		},
		{
			text: 'Eliminar',
			icon: admin ? (
				<Tooltip title='Eliminar Caja' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			) : null,
			onClick: (row) => deleteCash(row.original._id),
		},
	];

	return (
		<section className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
			<Header />
			<div className=' rounded-xl container-lg mb-1 '>
				<Detail modulo={'Caja'} />
			</div>
			<hr className='linea text-white mx-3' />
			<div className='container-lg'>
				<div className='flex flex-wrap justify-around my-3'>
					{admin || coadmin ? (
						<Button
							type='button'
							className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'
							onClick={() => newModal.openModal()}>
							<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>
							Agregar Movimiento de Caja
						</Button>
					) : null}
					{admin && (
						<Button
							onClick={() => setViewArchived(!viewArchived)}
							className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							{viewArchived ? 'Ver Caja Actual' : 'Ver Cajas Archivadas'}
						</Button>
					)}
					<Link
						to={'/admin'}
						className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'>
						<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
						Volver al Panel
					</Link>
				</div>
				<hr className='linea mx-3 text-white' />
				<div>
					<p className='my-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
						{viewArchived ? 'Cajas Archivadas' : 'Caja del Mes'}
					</p>
				</div>
				{statusCash === 'Cargando' ? (
					<Loader />
				) : (
					<div className='table-responsive'>
						<Table columns={columns} data={data} actions={actions} />
					</div>
				)}
			</div>

			<div>
				<Modals
					isOpen={editModal.isOpen}
					onClose={editModal.closeModal}
					title='Editar Caja'>
					<CashForm
						rowId={rowId}
						onClose={editModal.closeModal}
						mode='edit'
					/>
				</Modals>
				<Modals
					isOpen={viewModal.isOpen}
					onClose={viewModal.closeModal}
					title='Ver Caja'>
					<CashForm
						rowId={rowId}
						onClose={viewModal.closeModal}
						mode='view'
					/>
				</Modals>
				<Modals
					isOpen={newModal.isOpen}
					onClose={newModal.closeModal}
					title='Cargar Caja'>
					<CashForm onClose={newModal.closeModal} mode='create' />
				</Modals>
			</div>
		</section>
	);
};
