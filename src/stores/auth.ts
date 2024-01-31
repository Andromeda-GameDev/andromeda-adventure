import { writable } from "svelte/store";
import { authtest } from '$lib/firebase/firebase';
import { deleteUser, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, sendPasswordResetEmail, signOut, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get, remove } from "firebase/database";

type User = {
    isLogged: boolean;
    uid: string | null;
    email: string | null;
    role?: string | null;
    name: string | null;
};

export const authStore = writable<User>({
    isLogged: false as boolean,
    uid: null as string | null,
    email: null as string | null,
    role: null as string | null,
    name: null as string | null,
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

export const authHandlers = {
    signInWithPopup: async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(authtest, provider);
    },

    signInWithEmail: async (email: string, password: string) => {
        await signInWithEmailAndPassword(authtest, email, password);
        //const usersRole = await checkUserRole(authtest.currentUser!.uid);
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
            };
        });

    },

    resetPassword: async (email: string) => {
        await sendPasswordResetEmail(authtest, email);
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

