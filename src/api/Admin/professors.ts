import { getDatabase, ref, update, remove } from 'firebase/database';

const db = getDatabase();

export async function deleteProfessor(professor_uuid: string){
    const professorRef = ref(db, 'professors/' + professor_uuid);

    return remove(professorRef);
}

export async function disableProfessor(professor_uuid: string){
    const professorRef = ref(db, 'professors/' + professor_uuid);

    return update(professorRef, {
        status: 'blocked',
    });
}

export async function enableProfessor(professor_uuid: string){
    const professorRef = ref(db, 'professors/' + professor_uuid);

    return update(professorRef, {
        status: 'active',
    });
}

export async function acceptProfessor(professor_uuid: string){
    const professorRef = ref(db, 'professors/' + professor_uuid);

    return update(professorRef, {
        status: 'active',
    });
}

export async function rejectProfessor(professor_uuid: string){
    const professorRef = ref(db, 'professors/' + professor_uuid);

    return update(professorRef, {
        status: 'rejected',
    });
}