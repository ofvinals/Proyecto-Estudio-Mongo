import { createSelector } from '@reduxjs/toolkit';

// Selecciona el estado completo de los usuarios
const selectEventsState = (state) => state.events;

// Selector para obtener todos los usuarios
export const selectEvents = createSelector(
	[selectEventsState],
	(eventsState) => eventsState.events
);

// Selector para obtener el estado de carga de usuarios
export const selectEventStatus = createSelector(
	[selectEventsState],
	(eventsState) => eventsState.status.events
);

// Selector para obtener el estado del usuario actual
export const selectEvent = createSelector(
	[selectEventsState],
	(eventsState) => eventsState.event
);

export const selectSignStatus = createSelector(
	[selectEventsState],
	(eventsState) => eventsState.status.sign
);

// Selector para obtener el estado de actualización del usuario
export const selectUpdateStatus = createSelector(
	[selectEventsState],
	(eventsState) => eventsState.status.update
);

export const selectDeleteStatus = createSelector(
	[selectEventsState],
	(eventsState) => eventsState.status.delete
);
