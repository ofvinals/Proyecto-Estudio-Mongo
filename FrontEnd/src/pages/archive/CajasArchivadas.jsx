/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../../css/Header.css';
import { getCajas } from '../../hooks/UseCajas.js';
import { Detail } from '../../components/Gestion/Detail';
import { Table } from '../../components/Gestion/Table';
import { VerCaja } from '../../components/Modals/Views/VerCaja';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';

export const CajasArchivadas = () => {
	const [openViewModal, setopenViewModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [data, setData] = useState([]);
	const meses = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];

	const handleOpenViewModal = (rowId) => {
		setopenViewModal(true);
		setRowId(rowId);
	};

	const handleCloseModal = () => {
		setopenViewModal(false);
	};

	useEffect(() => {
		const fetchCajas = async () => {
			try {
				const cajas = await getCajas();
				const fetchedCajas = cajas.map((doc) => {
					return { ...doc, id: doc.id };
				});
				const mesActual = (new Date().getMonth() + 1).toString();
				const cajasPasadas = fetchedCajas.filter((caja) => {
					const mesCaja = caja.mes.toString();
					return mesCaja < mesActual;
				});
				setData(cajasPasadas);
		
			} catch (error) {
				console.error('Error al obtener caja', error);
			}
		};
		fetchCajas();
	}, []);
	const formatValue = (value) => {
		if (value instanceof Date) {
			return value.toLocaleDateString('es-ES');
		} else if (value && value.toDate instanceof Function) {
			// Convert Firestore timestamp to Date
			const date = value.toDate();
			return date.toLocaleDateString('es-ES');
		} else {
			return value?.toLocaleString?.('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			});
		}
	};

	const calcularSumaPorMes = (tipo, mes, data) => {
		const elementosFiltrados = data.filter(
			(item) => item.tipo === tipo && item.mes === mes
		);
		return elementosFiltrados.reduce((acc, item) => acc + item.monto, 0);
	};

	function renderAggregatedCell(cell, table, data) {
		const mesActual = cell.row.original.mes;
		const totalIngresos = calcularSumaPorMes('INGRESO', mesActual, data);
		const totalEgresos = calcularSumaPorMes('EGRESO', mesActual, data);
		const totalMonto = totalIngresos - totalEgresos;

		return (
			<Box
				sx={{
					fontSize: '16px',
					padding: '5px',
					color: 'success.main',
					fontWeight: 'bold',
				}}>
				Total mes {meses[mesActual - 1]}: {formatValue(totalMonto)}
			</Box>
		);
	}

	// Carga info de columnas
	const columns = React.useMemo(() => {
		return [
			{
				header: 'Fecha',
				accessorKey: 'fecha',
				Cell: ({ cell }) => <>{formatValue(cell.getValue())}</>,
				size: 50,
			},
			{
				header: 'Mes',
				accessorKey: 'mes',
				show: false,
				Cell: ({ cell }) => <>{meses[cell.getValue() - 1]}</>,
				size: 50,
			},
			{
				header: 'Concepto',
				accessorKey: 'concepto',
				size: 250,
			},
			{
				header: 'Tipo',
				accessorKey: 'tipo',
				size: 50,
			},
			{
				header: 'Monto',
				accessorKey: 'monto',
				size: 50,
				aggregationFn: 'mean',
				AggregatedCell: ({ cell, table }) => (
					<>{renderAggregatedCell(cell, table, data)}</>
				),
				Cell: ({ cell }) => <>{formatValue(cell.getValue())}</>,
			},
			{
				header: 'Adjunto',
				accessorKey: 'fileUrl',
				size: 30,
				Cell: ({ row }) => {
					if (row.original.fileUrl) {
						return <i className='iconavbar bi bi-paperclip'></i>;
					}
					return null;
				},
			},
			{
				header: 'Estado',
				accessorKey: 'estado',
				size: 50,
			},
		];
	}, [data]);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Ver movimiento de caja' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				handleOpenViewModal(row.original._id);
			},
		},
	];

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<>
			<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3'>
				<Header />
				<div className=' rounded-xl container-lg mb-1 '>
					<Detail modulo={'Cajas Archivadas'} />
				</div>
				<div className='container-lg'>
					<hr className='linea text-white mx-3' />

					<div>
						<div className='flex justify-around my-3'>
							<Link
								to={'/gestioncaja'}
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[190px] mb-3 border-primary rounded-xl font-semibold'>
								<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
								Volver al Panel
							</Link>
						</div>

						<hr className='linea mx-3' />

						<div>
							<p className='text-center font-semibold py-3 text-3xl bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
								{' '}
								Movimientos de Cajas Archivadas
							</p>
						</div>
						<div className='table-responsive'>
							<ThemeProvider theme={darkTheme}>
								<CssBaseline />
								<Table
									columns={columns}
									data={data}
									actions={actions}
								/>
							</ThemeProvider>
						</div>
					</div>
				</div>
				{openViewModal && (
					<VerCaja
						rowId={rowId}
						showModal={openViewModal}
						onClose={handleCloseModal}
					/>
				)}
			</div>
		</>
	);
};
