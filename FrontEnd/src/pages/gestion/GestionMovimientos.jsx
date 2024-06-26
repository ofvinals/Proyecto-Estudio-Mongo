/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAuth } from '../../context/UseContext.jsx';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import '../../css/Header.css';
import {
	getExpte,
	deleteMov,
	calcularDiasTranscurridos,
} from '../../hooks/UseExptes.js';
import { Table } from '../../components/Gestion/Table';
import { Detail } from '../../components/Gestion/Detail';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import Loader from '../../components/Loader.jsx';
import Modals from '../../components/Modals.jsx';
import { MovForm } from '../../components/Forms/MovForm.jsx';
import { DeleteConfirmation } from '../../components/Gestion/DeleteFunction.jsx';

export const GestionMovimientos = () => {
	const { currentUser } = useAuth();
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [expte, setExpte] = useState([]);
	const [diasCaducidad, setDiasCaducidad] = useState([]);
	const admin = currentUser.admin;
	const coadmin = currentUser.coadmin;
	const [openViewModal, setopenViewModal] = useState(false);
	const [openEditModal, setopenEditModal] = useState(false);
	const [openNewModal, setopenNewModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [reloadTable, setReloadTable] = useState(false);
	const [loading, setLoading] = useState(true);
	const expteId = expte._id;
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [deleteInfo, setDeleteInfo] = useState({
		rowId: null,
		itemDescription: '',
	});

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
	// Función para cerrar el modal
	const handleCloseModal = () => {
		setopenViewModal(false);
		setopenNewModal(false);
		setopenEditModal(false);
		setReloadTable((prevState) => !prevState);
	};

	const handleDelete = async (expteId, rowId) => {
		try {
			await deleteMov(expteId, rowId);
			setReloadTable((prevState) => !prevState);
		} catch (error) {
			console.error('Error al eliminar:', error);
		}
	};

	useEffect(() => {
		const fetchExpte = async () => {
			try {
				const expediente = await getExpte(id);
				setExpte(expediente);
				setData(expediente.movimientos);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener movimientos del expediente', error);
				setLoading(false);
			}
		};
		fetchExpte();
	}, [id, reloadTable]);

	useEffect(() => {
		const fetchExpte = async () => {
			try {
				const diasSinMov = await calcularDiasTranscurridos(id);
				setDiasCaducidad(diasSinMov);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener movimientos del expediente', error);
				setLoading(false);
			}
		};
		fetchExpte();
	}, [id]);

	const columns = React.useMemo(
		() => [
			{
				header: 'Fecha',
				accessorKey: 'fecha',
				size: 50,
			},
			{
				header: 'Descripcion',
				accessorKey: 'descripcion',
				size: 250,
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
		],
		[]
	);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Ver movimiento' arrow>
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
					<Tooltip title='Editar movimiento' arrow>
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
				<Tooltip title='Eliminar movimiento' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			) : null,
			onClick: (row) => {
				setDeleteInfo({
					rowId: row.original._id,
					expteId: expteId,
					itemDescription: 'el movimiento',
				});
				setConfirmDelete(true);
			},
		},
	];

	return (
		<>
			<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
				<Header />
				<div className=' rounded-xl container-lg mb-1 '>
					<Detail modulo={'Movimientos de Expediente'} />
				</div>
				<hr className='linea text-white mx-3' />
				<div className='container-lg'>
					<div className='flex justify-around flex-wrap my-3'>
						{admin || coadmin ? (
							<button
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[220px] mb-3 border-primary rounded-xl font-semibold'
								onClick={() => handleOpenNewModal()}>
								<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>
								Agregar movimiento
							</button>
						) : null}
						<Link
							to='/gestionexpedientes'
							className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[220px] mb-3 border-white rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>
					<hr className='linea mx-3 text-white' />
					<div>
						<h2 className='my-4 text-2xl font-extrabold text-center text-white'>
							Datos del Expediente
						</h2>
						<div className=''>
							<p className='text-white font-medium ml-5 my-2'>
								<u>Nro Expte:</u> {expte.nroexpte}
							</p>
							<p className='text-white font-medium ml-5 my-2'>
								<u>Caratula:</u> {expte.caratula}
							</p>
							<p className='text-white font-medium ml-5 my-2'>
								<u>Fuero:</u> {expte.radicacion}
							</p>
							<p className='text-white font-medium ml-5 my-2'>
								<u>Juzgado:</u> {expte.juzgado}
							</p>
							<p
								className={`text-white font-medium ml-5 my-2 ${
									diasCaducidad > 45 ? 'text-red-500 text-xl' : ''
								}`}>
								<u>Dias sin movimientos:</u> {diasCaducidad}{' '}
								<span>Dias</span>
							</p>
							<p></p>
						</div>
						<hr className='linea mx-3' />
					</div>
					<h2 className='my-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
						Movimientos del Expediente
					</h2>
					{loading ? (
						<Loader />
					) : (
						<Table columns={columns} data={data} actions={actions} />
					)}
				</div>
			</div>

			<div>
				<Modals
					isOpen={openEditModal}
					onClose={handleCloseModal}
					title='Editar Movimiento'>
					<MovForm rowId={rowId} onClose={handleCloseModal} mode='edit' />
				</Modals>
				<Modals
					isOpen={openViewModal}
					onClose={handleCloseModal}
					title='Ver Movimiento'>
					<MovForm rowId={rowId} onClose={handleCloseModal} mode='view' />
				</Modals>
				<Modals
					isOpen={openNewModal}
					onClose={handleCloseModal}
					title='Cargar Movimiento'>
					<MovForm
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
		</>
	);
};
