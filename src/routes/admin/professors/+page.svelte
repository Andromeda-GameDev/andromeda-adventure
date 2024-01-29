<script lang="ts">
    import type { Group, Student, FirebaseError, Professor } from '../../../types';
    import { Professors } from '../../../stores/adminData';
    import { Table, TableBody, TableBodyCell, TableHead, TableBodyRow, TableHeadCell, Badge, Tabs, TabItem, Indicator, Dropdown, DropdownDivider, DropdownItem, Select, TableSearch, Modal, Button } from 'flowbite-svelte';
    import { DotsVerticalOutline, TrashBinSolid,  ExclamationCircleSolid, ArrowLeftOutline, ArrowRightOutline} from 'flowbite-svelte-icons';
    import Alert from '../../../components/Alert.svelte'
    import { deleteProfessor, disableProfessor, enableProfessor, acceptProfessor, rejectProfessor } from '../../../api/Admin/professors';

    let alert = {
        visible: false,
        type: "error",
        message: "",
        position: "top-center"
    };

    let professors: any = [];
    let pendingProfessors: any = [];
    let rejectedProfessors: any = [];
    let blockedProfessors: any = [];

    let deleteProfessorModal = false;

    $: {
        if($Professors) {
            professors = $Professors.filter((professor: Professor) => professor.status === "active");
            pendingProfessors = $Professors.filter((professor: Professor) => professor.status === "pending");
            rejectedProfessors = $Professors.filter((professor: Professor) => professor.status === "rejected");
            blockedProfessors = $Professors.filter((professor: Professor) => professor.status === "blocked");
        }
    }

    let currentPage: number = 1;
    let itemsPerPage: string = '10';
    let start: number = (currentPage - 1) * parseInt(itemsPerPage);
    let end: number = currentPage * parseInt(itemsPerPage);

    $ :{
        start = (currentPage - 1) * parseInt(itemsPerPage);
        end = currentPage * parseInt(itemsPerPage);
    }

    let filteredProfessors: any = [];
    let searchTerm: string = '';

    $: {
        filteredProfessors = professors.filter((professor: Professor) => 
            professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            professor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            professor.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    let pagedProfessors: any = [];
    $ : {
        pagedProfessors = filteredProfessors.slice(start, end);
    }

    async function handleDeleteProfessor(professor_uuid: string, coming_section:string){
        try {
            await deleteProfessor(professor_uuid);

            if(coming_section === "active"){
                professors = professors.filter((professor: Professor) => professor.uuid !== professor_uuid);
            } else if(coming_section === "pending"){
                pendingProfessors = pendingProfessors.filter((professor: Professor) => professor.uuid !== professor_uuid);
            } else if(coming_section === "rejected"){
                rejectedProfessors = rejectedProfessors.filter((professor: Professor) => professor.uuid !== professor_uuid);
            } else if(coming_section === "blocked"){
                blockedProfessors = blockedProfessors.filter((professor: Professor) => professor.uuid !== professor_uuid);
            } 

            alert ={
                visible: true,
                type: 'success',
                message: 'Profesor eliminado correctamente.',
                position: 'top-center'
            }
        } catch (error) {
            alert ={
                visible: true,
                type: 'error',
                message: 'Error al eliminar el profesor, inténtelo de nuevo',
                position: 'top-center'
            }
        }
    }

    async function handleDisableProfessor(professor_uuid: string){
        try {
            await disableProfessor(professor_uuid);

            professors = professors.filter((professor: Professor) => professor.uuid !== professor_uuid);
            blockedProfessors = [...blockedProfessors, $Professors.find((professor: Professor) => professor.uuid === professor_uuid)]

            alert ={
                visible: true,
                type: 'success',
                message: 'Profesor bloqueado correctamente.',
                position: 'top-center'
            }
        } catch (error) {
            alert ={
                visible: true,
                type: 'error',
                message: 'Error al bloquear el profesor, inténtelo de nuevo',
                position: 'top-center'
            }
        }
    }

    async function handleEnableProfessor(professor_uuid: string){
        try {
            await enableProfessor(professor_uuid);

            blockedProfessors = blockedProfessors.filter((professor: Professor) => professor.uuid !== professor_uuid);
            professors = [...professors, $Professors.find((professor: Professor) => professor.uuid === professor_uuid)]

            alert ={
                visible: true,
                type: 'success',
                message: 'Profesor habilitado correctamente.',
                position: 'top-center'
            }
        } catch (error) {
            alert ={
                visible: true,
                type: 'error',
                message: 'Error al habilitar el profesor, inténtelo de nuevo',
                position: 'top-center'
            }
        }
    }

    async function handleAcceptProfessor(professor_uuid: string){
        try {
            await acceptProfessor(professor_uuid);

            pendingProfessors = pendingProfessors.filter((professor: Professor) => professor.uuid !== professor_uuid);
            professors = [...professors, $Professors.find((professor: Professor) => professor.uuid === professor_uuid)]

            alert ={
                visible: true,
                type: 'success',
                message: 'Profesor aceptado correctamente.',
                position: 'top-center'
            }
        } catch (error) {
            alert ={
                visible: true,
                type: 'error',
                message: 'Error al aceptar el profesor, inténtelo de nuevo',
                position: 'top-center'
            }
        }

    }

    async function handleRejectProfessor(professor_uuid: string){
        try {
            await rejectProfessor(professor_uuid);

            pendingProfessors = pendingProfessors.filter((professor: Professor) => professor.uuid !== professor_uuid);
            rejectedProfessors = [...rejectedProfessors, $Professors.find((professor: Professor) => professor.uuid === professor_uuid)]

            alert ={
                visible: true,
                type: 'success',
                message: 'Profesor rechazado correctamente.',
                position: 'top-center'
            }
        } catch (error) {
            alert ={
                visible: true,
                type: 'error',
                message: 'Error al rechazar el profesor, inténtelo de nuevo',
                position: 'top-center'
            }
        }
    }

    let professorToDelete: string = '';
    let coming_section: string = '';
    $ : {
        coming_section = "";
        professorToDelete = "";
    }


</script>


<div class="main-container">
    <div class="tabs-container">
        <Tabs style="pill" contentClass="mt-1">
            <TabItem open title="Activos" activeClasses='p-4 text-black font-bold bg-green-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                <div class="table-container">
                    <TableSearch divClass='overflow-x-auto sm:rounded-lg' bind:inputValue={searchTerm} placeholder="Buscar profesores"/>
                    <Table shadow>
                        <TableHead class="bg-sky-300">
                            <TableHeadCell>
                                Nombre
                            </TableHeadCell>
                            <TableHeadCell>
                                Apellido
                            </TableHeadCell>
                            <TableHeadCell>
                                Correo
                            </TableHeadCell>
                            <TableHeadCell>
                                Fecha de registro
                            </TableHeadCell>
                            <TableHeadCell>
                                Estado
                            </TableHeadCell>
                            <TableHeadCell/>
                        </TableHead>
                        <TableBody>
                            {#each pagedProfessors as professor}
                                <TableBodyRow>
                                    <TableBodyCell>
                                        {professor.name}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.lastName}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.email}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.firstLogTime}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <Badge color="green">
                                            <Indicator color="green" size="sm" class="mr-2"/> Activo
                                        </Badge>
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <DotsVerticalOutline class="hover:cursor-pointer"/>
                                        <Dropdown>
                                            <DropdownDivider/>
                                            <DropdownItem
                                                on:click={() => {
                                                    handleDisableProfessor(professor.uuid);
                                                }}
                                            >
                                                <div class="drop-down-item">
                                                    <div class="text-container">
                                                        <h1 class="text-sm font-medium">Bloquear</h1>
                                                    </div>
                                                    <div class="icon-container">
                                                        <ExclamationCircleSolid class="w-4 ml-5" size="lg"/>
                                                    </div>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem on:click={() => {
                                                deleteProfessorModal = true;
                                                professorToDelete = professor.uuid || "";
                                                coming_section = "active";
                                            }}>
                                                <div class="drop-down-item">
                                                    <div class="text-container">
                                                        <h1 class="text-sm font-medium">Eliminar</h1>
                                                    </div>
                                                    <div class="icon-container">
                                                        <TrashBinSolid class="w-4 ml-5" size="lg"/>
                                                    </div>
                                                </div>
                                            </DropdownItem>
                                        </Dropdown>
                                    </TableBodyCell>
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                    <div class="footer-container">
                        <caption class="text-md font-semibold text-black">Profesores: {filteredProfessors.length}</caption>
                        <div class="pagination-container">
                            <button on:click={() => currentPage = Math.max(1, currentPage - 1)}>
                                <ArrowLeftOutline />
                            </button>
                            <div>Página {currentPage} / {Math.ceil(filteredProfessors.length / parseInt(itemsPerPage))} </div>
                            <button on:click={() => currentPage = Math.min(Math.ceil(filteredProfessors.length / parseInt(itemsPerPage)), currentPage + 1)}>
                                <ArrowRightOutline />
                            </button>
                        </div>
                        <div class="pages-select-conatiner">
                            <Select bind:value={itemsPerPage} placeholder="Num. elementos" size="sm" id="pagination-select">
                                <option value="10">10</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </Select>
                        </div>
                    </div>
                </div>
            </TabItem>
            <TabItem title="Pendientes" activeClasses='p-4 text-black font-bold bg-green-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                <div class="mt-8">
                    <Table shadow>
                        <TableHead class="bg-sky-300">
                            <TableHeadCell>
                                Nombre
                            </TableHeadCell>
                            <TableHeadCell>
                                Apellido
                            </TableHeadCell>
                            <TableHeadCell>
                                Correo
                            </TableHeadCell>
                            <TableHeadCell>
                                Fecha de registro
                            </TableHeadCell>
                            <TableHeadCell>
                                Estado
                            </TableHeadCell>
                            <TableHeadCell/>
                        </TableHead>
                        <TableBody>
                            {#each pendingProfessors as professor}
                                <TableBodyRow>
                                    <TableBodyCell>
                                        {professor.name}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.lastName}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.email}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.firstLogTime}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <Badge color="yellow">
                                            <Indicator color="yellow" size="sm" class="mr-2"/> Pendiente
                                        </Badge>
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <div class="buttons-container">
                                            <Button color="green" pill size="xs"
                                                on:click={() => {
                                                    handleAcceptProfessor(professor.uuid);
                                                }}
                                            >
                                                Aceptar
                                            </Button>
                                            <Button color="red" pill size="xs"
                                                on:click={() => {
                                                    handleRejectProfessor(professor.uuid);
                                                }}
                                            >
                                                Rechazar
                                            </Button>
                                            <Button color="alternative" pill size="xs"
                                                on:click={() => {
                                                    deleteProfessorModal = true;
                                                    professorToDelete = professor.uuid || "";
                                                    coming_section = "pending";
                                                }}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </TableBodyCell>
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                </div>
            </TabItem>
            <TabItem title="Rechazados" activeClasses='p-4 text-black font-bold bg-green-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                <div class="mt-8">
                    <Table shadow>
                        <TableHead class="bg-sky-300">
                            <TableHeadCell>
                                Nombre
                            </TableHeadCell>
                            <TableHeadCell>
                                Apellido
                            </TableHeadCell>
                            <TableHeadCell>
                                Correo
                            </TableHeadCell>
                            <TableHeadCell>
                                Fecha de registro
                            </TableHeadCell>
                            <TableHeadCell>
                                Estado
                            </TableHeadCell>
                            <TableHeadCell/>
                        </TableHead>
                        <TableBody>
                            {#each rejectedProfessors as professor}
                                <TableBodyRow>
                                    <TableBodyCell>
                                        {professor.name}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.lastName}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.email}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.firstLogTime}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <Badge color="red">
                                            <Indicator color="red" size="sm" class="mr-2"/> Rechazado
                                        </Badge>
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <div class="buttons-container">
                                            <Button color="green" pill size="xs"
                                                on:click={() => {
                                                    handleAcceptProfessor(professor.uuid);
                                                }}
                                            >
                                                Aceptar
                                            </Button>
                                            <Button color="alternative" pill size="xs"
                                                on:click={() => {
                                                    deleteProfessorModal = true;
                                                    professorToDelete = professor.uuid || "";
                                                    coming_section = "rejected";
                                                }}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </TableBodyCell>
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                </div>
            </TabItem>
            <TabItem title="Bloqueados" activeClasses='p-4 text-black font-bold bg-green-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                <div class="mt-8">
                    <Table shadow>
                        <TableHead class="bg-sky-300">
                            <TableHeadCell>
                                Nombre
                            </TableHeadCell>
                            <TableHeadCell>
                                Apellido
                            </TableHeadCell>
                            <TableHeadCell>
                                Correo
                            </TableHeadCell>
                            <TableHeadCell>
                                Fecha de registro
                            </TableHeadCell>
                            <TableHeadCell>
                                Estado
                            </TableHeadCell>
                            <TableHeadCell/>
                        </TableHead>
                        <TableBody>
                            {#each blockedProfessors as professor}
                                <TableBodyRow>
                                    <TableBodyCell>
                                        {professor.name}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.lastName}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.email}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {professor.firstLogTime}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <Badge class="bg-gray-500">
                                            <Indicator size="sm" class="mr-2 bg-gray-700"/> <p class="text-white">Bloqueado</p>
                                        </Badge>
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <div class="buttons-container">
                                            <Button color="green" pill size="xs"
                                                on:click={() => {
                                                    handleEnableProfessor(professor.uuid);
                                                }}
                                            >
                                                Habilitar
                                            </Button>
                                            <Button color="alternative" pill size="xs"
                                                on:click={() => {
                                                    deleteProfessorModal = true;
                                                    professorToDelete = professor.uuid || "";
                                                    coming_section = "blocked";
                                                }}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </TableBodyCell>
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                </div>
            </TabItem>
        </Tabs>
    </div>
</div>

<Alert
    alertType={alert.type}
    alertMessage={alert.message}
    alertVisible={alert.visible}
/>

<Modal bind:open={deleteProfessorModal} size="sm">
    <div slot="header">
        <h1 class="font-bold text-xl">Eliminar professor</h1>
    </div>
    <div>
        <p class="text-sm">¿Estás seguro que deseas eliminar este profesor?</p>
    </div>
    <div class="modal-buttons">
        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400"
            on:click={() => {
                handleDeleteProfessor(professorToDelete, coming_section);
                deleteProfessorModal = false;
            }}
        >Eliminar</Button>
        <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400" on:click={() => deleteProfessorModal = false}>Cancelar</Button>
    </div>
</Modal>

<style>
    .main-container {
        height: 100vh;
        width: 100%;
    }

    .tabs-container {
        margin-top: 1.5rem;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
    }

    .drop-down-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .footer-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;   
        padding: 1rem 0;
        flex-wrap: wrap;
        padding-top: 2rem;
    }

    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding-right: 1rem;
    }

    .pages-select-conatiner {
        width: 6%;
    }
</style>