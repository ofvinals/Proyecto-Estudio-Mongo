import { createSelector } from '@reduxjs/toolkit';

// Selecciona el estado completo de los usuarios
const selectBillsState = (state) => state.bills;

// Selector para obtener todos los usuarios
export const selectBills = createSelector(
	[selectBillsState],
	(billsState) => billsState.bills
);

// Selector para obtener el estado de carga de usuarios
export const selectBillStatus = createSelector(
	[selectBillsState],
	(billsState) => billsState.status.bills
);

// Selector para obtener el estado del usuario actual
export const selectBill = createSelector(
	[selectBillsState],
	(billsState) => billsState.bill
);

export const selectSignStatus = createSelector(
	[selectBillsState],
	(billsState) => billsState.status.sign
);

// Selector para obtener el estado de actualización del usuario
export const selectUpdateStatus = createSelector(
	[selectBillsState],
	(billsState) => billsState.status.update
);

export const selectDeleteStatus = createSelector(
	[selectBillsState],
	(billsState) => billsState.status.delete
);
