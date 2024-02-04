<script lang="ts">
    import { authStore } from "../../stores/auth";
    import { getGroupNameById, updateStudentGroup } from "../../api/Student/homepage";
    import { Button, Badge, Modal, Input } from 'flowbite-svelte';
    import StudentManualsCard from "../../components/StudentManualsCard.svelte";
    import Alert from "../../components/Alert.svelte";
    import type { FirebaseError } from "../../types";

    let alert = {
        visible: false,
        type: "error",
        message: "",
        position: "top-center"
    };

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
</script>


<div class="container">
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
</style>
