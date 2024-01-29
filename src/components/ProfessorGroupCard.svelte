<script lang="ts">
    import { Card, Tooltip, Dropdown, DropdownItem, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Toggle, Button } from 'flowbite-svelte';
    import { FileCopySolid, DotsVerticalOutline, SearchSolid, LockTimeSolid, TrashBinSolid, FileExportSolid, CheckCircleSolid, CloseCircleSolid } from 'flowbite-svelte-icons';
    import type { Student, FirebaseError } from '../types';
    import Alert from '../components/Alert.svelte'
    import { updateLevelStatus, deleteUserFromGroup, deleteGroup } from '../api/Professor/groups';
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let title = 'Card title';
    export let groupId = 'C0000';
    export let levels: Record<string, boolean> = {
        level_1: true,
        level_2: true
    };
    export let students: Student[] = [];
    let filteredStudents: Student[] = Object.values(students).filter(student => student.group_id === groupId);

    let alert = {
        visible: false,
        type: "success",
        message: "",
        position: "top-center"
    };

    let isCopied = false;
    let iconColor = 'black';
    let modalStudent = false;
    let modalLevels = false;
    let modalEliminate = false;

    function copyGroupId() {
        navigator.clipboard.writeText(groupId);
        isCopied = true;

        setTimeout(() => {
            isCopied = false;
        }, 3000);
    }

    $: iconColor = isCopied ? 'green' : 'black';

    function openModalStudent() {
        modalStudent = true;
    }

    function openModalLevels() {
        modalLevels = true;
    }

    function openModalEliminate() {
        modalEliminate = true;
    }

    async function handleUpdateLevelStatus(){
        try {
            const res = await updateLevelStatus(groupId, levels);

            levels  = res.levels;
            modalLevels = false;

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

    async function handleDeleteUserFromGroup(student: Student){
        try {
            const res = await deleteUserFromGroup(student, filteredStudents);

            filteredStudents = res.filteredStudents;
            modalStudent = false;

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

    async function handleDeleteGroup(groupId: string){
        try {
            await deleteGroup(groupId);

            modalEliminate = false;
            dispatch('delete-group', groupId)            
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
</script>


<Card>
    <div class="card-content">
        <div class="card-content-header">
            <h1>{title}</h1>
            <DotsVerticalOutline class="w-4 hover:cursor-pointer" size="md"/>
            <Dropdown placement="right">
                <DropdownItem on:click={openModalStudent}>
                    <div class="drop-down-item">
                        <div class="text-container">
                            <p>Ver más </p>
                        </div>
                        <div class="icon-container">
                            <SearchSolid class="w-4 ml-5 text-blue-600" size="lg"/>
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem on:click={openModalLevels}>
                    <div class="drop-down-item">
                        <div class="text-container">
                            <p>Niveles </p>
                        </div>
                        <div class="icon-container">
                            <LockTimeSolid class="w-4 ml-5" size="lg"/>
                        </div>
                    </div>
                </DropdownItem>
                <!-- <DropdownItem>
                    <div class="drop-down-item">
                        <div class="text-container">
                            <p>Exportar </p>
                        </div>
                        <div class="icon-container">
                            <FileExportSolid class="w-4 ml-5 text-green-500" size="lg"/>
                        </div>
                    </div>
                </DropdownItem> -->
                <DropdownItem on:click={openModalEliminate}>
                    <div class="drop-down-item">
                        <div class="text-container">
                            <p>Eliminar </p>
                        </div>
                        <div class="icon-container">
                            <TrashBinSolid class="w-4 ml-5 text-red-500" size="lg"/>
                        </div>
                    </div>
                </DropdownItem>
            </Dropdown>
        </div>
        <div class="card-content-body">
            <h1>Alumnos: {filteredStudents.length}</h1>
            <div class="copy-icon-container">
                <p>{groupId}</p>
                <FileCopySolid id="copy-icon" class="w-4 ml-3 hover:cursor-pointer" size="md" on:click={copyGroupId} style="color: {iconColor}"/>
                <Tooltip arrow={false} triggeredBy="#copy-icon">Copiar</Tooltip>
            </div>
        </div>
    </div>
</Card>

<Modal bind:open={modalStudent} size="lg" autoclose outsideclose>
    <div slot="header">
        <h1 class="font-bold text-xl ml-5">{title}</h1>
    </div>
    <div>
        {#if filteredStudents.length !== 0}
            <Table striped={true}>
                <TableHead class="bg-blue-300">
                    <TableHeadCell>Nombre</TableHeadCell>
                    <TableHeadCell>Apellido</TableHeadCell>
                    <TableHeadCell>Correo</TableHeadCell>
                    <TableHeadCell>Nivel 1</TableHeadCell>
                    <TableHeadCell>Nivel 2</TableHeadCell>
                    <TableHeadCell><span class="sr-only"> Eliminar </span></TableHeadCell>
                </TableHead>
                <TableBody>
                    {#each filteredStudents as student}
                        <TableBodyRow>
                            <TableBodyCell>{student.name}</TableBodyCell>
                            <TableBodyCell>{student.lastName}</TableBodyCell>
                            <TableBodyCell>{student.email}</TableBodyCell>
                            <TableBodyCell>
                                {#if student.progress}
                                    {#if student.progress.level_1}
                                        <CheckCircleSolid class="w-4 ml-5 text-green-500" size="lg"/>
                                    {:else}
                                        <CloseCircleSolid class="w-4 ml-5 text-red-500" size="lg"/>
                                    {/if}
                                {:else}
                                    <CloseCircleSolid class="w-4 ml-5 text-red-500" size="lg"/>
                                {/if}
                            </TableBodyCell>
                            <TableBodyCell>
                                {#if student.progress}
                                    {#if student.progress.level_2}
                                        <CheckCircleSolid class="w-4 ml-5 text-green-500" size="lg"/>
                                    {:else}
                                        <CloseCircleSolid class="w-4 ml-5 text-red-500" size="lg"/>
                                    {/if}
                                {:else}
                                    <CloseCircleSolid class="w-4 ml-5 text-red-500" size="lg"/>
                                {/if}
                            </TableBodyCell>
                            <TableBodyCell>
                                <TrashBinSolid class="w-4 ml-5 text-red-500 hover:cursor-pointer" size="lg"
                                    on:click={() => {
                                        handleDeleteUserFromGroup(student);
                                    }}
                                />
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
        {:else}
            <h1 class="text-xl font-medium">Este grupo no cuenta con alumnos</h1>
        {/if}
    </div>
</Modal>

<Modal bind:open={modalLevels} size="xs" autoclose outsideclose>
    <div slot="header">
        <h1 class="font-bold text-xl ml-5">Control de acceso</h1>
    </div>
    <div class="toggle-levels-container">
        Configura el acceso a los niveles:
        <div class="level-toggle">
            Nivel 1: <Toggle bind:checked={levels.level_1} color="purple"/>
        </div>
        <div class="level-toggle">
            Nivel 2: <Toggle bind:checked={levels.level_2} color="purple"/>
        </div>
    </div>
    <div class="buttons-sure">
        <Button size="xs" variant="outlined" class="bg-purple-500 hover:bg-purple-300"
            on:click={() => {
                handleUpdateLevelStatus();
            }}
        >
            <h1>Guardar</h1>
        </Button>
        <Button size="xs" variant="outlined" class="bg-gray-500 hover:bg-gray-400" on:click={() => modalLevels = false}>
            <h1>Cancelar</h1>
        </Button>
    </div>
</Modal>

<Modal bind:open={modalEliminate} size="xs" autoclose outsideclose>
    <div slot="header">
        <h1 class="font-bold text-xl ml-5">Eliminar grupo</h1>
    </div>
    <div class="sure-buttons-container">
        ¿Estás seguro de que quieres eliminar el grupo?
        <div class="buttons-sure">
            <Button size="xs" variant="outlined" class="bg-red-500 hover:bg-red-400"
                on:click={() => {
                    handleDeleteGroup(groupId);
                }}
            >
                <h1>Eliminar</h1>
            </Button>
            <Button size="xs" variant="outlined" class="bg-gray-500 hover:bg-gray-400" on:click={() => modalEliminate = false}>
                <h1>Cancelar</h1>
            </Button>
        </div>
    </div>
</Modal>

<Alert
    alertType={alert.type}
    alertMessage={alert.message}
    alertVisible={alert.visible}
/> 


<style>
    .card-content {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: space-between;
        width: 270px;
        height: 120px;
    }

    .card-content-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    
    .card-content-header h1 {
        white-space: pre-line;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 550;
        font-size: 1.1rem;
        color: black;
    }

    .card-content-body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .copy-icon-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .copy-icon-container p {
        white-space: pre-line;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 550;
        font-size: 0.9rem;
    }

    .drop-down-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .toggle-levels-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
        gap: 1rem;
    }

    .level-toggle {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 1rem;
    }

    .sure-buttons-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .buttons-sure {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 1rem;
    }


</style>