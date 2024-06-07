/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../css/Header.css';
import CheckIcon from '@mui/icons-material/Check';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { getNotas, updateNota, createNota } from '../hooks/UseNotes.js';
import { Table } from '../components/Gestion/Table';
import Tooltip from '@mui/material/Tooltip';

export const Notas = () => {
	const [notas, setNotas] = useState();
	const [notasPendientes, setNotasPendientes] = useState([]);
	const [notasArchivadas, setNotasArchivadas] = useState([]);
	const [data, setData] = useState([notasPendientes]);
	const [mostrarNotasPendientes, setMostrarNotasPendientes] = useState(true);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const toggleMostrarNotas = () => {
		setMostrarNotasPendientes(!mostrarNotasPendientes);
		if (mostrarNotasPendientes) {
			setData(notasArchivadas);
		} else {
			setData(notasPendientes);
		}
	};

	useEffect(() => {
		const loadNotas = async () => {
			try {
				const notas = await getNotas();
				if (notas) {
					const notasArray = notas.map((doc) => {
						return { ...doc, id: doc._id };
					});
					const notasPendientes = notasArray.filter(
						(nota) => nota.estado === 'Pendiente'
					);
					const notasArchivadas = notasArray.filter(
						(nota) => nota.estado === 'Archivado'
					);
					setNotasArchivadas(notasArchivadas);
					setNotasPendientes(notasPendientes);
				} else {
					console.error('No se encontraron notas');
				}
			} catch (error) {
				console.error('Error al obtener notas:', error);
			}
		};
		loadNotas();
	}, [notas]);

	const onSubmit = handleSubmit(async (values) => {
		values.estado = 'Pendiente';
		await createNota(values);
		const updatedNotas = await getNotas();
		const updatedNotasArray = updatedNotas.map((doc) => {
			return { ...doc, id: doc._id };
		});
		setNotas(updatedNotasArray);
		Swal.fire({
			icon: 'success',
			title: 'Nota Registrada!',
			showConfirmButton: false,
			timer: 1500,
		});
		reset();
	});

	// funcion para archivar notas
	async function archivarNota(id) {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas el archivo de la nota?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, archivar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				await updateNota(id, { estado: 'Archivado' });
				Swal.fire({
					icon: 'success',
					title: 'Nota archivada correctamente',
					showConfirmButton: false,
					timer: 1500,
				});
				const updatedNotas = await getNotas();
				const updatedNotasArray = updatedNotas.map((doc) => ({
					...doc,
					id: doc._id,
				}));
				const updatedNotasPendientes = updatedNotasArray.filter(
					(nota) => (nota.estado = 'Pendiente')
				);
				setNotasPendientes(updatedNotasPendientes);
				setNotas(updatedNotasArray);
			}
		} catch (error) {
			console.error('Error al eliminar la nota:', error);
		}
	}

	// funcion para desarchivar notas
	async function desarchivarNota(id) {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas el desarchivo de la nota?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, desarchivar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				await updateNota(id, { estado: 'Pendiente' });
				Swal.fire({
					icon: 'success',
					title: 'Nota desarchivada correctamente',
					showConfirmButton: false,
					timer: 1500,
				});
				const updatedNotas = await getNotas();
				const updatedNotasArray = updatedNotas.map((doc) => ({
					...doc,
					id: doc._id,
				}));
				const updatedNotasPendientes = updatedNotasArray.filter(
					(nota) => (nota.estado = 'Pendiente')
				);
				setNotasPendientes(updatedNotasPendientes);
				setNotas(updatedNotasArray);
			}
		} catch (error) {
			console.error('Error al eliminar la nota:', error);
		}
	}

	const columns = React.useMemo(() => {
		return [
			{
				header: 'Fecha',
				accessorKey: 'fecha',
				size: 50,
			},
			{
				header: 'Responsable',
				accessorKey: 'responsable',
				show: false,
				size: 50,
			},
			{
				header: 'Recordatorio',
				accessorKey: 'recordatorio',
				size: 250,
			},
		];
	}, []);

	const actions = mostrarNotasPendientes
		? [
				{
					text: 'Check',
					icon: (
						<Tooltip title='Tarea realizada' arrow>
							<CheckIcon color='success' cursor='pointer' />
						</Tooltip>
					),
					onClick: (row) => archivarNota(row.original._id),
				},
		  ]
		: [
				{
					text: 'NoCheck',
					icon: (
						<Tooltip title='Colocar como tarea pendiente' arrow>
							<PendingActionsIcon color='warning' cursor='pointer' />
						</Tooltip>
					),
					onClick: (row) => desarchivarNota(row.original._id),
				},
		  ];

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<>
			<div className='py-3'>
				<hr className='linea text-white mx-3' />
				<h2 className='my-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
					Tablero de Notas y Recordatorios
				</h2>
				<Form
					className=' flex flex-col sm:flex-row flex-wrap justify-evenly items-center'
					onSubmit={onSubmit}>
					<Form.Group className='w-50% mb-3' controlId='resp'>
						<Form.Label className='text-white font-medium'>
							Responsable
						</Form.Label>
						<select
							className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
							type='text'
							{...register('responsable', {
								required: {
									value: true,
									message: 'El responsable es requerido',
								},
							})}>
							<option value=''>Selecciona..</option>
							<option value='OSCAR'>OSCAR</option>
							<option value='JORGE'>JORGE</option>
							<option value='MARIA'>MARIA</option>
						</select>
						{errors.responsable && (
							<span className='error-message'>
								{errors.responsable.message}
							</span>
						)}
					</Form.Group>
					<Form.Group className='mb-3' controlId='record'>
						<Form.Label className='text-white font-medium'>
							Recordatorio/Nota
						</Form.Label>
						<Form.Control
							as='textarea'
							className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
							placeholder='Ingresa el recordatorio o nota...'
							rows={3}
							cols={35}
							{...register('recordatorio', {
								required: {
									value: true,
									message: 'El recordatorio es requerido',
								},
							})}
						/>
						{errors.recordatorio && (
							<span className='error-message'>
								{errors.email.recordatorio}
							</span>
						)}
					</Form.Group>
					<Form.Group
						id='inputrecord'
						className='flex flex-col sm:flex-row	 flex-wrap items-center justify-around w-full'>
						<Button
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-1 py-2 border-2 w-[170px] mb-4 sm:mb-1 border-primary rounded-xl'
							type='submit'>
							<i className='text-xl pe-2 bi bi-check2-square'></i>
							Registrar Nota
						</Button>
						<Button
							type='button'
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-1 border-2 py-2 w-[200px] mb-1 border-primary rounded-xl'
							onClick={toggleMostrarNotas}>
							<i className='text-xl pe-2 bi bi-archive'></i>
							{mostrarNotasPendientes
								? 'Ver Notas Archivadas'
								: 'Ver Notas Pendientes'}
						</Button>
					</Form.Group>
				</Form>
				<hr className='linea text-white mx-3 mt-3' />
				<div className='table-responsive container-lg'>
					<h2 className='text-white my-3 text-center text-2xl font-bold'>
						{mostrarNotasPendientes
							? 'Notas Pendientes'
							: 'Notas Archivadas'}
					</h2>
					<div className='table-responsive'>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Table columns={columns} data={data} actions={actions} />
						</ThemeProvider>
					</div>
				</div>
			</div>
		</>
	);
};
