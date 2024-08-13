import { createSelector } from '@reduxjs/toolkit';

// Selecciona el estado completo de los usuarios
const selectUsersState = (state) => state.users;

// Selector para obtener todos los usuarios
export const selectUsers = createSelector(
	[selectUsersState],
	(usersState) => usersState.users
);

// Selector para obtener el estado de carga de usuarios
export const selectUserStatus = createSelector(
	[selectUsersState],
	(usersState) => usersState.status.users
);

// Selector para obtener el estado del usuario actual
export const selectUser = createSelector(
	[selectUsersState],
	(usersState) => usersState.user
);

// Selector para obtener el estado de actualización del usuario
export const selectUpdateStatus = createSelector(
	[selectUsersState],
	(usersState) => usersState.status.update
);

export const selectDeleteStatus = createSelector(
	[selectUsersState],
	(usersState) => usersState.status.delete
);