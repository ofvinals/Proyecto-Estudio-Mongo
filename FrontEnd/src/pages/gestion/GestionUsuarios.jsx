import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../../css/Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getUsers, deleteUser } from '../../hooks/UseUsers.js';
import { Table } from '../../components/Gestion/Table';
import { Detail } from '../../components/Gestion/Detail';
import { VerUsu } from '../../components/Modals/Views/VerUsu';
import { EditarUsu } from '../../components/Modals/Edits/EditarUsu';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';

export const GestionUsuarios = () => {
	const { currentUser } = useAuth();
	const [data, setData] = useState([]);
	const admin = currentUser.admin;
	const [openViewModal, setopenViewModal] = useState(false);
	const [openEditModal, setopenEditModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [reloadTable, setReloadTable] = useState(false);

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
		setReloadTable((prevState) => !prevState);
	};

	useEffect(() => {
		const fetchUsuarios = async () => {
			try {
				const usuarios = await getUsers();
				const fetchedUsuarios = usuarios.map((doc) => {
					return { ...doc, _id: doc._id };
				});
				setData(fetchedUsuarios);
			} catch (error) {
				console.error('Error al obtener usuarios:', error);
			}
		};
		fetchUsuarios();
	}, [reloadTable]);

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
				handleOpenViewModal(row.original._id);
			},
		},
		{
			text: 'Editar',
			icon: admin && (
				<Tooltip title='Editar datos del usuario' arrow>
					<EditIcon color='success' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				if (!row.original.admin) {
				handleOpenEditModal(row.original._id);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'No puedes editar los datos este usuario',
					text: 'Este usuario no puede ser editado.',
				});
			}}
		},
		{
			text: 'Eliminar',
			icon: admin && (
				<Tooltip title='Suspender usuario' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				if (!row.original.admin) {
					borrarUsuario(row.original._id);
				} else {
					Swal.fire({
						icon: 'error',
						title: 'No puedes suspender este usuario',
						text: 'Este usuario no puede ser suspendido ni eliminado.',
					});
				}
			},
		},
	];
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	// funcion para eliminar usuarios
	async function borrarUsuario(id) {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion del usuario',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				await deleteUser(id);
				Swal.fire({
					icon: 'success',
					title: 'Usuario eliminado correctamente',
					showConfirmButton: false,
					timer: 1500,
				});

				setData((prevData) => prevData.filter((users) => users._id !== id));
			}
		} catch (error) {
			console.error('Error al eliminar el usuario:', error);
		}
	}

	return (
		<>
			<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3'>
				<Header />
				<div className=' rounded-xl container-lg mb-1 '>
					<Detail modulo={'Usuarios'} />
				</div>
				<hr className='linea text-white mx-3' />

				<div className='container-lg my-3'>
					<div className='flex justify-around flex-wrap'>
						<Link
							to={admin ? '/Admin' : '/AdminUsu'}
							className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[200px] mb-3 border-white rounded-xl font-semibold'>
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
					<div className='table-responsive'>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Table
								columns={columns}
								data={data}
								actions={actions}
								borrarUsuario={borrarUsuario}
							/>
						</ThemeProvider>
					</div>
				</div>
				{openViewModal && (
					<VerUsu
						rowId={rowId}
						showModal={openViewModal}
						onClose={handleCloseModal}
					/>
				)}
				{openEditModal && (
					<EditarUsu
						rowId={rowId}
						showModal={openEditModal}
						onClose={handleCloseModal}
					/>
				)}
			</div>
		</>
	);
};
