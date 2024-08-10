import { useAppDispatch, useAppSelector } from './store';
import {
	getEvent as getEventThunk,
	getEvents as getEventsThunk,
	createEvent as createEventThunk,
	createGoogleEvent as createGoogleEventThunk,
	updateEvent as updateEventThunk,
	deleteEvent as deleteEventThunk,
} from '../store/events/thunks';
import { clearEvent as clearEventThunk } from '../store/events/slice';

export function useEventActions() {
	const events = useAppSelector((state) => state.events.events);
	const event = useAppSelector((state) => state.events.event);
	const eventStatus = useAppSelector((state) => state.events.statusEvent);

	const dispatch = useAppDispatch();

	const getEvent = async (id) => {
		try {
			await dispatch(getEventThunk(id));
		} catch (error) {
			console.error('Error in getEvent:', error);
		}
	};

	const getEvents = async () => {
		await dispatch(getEventsThunk());
	};

	const createEvent = async (values) => {
		await dispatch(createEventThunk(values));
	};

	const createGoogleEvent = async (values) => {
		await dispatch(createGoogleEventThunk(values));
	};

	const updateEvent = async ({ rowId, values }) => {
		await dispatch(updateEventThunk({ id: rowId, values }));
	};

	const deleteEvent = async ({ eventId, id }) => {
		await dispatch(deleteEventThunk({ eventId, id }));
	};

	const clearEvent = () => {
		dispatch(clearEventThunk());
	};

	return {
		events,
		event,
		getEvent,
		getEvents,
		createEvent,
		createGoogleEvent,
		updateEvent,
		deleteEvent,
		clearEvent,
		eventStatus,
	};
}
