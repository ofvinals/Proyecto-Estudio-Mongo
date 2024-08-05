/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../../css/Header.css';
import CheckIcon from '@mui/icons-material/Check';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useForm } from 'react-hook-form';
import {
	FormInput,
	FormSelect,
	SaveButton,
	CancelButton,
} from '../../utils/Form.jsx';
import { Table } from '../gestion/Table.jsx';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import { useNotesActions } from '../../hooks/UseNotes.js';
import Loader from '../../utils/Loader.jsx';
import { Form } from 'react-bootstrap';

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
					className='flex flex-col sm:flex-row flex-wrap justify-evenly items-center'
					onSubmit={onSubmit}>
					<FormSelect
						label='Responsable'
						name='responsable'
						register={register}
						errors={errors}
						selectOptions={[
							{ value: '', label: 'Selecciona..' },
							{ value: 'OSCAR', label: 'OSCAR' },
							{ value: 'JORGE', label: 'JORGE' },
							{ value: 'MARIA', label: 'MARIA' },
						]}
						options={{
							required: {
								value: true,
								message: 'El responsable es requerido',
							},
						}}
						className='w-2/6 text-white'
					/>
					<FormInput
						label='Recordatorio/Nota'
						name='recordatorio'
						type='textarea'
						register={register}
						errors={errors}
						placeholder='Ingresa el recordatorio o nota...'
						rows={3}
						className='w-full text-white'
						options={{
							required: {
								value: true,
								message: 'El texto de recordatorio es requerido',
							},
						}}
					/>
					<div className='flex flex-col sm:flex-row flex-wrap items-center justify-around w-full'>
						<SaveButton onSubmit={onSubmit} label='Registrar Nota' />
						<CancelButton
							onClose={toggleMostrarNotas}
							label={
								mostrarNotasPendientes
									? 'Ver Notas Archivadas'
									: 'Ver Notas Pendientes'
							}
						/>
					</div>
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
