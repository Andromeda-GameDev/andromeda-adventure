<script lang="ts">
    import { Students, GlobalValues, dbStatus } from "../../stores/adminData";
    import { Indicator, Badge,Toggle, Modal, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Input, MultiSelect } from "flowbite-svelte";
    import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import DashboardCardAdmin from "../../components/DashboardCardAdmin.svelte";
    import { authStore } from "../../stores/auth";

    let db_enabled: boolean = false;
    let students: any[] = [];
    let demoStudents: any[] = [];
    let multiSelectOptions: any[] = [];
    let selected: any[] = [];
    let globalValues: any = {};
    let name: string = '';
    $: name = $authStore.name ?? $authStore.email ?? '';

    $: {
        if (Students) {
            students = $Students;
            demoStudents = students.filter(student => student.demo);

            multiSelectOptions = students.filter(student => !student.demo).map(student => {
                return {
                    value: student.uuid,
                    name: student.name + ' ' + student.lastName + ' - ' + student.group_id
                }
            });
        }
        if (GlobalValues) {
            globalValues = $GlobalValues;
        }
        if (dbStatus) {
            db_enabled = $dbStatus;
        }
    }

    let modalToggleDB: boolean = false;
    function handleDBToggle() {
        if (db_enabled) {
            modalToggleDB = true;
        } else {
            db_enabled = true;
        }
    }

    function handleCancelDBToggle() {
        db_enabled = false; 
        db_enabled = true;
    }

    let editStates: any = {};

    function handleEdit(key : string) {
        editStates[key] = true;
    }

    function handleUpdate(key: string) {
        console.log('update', key);
        editStates[key] = false;
    }

    function handleCancel(key: string) {
        editStates[key] = false;
    }

    let valuesDictionary: {
    [key: string]: string;
    } = {
        'toleranceValue' : 'Tolerancia',
    }

    let modalToggleDemoUser: boolean = false;

</script>


<div class="main-content">
    <div class="greeting">
        <h1>Bienvenid@, </h1> 
        {#if name !== ''}
            <p>{name}</p>
        {:else}
            <p>Usuario</p>
        {/if}
    </div>
    <div class="card-container">
        <DashboardCardAdmin
            title="Estudiantes"
            label="students"
            description="Administra tus estudiantes"
        />
        <DashboardCardAdmin
            title="Profesores"
            label="professors"
            description="Administra tus profesores"
        />
        <DashboardCardAdmin
            title="Grupos"
            label="groups"
            description="Administra tus grupos"
        />
        <DashboardCardAdmin
            title="Estadisticas"
            label="stats"
            description="Analiza las estadisticas"
        />
        <DashboardCardAdmin
            title="Ajustes"
            label="settings"
            description="Configura tu perfil"
        />
    </div>
    <div class="sections-container">
        <div class="section-title">
            <h1 class="ml-5 mt-5"> Valores administrativos </h1>
        </div>
        <div class="sections">
            <div class="top-sections">
                <div class="top-left-section">
                    <p class="section-title">HOSTING</p>
                    <div class="db-status">
                        <div>
                            <p class="mb-3">Base de datos</p>
                            <Toggle checked={db_enabled} color="green" on:click={handleDBToggle}></Toggle>
                        </div>
                        <span/>
                        <div class="flex flex-row items-center">
                            {#if db_enabled}
                                <Badge class="bg-green-300 text-black font-semibold" >
                                    <Indicator color="green" class="mr-3"/> Online
                                </Badge>
                            {:else}
                                <Badge class="bg-red-300 text-black font-semibold" >
                                    <Indicator color="red" class="mr-3"/> Offline
                                </Badge>
                            {/if}
                        </div>
                    </div>
                </div>
                <div class="top-right-section">
                    <p class="section-title">ACTIVIDAD</p>
                    <div class="student-count">
                        <div>
                            <p>Número de estudiantes</p>
                        </div>
                        <span/>
                        <div class="flex flex-row items-center">
                            <p class="text-3xl font-bold mr-12">{students.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-sections">
                <div class="bottom-left-section">
                    <p class="section-title">VALORES GLOBALES</p>
                    <div class="global-values">
                        <Table shadow>
                            <TableHead>
                                <TableHeadCell>Nombre</TableHeadCell>
                                <TableHeadCell>Valor</TableHeadCell>
                                <TableHeadCell></TableHeadCell>
                            </TableHead>
                            <TableBody>
                                {#each Object.keys(globalValues) as key}
                                    <TableBodyRow>
                                        <TableBodyCell>
                                            {#if valuesDictionary[key]}
                                                {valuesDictionary[key]}
                                            {:else}
                                                {key}
                                            {/if}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            <Input type="number" bind:value={globalValues[key]} id={key} disabled={!editStates[key]}/>
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {#if editStates[key]}
                                                <Button color="green" size="xs" on:click={() => handleUpdate(key)}>Actualizar</Button>
                                                <Button color="red" size="xs" on:click={() => handleCancel(key)}>Cancelar</Button>
                                            {:else}
                                                <Button color="alternative" size="xs" on:click={() => handleEdit(key)}>Editar</Button>
                                            {/if}
                                        </TableBodyCell>
                                    </TableBodyRow>
                                {/each}
                            </TableBody>
                            
                        </Table>
                    </div>
                </div>
                <div class="bottom-right-section">
                    <div class="demo-users-header">
                        <p class="section-title">USUARIOS DEMOS</p>
                        <Button color="blue" class="mr-8 mt-4"
                            on:click={() => modalToggleDemoUser = true}>
                            Agregar
                    </Button>
                    </div>
                    <div class="w-full">
                        <Table shadow>
                            <TableHead>
                                <TableHeadCell>Nombre</TableHeadCell>
                                <TableHeadCell>Correo</TableHeadCell>
                                <TableHeadCell></TableHeadCell>
                            </TableHead>
                            <TableBody>
                                {#each demoStudents as student (student.uuid + student.name)}
                                    <TableBodyRow>
                                        <TableBodyCell>
                                            {student.name + ' ' + student.lastName}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {student.email}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            <Button color="red" size="xs">Eliminar</Button>
                                        </TableBodyCell>
                                    </TableBodyRow>
                                {/each}
                                </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<Modal bind:open={modalToggleDB} autoclose outsideclose size="xs">
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Seguro quieres desactivar la base de datos?</h3>
        <Button color="red" class="me-2" on:click={() => {db_enabled = false}}>Sí, seguro</Button>
        <Button color="alternative" on:click={handleCancelDBToggle}>No, cancelar</Button>
      </div>
</Modal>

<Modal bind:open={modalToggleDemoUser} autoclose outsideclose size="md"> 
    <div class="multi-select-container">
        <MultiSelect items={multiSelectOptions} 
            placeholder="Selecciona estudiantes"
            label="Estudiantes"
            bind:value={selected}
            class="mb-4"
        ></MultiSelect>
    </div>
    <Button color="blue" class="ml-6" on:click={() => {modalToggleDemoUser = false}}>Agregar</Button>
</Modal>


<style>
    .main-content {
        height: 100vh;
        width: 100%;
        background-color: #f5f5f5;
        flex-direction: column;
        display: flex;
    }

    .greeting {
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 3.5rem;
        height: 10%;
        padding-bottom: 3rem;
        padding-top: 3rem;
    }

    .greeting h1 {
        font-size: 1.5rem;
        font-weight: 100;
        color: black;
    }

    .greeting p {
        font-size: 1.5rem;
        font-weight: 800;
        color: #1dcd63;
        padding-left: 0.5rem;
    }

    .card-container {
        display: flex;
        justify-content: left;
        align-items: center;
        flex: 0;
        flex-wrap: wrap;
        gap: 1.2rem;
        padding-left: 3.5rem;
    }

    .sections-container {
        padding: 0;
        margin: 0;
        height: 100%;
        min-height: 100%;
    }

    .section-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: black;
        padding-left: 2rem;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .sections {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .top-sections {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1.2rem;
        padding-left: 3.5rem;
        padding-right: 3.5rem;
        padding-top: 1.5rem;
        height: 20%;
    }

    .top-left-section {
        height: 100%;
        width: calc(50% - 10px); 
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 1rem;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    }

    .db-status {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-top: 0;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-bottom: 1rem;
    }
    
    .top-right-section {
        height: 100%;
        width: calc(50% - 10px); 
        background-color: white;
        border-radius: 1rem;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    }

    .student-count {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.3rem;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-bottom: 1rem;
    }

    .bottom-sections {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1.2rem;
        padding-left: 3.5rem;
        padding-right: 3.5rem;
        height: 100%;
    }

    .bottom-left-section {
        height: 100%;
        width: calc(50% - 10px);
        display: flex;
        flex-direction: column;
    }

    .bottom-right-section {
        height: 100%;
        width: calc(50% - 10px); 
        display: flex;
        flex-direction: column;
    }

    .demo-users-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    
    .multi-select-container {
        padding: 2rem;
        min-height: 360px;
        max-height: 360px;
    }

</style>
