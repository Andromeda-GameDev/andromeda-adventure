<script lang="ts">
    import { authHandlers, authStore } from "../../stores/auth";
    import { getGroupNameById, updateStudentGroup } from "../../api/Student/homepage";
    import { Button, Badge, Modal, Input, Spinner } from 'flowbite-svelte';
    import StudentManualsCard from "../../components/StudentManualsCard.svelte";
    import Alert from "../../components/Alert.svelte";
    import type { FirebaseError } from "../../types";
    import PasswordStrengthPopover from "../../components/PasswordStrengthPopover.svelte";
    import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
    import { validateUser } from "../../stores/auth";
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { onMount } from 'svelte';

    let alert = {
        visible: false,
        type: "error",
        message: "",
        position: "top-center"
    };

    let providerId = '';
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

    let registerModal = false;
    let updateGroupModal = false;
    let newGroup = '';

    let name = ''
    let student_uuid = '';
    let group_id = '';
    let group_name = '';

    $: name = $authStore.name ?? $authStore.email ?? '';
    $: student_uuid = $authStore.uid ?? '';
    $: group_id = $authStore.group_id ?? '';

    
    async function getGroupName(group: string){
        try{
            group_name = await getGroupNameById(group);
        } catch (error){
            console.log(error);
        }
    }

    $ : {
        if(group_id){
            getGroupName(group_id);
        }
    }

    $: {
        if($authStore){
            if($authStore.validated !== null && $authStore.validated === false){
                registerModal = true;
            }
        }
    }

    async function updateGroup(student_id: string, group_id_new: string){
        try{
            if(newGroup === ''){
                alert = {
                    visible: true,
                    type: "error",
                    message: "El nombre del grupo no puede estar vacío",
                    position: "top-center"
                };
                return;
            }

            await updateStudentGroup(student_id, group_id_new);
            
            alert = {
                visible: true,
                type: "success",
                message: "Grupo actualizado correctamente",
                position: "top-center"
            };

            
            group_id = group_id_new;
            getGroupName(group_id);
            updateGroupModal = false;

            newGroup = '';

        } catch (error){
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.message,
                position: "top-center"
            };

            updateGroupModal = false;

            return;
        }
    }

    let password = '';
    let showPassword = false;
    let confirmPassword = '';
    let showConfirmPassword = false;


    let isPasswordValid = false;
    function handlePasswordValid(event: CustomEvent) {
        isPasswordValid = event.detail;
    }

    async function validate(){
        try{
            await authHandlers.updatePassword(password);
            console.log("Password updated")
            await validateUser(student_uuid);

            registerModal = false;

            password = '';
            confirmPassword = '';
            

            alert = {
                visible: true,
                type: "success",
                message: "Contraseña actualizada correctamente.",
                position: "top-center"
            }

        } catch (error){
            const firebaseError = error as FirebaseError;

            if(firebaseError.code == 'auth/requires-recent-login') {
                    try {
                        if(providerId == 'password') {
                            await authHandlers.signInWithEmail(name, password);
                        } else if(providerId == 'google.com') {
                            await authHandlers.signInWithPopup();
                        } 

                        await authHandlers.updatePassword(password);

                        alert = {
                            visible: true,
                            type: "success",
                            message: "Contraseña actualizada correctamente.",
                            position: "top-center"
                        }

                    } catch (error) {
                        
                        let firebaseError = error as FirebaseError;

                        alert = {
                            visible: true,
                            type: "error",
                            message: firebaseError.code,
                            position: "top-center"
                        }
                    }
                } else {
                    alert = {
                        visible: true,
                        type: "error",
                        message: firebaseError.code,
                        position: "top-center"
                    }
                }

            }

            return;
        }

    let test = true;

</script>


<div class="container">
   {#if name && student_uuid && group_id !== null && group_name !== null}
        <div class="header">
            <div class="greeting">
                <p> Hola, </p>
                <p class="ml-2 text-blue-600 font-semibold">{name}</p>
            </div>
        </div>
        <div class="content">
            <div class="top-section">
                <div class="group-card">
                    <div class="left">
                        {#if group_name && group_name !== '' && group_id !== ''}
                            <p class="group-title">{group_name}</p>
                            <div class="group-id">
                                <Badge
                                    color="blue" 
                                    class="font-bold p-2"
                                >
                                    {group_id}
                                </Badge>
                            </div> 
                        {:else}
                            <p class="group-title">Sin grupo</p>
                        {/if}
                    </div>
                    <div class="right">
                        <Button color="blue" size="sm" outline
                            on:click={() => updateGroupModal = true}
                        >Editar</Button>
                    </div>
                </div>
            </div>
            <div class="manuals-section">
                <StudentManualsCard />
            </div>
        </div>
   {:else}
        <div class="flex flex-col items-center justify-center pt-20">
            <Spinner color="blue" size="14"/>
        </div>
   {/if}
</div>

<Modal bind:open={updateGroupModal} title="Actualizar grupo" size="sm">
    <div class="modal-content">
        <Input
            label="Nuevo grupo"
            placeholder="Nuevo grupo"
            bind:value={newGroup}
        />
    </div>
    <div class="modal-footer">
        <Button color="red" size="sm" outline>Cancelar</Button>
        <Button color="blue" size="sm" on:click={() => updateGroup(student_uuid, newGroup)}>Actualizar</Button>
    </div>
</Modal>

<Modal bind:open={registerModal} size="md" dismissable={false}>
    <div class="modal-content">
        <div class="modal-title">
            <p>¡Bienvenid@ a la plataforma de Andromeda!</p>
        </div>
        <div class="modal-body">
            <div class="top-paragraph">
                Estamos emocionados de que estés aquí y no podemos esperar para que comiences tu aventura. 
                Sin embargo, antes de empezar te pedimos que establezcas una contraseña con la que podrás accedar al juego en conjunto de tu correo:
            </div>
            <div class="email-paragraph">
                <p> {name}</p>
            </div>
            <div class="mid-paragraph">
                Por favor escribe una contraseña de al menos 8 caracteres, una mayúscula, un número y un caracter especial:
                <Input type={showPassword ? 'text' : 'password'} id="password" placeholder="Nueva contraseña" class="focus:ring-blue-500 focus:border-blue-500 mt-5"
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
                <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmar contraseña" class="focus:ring-blue-500 focus:border-blue-500 mt-5"
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
            <div class="bottom-paragraph">
                Ya casi estamos dentro, si tienes el código de tu grupo, puedes escribirlo aquí para que te agreguemos a él:
                <div class="flex flex-row items-center justify-center mt-6">
                    <Input
                    label="Código de grupo"
                    placeholder="Código de grupo"
                    defaultClass="w-[90%] mr-6"
                    bind:value={newGroup}
                />
                <Button
                    color="blue"
                    size="sm"
                    outline
                    on:click = {() => updateGroup(student_uuid, newGroup)}
                >
                    Agregar
                </Button>
                </div>
                <p> * Si no tienes el código, no te preocupes, puedes unirte a un grupo más adelante. </p>
            </div>
        </div>
        <Button
            color="blue"
            size="sm"
            on:click={() => registerModal = false}
            disabled={!(isPasswordValid && password === confirmPassword)}
            on:click={validate}
        > Guardar </Button>
    </div>
</Modal>

<Alert
    alertType={alert.type}
    alertMessage={alert.message}
    alertVisible={alert.visible}
/>


<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        height: 100vh;
        width: 100%;
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 2.5rem;
    }

    .greeting {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        font-size: 1.2rem;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .top-section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-left: 2rem;
        padding-right: 2rem;
    }

    .group-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        height: 100%;
    }

    .group-title {
        font-size: 1rem;
        font-weight: 500;
        padding-left: 1rem;
        padding-right: 1rem;
        font-weight: 600;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .manuals-section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.2rem;
    }

    .modal-title {
        font-size: 1.5rem;
        font-weight: 600;
        padding-bottom: 1rem;
        color: #000;
    }

    .modal-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 1rem;
    }

    .top-paragraph {
        font-size: 1rem;
        font-weight: 500;
        padding-bottom: 1rem;
        color: #000;
    }

    .email-paragraph {
        font-size: 1.2rem;
        font-weight: 600;
        padding-bottom: 1rem;
        color: #0637e9;
    }

    .mid-paragraph {
        font-size: 1rem;
        font-weight: 500;
        padding-bottom: 1rem;
        color: #000;
    }

    .bottom-paragraph {
        font-size: 1rem;
        font-weight: 500;
        color: #000;
        justify-content: center;
        align-items: center;
    }

    .bottom-paragraph p {
        font-size: 0.8rem;
        font-weight: 800;
        color: #000;
        padding-top: 1rem;
    }
    
</style>
