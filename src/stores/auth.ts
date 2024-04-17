import { writable } from "svelte/store";
import { authtest } from '$lib/firebase/firebase';
import { deleteUser, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, sendPasswordResetEmail, signOut, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get, remove, set, update } from "firebase/database";

type User = {
    isLogged: boolean;
    uid: string | null;
    email: string | null;
    role?: string | null;
    name: string | null;
    group_id?: string | null;
    status?: string | null;
    validated?: boolean | null;
};

export const authStore = writable<User>({
    isLogged: false as boolean,
    uid: null as string | null,
    email: null as string | null,
    role: null as string | null,
    name: null as string | null,
    group_id: null as string | null,
    status: null as string | null,
    validated: null as boolean | null,
});

export const checkUserRole = async (uid: string) => {
    const database = getDatabase();
    const userRef = ref(database, `roles/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        return snapshot.val().role as string;
    } else {
        return null;
    }
}

export const checkUserInfo = async (uid: string) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null;
    }
}

export const checkProfessorInfo = async (uid: string) => {
    const database = getDatabase();
    const professorRef = ref(database, `professors/${uid}`);
    const snapshot = await get(professorRef);

    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null;
    }
}

export const registerStudent = async (user_uid: string, email: string, name: string, last_name: string) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${user_uid}`);
    await set(userRef, {
        email,
        group: '',
        last_name,
        name,
        validated: false,
        status: 'active',
        demo: false,
    });

    const roleRef = ref(db, `roles/${user_uid}`);
    await set(roleRef, {
        role: 'student'
    });
}

export const registerProfessor = async (user_uid: string, email: string, name: string, last_name: string) => {
    const db = getDatabase();
    const professorReference = ref(db, `professors/${user_uid}`);

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    await set(professorReference, {
        email,
        last_name,
        name,
        status: 'pending',
        firstLogTime: `${day}/${month}/${year}`,
        demo: false,
    });

    const roleRef = ref(db, `roles/${user_uid}`);
    await set(roleRef, {
        role: 'professor'
    });
}

export const validateUser = async (uid: string) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);
    await update(userRef, {
        validated: true,
    });
}

export const authHandlers = {
    signInWithPopup: async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(authtest, provider);
    },

    signInWithEmail: async (email: string, password: string) => {
        await signInWithEmailAndPassword(authtest, email, password);
    },

    logout: async () => {
        await signOut(authtest);

        authStore.update((store) => {
            return {
                ...store,
                isLogged: false,
                uid: null,
                email: null,
                role: null,
                name: null,
                group_id: null,
                status: null,
                validated: null,
            };
        });

    },

    resetPassword: async (email: string) => {
        await sendPasswordResetEmail(authtest, email);
        console.log('Email sent');
    },

    updatePassword: async (password: string) => {
        await updatePassword(authtest.currentUser!, password);
    },

    deleteAccount: async () => {
        const db = getDatabase();
        const userRef = ref(db, `roles/${authtest.currentUser!.uid}`);

        await remove(userRef);
        await deleteUser(authtest.currentUser!);
    }
}

