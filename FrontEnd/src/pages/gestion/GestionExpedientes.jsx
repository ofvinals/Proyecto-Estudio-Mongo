/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '../../context/UseContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import '../../css/Header.css';
import { getExptes, deleteExpte } from '../../hooks/UseExptes.js';
import { Table } from '../../components/Gestion/Table';
import { Detail } from '../../components/Gestion/Detail';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import Loader from '../../components/Loader.jsx';
import Modals from '../../components/Modals.jsx';
import { ExpteForm } from '../../components/Forms/ExpteForm.jsx';
import { DeleteConfirmation } from '../../components/Gestion/DeleteFunction.jsx';

export const GestionExpedientes = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const user = currentUser.email;
	const admin = currentUser.admin;
	const coadmin = currentUser.coadmin;
	const [openNewModal, setopenNewModal] = useState(false);
	const [openEditModal, setopenEditModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [reloadTable, setReloadTable] = useState(false);
	const [loading, setLoading] = useState(true);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [deleteInfo, setDeleteInfo] = useState({
		rowId: null,
		itemDescription: '',
	});
	const handleOpenNewModal = () => {
		setopenNewModal(true);
	};

	const handleOpenEditModal = (rowId) => {
		setopenEditModal(true);
		setRowId(rowId);
	};

	const handleCloseModal = () => {
		setopenNewModal(false);
		setopenEditModal(false);
		setReloadTable((prevState) => !prevState);
	};

	const handleDelete = async (rowId) => {
		try {
			await deleteExpte(rowId);
			setReloadTable((prevState) => !prevState);
		} catch (error) {
			console.error('Error al eliminar:', error);
		}
	};

	useEffect(() => {
		const fetchExptes = async () => {
			try {
				const expedientes = await getExptes();
				const fetchedExptes = expedientes.map((doc) => {
					return { ...doc, _id: doc._id };
				});
				const filteredExptes =
					admin || coadmin
						? fetchedExptes
						: fetchedExptes.filter((expte) => expte.cliente === user);
				setData(filteredExptes);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener expedientes', error);
				setLoading(false);
			}
		};

		fetchExptes();
	}, [reloadTable]);

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
				<Tooltip title='Ver movimientos del expediente' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				navigate(`/gestionmovimientos/${row.original._id}`);
			},
		},
		{
			text: 'Editar',
			icon:
				admin || coadmin ? (
					<Tooltip title='Editar datos del expediente' arrow>
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
				<Tooltip title='Eliminar expediente' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			) : null,
			onClick: (row) => {
				setDeleteInfo({
					rowId: row.original._id,
					itemDescription: 'el expediente',
				});
				setConfirmDelete(true);
			},
		},
	];

	return (
		<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
			<Header />
			<div className=' rounded-xl container-lg mb-1 '>
				<Detail modulo={'Expedientes'} />
			</div>
			<hr className='linea text-white mx-3' />
			<div className='container-lg '>
				<div>
					<div className='flex flex-wrap justify-around my-3'>
						{admin || coadmin ? (
							<button
								type='button'
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[270px] mb-3 border-primary rounded-xl font-semibold'
								onClick={handleOpenNewModal}>
								<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>
								Registrar nuevo expediente
							</button>
						) : null}
						{(admin || coadmin) && (
							<Link
								to='/exptesarchivados'
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 mx-3 border-2 w-[270px] mb-3 border-primary rounded-xl font-semibold'>
								<i className='text-xl pe-2 bi bi-archive'></i>
								Expedientes Archivados
							</Link>
						)}
						{(admin || coadmin) && (
							<Link
								to='/gestioncaducidad'
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 mx-3 border-2 w-[270px] mb-3 border-primary rounded-xl font-semibold'>
								<i className='text-xl pe-2 bi bi-calendar2-x'></i>
								Expedientes a caducar
							</Link>
						)}
						<Link
							to={admin || coadmin ? '/Admin' : '/AdminUsu'}
							className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[200px] mb-3 border-white rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>
					<hr className='linea mx-3' />
					<div>
						<p className='my-4 text-3xl font-extrabold text-center  bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
							Expedientes en Tramite
						</p>
					</div>
					{loading ? (
						<Loader />
					) : (
						<Table
							columns={columns}
							data={data}
							actions={actions}
						/>
					)}
				</div>
			</div>

			<div>
				<Modals
					isOpen={openEditModal}
					onClose={handleCloseModal}
					title='Editar Expediente'>
					<ExpteForm
						rowId={rowId}
						onClose={handleCloseModal}
						mode='edit'
					/>
				</Modals>
				<Modals
					isOpen={openNewModal}
					onClose={handleCloseModal}
					title='Cargar Expediente'
					showSaveButton={false}>
					<ExpteForm
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
