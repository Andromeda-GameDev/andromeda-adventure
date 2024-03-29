<script lang="ts">
    import { Input, Button, ButtonGroup, InputAddon, Spinner, Modal } from 'flowbite-svelte';
    import { EnvelopeSolid, EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
    import { authHandlers, authStore } from '../stores/auth';
    import Alert from "../components/Alert.svelte"
    import type { FirebaseError } from '../types';

    let passwordVisible = false;
    let email = '';
    let password = '';
    let isLoading = false; 
    let forgotPasswordModal = false; 

    let alert = {
        visible: false,
        type: "error",
        message: "",
    };

    async function handleGoogleLogin() {
        try {
            await authHandlers.signInWithPopup();

        } catch (error) {
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.code,
            };

            return;
        }
    }

    const handleEmailLogin = async () => {
        isLoading = true;
        if(email == '' || password == '') {
            alert = {
                visible: true,
                type: "error",
                message: 'Por favor, ingrese su correo electrónico y contraseña.',
            };
            return;
        }

        try {
            await authHandlers.signInWithEmail(email, password);
        } catch (error) {
            console.log(error);
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.code,
            };

            isLoading = false;
            return;
        }
    }
    

    $: if($authStore.isLogged) {
        let userRole = $authStore.role;
        if(userRole == 'admin') {
            window.location.href = '/admin';
        } else if(userRole == 'student') {
           if($authStore.status){
                if($authStore.status == 'active'){
                    window.location.href = '/student';
                } else {
                    alert = {
                        visible: true,
                        type: "error",
                        message: "Su cuenta no ha sido invalidada por el administrador",
                    };

                    authHandlers.logout();
                }
           } 
           
        } else if(userRole == 'professor') {
            if($authStore.status){
                console.log($authStore.status);
                if($authStore.status == 'active'){
                    window.location.href = '/professor';
                } else if($authStore.status === 'pending'){
                    alert = {
                        visible: true,
                        type: "info",
                        message: "Su cuenta está pendiente de aprobación",
                    };

                    authHandlers.logout();
                } else if($authStore.status === 'rejected'){
                    alert = {
                        visible: true,
                        type: "error",
                        message: "Su cuenta ha sido rechazada",
                    };

                    authHandlers.logout();
                } else if($authStore.status === 'blocked'){
                    alert = {
                        visible: true,
                        type: "error",
                        message: "Su cuenta ha sido desactivada",
                    };

                    authHandlers.logout();
                }
            }
        }
    }

    async function handleRecoverPassword() {
        try {
            if(email == '') {
                alert = {
                    visible: true,
                    type: "error",
                    message: "Por favor, ingrese su correo electrónico",
                };
                return;
            }

            await authHandlers.resetPassword(email);

            forgotPasswordModal = false;

            alert = {
                visible: true,
                type: "success",
                message: "Se ha enviado un correo electrónico para restablecer su contraseña",
            };
        } catch (error) {
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.code,
            };
        }
    }

</script>


<div class="main-container">
    <div class="left-half"/>
    <div class="right-half">
        <h1 class="welcome-title">Bienvenido a Andromeda</h1>
        <div class="login-form-container">
            <h1>Iniciar sesión</h1>
            <form class="form-container">
                <ButtonGroup class="w-full mb-6">
                    <InputAddon>
                        <EnvelopeSolid class="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                    </InputAddon>
                    <Input bind:value={email} id="email" type="email" size="lg" placeholder="Correo electrónico" class="focus:ring-blue-500 focus:border-blue-500" autocomplete="on"/>
                </ButtonGroup>
                
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <button on:click={() => (passwordVisible = !passwordVisible)}>
                            {#if passwordVisible}
                                <EyeOutline class="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                            {:else}
                                <EyeSlashOutline class="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                            {/if}
                        </button>
                    </InputAddon>
                    <Input bind:value={password} id="show-password" type={passwordVisible ? 'text' : 'password'} size="lg" placeholder="Contraseña" class="focus:ring-blue-500 focus:border-blue-500" autocomplete="current-password"/>
                </ButtonGroup>
            </form>
            
            <Button on:click={handleEmailLogin} class="mt-6 mb-6" color="blue" size="lg">
                {#if isLoading}
                    <Spinner class="w-5 h-5 mr-3 text-white"/> Cargando...
                {:else}
                    Iniciar sesión
                {/if}
            </Button>
            <p> ó </p>
            <Button 
                on:click={() => handleGoogleLogin()}
                class="mt-6 mb-6 hover:bg-green-300 hover:text-white focus:text-black" 
                color="alternative" 
                size="lg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google G Logo" class="google-icon"/>
                Google
            </Button>
            <a  href="/"
                on:click={(event) => {
                    event.preventDefault();
                    forgotPasswordModal = true;
                }}
                class="mt-6 mb-6 hover:text-blue-500"
            >¿Olvidaste tu contraseña?</a>
        </div>
    </div>  
</div>

<Modal bind:open={forgotPasswordModal} title="Recuperar contraseña">
    <p>Ingrese su correo electrónico para recuperar su contraseña</p>
    <Input bind:value={email} id="email" type="email" size="lg" placeholder="Correo electrónico" class="focus:ring-blue-500 focus:border-blue-500" autocomplete="on"/>
    <Button on:click={() => {
        console.log(email),
        handleRecoverPassword()
    }} class="mt-6 mb-6" color="blue" size="lg">
        Enviar
    </Button>
</Modal>

<Alert
    alertType={alert.type}
    alertMessage={alert.message}
    alertVisible={alert.visible}
/>

<style>
    .main-container {
        display: flex;
        flex-direction: row;
        height: 100vh;
    }
    .left-half {
        flex: 1;
        background-image: url("/loginImage.jpg");
    }
    .right-half {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .welcome-title {
        font-size: 2.5rem;
        font-weight: 600;
        color: #000;
    }

    .login-form-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        width: 80%;
    }

    .login-form-container h1 {
        font-size: 1.8rem;
        font-weight: 500;
        color: #000;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .login-form-container a {
        font-size: 1rem;
        font-weight: 500;
        color: rgb(77, 147, 226);
        margin-top: 1rem;
    }

    .form-container {
        width: 100%;
        box-sizing: border-box;
    }

    .google-icon {
        height: 1.2rem;
        margin-right: 1rem;
    }

    @media (max-width: 600px) {
    .main-container {
        flex-direction: column;
    }
    .left-half {
        flex: 0 0 100%;
        order: 2;
    }
    .right-half {
        flex: 0 0 100%;
        order: 1; 
    }
    .login-form-container {
        width: 80%;
    }

    .welcome-title {
        font-size: 2rem;
    }
}
</style>