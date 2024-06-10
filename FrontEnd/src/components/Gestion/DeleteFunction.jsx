/* eslint-disable react/prop-types */
// DeleteConfirmation.jsx
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Loader from '../Loader';

export const DeleteConfirmation = ({
	onDelete,
	itemDescription,
	rowId,
	onCancel,
}) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleDelete = async () => {
			try {
				const result = await Swal.fire({
					title: '¿Estás seguro?',
					text: `Confirmas la eliminación de ${itemDescription}?`,
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#d33',
					cancelButtonColor: '#8f8e8b',
					confirmButtonText: 'Sí, eliminar',
					cancelButtonText: 'Cancelar',
				});
				if (result.isConfirmed) {
					setLoading(true);
					await onDelete(rowId);
					setLoading(false);
					Swal.fire({
						icon: 'success',
						title: `Se ha eliminado correctamente ${itemDescription} `,
						showConfirmButton: false,
						timer: 1500,
					});
					onCancel();
				} else {
					onCancel();
				}
			} catch (error) {
				console.error(`Error al eliminar ${itemDescription}:`, error);
				setLoading(false);
				onCancel();
			}
		};

		handleDelete();
	}, [itemDescription, onDelete, rowId, onCancel]);

	return (
		<>
			<div>{loading && <Loader />}</div>
		</>
	);
};
