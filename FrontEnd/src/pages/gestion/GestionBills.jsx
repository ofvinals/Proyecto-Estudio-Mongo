/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { Link } from 'react-router-dom';
import '../../css/Header.css';
import { Box } from '@mui/material';
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useBillActions } from '../../hooks/UseBills.js';
import { Detail } from '../../components/Gestion/Detail.jsx';
import { Table } from '../../components/Gestion/Table.jsx';
import { Header } from '../../components/header/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import Loader from '../../utils/Loader.jsx';
import Modals from '../../utils/Modals.jsx';
import { BillForm } from '../../components/Forms/BillForm.jsx';
import { useSelector } from 'react-redux';
import useModal from '../../hooks/useModal.js';
import { Button } from 'react-bootstrap';
import { Pagos } from '../../components/Pagos.jsx';

export const GestionBills = () => {
	const { loggedUser } = useAuth();
	const { getBills, deleteBill } = useBillActions();
	const [viewArchived, setViewArchived] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [data, setData] = useState([]);
	const bills = useSelector((state) => state.bills.bills);
	const statusBill = useSelector((state) => state.bills.statusBill);
	const statusUpdate = useSelector((state) => state.bills.statusUpdate);
	const statusSign = useSelector((state) => state.bills.statusSign);
	const admin = loggedUser.admin;
	const coadmin = loggedUser.coadmin;
	const user = loggedUser.user;
	const viewModal = useModal();
	const editModal = useModal();
	const newModal = useModal();
	const payModal = useModal();

	const dataBills = async () => {
		try {
			await getBills();
		} catch (error) {
			console.error('Error al obtener gastos:', error);
		}
	};

	useEffect(() => {
		dataBills();
	}, [statusUpdate, statusSign, statusBill]);

	useEffect(() => {
		const filteredGastos = bills.filter((gasto) =>
			viewArchived
				? gasto.estado === 'Pagado'
				: gasto.estado !== 'Pagado'
		);
		const finalFilteredGastos = admin
			? filteredGastos
			: filteredGastos.filter((gasto) => gasto.cliente === user);
		setData(finalFilteredGastos);
	}, []);

	useEffect(() => {
		dataBills();
	}, [viewArchived]);

	const formatValue = (value) => {
		if (value instanceof Date) {
			return value.toLocaleDateString('es-ES');
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
				<Tooltip title='Ver gasto' arrow>
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
					<Tooltip title='Editar gasto' arrow>
						<EditIcon color='success' cursor='pointer' />
					</Tooltip>
				) : null,
			onClick: (row) => {
				if (!row.original.admin) {
					setRowId(row.original._id);
					editModal.openModal();
				} else {
					null;
				}
			},
		},
		{
			text: 'Eliminar',
			icon:
				admin || coadmin ? (
					<Tooltip title='Eliminar gasto' arrow>
						<DeleteIcon color='error' cursor='pointer' />
					</Tooltip>
				) : null,
			onClick: (row) => {
				if (!row.original.admin) {
					deleteBill(row.original._id);
				} else {
					null;
				}
			},
		},
	];

	return (
		<>
			<section className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
				<Header />
				<div className=' rounded-xl container-lg mb-1 '>
					<Detail
						modulo={
							viewArchived ? 'Gastos Cancelados' : 'Gastos Pendientes'
						}
					/>
				</div>
				<hr className='linea text-white mx-3' />
				<div className='container-lg'>
					<div className='flex flex-wrap justify-around py-3'>
						{admin || coadmin ? (
							<Button
								type='button'
								className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'
								onClick={() => newModal.openModal()}>
								<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>
								Registrar Nuevo Gasto
							</Button>
						) : null}
						<Button
							onClick={() => setViewArchived(!viewArchived)}
							className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							{viewArchived
								? 'Ver Gastos Pendientes'
								: 'Ver Gastos Archivados'}
						</Button>
						<Button
							type='button'
							className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'
							onClick={() => payModal.openModal()}>
							<i className='text-xl pe-2 bi bi-cash-coin'></i>
							Medios de pago
						</Button>
						<Link
							to={'/admin'}
							className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>
					<hr className='linea mx-3' />
					<div>
						<p className='text-center font-semibold py-3 text-3xl bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
							{viewArchived ? 'Gastos Cancelados' : 'Gastos Pendientes'}
						</p>
					</div>
					{statusBill === 'Cargando' ? (
						<Loader />
					) : (
						<div className='table-responsive'>
							<Table columns={columns} data={data} actions={actions} />
						</div>
					)}
				</div>
			</section>
			<Modals
				isOpen={editModal.isOpen}
				onClose={editModal.closeModal}
				title='Editar Gasto'>
				<BillForm
					rowId={rowId}
					onClose={editModal.closeModal}
					mode='edit'
				/>
			</Modals>
			<Modals
				isOpen={viewModal.isOpen}
				onClose={viewModal.closeModal}
				title='Ver Gasto'>
				<BillForm
					rowId={rowId}
					onClose={viewModal.closeModal}
					mode='view'
				/>
			</Modals>
			<Modals
				isOpen={newModal.isOpen}
				onClose={newModal.closeModal}
				title='Cargar Nuevo Gasto'>
				<BillForm onClose={newModal.closeModal} mode='create' />
			</Modals>

			<Modals
				isOpen={payModal.isOpen}
				onClose={payModal.closeModal}
				title='Medios de Pago'>
				<Pagos onClose={payModal.closeModal} />
			</Modals>
		</>
	);
};
