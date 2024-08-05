/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import '../../css/Header.css';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { Table } from './Table.jsx';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { novedadesExpedientes } from '../../hooks/useExptesFilter.js';
import { useExpteActions } from '../../hooks/UseExptes.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';

export const Novedades = () => {
	const { loggedUser } = useAuth({});
	const { getExptes } = useExpteActions();
	const [data, setData] = useState([]);
	const navigate = useNavigate();
	const admin = loggedUser.admin;
	const coadmin = loggedUser.coadmin;
	const user = loggedUser.email;
	const exptes = useSelector((state) => state.exptes.exptes);
	const status = useSelector((state) => state.bills.status);
	const statusSign = useSelector((state) => state.bills.statusSign);

	const loadExptes = async () => {
		try {
			getExptes();
			const filteredByClientExptes =
				admin || coadmin
					? exptes
					: exptes.filter((expte) => expte.cliente === user);
			const filteredExpedientes = novedadesExpedientes(
				filteredByClientExptes
			);
			setData(filteredExpedientes);
		} catch (error) {
			console.error('Error al obtener expedientes', error);
		}
	};

	useEffect(() => {
		loadExptes();
	}, [statusSign]);

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
				<Tooltip title='Ver expediente' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				navigate(`/Gestionmovimientos/${row.original._id}`);
			},
		},
	];

	return (
		<>
			<section className='py-3'>
				<h2 className='mt-4 text-3xl font-extrabold text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
					Novedades de tus expedientes
				</h2>
				<p className='text-center text-neutral-200 text-[12px] mb-4'>
					(Ultimas 48 horas)
				</p>
				<div className='table-responsive container-lg'>
					{status === 'Cargando' ? (
						<Loader />
					) : (
						<div className='table-responsive'>
							<Table columns={columns} data={data} actions={actions} />
						</div>
					)}
				</div>
			</section>
		</>
	);
};
