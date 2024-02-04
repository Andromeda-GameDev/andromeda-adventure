import { ref, get, update, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../lib/firebase/firebase';

export async function retrieveStudentInfo(studentId: string) {
    try {
        const studentRef = ref(db, 'users/' + studentId);
        return get(studentRef).then((snapshot) => {
            if(snapshot.exists()){
                return snapshot.val();
            } else {
                throw new Error('No se encontraron datos');
            }
        });
    } catch (error) {
        throw new Error('Hubo un error al obtener la información del estudiante');
    }
}

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


export async function updateStudentGroup(studentId: string, groupId: string) {
    try {
        const groupRef = ref(db, 'groups/');
        const groupQuery = query(groupRef, orderByChild('group_id'), equalTo(groupId));
        const groupSnapshot = await get(groupQuery);

        if (!groupSnapshot.exists()) {
            throw new Error('El ID de grupo no existe');
        }

        const studentRef = ref(db, 'users/' + studentId);
        return get(studentRef).then((snapshot) => {
            if(snapshot.exists()){
                update(studentRef, {
                    group: groupId,
                });
                return {
                    success: true,
                    message: 'Usuario actualizado correctamente'
                };
            } else {
                throw new Error('No se encontraron datos');
            }
        });
    } catch (error) {
        throw error;
    }
}


export async function getGroupNameById(groupId: string) {
    try {
        const groupRef = ref(db, 'groups/');
        const q = query(groupRef, orderByChild('group_id'), equalTo(groupId));
        const snapshot = await get(q);

        if (snapshot.exists()) {
            const group = snapshot.val();
            for (const key in group) {
                if (Object.prototype.hasOwnProperty.call(group, key)) {
                    const element = group[key];
                    return element.group_name;
                }
            }
            
        } else {
            throw new Error('No group found with the given id');
        }
    } catch (error) {
        throw new Error('There was an error retrieving the group name');
    }
}