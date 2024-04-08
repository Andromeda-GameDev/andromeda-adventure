// api/groups.ts

import { getDatabase, ref, get, update, remove, push, set } from 'firebase/database';
import { Students, Groups } from '../../../src/stores/professorData';
import type { Student } from '../../../src/types';

const db = getDatabase();

function generateRandomId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 7; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
}

export async function updateLevelStatus(groupId: string, levels: Record<string, boolean>) {
    try {
        const groupsRef = ref(db, 'groups');

        return get(groupsRef).then((snapshot) => {
            if(snapshot.exists()){
                const group = Object.values(snapshot.val()).filter((group: any) => group.group_id === groupId)[0];
                if(group){
                    const key = Object.keys(snapshot.val()).filter((key: any) => snapshot.val()[key].group_id === groupId)[0];
                    update(ref(db, `groups/${key}/levels`), {
                        level_1: levels.level_1,
                        level_2: levels.level_2
                    });
                    
                    levels = {
                        level_1: levels.level_1,
                        level_2: levels.level_2
                    }
                }

                return {
                    success: true,
                    message: 'Niveles actualizados correctamente',
                    levels
                };
            } else {
                throw new Error('No se encontraron datos');
            }
        });
    } catch (error) {
        throw new Error('Hubo un error al actualizar los niveles');
    }
}

export async function deleteUserFromGroup(student: Student, filteredStudents: Student[]) {
    try {
        const studentRef = ref(db, 'users/' + student.uuid);

        return get(studentRef).then((snapshot) => {
            if(snapshot.exists()){
                update(studentRef, {
                    group: "",
                });

                // update store
                Students.update(students => {
                    return students.map((student: any) => {
                        if(student.email === snapshot.val().email){
                            student.group_id = "";
                        }
                        return student;
                    });
                });

                filteredStudents = filteredStudents.filter((student: any) => student.email !== snapshot.val().email);

                return {
                    success: true,
                    message: 'Usuario elimnado del grupo correctamente',
                    filteredStudents
                };
            } else {
                throw new Error('No se encontraron datos');
            }
        });
    } catch (error) {
        throw new Error('Hubo un error al eliminar el usuario del grupo');
    }
}

export async function deleteGroup(groupId: string) {
    try {
        const groupsProfessorsRef = ref(db, 'group_professors');
        const groupProfessorsSnapshot = await get(groupsProfessorsRef);

        if (!groupProfessorsSnapshot.exists()) {
            throw new Error('No se encontraron datos');
        }

        const groupProfessorsData = groupProfessorsSnapshot.val();
        let keysToDelete: string[] = [];
        for (const id in groupProfessorsData) {
            if (groupProfessorsData[id].group_id === groupId) {
                keysToDelete.push(id);
            }
        }

        const deleteAssociations = keysToDelete.map(key => remove(ref(db, `group_professors/${key}`)));
        await Promise.all(deleteAssociations);

        const userRef = ref(db, 'users');
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const usersToUpdate = Object.keys(userData).filter((key: any) => userData[key].group === groupId);
            const updateUserPromises = usersToUpdate.map(key => update(ref(db, `users/${key}`), { group: "" }));
            await Promise.all(updateUserPromises);
        }

        const groupsRef = ref(db, 'groups');
        const groupsSnapshot = await get(groupsRef);

        if (groupsSnapshot.exists()) {
            const groupsData = groupsSnapshot.val();
            const groupToDelete = Object.keys(groupsData).filter((key: any) => groupsData[key].group_id === groupId)[0];
            await remove(ref(db, `groups/${groupToDelete}`));
        } else {
            throw new Error('No se encontraron datos');
        }

        return {
            success: true,
            message: 'Grupo eliminado correctamente'
        };
    } catch (error) {
        console.error(error);
        throw new Error('No se encontraron datos');
    }
}


export async function addNewGroup(groupName: string, currentUserId : string, professor_email: string){
    try {
        const ref_group = push(ref(db, 'groups'));
        const groupId = generateRandomId();
        await set(ref_group, {
            group_id: groupId,
            group_name: groupName,
            levels: {
                level_1: false,
                level_2: false
            },
            signed_ups: 0
        });
        
        const ref_group_professors = push(ref(db, 'group_professors'));
        await set(ref_group_professors, {
            group_id: groupId,
            professor_id: currentUserId,
            professor_email: professor_email,
        });

        const newGroup = {
            group_uid: ref_group.key as string,
            group_id: groupId,
            group_name: groupName,
            professors_ids: [currentUserId as string],
            levels: {
                level_1: false,
                level_2: false
            },
            signed_ups: 0
        }

        return {
            success: true,
            message: 'Grupo creado correctamente',
            newGroup
        };
    } catch (error) {
        throw new Error('No se encontraron datos');
    }
}

export async function addExistingGroup(groupId: string, currentUserId : string, professor_email: string, selectedGroups: any){
    try {
        const ref_group_professors = ref(db, 'group_professors');
        const promises = selectedGroups.map((groupId: string) => {
            const newGroupProfessorsRef = push(ref_group_professors);
            return set(newGroupProfessorsRef, {
                group_id: groupId,
                professor_id: currentUserId,
                professor_email: professor_email,
            });

        })

        await Promise.all(promises);


        return {
            success: true,
            message: 'Grupo agregado correctamente',
        };
    } catch (error) {
        throw new Error('Hubo un error al agregar el grupo');
    }
}