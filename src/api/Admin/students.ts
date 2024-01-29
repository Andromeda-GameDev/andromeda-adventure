import { getDatabase, ref, get, update, remove, push, set } from 'firebase/database';

const db = getDatabase();

export async function blockStudent(student_uuid: string){
    const userRef = ref(db, 'users/' + student_uuid);
    
    return update(userRef, {
        status: 'blocked',
    });
}

export async function unblockStudent(student_uuid: string){
    const userRef = ref(db, 'users/' + student_uuid);
    
    return update(userRef, {
        status: 'active',
    });
}

export async function deleteUser(student_uuid: string){
    const userRef = ref(db, 'users/' + student_uuid);
    
    return remove(userRef);
}


export async function changeGroup(student_uuid: string, new_group_uuid: string){
    const userRef = ref(db, 'users/' + student_uuid);

    const group_id = new_group_uuid === "Sin asignar" ? "" : new_group_uuid;
    
    return update(userRef, {
        group: group_id,
    });
}