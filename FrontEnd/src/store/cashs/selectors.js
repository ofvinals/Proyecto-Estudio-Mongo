import { createSelector } from '@reduxjs/toolkit';

// Selecciona el estado completo de los usuarios
const selectCashsState = (state) => state.cashs;

// Selector para obtener todos los usuarios
export const selectCashs = createSelector(
	[selectCashsState],
	(cashsState) => cashsState.cashs
);

// Selector para obtener el estado de carga de usuarios
export const selectCashStatus = createSelector(
	[selectCashsState],
	(cashsState) => cashsState.status.cashs
);

// Selector para obtener el estado del usuario actual
export const selectCash = createSelector(
	[selectCashsState],
	(cashsState) => cashsState.cash
);

export const selectSignStatus = createSelector(
	[selectCashsState],
	(cashsState) => cashsState.status.sign
);

// Selector para obtener el estado de actualización del usuario
export const selectUpdateStatus = createSelector(
	[selectCashsState],
	(cashsState) => cashsState.status.update
);

export const selectDeleteStatus = createSelector(
	[selectCashsState],
	(cashsState) => cashsState.status.delete
);