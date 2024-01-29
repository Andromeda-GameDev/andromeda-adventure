<script lang="ts">
    import type { Group, Student, Professor } from '../../../types';
    import { Groups, Students, Professors } from '../../../stores/adminData';
    import { Table, TableBody, TableBodyCell, TableHead, TableBodyRow, TableHeadCell, Badge, Input, Dropdown, DropdownDivider, DropdownItem, Select, TableSearch, Modal, Button, Checkbox, Search } from 'flowbite-svelte';
    import { DotsHorizontalOutline, TrashBinSolid, ArrowLeftOutline, ArrowRightOutline, SearchSolid, PlusSolid} from 'flowbite-svelte-icons';
    import Alert from '../../../components/Alert.svelte';
    import { createGroup, addProffessorsToGroup, deleteProfessorFromGroup, deleteStudentFromGroup, deleteGroup } from '../../../api/Admin/groups';

    let alert = {
        visible: false,
        type: "error",
        message: "",
        position: "top-center"
    };

    let deleteGroupModal = false;
    let moreGroupModal = false;
    let addGroupModal = false;

    let newGroupName: string = '';

    let groups: Group[] = [];
    let students: Student[] = [];
    let professors: Professor[] = [];

    $ : {
        if($Groups){
            groups = $Groups;
        }

        if($Students){
            students = $Students;
        }

        if($Professors){
            professors = $Professors;
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

    let filteredGroups: Group[] = [];
    let searchTerm: string = '';

    $ : {
        filteredGroups = groups.filter(group => 
            group.group_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.group_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    let pagedGroups: Group[] = [];
    $ : {
        pagedGroups = filteredGroups.slice(start, end);
    }

    function getNumberOfStudents(group_id: string): number{
        let studentsInGroup: Student[] = students.filter(student => student.group_id == group_id);
        return studentsInGroup.length;
    }

    function getNameFromID(group_id: string): string{
        let group: Group | undefined = groups.find(group => group.group_id == group_id) as Group;
        return group.group_name;
    }
    
    let currentGroupID: string = '';
    $ : { currentGroupID = ''}

    let selectedProfessors: string[] = [];

    function addSelectedProfessor(professor_id: string){
        if(!selectedProfessors.includes(professor_id)){
            selectedProfessors.push(professor_id);
        }
    }


    async function handleAddGroup(){
        if(newGroupName == ''){
            alert = {
                visible: true,
                type: "error",
                message: "El nombre del grupo no puede estar vacío",
                position: "top-center"
            }
        }else{
            try {
                let res = await createGroup(newGroupName);

                $Groups = [...$Groups, {
                    group_uid: res.group_uid as string,
                    group_id: res.group_id as string,
                    group_name: newGroupName,
                    professors_ids: [],
                    levels: {}
                }];

                newGroupName = '';
                addGroupModal = false;

                alert = {
                    visible: true,
                    type: "success",
                    message: "Grupo creado correctamente",
                    position: "top-center"
                }
            } catch (error) {
                alert = {
                    visible: true,
                    type: "error",
                    message: "Error al crear el grupo",
                    position: "top-center"
                }
            }
        }
    }

    async function handleDeleteGroup(){
        try {
            await deleteGroup((groups.find(group => group.group_id == currentGroupID) as Group).group_uid, currentGroupID);

            $Groups = $Groups.filter(group => group.group_id != currentGroupID);

            deleteGroupModal = false;

            alert = {
                visible: true,
                type: "success",
                message: "Grupo eliminado correctamente",
                position: "top-center"
            }
        } catch (error) {
            alert = {
                visible: true,
                type: "error",
                message: "Error al eliminar el grupo",
                position: "top-center"
            }
        }
    }


</script>

<div class="main-container">
    <div class="header">
        <p class="text-2xl font-bold ml-10">Grupos</p>
        <Button color="blue" size="sm" on:click={() => addGroupModal = true}>Agregar grupo</Button>
    </div>
    <div class="table-container">
        <TableSearch bind:inputValue={searchTerm} placeholder="Busca un grupo por nombre o id" divClass='overflow-x-auto sm:rounded-lg'/>
        <Table shadow>
            <TableHead class="bg-sky-300">
                <TableHeadCell>Num. </TableHeadCell>
                <TableHeadCell>Nombre del grupo</TableHeadCell>
                <TableHeadCell>Id.</TableHeadCell>
                <TableHeadCell class="text-center">Num. alumnos</TableHeadCell>
                <TableHeadCell/>
            </TableHead>
            <TableBody>
                {#each pagedGroups as group, i}
                    <TableBodyRow>
                        <TableBodyCell>{i + 1}</TableBodyCell>
                        <TableBodyCell>{group.group_name}</TableBodyCell>
                        <TableBodyCell>
                            <Badge class="text-black bg-blue-300">{group.group_id}</Badge>
                        </TableBodyCell>
                        <TableBodyCell class="text-center">{getNumberOfStudents(group.group_id)}</TableBodyCell>
                        <TableBodyCell>
                            <DotsHorizontalOutline size="sm" class="hover:cursor-pointer"/>
                            <Dropdown>
                                <DropdownItem 
                                    on:click={() => 
                                        {
                                            moreGroupModal = true;
                                            currentGroupID = group.group_id;
                                        }
                                    }>
                                    <div class="flex items-center">
                                        <SearchSolid size="sm" class="mr-2"/>
                                        <span>Ver más</span>
                                    </div>
                                </DropdownItem>
                                <DropdownDivider/>
                                <DropdownItem
                                    on:click={() => 
                                        deleteGroupModal = true
                                        }>
                                    <div class="flex items-center">
                                        <TrashBinSolid size="sm" class="mr-2" color="red"/>
                                        <span>Eliminar</span>
                                    </div>
                                </DropdownItem>
                            </Dropdown>
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
        <div class="footer-container">
            <caption class="text-md font-semibold text-black">Grupos: {filteredGroups.length}</caption>
            <div class="pagination-container">
                <button on:click={() => currentPage = Math.max(1, currentPage - 1)}>
                    <ArrowLeftOutline />
                </button>
                <div>Página {currentPage} / {Math.ceil(filteredGroups.length / parseInt(itemsPerPage))} </div>
                <button on:click={() => currentPage = Math.min(Math.ceil(filteredGroups.length / parseInt(itemsPerPage)), currentPage + 1)}>
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
</div>

<Modal bind:open={moreGroupModal} size="lg">
    <div slot="header">
        <h1 class="font-bold text-xl">{getNameFromID(currentGroupID)}</h1>
    </div>
    <div class="modal-professors">
        <caption class="p-2 text-md font-semibold text-left text-gray-900 bg-white flex justify-between items-center">
            Profesores
            <PlusSolid size="sm" class="ml-2 hover:cursor-pointer"/>
            <Dropdown class="flex flex-col h-44">
                    <div slot="header" class="p-3 bg-gray-200">
                        Profesores
                    </div>
                    <div class="overflow-y-auto pb-3 text-sm flex-grow">
                        {#each professors as professor}
                            {#each groups as group}
                                {#if group.group_id == currentGroupID}
                                    {#if !group.professors_ids.includes(professor.uuid || '')}
                                        <li class="rounded p-2 px-12 hover:bg-gray-100 w-full whitespace-nowrap">
                                            <Checkbox
                                                let isChecked = selectedProfessors.has(professor.uuid);
                                                value={professor.uuid}
                                                on:change={() => addSelectedProfessor(professor.uuid || '')}
                                            >{professor.name + ' ' + professor.lastName}</Checkbox>
                                        </li>
                                    {/if}
                                {/if}
                            {/each}
                        {/each}
                    </div>
                    <div slot="footer" class="flex justify-center bg-gray-200">
                        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400 w-9/12 self-center mt-3 mb-3" 
                        on:click={() => {
                            console.log(selectedProfessors);
                            selectedProfessors = [];
                            moreGroupModal = false;
                        }}
                    >Agregar</Button>
                    </div>
            </Dropdown>
          </caption>
        <Table shadow>
            <TableHead class="bg-sky-300">
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Correo</TableHeadCell>
                <TableHeadCell/>
            </TableHead>
            <TableBody>
                {#each groups as group}
                    {#if group.group_id == currentGroupID}
                        {#each group.professors_ids as professor}
                            <TableBodyRow>
                                <TableBodyCell>{professors.find(prof => prof.uuid == professor)?.name + ' ' + professors.find(prof => prof.uuid == professor)?.lastName}</TableBodyCell>
                                <TableBodyCell>{professors.find(prof => prof.uuid == professor)?.email}</TableBodyCell>
                                <TableBodyCell>
                                    <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400"
                                        on:click={() => {
                                            // deleteProfessorFromGroup(
                                            //     professors.find(prof => prof.uuid == professor)?.uuid || '',
                                            //     currentGroupID
                                            // )
                                        }}
                                    >Eliminar</Button>
                                </TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    {/if}
                {/each}
            </TableBody>
        </Table>
    </div>
    <hr class="solid">
    <div class="modal-students">
        <caption class="p-2 text-md font-semibold text-left text-gray-900 bg-white flex justify-between items-center">
            Alumnos
          </caption>
        <Table shadow>
            <TableHead class="bg-green-300">
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Correo</TableHeadCell>
                <TableHeadCell/>
            </TableHead>
            <TableBody>
                {#each students as student}
                    {#if student.group_id == currentGroupID}
                        <TableBodyRow>
                            <TableBodyCell>{student.name + ' ' + student.lastName}</TableBodyCell>
                            <TableBodyCell>{student.email}</TableBodyCell>
                            <TableBodyCell>
                                <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400">Eliminar</Button>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/if}
                {/each}
            </TableBody>
        </Table>
    </div>
</Modal>

<Modal bind:open={addGroupModal}>
    <div slot="header">
        <h1 class="font-bold text-xl">Agregar grupo</h1>
    </div>
    <div>
        <Input label="Nombre del grupo" bind:value={newGroupName} class="focus:ring-blue-500 focus:border-blue-500"/>
    </div>
    <div class="modal-buttons">
        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400"
            on:click={() => handleAddGroup()}
        >
            Agregar
        </Button>
        <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400" on:click={() => addGroupModal = false}>
            Cancelar
        </Button>
    </div>
</Modal>

<Modal bind:open={deleteGroupModal}>
    <div slot="header">
        <h1 class="font-bold text-xl">Eliminar grupo</h1>
    </div>
    <div>
        <p class="text-sm">¿Estás seguro que deseas eliminar este grupo?</p>
    </div>
    <div class="modal-buttons">
        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400"
        >Eliminar</Button>
        <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400" on:click={() => deleteGroupModal = false}>Cancelar</Button>
    </div>
</Modal>

<Alert
    alertType={alert.type}
    alertMessage={alert.message}
    alertVisible={alert.visible}
/>

<style>
    .main-container{
        height: 100vh;
        width: 100%;
    }

    .header{
        display: flex;
        justify-content: space-between;
        padding-top: 2rem;
        padding-right: 2rem;
    }

    .table-container{
        padding-left: 2rem;
        padding-right: 2rem;
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