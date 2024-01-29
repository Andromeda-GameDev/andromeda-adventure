<script lang="ts">
    import { Button, Alert } from 'flowbite-svelte';
    import { InfoCircleSolid, CloseSolid } from 'flowbite-svelte-icons';
    import { fade } from 'svelte/transition';

    export let alertVisible: boolean = false;
    export let alertType: string = "info";
    export let alertMessage: string = "This is an alert message";

    let alertColor: string = "";
    let symbolColor: string = "";

    $: if(alertType == "info") {
        alertColor = "bg-blue-100 text-blue-500"
        symbolColor = "text-blue-500"
    } else if(alertType == "success") {
        alertColor = "bg-green-100 text-green-500"
        symbolColor = "text-green-500"
    } else if(alertType == "warning") {
        alertColor = "bg-yellow-100 text-yellow-500"
        symbolColor = "text-yellow-500"
    } else if(alertType == "error") {
        alertColor = "bg-red-100 text-red-500"
        symbolColor = "text-red-500"
    } 

    function close() {
        alertVisible = false;
    }

    $: if(alertVisible) {
        setTimeout(() => {
            alertVisible = false;
        }, 3000);
    }
    
    // firebase login error code dictionary
    const errorCode: { [key: string]: string} = {
        "auth/invalid-email": "El correo electrónico ingresado no es válido.",
        "auth/user-disabled": "El usuario ha sido deshabilitado.",
        "auth/user-not-found": "El usuario no existe, favor de verificar.",
        "auth/wrong-password": "La contraseña es incorrecta.",
        "auth/email-already-in-use": "El correo electrónico ya está en uso.",
        "auth/operation-not-allowed": "La operación no está permitida.",
        "auth/weak-password": "La contraseña es muy débil.",
        "auth/popup-closed-by-user": "El inicio de sesión con Google fue cancelado.",
        "auth/network-request-failed": "Error de conexión. Por favor, intente nuevamente.",
        "auth/too-many-requests": "Demasiados intentos de inicio de sesión fallidos. Por favor, intente nuevamente más tarde.",
        "auth/invalid-credential": "Las credenciales son inválidas, favor de revisar.",
        "auth/account-exists-with-different-credential": "El correo electrónico ya está en uso.",
        "auth/auth-domain-config-required": "Error de conexión. Por favor, intente nuevamente.",
        "auth/credential-already-in-use": "El correo electrónico ya está en uso.",
        "auth/operation-not-supported-in-this-environment": "Error de conexión. Por favor, intente nuevamente.",
        "auth/timeout": "Error de conexión. Por favor, intente nuevamente.",
        "auth/missing-android-pkg-name": "Error de conexión. Por favor, intente nuevamente.",
        "auth/missing-continue-uri": "Error de conexión. Por favor, intente nuevamente.",
        "auth/missing-ios-bundle-id": "Error de conexión. Por favor, intente nuevamente.",
        "auth/invalid-continue-uri": "Error de conexión. Por favor, intente nuevamente.",
        "auth/unauthorized-continue-uri": "Error de conexión. Por favor, intente nuevamente.",
        "auth/invalid-dynamic-link-domain": "Error de conexión. Por favor, intente nuevamente.",
        "auth/argument-error": "Error de conexión. Por favor, intente nuevamente.",
        "auth/invalid-persistence-type": "Error de conexión. Por favor, intentelo nuevamente.",
        "auth/requires-recent-login" : "La sesión ha expirado, favor de iniciar sesión nuevamente.",
        "auth/popup-blocked": "Las ventanas emergentes están bloqueadas en este navegador. Por favor, habilítelas e intente nuevamente.",
    }

    $: if(alertMessage in errorCode) {
        alertMessage = errorCode[alertMessage];
    } 

</script>

<div class="alert-container">
    {#if alertVisible}
        <div out:fade>
            <Alert class={alertColor} dismissable>
                <span slot="icon">
                    <InfoCircleSolid class="w-5 h-5 {symbolColor}"/>
                </span>
                <span>
                    <p class="text-sm">{alertMessage}</p>
                </span>
                <Button slot="close-button" size="xs" on:click={close} class="ms-auto bg-transparent-100 text-black-900 hover:bg-red-300"><CloseSolid size="xs"/></Button>
            </Alert>
        </div>
    {/if}
</div>

<style>
    .alert-container {
        position: absolute;
        top: 8rem;
        left: 0;
        right: 0;
        width: 100%;
        display: flex;
        justify-content: right;
        align-items: right;
    }
</style>

