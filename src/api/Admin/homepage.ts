import { getDatabase, ref, update, set, query, orderByChild, equalTo, get } from 'firebase/database';

const db = getDatabase();

export async function toggleDataBase(value: boolean){
    const dbEnabledRef = ref(db, 'db_enabled');
    set(dbEnabledRef, value);
}

export async function updateToleranceValue(newValue: number){
    const toleranceRef = ref(db, "globalValues/toleranceValue");
    await set(toleranceRef, newValue);
}

export async function addUsersToDemoGroup(user_ids: string[]){
    for (const user_id of user_ids){
        const specificUserRef = ref(db, `users/${user_id}`);

        update(specificUserRef, {
            demo: true,
        });
    }
}


export async function removeUserDemo(user_id: string){
    const specificUserRef = ref(db, `users/${user_id}`);

    update(specificUserRef, {
        demo: false,
    });
}