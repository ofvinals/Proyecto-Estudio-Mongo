import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { v4 } from 'uuid';

const firebaseConfig = {
	apiKey: 'AIzaSyDzMYzx6kGI_8j-5Bagaa67hg_MambIJgA',
	authDomain: 'estudio-juridico-fbd74.firebaseapp.com',
	projectId: 'estudio-juridico-fbd74',
	storageBucket: 'estudio-juridico-fbd74.appspot.com',
	messagingSenderId: '993541654096',
	appId: '1:993541654096:web:2253b40c73a951a855b355',
	measurementId: 'G-GJTPNW12SS',
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const auth = getAuth(app);

export const db = getFirestore(app);

export async function uploadFile(file) {
	const storageRef = ref(storage, v4());
	await uploadBytes(storageRef, file);
	const url = await getDownloadURL(storageRef);
	return url;
}
