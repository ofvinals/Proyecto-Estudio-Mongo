/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../../css/Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useUserActions } from '../../hooks/UseUserActions.js';
import { Table } from '../../components/gestion/Table.jsx';
import { Detail } from '../../components/gestion/Detail.jsx';
import { Header } from '../../components/header/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import { UserForm } from '../../components/forms/UserForm.jsx';
import Modals from '../../utils/Modals.jsx';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';
import useModal from '../../hooks/useModal.js';

export const GestionUsers = () => {
	const { loggedUser } = useAuth();
	const admin = loggedUser.admin;
	const coadmin = loggedUser.coadmin;
	const [rowId, setRowId] = useState(null);
	const { getUsers, deleteUser } = useUserActions();
	const users = useSelector((state) => state.users.users);
	const statusUser = useSelector((state) => state.users.status);
	const statusUpdate = useSelector((state) => state.users.statusUpdate);
	const statusSign = useSelector((state) => state.users.statusSign);
	const viewModal = useModal();
	const editModal = useModal();

	const dataUsers = async () => {
		try {
			await getUsers();
		} catch (error) {
			console.error('Error al obtener usuarios:', error);
		}
	};

	useEffect(() => {
		dataUsers();
	}, [statusUpdate, statusSign]);

	const columns = React.useMemo(
		() => [
			{
				header: 'Nombre',
				accessorKey: 'nombre',
			},
			{
				header: 'Apellido',
				accessorKey: 'apellido',
			},
			{
				header: 'Celular',
				accessorKey: 'celular',
				size: 50,
			},
			{
				header: 'Email',
				accessorKey: 'email',
				size: 50,
			},
			{
				header: 'DNI',
				accessorKey: 'dni',
				size: 50,
			},
			{
				header: 'Estado',
				accessorKey: 'active',
				size: 50,
				Cell: ({ row }) => {
					return row.original.active ? 'Habilitado' : 'Suspendido';
				},
			},
		],
		[]
	);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Ver datos del usuario' arrow>
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
					<Tooltip title='Editar datos del usuario' arrow>
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
			icon: admin ? (
				<Tooltip title='Suspender usuario' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			) : null,
			onClick: (row) => {
				if (!row.original.admin) {
					deleteUser(row.original._id);
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
					<Detail modulo={'Usuarios'} />
				</div>
				<hr className='linea text-white mx-3' />
				<div className='container-lg my-3'>
					<div className='flex justify-around flex-wrap'>
						<Link
							to={admin || coadmin ? '/Admin' : '/AdminUsu'}
							className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>
					<hr className='linea mx-3' />
					<div>
						<p className='mt-3 text-center text-3xl font-semibold my-3 bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
							Usuarios registrados
						</p>
					</div>
					{statusUser === 'Cargando' ? (
						<Loader />
					) : (
						<div className='table-responsive'>
							<Table columns={columns} data={users} actions={actions} />
						</div>
					)}
				</div>

				<div>
					<Modals
						isOpen={editModal.isOpen}
						onClose={editModal.closeModal}
						title='Editar Datos del Usuario'>
						<UserForm
							rowId={rowId}
							onClose={editModal.closeModal}
							mode='edit'
						/>
					</Modals>
					<Modals
						isOpen={viewModal.isOpen}
						onClose={viewModal.closeModal}
						title='Ver Datos del Usuario'>
						<UserForm
							rowId={rowId}
							onClose={viewModal.closeModal}
							mode='view'
						/>
					</Modals>
				</div>
			</section>
		</>
	);
};
