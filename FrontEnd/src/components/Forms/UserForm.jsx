/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../css/Header.css';
import { FormInput, SaveButton, CancelButton } from '../../utils/Form.jsx';
import { useForm } from 'react-hook-form';
import { useUserActions } from '../../hooks/UseUserActions.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';
import { selectUser, selectUserStatus } from '../../store/users/selectors.js';

export const UserForm = ({ rowId, onClose, mode }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { getUser, updateUser } = useUserActions();
	const statusUser = useSelector(selectUserStatus);
	const user = useSelector(selectUser);

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			getUser(rowId);
		}
	}, [rowId]);

	useEffect(() => {
		if (user && (mode === 'edit' || mode === 'view')) {
			setValue('nombre', user.nombre);
			setValue('apellido', user.apellido);
			setValue('email', user.email);
			setValue('dni', user.dni);
			setValue('domicilio', user.domicilio);
			setValue('celular', user.celular);
		}
	}, [statusUser, user]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			if (mode === 'edit') {
				await updateUser({ rowId, values });
				onClose();
			}
		} catch (error) {
			console.error('Error al editar el usuario:', error);
		}
	});

	if (statusUser === 'Cargando') {
		return <Loader />;
	}

	return (
		<div>
			<Form
				onSubmit={onSubmit}
				className='flex flex-wrap justify-around items-center'>
				<FormInput
					label='Nombre'
					name='nombre'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El nombre o razon social es obligatorio.',
						},
					}}
					readOnly={mode === 'view'}
				/>

				<FormInput
					label='Apellido'
					name='apellido'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					readOnly={mode === 'view'}
				/>

				<FormInput
					label='DNI/CUIT'
					name='dni'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El DNI/CUIT es obligatorio.',
						},
						minLength: {
							value: 8,
							message:
								'El DNI/CUIT debe contenter entre 8 y 11 digitos.',
						},
						maxLength: {
							value: 11,
							message:
								'El DNI/CUIT debe contenter entre 8 y 11 digitos.',
						},
					}}
					readOnly={mode === 'view'}
				/>

				<FormInput
					label='Domicilio'
					name='domicilio'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El domicilio es obligatorio.',
						},
					}}
					readOnly={mode === 'view'}
				/>

				<FormInput
					label='Celular'
					name='celular'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El celular es obligatorio.',
						},
						minLength: {
							value: 10,
							message: 'El celular debe contenter 10 digitos.',
						},
						maxLength: {
							value: 10,
							message: 'El celular debe contenter 10 digitos.',
						},
					}}
					readOnly={mode === 'view'}
				/>

				<Form.Group className='flex flex-wrap items-center w-full justify-around'>
					{mode !== 'view' && (
						<SaveButton
							onSubmit={onSubmit}
							label={
								mode === 'create'
									? 'Registrar Usuario'
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
