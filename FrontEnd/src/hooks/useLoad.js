import { useEffect, useState } from 'react';
import { useAppSelector } from './store';

export function useLoad() {
	const statusAuth = useAppSelector((state) => state.auth.statusAuth);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (statusAuth === 'Fallido' || statusAuth === 'Exitoso') {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [statusAuth]);

	return { isLoading };
}
