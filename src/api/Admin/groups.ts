import { getDatabase, ref, update, remove, push, set, query, orderByChild, equalTo, get } from 'firebase/database';

const db = getDatabase();

function generateRandomString() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

export async function createGroup(group_name: string){
    const groupRef = push(ref(db, 'groups/'));
    const group_id = generateRandomString();

    set(groupRef, {
        group_name: group_name,
        group_id: group_id,
        group_uid: groupRef.key,
        levels: {
            level_1: false,
            level_2: false,
        },
    });

    return {
        group_id: group_id,
        group_uid: groupRef.key,
    }
}

export async function addProffessorsToGroup(group_id: string, professors: Record<string, string>){
    const ref_group_professor = push(ref(db, `group_professors/`));

    for (const [key, value] of Object.entries(professors)) {
        set(ref_group_professor, {
            group_id: group_id,
            professor_id: key,
            professor_email: value,
        });
    }
}


export async function deleteProfessorFromGroup(professor_id: string, group_id: string){
    const ref_group_professor = ref(db, `group_professors/`);
    const specificProfessorQuery = query(ref_group_professor, orderByChild('professor_id'), equalTo(professor_id)) && query(ref_group_professor, orderByChild('group_id'), equalTo(group_id));
    const snapshot = await get(specificProfessorQuery);

    if (snapshot.exists()) {
        const data = snapshot.val();
        for (const id in data){
            const professorRef = ref(db, `group_professors/${id}`);
            return remove(professorRef);
        }
    } else {
        throw new Error('No data available');
    }
}

export async function deleteStudentFromGroup(student_id: string){
    const studentRef = ref(db, `users/${student_id}`);

    return update(studentRef, {
        group: "",
    });
}

export async function deleteGroup(group_uuid: string, group_id: string){
    const groupRef = ref(db, 'groups/' + group_uuid);
    remove(groupRef);

    const groupProfessorsRef = ref(db, 'group_professors/');
    const specificGroupQuery = query(groupProfessorsRef, orderByChild('group_id'), equalTo(group_id));

    const snapshot = await get(specificGroupQuery);
    if(snapshot){
        const data = snapshot.val();
        for (const id in data){
            const groupProfessorRef = ref(db, `group_professors/${id}`);
            remove(groupProfessorRef);
        }
    }

    const groupStudentsRef = ref(db, 'users/');
    const specificGroupStudentsQuery = query(groupStudentsRef, orderByChild('group'), equalTo(group_id));

    const snapshotStudents = await get(specificGroupStudentsQuery);

    if(snapshotStudents){
        const data = snapshotStudents.val();
        for (const id in data){
            const groupStudentRef = ref(db, `users/${id}`);
            update(groupStudentRef, {
                group: "",
            });
        }
    }

    return;
}