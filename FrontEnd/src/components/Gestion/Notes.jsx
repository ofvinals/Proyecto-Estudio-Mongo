/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../../css/Header.css';
import CheckIcon from '@mui/icons-material/Check';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useForm } from 'react-hook-form';
import { Button, Form, FormSelect } from 'react-bootstrap';
import { Table } from './Table.jsx';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import { useNotesActions } from '../../hooks/UseNotes.js';
import Loader from '../../utils/Loader.jsx';

export const Notes = () => {
	const [data, setData] = useState([]);
	const [mostrarNotasPendientes, setMostrarNotasPendientes] = useState(true);
	const { getNotes, createNote, archiveNote, desarchiveNote } =
		useNotesActions();
	const notes = useSelector((state) => state.notes.notes);
	const statusNote = useSelector((state) => state.notes.status);
	const statusUpdate = useSelector((state) => state.notes.statusUpdate);
	const statusSign = useSelector((state) => state.notes.statusSign);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const toggleMostrarNotas = () => {
		setMostrarNotasPendientes(!mostrarNotasPendientes);
	};

	const loadNotas = async () => {
		try {
			await getNotes();
		} catch (error) {
			console.error('Error al obtener notas:', error);
		}
	};

	useEffect(() => {
		loadNotas();
	}, [statusUpdate, statusSign]);

	useEffect(() => {
		if (notes.length > 0) {
			const notasPendientes = notes.filter(
				(note) => note.estado === 'Pendiente'
			);
			setData(notasPendientes);
		}
	}, [notes]);

	useEffect(() => {
		if (mostrarNotasPendientes) {
			const notasPendientes = notes.filter(
				(note) => note.estado === 'Pendiente'
			);
			setData(notasPendientes);
		} else {
			const notasArchivadas = notes.filter(
				(note) => note.estado === 'Archivado'
			);
			setData(notasArchivadas);
		}
	}, [mostrarNotasPendientes, notes]);

	const onSubmit = handleSubmit(async (values) => {
		values.estado = 'Pendiente';
		await createNote(values);
		getNotes();
		reset();
	});

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
					onClick: (row) => archiveNote(row.original._id),
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
					onClick: (row) => desarchiveNote(row.original._id),
				},
		  ];

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
					<Form.Group className='w-2/6 mb-3' controlId='resp'>
						<Form.Label className='text-white font-medium'>
							Responsable
						</Form.Label>
						<FormSelect
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
						</FormSelect>
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
								{errors.recordatorio.message}
							</span>
						)}
					</Form.Group>
					<Form.Group
						id='inputrecord'
						className='flex flex-col sm:flex-row	 flex-wrap items-center justify-around w-full'>
						<Button
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-1 py-2 border-2 w-[200px] mb-4 sm:mb-1 border-primary rounded-xl'
							type='submit'>
							<i className='text-xl pe-2 bi bi-check2-square'></i>
							Registrar Nota
						</Button>
						<Button
							type='button'
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-1 border-2 py-2 w-[200px] mb-4 sm:mb-1 border-primary rounded-xl'
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
					{statusNote === 'Cargando' ? (
						<Loader />
					) : (
						<div className='table-responsive'>
							<Table columns={columns} data={data} actions={actions} />
						</div>
					)}
				</div>
			</div>
		</>
	);
};
