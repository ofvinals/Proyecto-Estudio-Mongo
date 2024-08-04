/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '../../hooks/useAuth.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import '../../css/Header.css';
import { useExpteActions } from '../../hooks/UseExptes.js';
import { Table } from '../../components/Gestion/Table';
import { Detail } from '../../components/Gestion/Detail';
import { Header } from '../../components/header/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import Loader from '../../utils/Loader.jsx';
import Modals from '../../utils/Modals.jsx';
import { ExpteForm } from '../../components/Forms/ExpteForm.jsx';
import { useSelector } from 'react-redux';
import useModal from '../../hooks/useModal';
import { filterExpedientes } from '../../hooks/useExptesFilter.js';
import { Button } from 'react-bootstrap';

export const GestionExpedientes = () => {
	const { loggedUser } = useAuth();
	const { getExptes, deleteExpte } = useExpteActions();
	const [viewArchived, setViewArchived] = useState(false);
	const [viewCaducidad, setViewCaducidad] = useState(false);
	const [data, setData] = useState([]);
	const [rowId, setRowId] = useState(null);
	const navigate = useNavigate();
	const exptes = useSelector((state) => state.exptes.exptes);
	const statusExpte = useSelector((state) => state.exptes.status);
	const statusUpdate = useSelector((state) => state.exptes.statusUpdate);
	const statusSign = useSelector((state) => state.exptes.statusSign);
	const editModal = useModal();
	const newModal = useModal();
	const user = loggedUser.email;
	const admin = loggedUser.admin;
	const coadmin = loggedUser.coadmin;

	const dataExptes = async () => {
		try {
			await getExptes();
		} catch (error) {
			console.error('Error al obtener expedientes:', error);
		}
	};

	useEffect(() => {
		dataExptes();
	}, []);

	useEffect(() => {
		const filteredExptes = exptes.filter((expte) =>
			viewArchived
				? expte.estado === 'Terminado'
				: expte.estado !== 'Terminado'
		);
		const finalFilteredExptes =
			admin || coadmin
				? filteredExptes
				: filteredExptes.filter((expte) => expte.cliente === user);
		setData(finalFilteredExptes);
	}, [exptes, viewArchived]);

	useEffect(() => {
		try {
			if (viewCaducidad) {
				const caducadosExptes = filterExpedientes(exptes);
				setData(caducadosExptes);
			} else {
				setData(exptes);
			}
		} catch (error) {
			console.error('Error al obtener expedientes caducados', error);
		}
	}, [exptes, viewCaducidad]);

	useEffect(() => {
		if (statusUpdate === 'Exitoso' || statusSign === 'Exitoso') {
			dataExptes();
		}
	}, [statusUpdate, statusSign]);

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
				setRowId(row.original._id);
				editModal.openModal();
			},
		},
		{
			text: 'Eliminar',
			icon: admin ? (
				<Tooltip title='Eliminar expediente' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			) : null,
			onClick: (row) => deleteExpte(row.original._id),
		},
	];

	return (
		<section className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
			<Header />
			<div className=' rounded-xl container-lg mb-1 '>
				<Detail modulo={'Expedientes'} />
			</div>
			<hr className='linea text-white mx-3' />
			<div className='container-lg '>
				<div>
					<div className='flex flex-wrap justify-around my-3'>
						{admin || coadmin ? (
							<Button
								type='button'
								className='bg-background shadow-3xl btnLogout text-white text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-white rounded-xl font-semibold'
								onClick={() => newModal.openModal()}>
								<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>
								Registrar Nuevo Expediente
							</Button>
						) : null}
						{(admin || coadmin) && (
							<Button
								onClick={() => setViewArchived(!viewArchived)}
								className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'>
								<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
								{viewArchived
									? 'Ver Expedientes en Tramite'
									: 'Ver Expedientes Archivados'}
							</Button>
						)}
						{(admin || coadmin) && (
							<Button
								onClick={() => setViewCaducidad(!viewCaducidad)}
								className='bg-background shadow-3xl btnLogout text-white text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-white rounded-xl font-semibold'>
								<i className='text-xl pe-2 bi bi-calendar2-x'></i>
								{viewCaducidad
									? 'Expedientes en Tramite'
									: 'Expedientes a caducar'}
							</Button>
						)}
						<Link
							to={admin || coadmin ? '/Admin' : '/AdminUsu'}
							className='bg-background shadow-3xl btnLogout text-white text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-white rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>
					<hr className='linea mx-3' />
					<div>
						<p className='my-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
							{viewCaducidad
								? 'Expedientes Proximos a Caducar'
								: viewArchived
								? 'Expedientes Terminados'
								: 'Expedientes en Tramite'}
						</p>
					</div>
					{statusExpte === 'Cargando' ? (
						<Loader />
					) : (
						<div className='table-responsive'>
							<Table columns={columns} data={data} actions={actions} />
						</div>
					)}
				</div>
			</div>

			<div>
				<Modals
					isOpen={editModal.isOpen}
					onClose={editModal.closeModal}
					title='Editar Expediente'>
					<ExpteForm
						rowId={rowId}
						onClose={editModal.closeModal}
						mode='edit'
					/>
				</Modals>
				<Modals
					isOpen={newModal.isOpen}
					onClose={newModal.closeModal}
					title='Registrar Nuevo Expediente'
					showSaveButton={false}>
					<ExpteForm onClose={newModal.closeModal} mode='create' />
				</Modals>
			</div>
		</section>
	);
};
