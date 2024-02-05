<script lang="ts">
    import { authStore } from '../../../stores/auth';
    import type { Group, Student, FirebaseError } from '../../../types';
    import ProfessorGroupCard from '../../../components/ProfessorGroupCard.svelte';
    import Alert from '../../../components/Alert.svelte'
    import { Spinner, Button, Dropdown, DropdownItem, MultiSelect, Modal, Input } from 'flowbite-svelte'
    import { PlusSolid, CirclePlusSolid, EditOutline } from 'flowbite-svelte-icons';
    import { Groups, Students } from '../../../stores/professorData';
    import { addNewGroup, addExistingGroup } from '../../../api/Professor/groups';

    let alert = {
        visible: false,
        type: "error",
        message: "",
        position: "top-center"
    };
	
    let currentUserUid = $authStore.uid;
    let filteredGroups: Group[] = [];
    let externalGroups: Group[] = [];
    let selectableGroups: any = [];
    let studentsObj: Student[] = [];

    $: {
        if ($authStore.uid) {
            currentUserUid = $authStore.uid;
        }

        if ($Groups.length > 0 && currentUserUid) {
            filteredGroups = $Groups.filter(group => group.professors_ids.includes(currentUserUid as string));
            externalGroups = $Groups.filter(group => !group.professors_ids.includes(currentUserUid as string));
        }

        selectableGroups = externalGroups.map(group => ({
            value: group.group_id,
            name: group.group_name
        }));

        studentsObj = $Students || [];
    }

    let modalAddExistingGroup = false;
    let modalAddNewGroup = false;
    let selectedGroups:any = [];
    let newGroupName: string = '';

    async function handleAddNewGroup() {
        try {
            let res = await addNewGroup(newGroupName, currentUserUid as string, $authStore.email as string);
            $Groups = [...$Groups, res.newGroup];
            modalAddNewGroup = false;
            newGroupName = '';

            alert = {
                visible: true,
                type: "success",
                message: res.message,
                position: "top-center"
            };
        } catch (error) {
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.code,
                position: "top-center"
            };
            return;
        }
    }

    async function handleExistingGroups(){
        try {
            await addExistingGroup(selectedGroups, currentUserUid as string, $authStore.email as string, selectedGroups);
            $Groups.forEach(group => {
                if (selectedGroups.includes(group.group_id)) {
                    group.professors_ids.push(currentUserUid as string);
                }
            });
            
            const newGroups = externalGroups.filter(group => selectedGroups.includes(group.group_id));
            filteredGroups = [...filteredGroups, ...newGroups];
            selectableGroups = selectableGroups.filter((group: any) => !selectedGroups.includes(group.value));
            selectedGroups = [];

            modalAddExistingGroup = false;

            alert = {
                visible: true,
                type: "success",
                message: 'Grupos agregados correctamente.',
                position: "top-center"
            };

        } catch (error) {
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.code,
                position: "top-center"
            };
            return;
        }
    }

    function handleDeleteGroup(groupId: string) {
        selectableGroups = [...selectableGroups, { value: groupId, name: externalGroups.find(group => group.group_id === groupId)?.group_name }];
        filteredGroups = filteredGroups.filter(group => group.group_id !== groupId);
        Groups.update(groups => groups.filter(group => group.group_id !== groupId));

        alert = {
            visible: true,
            type: "success",
            message: 'Grupo eliminado correctamente.',
            position: "top-center"
        };
    }

    let test = true;
    
</script>

<div class="groups-container">
    <div class="groups-container-header">
        <h1 class="font-bold text-xl">Grupos</h1>
        <div class="flex-grow"></div>
        <Button size="xs" variant="outlined" class="bg-blue-500 hover:bg-blue-400" >
            <PlusSolid class="w-4" size="xs"/>
            <h1 class="ml-2 text-sm font-medium">Agregar grupo</h1>
        </Button>
        <Dropdown>
            <DropdownItem on:click={() => modalAddNewGroup = true}>
                <div class="drop-down-item">
                    <div class="text-container">
                        <h1 class="text-sm font-medium">Agregar nuevo</h1>
                    </div>
                    <div class="icon-container">
                        <EditOutline class="w-4 ml-5" size="lg"/>
                    </div>
                </div>
            </DropdownItem>
            <DropdownItem on:click={() => modalAddExistingGroup = true}>
                <div class="drop-down-item">
                    <div class="text-container">
                        <h1 class="text-sm font-medium">Agregar existente </h1>
                    </div>
                    <div class="icon-container">
                        <CirclePlusSolid class="w-4 ml-5" size="lg"/>
                    </div>
                </div>
            </DropdownItem>
        </Dropdown>
    </div>
    {#if $Groups.length === 0 || currentUserUid === null}
        <div class="spinner-container">
            <Spinner color="purple" size="14"/>
        </div>
    {:else if filteredGroups.length === 0}
        <h1 class="text-xl font-medium ml-12">No tienes grupos asignados.</h1>
    {:else}
        <div class="groups-content">
            {#each filteredGroups as group}
                <ProfessorGroupCard title={group.group_name} groupId={group.group_id} students={studentsObj} levels={group.levels}
                    on:delete-group={
                        () => {
                            handleDeleteGroup(group.group_id);
                        }
                    }
                />
            {/each}
        </div>
    {/if}
</div>

<Modal bind:open={modalAddExistingGroup} size="lg">
    <div slot="header">
        <h1 class="font-bold text-xl">Agregar grupo existente</h1>
    </div>
    <div class="group-select-container">
        <MultiSelect items={selectableGroups} bind:value={selectedGroups} size="lg"/>
    </div>
    <div class="modal-buttons">
        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400"
            on:click={() => {
                handleExistingGroups();
            }}
            disabled={selectedGroups.length === 0}
        >Agregar</Button>
        <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400" on:click={() => modalAddExistingGroup = false}>Cancelar</Button>
    </div>
</Modal>

<Modal bind:open={modalAddNewGroup} size="sm">
    <div slot="header">
        <h1 class="font-bold text-xl">Agregar grupo nuevo</h1>
    </div>
    <div>
        <Input placeholder="Nombre del grupo" bind:value={newGroupName} />
    </div>
    <div class="modal-buttons">
        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400"
            on:click={() => {
                handleAddNewGroup();
            }}
            disabled={newGroupName.length === 0}
        >Agregar</Button>
        <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400" on:click={() => modalAddNewGroup = false}>Cancelar</Button>
    </div>
</Modal>

<Alert
    alertType={alert.type}
    alertMessage={alert.message}
    alertVisible={alert.visible}
/>

<style>

    .groups-container-header {
        display: flex;
        width: 100%;
        height: 10%;
        align-items: center;
        padding-left: 3rem;
        padding-right: 3rem;
    }
    
    .groups-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .drop-down-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .groups-content {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 1.2rem;
        row-gap: 1.2rem;
        padding-left: 3rem;
        padding-right: 3rem;
        padding-bottom: 3rem;
        overflow: auto;
    }

    .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    
    .group-select-container {
        min-height: 320px;
        overflow-y: hidden;
        width: 100%;
    }

    .modal-buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 1rem;
    }
    
</style>
