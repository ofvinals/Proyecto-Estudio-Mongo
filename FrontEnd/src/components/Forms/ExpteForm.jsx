/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../css/Header.css';
import { useForm } from 'react-hook-form';
import {
	FormInput,
	FormSelect,
	SaveButton,
	CancelButton,
} from '../../utils/Form.jsx';
import { useUserActions } from '../../hooks/UseUserActions.js';
import { useExpteActions } from '../../hooks/UseExptes.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';
import {
	selectExpte,
	selectExpteStatus,
} from '../../store/exptes/selectors.js';
import { selectUsers } from '../../store/users/selectors.js';

export const ExpteForm = ({ rowId, onClose, mode }) => {
	const {
		formState: { errors },
		register,
		handleSubmit,
		setValue,
		watch,
		unregister,
	} = useForm();
	const { getUsers } = useUserActions();
	const { getExpte, updateExpte, createExpte } = useExpteActions();
	const statusExpte = useSelector(selectExpteStatus);
	const expte = useSelector(selectExpte);
	const users = useSelector(selectUsers);

	useEffect(() => {
		getUsers();
		if (mode === 'edit' || mode === 'view') {
			getExpte(rowId);
		}
	}, [rowId]);

	useEffect(() => {
		if (expte && (mode === 'edit' || mode === 'view')) {
			setValue('cliente', expte.cliente);
			setValue('nroexpte', expte.nroexpte);
			setValue('radicacion', expte.radicacion);
			setValue('juzgado', expte.juzgado);
			setValue('caratula', expte.caratula);
			setValue('actor', expte.actor);
			setValue('demandado', expte.demandado);
			setValue('proceso', expte.proceso);
			setValue('estado', expte.estado);
			const caratulaValue = `${expte.actor} c/ ${expte.demandado} s/ ${expte.proceso}`;
			setValue('caratula', caratulaValue);
		}
	}, [statusExpte, expte]);

	useEffect(() => {
		const updateCaratula = () => {
			const actor = watch('actor');
			const demandado = watch('demandado');
			const proceso = watch('proceso');
			const caratulaValue = `${actor} c/ ${demandado} s/ ${proceso}`;
			setValue('caratula', caratulaValue);
		};
		watch(['actor', 'demandado', 'proceso'], updateCaratula);
		return () => {
			unregister(['actor', 'demandado', 'proceso']);
		};
	}, [watch, setValue, unregister]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			if (mode === 'edit') {
				await updateExpte({ rowId, values });
				onClose();
			} else if (mode === 'create') {
				await createExpte({ values });
				onClose();
			}
		} catch (error) {
			console.error('Error al manejar el expediente:', error);
		}
	});

	if (statusExpte === 'Cargando') {
		return <Loader />;
	}

	return (
		<div>
			<Form
				className='flex flex-wrap justify-around items-center'
				onSubmit={onSubmit}>
				<FormSelect
					label='Cliente'
					name='cliente'
					register={register}
					errors={errors}
					mode={mode}
					selectOptions={users.map((user) => ({
						value: user.email,
						label: `${user.nombre} ${user.apellido}`,
					}))}
				/>

				<FormInput
					label='Nro Expediente'
					name='nroexpte'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El numero de expediente es obligatorio',
						},
					}}
				/>

				{mode !== 'create' && (
					<FormInput
						label='Caratula'
						name='caratula'
						type='text'
						register={register}
						errors={errors}
						mode='view'
					/>
				)}

				<FormSelect
					label='Fuero'
					name='radicacion'
					register={register}
					errors={errors}
					mode={mode}
					selectOptions={[
						{ value: '', label: 'Selecciona..' },
						{ value: 'Civil y Comercial', label: 'Civil y Comercial' },
						{
							value: 'Contensioso Admnistrativo',
							label: 'Contensioso Admnistrativo',
						},
						{
							value: 'Documentos y Locaciones',
							label: 'Documentos y Locaciones',
						},
						{
							value: 'Familia y Sucesiones',
							label: 'Familia y Sucesiones',
						},
						{ value: 'Trabajo', label: 'Trabajo' },
					]}
					options={{
						required: {
							value: true,
							message: 'La radicacion del expediente es obligatorio',
						},
					}}
				/>

				<FormSelect
					label='Juzgado'
					name='juzgado'
					register={register}
					errors={errors}
					mode={mode}
					selectOptions={[
						{ value: '', label: 'Selecciona..' },
						{ value: 'I NOM', label: 'I NOM' },
						{ value: 'II NOM', label: 'II NOM' },
						{ value: 'III NOM', label: 'III NOM' },
						{ value: 'IV NOM', label: 'IV NOM' },
						{ value: 'V NOM', label: 'V NOM' },
						{ value: 'VI NOM', label: 'VI NOM' },
						{ value: 'VII NOM', label: 'VII NOM' },
						{ value: 'VIII NOM', label: 'VIII NOM' },
						{ value: 'IX NOM', label: 'IX NOM' },
						{ value: 'X NOM', label: 'X NOM' },
						{ value: 'XI NOM', label: 'XI NOM' },
						{ value: 'XII NOM', label: 'XII NOM' },
					]}
					options={{
						required: {
							value: true,
							message: 'La radicacion del expediente es obligatorio',
						},
					}}
				/>

				<FormInput
					label='Actor'
					name='actor'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: { value: true, message: 'El actor es obligatorio' },
					}}
				/>

				<FormInput
					label='Demandado'
					name='demandado'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El demandado es obligatorio',
						},
					}}
				/>

				<FormSelect
					label='Tipo de Proceso'
					name='proceso'
					register={register}
					errors={errors}
					mode={mode}
					selectOptions={[
						{ value: '', label: 'Selecciona..' },
						{ value: 'Cobro de Pesos', label: 'Cobro de Pesos' },
						{ value: 'Daños y Perjuicios', label: 'Daños y Perjuicios' },
						{ value: 'Desalojo', label: 'Desalojo' },
						{ value: 'Cobro Ejecutivo', label: 'Cobro Ejecutivo' },
						{ value: 'Reivindicacion', label: 'Reivindicacion' },
						{ value: 'Sucesion', label: 'Sucesion' },
						{ value: 'Accion de Consumo', label: 'Accion de Consumo' },
						{ value: 'Mediacion', label: 'Mediacion' },
						{ value: 'Prescripcion Adquisitiva', label: 'Prescripcion Adquisitiva' },
						{ value: 'Amparo', label: 'Amparo' },
						{ value: 'Accidente de Trabajo', label: 'Accidente de Trabajo' },
					]}
					options={{
						required: {
							value: true,
							message: 'El tipo de proceso es obligatorio',
						},
					}}
				/>

				<FormSelect
					label='Estado'
					name='estado'
					register={register}
					errors={errors}
					mode={mode}
					selectOptions={[
						{ value: '', label: 'Selecciona..' },
						{ value: 'En tramite', label: 'En tramite' },
						{ value: 'Mediacion', label: 'Mediacion' },
						{ value: 'Extrajudicial', label: 'Extrajudicial' },
						{ value: 'Terminado', label: 'Terminado' },
						{ value: 'Caduco', label: 'Caduco' },
					]}
					options={{
						required: {
							value: true,
							message: 'El estado del expediente es obligatorio',
						},
					}}
				/>

				<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
					{mode !== 'view' && (
						<SaveButton
							onSubmit={onSubmit}
							label={
								mode === 'create'
									? 'Registrar Expediente'
									: 'Guardar Cambios'
							}
						/>
					)}
					<CancelButton
						onClose={onClose}
						label={mode === 'view' ? 'Volver' : 'Cancelar'}
					/>
				</Form.Group>
			</Form>
		</div>
	);
};
