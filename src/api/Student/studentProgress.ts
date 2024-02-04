import { ref, get, update, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../lib/firebase/firebase';

export async function retrieveStudentProgressById(studentId: string) {
    try {
        const studentRef = ref(db, 'progress/' + studentId);
        return get(studentRef).then((snapshot) => {
            if(snapshot.exists()){
                return snapshot.val();
            } else {
                throw new Error('No se encontraron datos');
            }
        });
    } catch (error) {
        throw new Error('Hubo un error al obtener el progreso del estudiante');
    }
}