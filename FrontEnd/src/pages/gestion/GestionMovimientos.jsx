/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import { MovForm } from '../../components/Forms/MovForm.jsx';
import { useSelector } from 'react-redux';
import useModal from '../../hooks/useModal';
import { calcularDiasTranscurridos } from '../../hooks/useExptesFilter.js';
import { Button } from 'react-bootstrap';
import {
	selectExpte,
	selectExpteStatus,
	selectMovStatus,
	selectMov,
} from '../../store/exptes/selectors.js';

export const GestionMovimientos = () => {
	const { loggedUser } = useAuth();
	const { id } = useParams();
	const { getExpte, deleteMov } = useExpteActions();
	const [data, setData] = useState([]);
	const [expteId, setExpteId] = useState([]);
	const [rowId, setRowId] = useState(null);
	const [diasCaducidad, setDiasCaducidad] = useState([]);
	const expte = useSelector(selectExpte);
	const statusExpte = useSelector(selectExpteStatus);
	const statusMov = useSelector(selectMovStatus);
	const mov = useSelector(selectMov);
	const viewModal = useModal();
	const editModal = useModal();
	const newModal = useModal();
	const admin = loggedUser.admin;
	const coadmin = loggedUser.coadmin;

	const dataExpte = async () => {
		try {
			await getExpte(id);
		} catch (error) {
			console.error('Error al obtener movimientos del expediente', error);
		}
	};

	useEffect(() => {
		dataExpte();
	}, []);

	useEffect(() => {
		if (expte) {
			setData(expte.movimientos);
			setExpteId(expte._id);
		}
	}, [statusExpte, statusMov, expte, mov]);

	useEffect(() => {
		const dataCaducidad = async () => {
			try {
				const diasSinMov = await calcularDiasTranscurridos(id);
				setDiasCaducidad(diasSinMov);
			} catch (error) {
				console.error('Error al obtener movimientos del expediente', error);
			}
		};
		dataCaducidad();
	}, []);

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
				accessorKey: 'fileUrl',
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
				setRowId(row.original._id);
				viewModal.openModal();
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
				setRowId(row.original._id);
				editModal.openModal();
			},
		},
		{
			text: 'Eliminar',
			icon: admin ? (
				<Tooltip title='Eliminar movimiento' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			) : null,
			onClick: (row) => deleteMov(row.original._id, expteId),
		},
	];

	return (
		<>
			<section className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
				<Header />
				<div className=' rounded-xl container-lg mb-1 '>
					<Detail modulo={'Movimientos de Expediente'} />
				</div>
				<hr className='linea text-white mx-3' />
				<div className='container-lg'>
					<div className='flex justify-around flex-wrap my-3'>
						{admin || coadmin ? (
							<Button
								className='bg-background shadow-3xl btnLogout text-white text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-white rounded-xl font-semibold'
								onClick={() => newModal.openModal()}>
								<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>
								Agregar Movimiento del Expediente
							</Button>
						) : null}
						<Link
							to='/gestionexpedientes'
							className='bg-background shadow-3xl btnLogout text-white text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-white rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
							Volver al Panel
						</Link>
					</div>
					<hr className='linea mx-3 text-white' />
					{statusExpte === 'Cargando' || !expte ? (
						<Loader />
					) : (
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
							</div>
							<hr className='linea mx-3' />
						</div>
					)}
					<h2 className='my-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
						Movimientos del Expediente
					</h2>

					<div className='table-responsive'>
						<Table columns={columns} data={data} actions={actions} />
					</div>
				</div>
			</section>

			<div>
				<Modals
					isOpen={editModal.isOpen}
					onClose={editModal.closeModal}
					title='Editar Movimiento'>
					<MovForm
						rowId={rowId}
						onClose={editModal.closeModal}
						mode='edit'
					/>
				</Modals>
				<Modals
					isOpen={viewModal.isOpen}
					onClose={viewModal.closeModal}
					title='Ver Movimiento'>
					<MovForm
						rowId={rowId}
						onClose={viewModal.closeModal}
						mode='view'
					/>
				</Modals>
				<Modals
					isOpen={newModal.isOpen}
					onClose={newModal.closeModal}
					title='Cargar Nuevo Movimiento'>
					<MovForm
						rowId={rowId}
						onClose={newModal.closeModal}
						mode='create'
					/>
				</Modals>
			</div>
		</>
	);
};
