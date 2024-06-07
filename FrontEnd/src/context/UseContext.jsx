import { useContext } from "react";
import AuthContext from "./AuthContext";

// funcion que retorna el contexto del objeto creado por useContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('Error, no se creo el contexto!');
	}
	return context;
};