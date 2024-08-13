import { createSelector } from '@reduxjs/toolkit';

const selectExptesState = (state) => state.exptes;
const selectMovsState = (state) => state.movs;

// Selector para obtener todos los expedientes
export const selectExptes = createSelector(
	[selectExptesState],
	(exptesState) => exptesState.exptes
);

export const selectExpteStatus = createSelector(
	[selectExptesState],
	(exptesState) => exptesState.status.exptes
);

export const selectExpte = createSelector(
	[selectExptesState],
	(exptesState) => exptesState.expte
);

export const selectSignStatus = createSelector(
	[selectExptesState],
	(exptesState) => exptesState.status.sign
);

export const selectUpdateStatus = createSelector(
	[selectExptesState],
	(exptesState) => exptesState.status.update
);

export const selectDeleteStatus = createSelector(
	[selectExptesState],
	(exptesState) => exptesState.status.delete
);

export const selectMovs = createSelector(
	[selectMovsState],
	(movsState) => movsState.movs
);

export const selectMovStatus = createSelector(
	[selectMovsState],
	(movsState) => movsState.status.movs
);

export const selectMov = createSelector(
	[selectMovsState],
	(movsState) => movsState.mov
);

export const selectSignMovStatus = createSelector(
	[selectMovsState],
	(movsState) => movsState.status.sign
);

export const selectUpdateMovStatus = createSelector(
	[selectMovsState],
	(movsState) => movsState.status.update
);

export const selectDeleteMovStatus = createSelector(
	[selectMovsState],
	(movsState) => movsState.status.delete
);
