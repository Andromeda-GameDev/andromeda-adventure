<script lang="ts">
    import type { Group, Student, FirebaseError } from '../../../types';
    import { Groups, Students } from '../../../stores/adminData';
    import { Table, TableBody, TableBodyCell, TableHead, TableBodyRow, TableHeadCell, Badge, Tabs, TabItem, Indicator, Dropdown, DropdownDivider, DropdownItem, Select, TableSearch, Modal, Button } from 'flowbite-svelte';
    import { DotsVerticalOutline, TrashBinSolid,  ExclamationCircleSolid, ArrowLeftOutline, ArrowRightOutline} from 'flowbite-svelte-icons';
    import Alert from '../../../components/Alert.svelte'
    import { blockStudent, unblockStudent, deleteUser, changeGroup } from '../../../api/Admin/students';

    let alert = {
        visible: false,
        type: "error",
        message: "",
        position: "top-center"
    };

    let modalDeleteStudent = false;

    let groups: Group[] = [];
    let selectableGroups: any = [];

    let activeStudents: Student[] = [];
    let blockedStudents: Student[] = [];

    $: {
        if($Groups) {
            groups = $Groups;
            selectableGroups = groups.map(group => ({
                value: group.group_id,
                name: group.group_name
            }));
        }

        if($Students) {
            activeStudents = $Students.filter(student => student.status === 'active');
            blockedStudents = $Students.filter(student => student.status === 'blocked');
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

    let filteredStudents: Student[] = [];
    let searchTerm: string = '';

    $: {
        filteredStudents = activeStudents.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    let pagedStudents: Student[] = [];
    $ : {
        pagedStudents = filteredStudents.slice(start, end);
    }

    async function handleGroupChange(student_uuid: string, event: Event) {
        try {
            await changeGroup(student_uuid, (event.target as HTMLInputElement).value);
            alert = {
                visible: true,
                type: "success",
                message: "Grupo cambiado correctamente",
                position: "top-center"
            };
        } catch (error) {
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.message,
                position: "top-center"
            };
        }
    }

    async function handleBlockUser(student_uuid: string) {
        try {
            await blockStudent(student_uuid);

            // readd student to active students
            activeStudents = activeStudents.filter(student => student.uuid !== student_uuid);
            blockedStudents = [...blockedStudents, $Students.find(student => student.uuid === student_uuid) as Student];

            alert = {
                visible: true,
                type: "success",
                message: "Estudiante bloqueado correctamente",
                position: "top-center"
            };
        } catch (error) {
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.message,
                position: "top-center"
            };
        }
    }

    async function handleUnblockUser(student_uuid: string) {
        try {
            await unblockStudent(student_uuid);

            // readd student to active students
            blockedStudents = blockedStudents.filter(student => student.uuid !== student_uuid);
            activeStudents = [...activeStudents, $Students.find(student => student.uuid === student_uuid) as Student];
            
            alert = {
                visible: true,
                type: "success",
                message: "Estudiante desbloqueado correctamente",
                position: "top-center"
            };
        } catch (error) {
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.message,
                position: "top-center"
            };
        }
    }

    async function handleDeleteUser(student_uuid: string) {
        try {
            await deleteUser(student_uuid);
            alert = {
                visible: true,
                type: "success",
                message: "Estudiante eliminado correctamente",
                position: "top-center"
            };
        } catch (error) {
            const firebaseError = error as FirebaseError;

            alert = {
                visible: true,
                type: "error",
                message: firebaseError.message,
                position: "top-center"
            };
        }
    }
    
    let userToDelete: string = "";
    $: {
        userToDelete = "";
    }
</script>


<div class="main-container">
    <div class="tabs-container">
        <Tabs style="pill" contentClass="mt-1">
            <TabItem open title="Activos" activeClasses='p-4 text-black font-bold bg-green-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                <div class="table-container">
                    <TableSearch divClass='overflow-x-auto sm:rounded-lg' bind:inputValue={searchTerm} placeholder="Buscar estudiantes"/>
                    <Table shadow>
                        <TableHead class="bg-sky-300">
                            <TableHeadCell>
                                Nombre
                            </TableHeadCell>
                            <TableHeadCell>
                                Apellidos
                            </TableHeadCell>
                            <TableHeadCell>
                                Correo
                            </TableHeadCell>
                            <TableHeadCell>
                                Grupo
                            </TableHeadCell>
                            <TableHeadCell>
                                Estado
                            </TableHeadCell>
                            <TableHeadCell/>
                        </TableHead>
                        <TableBody>
                            {#each pagedStudents as student}
                                <TableBodyRow>
                                    <TableBodyCell>
                                        {student.name}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {student.lastName}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {student.email}
                                    </TableBodyCell>
                                    <TableBodyCell class="min-w-12">
                                        <Select class="mt-2" items={selectableGroups} value={student.group_id} defaultClass='text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                                                on:change={(event) => handleGroupChange(student.uuid || "", event)}/>
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {#if student.status === 'active'}
                                            <Badge color="green">
                                                <Indicator color="green" size="sm" class="mr-2"/> Activo
                                            </Badge>
                                        {:else if student.status === 'inactive'}
                                            <Badge color="red">
                                                <Indicator color="red" size="sm" class="mr-2"/> Inactivo
                                            </Badge>
                                        {/if}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <DotsVerticalOutline class="hover:cursor-pointer"/>
                                        <Dropdown>
                                            <DropdownDivider/>
                                            <DropdownItem
                                                on:click={() => {
                                                    handleBlockUser(student.uuid || "");
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
                                                modalDeleteStudent = true;
                                                userToDelete = student.uuid || "";
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
                        <caption class="text-md font-semibold text-black">Estudiantes: {filteredStudents.length}</caption>
                        <div class="pagination-container">
                            <button on:click={() => currentPage = Math.max(1, currentPage - 1)}>
                                <ArrowLeftOutline />
                            </button>
                            <div>Página {currentPage} / {Math.ceil(filteredStudents.length / parseInt(itemsPerPage))} </div>
                            <button on:click={() => currentPage = Math.min(Math.ceil(filteredStudents.length / parseInt(itemsPerPage)), currentPage + 1)}>
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
            <TabItem title="Bloqueados" activeClasses='p-4 text-black font-bold bg-green-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                <div class="table-container">
                    <Table shadow class="mt-10">
                        <TableHead class="bg-sky-300">
                            <TableHeadCell>
                                Nombre
                            </TableHeadCell>
                            <TableHeadCell>
                                Apellidos
                            </TableHeadCell>
                            <TableHeadCell>
                                Correo
                            </TableHeadCell>
                            <TableHeadCell>
                                Grupo
                            </TableHeadCell>
                            <TableHeadCell>
                                Estado
                            </TableHeadCell>
                            <TableHeadCell/>
                        </TableHead>
                        <TableBody>
                            {#each blockedStudents as student}
                                <TableBodyRow>
                                    <TableBodyCell>
                                        {student.name}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {student.lastName}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {student.email}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <Select class="mt-2" items={selectableGroups} value={student.group_id} defaultClass='text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500' disabled/>
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <Badge class="bg-gray-500">
                                            <Indicator size="sm" class="mr-2 bg-gray-700"/> <p class="text-white">Bloqueado</p>
                                        </Badge>
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <DotsVerticalOutline class="hover:cursor-pointer"/>
                                        <Dropdown>
                                            <DropdownDivider/>
                                            <DropdownItem
                                                on:click={() => {
                                                    handleUnblockUser(student.uuid || "");
                                                }}
                                            >
                                                <div class="drop-down-item">
                                                    <div class="text-container">
                                                        <h1 class="text-sm font-medium">Desbloquear</h1>
                                                    </div>
                                                    <div class="icon-container">
                                                        <ExclamationCircleSolid class="w-4 ml-5" size="lg"/>
                                                    </div>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem on:click={() => 
                                                {
                                                    modalDeleteStudent = true;
                                                    userToDelete = student.uuid || "";}
                                            }>
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

<Modal bind:open={modalDeleteStudent} size="sm">
    <div slot="header">
        <h1 class="font-bold text-xl">Eliminar estudiante</h1>
    </div>
    <div>
        <p class="text-sm">¿Estás seguro que deseas eliminar este estudiante?</p>
    </div>
    <div class="modal-buttons">
        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400"
            on:click={() => {
                handleDeleteUser(userToDelete);
            }}
        >Eliminar</Button>
        <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400" on:click={() => modalDeleteStudent = false}>Cancelar</Button>
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