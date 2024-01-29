import { writable } from "svelte/store";
import { auth } from '$lib/client/firebase';
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
    isLogged: false,
    uid: null,
    email: null,
    role: null,
    name: null,
});

const checkUserRole = async (uid: string) => {
    const database = getDatabase();
    const userRef = ref(database, `roles/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        return snapshot.val().role;
    } else {
        return null;
    }
}

export const authHandlers = {
    signInWithPopup: async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        const usersRole = await checkUserRole(auth.currentUser!.uid);
        authStore.update((store) => {
            return {
                ...store,
                role: usersRole,
            };
        });
    },

    signInWithEmail: async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
        const usersRole = await checkUserRole(auth.currentUser!.uid);
        authStore.update((store) => {
            return {
                ...store,
                role: usersRole,
            };
        });
    },

    logout: async () => {
        await signOut(auth);

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
        await sendPasswordResetEmail(auth, email);
    },

    updatePassword: async (password: string) => {
        await updatePassword(auth.currentUser!, password);
    },

    deleteAccount: async () => {
        const db = getDatabase();
        const userRef = ref(db, `roles/${auth.currentUser!.uid}`);

        await remove(userRef);
        await deleteUser(auth.currentUser!);
    }
}

