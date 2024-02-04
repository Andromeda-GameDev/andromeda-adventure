<script lang="ts">
    import { Input, Button, Modal, Spinner, Helper } from 'flowbite-svelte';
    import Alert from '../../../components/Alert.svelte';
    import PasswordStrengthPopover from '../../../components/PasswordStrengthPopover.svelte';
    import { ExclamationCircleOutline, EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
    import { authHandlers } from '../../../stores/auth';
    import type { FirebaseError } from '../../../types';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { onMount } from 'svelte';
    import { authStore } from '../../../stores/auth';

    let providerId = '';
    $: user_email = $authStore.email ?? '';

    onMount(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.providerData.forEach((profile) => {
                    providerId = profile.providerId;
                });
            }
        });
    });

    let alert = {
        visible: false,
        type: "error",
        message: "",
    };

    let deleteAccountModal = false;

    function handleOpenDeleteAccountModal() {
        deleteAccountModal = true;
    }

    async function handleDeleteAccount(){
        try {
            await authHandlers.deleteAccount();

            window.location.href = '/';

            alert = {
                visible: true,
                type: "success",
                message: "Cuenta eliminada correctamente.",
            }
        } catch (error) {
            
            let firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.code,
            }

        }
    }

    let password = '';
    let showPassword = false;
    let confirmPassword = '';
    let showConfirmPassword = false;
    let oldPassword = '';
    let showOldPassword = false;

    let isPasswordValid = false;
    let isLoading = false;

    function handlePasswordValid(event: CustomEvent) {
        isPasswordValid = event.detail;
    }

    async function updatePassword() {
        isLoading = true;

        try {
            await authHandlers.updatePassword(password);

            alert = {
                visible: true,
                type: "success",
                message: "Contraseña actualizada correctamente.",
            }

            password = '';
            confirmPassword = '';
            isLoading = false;

        } catch (error) {
            let firebaseError = error as FirebaseError;

            if(firebaseError.code == 'auth/requires-recent-login') {
                try {
                    if(providerId == 'password') {
                        await authHandlers.signInWithEmail(user_email, oldPassword);
                    } else if(providerId == 'google.com') {
                        await authHandlers.signInWithPopup();
                    } 

                    await authHandlers.updatePassword(password);

                    alert = {
                        visible: true,
                        type: "success",
                        message: "Contraseña actualizada correctamente.",
                    }

                } catch (error) {
                    
                    let firebaseError = error as FirebaseError;

                    alert = {
                        visible: true,
                        type: "error",
                        message: firebaseError.code,
                    }
                }
            } else {
                alert = {
                    visible: true,
                    type: "error",
                    message: firebaseError.code,
                }
            }

            isLoading = false;
        }
    }

</script>



<div class="settings-container">
    <div class="change-password">
        <div class="change-password-title">
            <h1>Cambiar contraseña</h1>
            <hr class="solid">
        </div>
        <div class="change-password-input">
            {#if providerId == 'password'}
            <div class="flex items-center gap-2">
                <Input type={showOldPassword ? 'text' : 'password'} id="old-password" placeholder="Contraseña actual" class="focus:ring-blue-500 focus:border-blue-500"
                bind:value={oldPassword}>
                    <button slot="left" class="pointer-events-auto" on:click={() => showOldPassword = !showOldPassword}>
                        {#if showOldPassword}
                            <EyeOutline class="w-5 h-5 text-gray-400 dark:text-gray-200"/>
                        {:else}
                            <EyeSlashOutline class="w-5 h-5 text-gray-400 dark:text-gray-200"/>
                        {/if}
                    </button>
                </Input>
            </div>
            {/if}
            <div class="flex items-center gap-2">
                <Input type={showPassword ? 'text' : 'password'} id="password" placeholder="Nueva contraseña" class="focus:ring-blue-500 focus:border-blue-500"
                color={isPasswordValid ? 'green' : 'base'}
                bind:value={password}>
                    <button slot="left" class="pointer-events-auto" on:click={() => showPassword = !showPassword}>
                        {#if showPassword}
                            <EyeOutline class="w-5 h-5 text-gray-400 dark:text-gray-200"/>
                        {:else}
                            <EyeSlashOutline class="w-5 h-5 text-gray-400 dark:text-gray-200"/>
                        {/if}
                    </button>
                </Input>
                <div style="z-index: 1">
                    <PasswordStrengthPopover bind:password={password} on:passwordValid={handlePasswordValid}/>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmar contraseña" class="focus:ring-blue-500 focus:border-blue-500"
                color={(password == confirmPassword && password != '') ? 'green' : 'base'} 
                bind:value={confirmPassword}>

                    <button slot="left" class="pointer-events-auto" on:click={() => showConfirmPassword = !showConfirmPassword}>
                        {#if showConfirmPassword}
                            <EyeOutline class="w-5 h-5 text-gray-400 dark:text-gray-200"/>
                        {:else}
                            <EyeSlashOutline class="w-5 h-5 text-gray-400 dark:text-gray-200"/>
                        {/if}
                    </button>
                </Input>
            </div>
            {#if password != confirmPassword && password != '' && confirmPassword != ''}
                <Helper color="red">Las contraseñas no coinciden</Helper>
            {/if}
        </div>
        <div class="change-password-button">
            <Button class="bg-black hover:bg-gray-700"
                on:click={updatePassword}
                disabled={password != confirmPassword || password == '' || confirmPassword == '' || !isPasswordValid}
            >
                {#if isLoading}
                    <Spinner class="w-5 h-5 mr-3 text-white"/> Cargando...
                {:else}
                    Actualizar contraseña
                {/if}
            </Button>
        </div>
    </div>
    <div class="change-password">
        <div class="change-password-title">
            <h1>Eliminar cuenta</h1>
            <hr class="solid">
        </div>
        <div class="change-password-button">
            <Button color="red" on:click={handleOpenDeleteAccountModal} >Eliminar cuenta</Button>
        </div>
    </div>

</div>

<Alert
    alertType={alert.type}
    alertMessage={alert.message}
    alertVisible={alert.visible}
/>

<Modal bind:open={deleteAccountModal} size="sm" outsideclose>
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Seguro deseas eliminar esta cuenta? No se puede recuperar</h3>
        <Button color="red" class="me-2"
            on:click={handleDeleteAccount}
        >Sí, borrar</Button>
        <Button color="alternative"
            on:click={() => deleteAccountModal = false}
        >No, cancelar</Button>
      </div>
</Modal>


<style>
    .settings-container {
        margin-top: 20px;
        width: 100%;
    }

    .change-password {
        margin: 0 auto;
        margin-top: 2rem;
        width: 80%;
    }

    .change-password-title {
        margin-bottom: 1.5rem;
    }

    .change-password-title h1 {
        font-weight: 500;
        color: #000;
        margin-bottom: 1rem;
        font-weight: 600;
    }

    .change-password-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
    }

    .change-password-button {
        margin-top: 1.5rem;
    }


</style>