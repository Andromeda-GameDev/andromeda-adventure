<script lang="ts">
    import type { Group, Student, Professor } from '../../../types';
    import { Groups, Students, Professors } from '../../../stores/adminData';
    import { Table, TableBody, TableBodyCell, TableHead, TableBodyRow, TableHeadCell, Badge, Input, Dropdown, DropdownDivider, DropdownItem, Select, TableSearch, Modal, Button, Checkbox, Search, Tooltip } from 'flowbite-svelte';
    import { DotsHorizontalOutline, TrashBinSolid, ArrowLeftOutline, ArrowRightOutline, SearchSolid, PlusSolid, EditOutline, FilterSolid} from 'flowbite-svelte-icons';
    import Alert from '../../../components/Alert.svelte';
    import { createGroup, addProffessorsToGroup, deleteProfessorFromGroup, deleteStudentFromGroup, deleteGroup, updateGroupName} from '../../../api/Admin/groups';

    let alert = {
        visible: false,
        type: "error",
        message: "",
        position: "top-center"
    };

    let editGroupName: string = '';
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

        currentPage = Math.max(1, Math.min(currentPage, Math.ceil(filteredGroups.length / parseInt(itemsPerPage))));
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
                    levels: {},
                    signed_ups: 0
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

    async function handleAddProfessorsToGroup() {
        try {

            // construct list of records Record<string, string> [professor_id, professor_email]
            let professorsToAdd: Record<string, string>[] = [];
            selectedProfessors.forEach(professor_id => {
                let professor: Professor | undefined = professors.find(prof => prof.uuid == professor_id);
                if(professor){
                    professorsToAdd.push({
                        professor_id: professor_id,
                        professor_email: professor.email
                    });
                }
            });

            await addProffessorsToGroup(currentGroupID, professorsToAdd);

            $Groups = [...$Groups as Group[]].map(group => {
                if(group.group_id == currentGroupID){
                    return {
                        ...group,
                        professors_ids: [...group.professors_ids, ...selectedProfessors]
                    }
                }else{
                    return group;
                }
            });

            alert = {
                visible: true,
                type: "success",
                message: "Profesores agregados correctamente",
                position: "top-center"
            }

            selectedProfessors = [];

        } catch (error) {
            alert = {
                visible: true,
                type: "error",
                message: "Error al agregar los profesores",
                position: "top-center"
            }
        }
    }


    async function handleDeleteProfessorFromGroup(professor_uid: string, group_id: string){
        try {
            await deleteProfessorFromGroup(professor_uid, group_id);

            $Groups = [...$Groups as Group[]].map(group => {
                if(group.group_id == group_id){
                    return {
                        ...group,
                        professors_ids: group.professors_ids.filter(professor => professor != professor_uid)
                    }
                }else{
                    return group;
                }
            });

            moreGroupModal = false;

            alert = {
                visible: true,
                type: "success",
                message: "Profesor eliminado correctamente",
                position: "top-center"
            }
        } catch (error) {
            alert = {
                visible: true,
                type: "error",
                message: "Error al eliminar el profesor",
                position: "top-center"
            }
        }
    }

    async function handleDeleteStudentFromGroup(student_id: string){
        try {
            await deleteStudentFromGroup(student_id);

            // look for student in students store and update group_id to ''
            $Students = [...$Students as Student[]].map(student => {
                if(student.uuid == student_id){
                    return {
                        ...student,
                        group_id: ''
                    }
                }else{
                    return student;
                }
            });

            moreGroupModal = false;

            alert = {
                visible: true,
                type: "success",
                message: "Alumno eliminado correctamente",
                position: "top-center"
            }
        } catch (error) {
            alert = {
                visible: true,
                type: "error",
                message: "Error al eliminar el alumno",
                position: "top-center"
            }
        }
    
    }

    async function handleUpdateGroupName(group_id: string, new_name: string){
        try {
            await updateGroupName(group_id, new_name);

            // close modal
            moreGroupModal = false;

            $Groups = [...$Groups as Group[]].map(group => {
                if(group.group_id == group_id){
                    return {
                        ...group,
                        group_name: new_name
                    }
                }else{
                    return group;
                }
            });

            alert = {
                visible: true,
                type: "success",
                message: "Nombre del grupo actualizado correctamente",
                position: "top-center"
            }

            editGroupName = '';

        } catch (error) {
            alert = {
                visible: true,
                type: "error",
                message: "Error al actualizar el nombre del grupo",
                position: "top-center"
            }
        }
    }

    let totalSignedUpStudents: number = 0;
    let totalStudentsInFilteredGroups: number = 0;
    

    $ : {
        totalSignedUpStudents = filteredGroups.reduce((total, group) => total + (group.signed_ups || 0), 0);
        totalStudentsInFilteredGroups = filteredGroups.reduce((total, group) => total + getNumberOfStudents(group.group_id), 0);
    }

    let sortColumn = '';
    let sortDirection = 'asc';  

    function handleSort(column : string) {
        if (sortColumn === column) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn = column;
            sortDirection = 'asc';
        }
    }

    $ : {
        filteredGroups = groups.filter(group => 
            (group.group_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.group_id.toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
            (tagFilter === 'all' || group.type === tagFilter)
        );

        if (sortColumn === 'signed_ups') {
            filteredGroups.sort((a, b) => {
                const signedUpsA = a.signed_ups || 0;
                const signedUpsB = b.signed_ups || 0;
                return sortDirection === 'asc' ? signedUpsA - signedUpsB : signedUpsB - signedUpsA;
            });
        } else if (sortColumn === 'type') {
            filteredGroups.sort((a, b) => {
                const typeA = a.type || 'otro';
                const typeB = b.type || 'otro';

                if (typeA === 'play' && typeB !== 'play') {
                    return sortDirection === 'asc' ? -1 : 1;
                } else if (typeA !== 'play' && typeB === 'play') {
                    return sortDirection === 'asc' ? 1 : -1;
                } else if (typeA === 'control' && typeB !== 'control') {
                    return sortDirection === 'asc' ? -1 : 1;
                } else if (typeA !== 'control' && typeB === 'control') {
                    return sortDirection === 'asc' ? 1 : -1;
                } else {
                    return 0;
                }
            });
        }

        if (sortWord === 'jugando') {
            filteredGroups.sort((a, b) => {
                const numJugandoA = getNumberOfStudentsPlayingLevel2(a.group_id);
                const numJugandoB = getNumberOfStudentsPlayingLevel2(b.group_id);
                console.log(`Group ${a.group_id}: ${numJugandoA}, Group ${b.group_id}: ${numJugandoB}`);
                return numJugandoB - numJugandoA;
            });
        }

        currentPage = Math.max(1, Math.min(currentPage, Math.ceil(filteredGroups.length / parseInt(itemsPerPage))));
    }

    let filterLevel1 = 'all';
    let filterLevel2 = 'all';

    let filteredStudents: any = [];

    $: {
        filteredStudents = students.filter(student => 
            student.group_id === currentGroupID &&
            (filterLevel1 === 'all' || (filterLevel1 === 'completed' && student.progress['level_1']) || (filterLevel1 === 'uncompleted' && !student.progress['level_1'])) &&
            (filterLevel2 === 'all' || (filterLevel2 === 'completed' && student.progress['level_2']) || (filterLevel2 === 'uncompleted' && !student.progress['level_2']))
        );

        filteredGroups = groups.filter(group => 
            (group.group_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.group_id.toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
            (tagFilter === 'all' || group.type === tagFilter)
        );
    }

    let tagFilter = 'all';

    function getNumberOfStudentsPlayingLevel2(group_id: string): number {
        let studentsPlayingLevel2 = students.filter(student => student.group_id === group_id && student.progress['level_2']);
        return studentsPlayingLevel2.length;
    }

    function calculatePercentagePlaying(group_id: string): number {
        let totalStudents = getNumberOfStudents(group_id);
        let studentsPlayingLevel2 = getNumberOfStudentsPlayingLevel2(group_id);
        if (totalStudents > 0) {
        return Math.round((studentsPlayingLevel2 / totalStudents) * 100);
        } else {
        return 0;
        }
    }

    let sortWord = '';

</script>

<div class="main-container">
    <div class="header">
        <p class="text-2xl font-bold ml-10">Grupos</p>
        <Button color="blue" size="sm" on:click={() => addGroupModal = true}>Agregar grupo</Button>
    </div>
    <div class="table-container">
        <div class="table-search-container">
            <TableSearch bind:inputValue={searchTerm} placeholder="Busca un grupo por nombre o id" divClass='overflow-x-auto sm:rounded-lg'/>
            <div class="descriptive">
                Total Inscritos: {filteredGroups.reduce((total, group) => total + (group.signed_ups || 0), 0)} | 
                Total Alumnos: {filteredGroups.reduce((total, group) => total + getNumberOfStudents(group.group_id), 0)} | 
                Usuarios Jugando: {students.filter(student => student.progress['level_2'] && filteredGroups.some(group => group.group_id === student.group_id)).length} | 
                Porcentaje Jugando: ({(students.filter(student => student.progress['level_2'] && filteredGroups.some(group => group.group_id === student.group_id)).length / filteredGroups.reduce((total, group) => total + getNumberOfStudents(group.group_id), 0) * 100).toFixed(2)} %)
            </div>
        </div>
        <Table shadow divClass="min-h-5">
            <TableHead class="bg-sky-300">
                <TableHeadCell>Num. </TableHeadCell>
                <TableHeadCell class="text-left">Nombre del grupo</TableHeadCell>
                <TableHeadCell>Id.</TableHeadCell>
                <TableHeadCell on:click={() => handleSort('signed_ups')}> Inscritos </TableHeadCell>
                <TableHeadCell class="text-center">Num. alumnos</TableHeadCell>
                <TableHeadCell class="text-center"> Porcentaje Activo </TableHeadCell>
                <TableHeadCell class="text-center hover:cursor-pointer" on:click={() => sortWord = sortWord === 'jugando' ? '' : 'jugando'}>Num. jugando</TableHeadCell>
                <TableHeadCell class="text-center">Porcentaje jugando</TableHeadCell>
                <TableHeadCell>
                    <div class="flex items-center">
                      Tipo
                      <Button variant="outlined" size="xs" class="bg-transparent hover:bg-blue-400 ml-2">
                        <FilterSolid size="sm"/>
                      </Button>
                      <Dropdown class="w-48">
                        <DropdownItem on:click={() => tagFilter = 'all'}>Todos</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem on:click={() => tagFilter = 'play'}>Juega</DropdownItem>
                        <DropdownItem on:click={() => tagFilter = 'control'}>Control</DropdownItem>
                        <DropdownItem on:click={() => tagFilter = 'otro'}>Otro</DropdownItem>
                      </Dropdown>
                    </div>
                  </TableHeadCell>
                <TableHeadCell/>
            </TableHead>
            <TableBody>
                {#each pagedGroups as group, i}
                    <TableBodyRow>
                        <!-- reduce space between columns -->
                        <TableBodyCell tdClass="px-4">{start+ i + 1}</TableBodyCell>
                        <TableBodyCell tdClass="px-5">{group.group_name}</TableBodyCell>
                        <TableBodyCell>
                            <Badge class="text-black bg-blue-300">{group.group_id}</Badge>
                        </TableBodyCell>
                        <TableBodyCell class="text-center">{group.signed_ups || 0}</TableBodyCell>
                        <TableBodyCell class="text-center">{getNumberOfStudents(group.group_id)}</TableBodyCell>
                        <TableBodyCell class="text-center">{
                            group.signed_ups ? 
                                Math.round((getNumberOfStudents(group.group_id) / group.signed_ups) * 100) + '%' 
                                : '0%'
                        }
                        </TableBodyCell>
                        <TableBodyCell class="text-center">{getNumberOfStudentsPlayingLevel2(group.group_id)}</TableBodyCell>
                        <TableBodyCell class="text-center">{calculatePercentagePlaying(group.group_id)}%</TableBodyCell>
                        <TableBodyCell>
                            {#if group.type === 'control'}
                                <Badge class="text-black bg-red-300">Control</Badge>
                            {:else if group.type === 'play'}
                                <Badge class="text-black bg-green-300">Juega</Badge>
                            {:else}
                                <Badge class="text-black bg-purple-300">Otro</Badge>
                            {/if}
                        </TableBodyCell>
                        <TableBodyCell>
                            <DotsHorizontalOutline size="sm" class="hover:cursor-pointer"/>
                            <Dropdown placement="left">
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
                                        {
                                            deleteGroupModal = true
                                            currentGroupID = group.group_id;
                                        }
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
        <div class="flex items-center">
            {#if editGroupName}
                <Input bind:value={editGroupName} class="focus:ring-blue-500 focus:border-blue-500 mr-2" />
                <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400" on:click={() => handleUpdateGroupName(currentGroupID, editGroupName)}>
                    Guardar
                </Button>
                <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400 ml-2" on:click={() => editGroupName = ''}>
                    Cancelar
                </Button>
            {:else}
                <h1 class="font-bold text-xl mr-2">{getNameFromID(currentGroupID)}</h1>
                <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400" on:click={() => editGroupName = getNameFromID(currentGroupID)}>
                    <EditOutline size="sm"/>
                </Button>
            {/if}
        </div>
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
                            handleAddProfessorsToGroup();
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
                                            handleDeleteProfessorFromGroup(
                                                professors.find(prof => prof.uuid == professor)?.uuid || '',
                                                currentGroupID
                                            )
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
            Completos Nivel 1: 
            <span class="text-green-500">
                {students.filter(student => student.group_id == currentGroupID && student.progress['level_1']).length}
            </span> 
            Completos Nivel 2: 
            <span class="text-blue-500">
                {students.filter(student => student.group_id == currentGroupID && student.progress['level_2']).length}
            </span>
            <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400">
                <FilterSolid size="sm"/>
            </Button>
            <Dropdown class="w-48">
                <DropdownItem on:click={() => { filterLevel1 = 'all'; filterLevel2 = 'all'; }}>Sin Filtro</DropdownItem>
                <DropdownDivider />
                <DropdownItem on:click={() => filterLevel1 = 'all'}>Todos - Level 1</DropdownItem>
                <DropdownItem on:click={() => filterLevel1 = 'completed'}>Completado - Nivel 1</DropdownItem>
                <DropdownItem on:click={() => filterLevel1 = 'uncompleted'}>Incompleto- Nivel 1</DropdownItem>
                <DropdownDivider />
                <DropdownItem on:click={() => filterLevel2 = 'all'}>Todos - Level 2</DropdownItem>
                <DropdownItem on:click={() => filterLevel2 = 'completed'}>Completado - Nivel 2</DropdownItem>
                <DropdownItem on:click={() => filterLevel2 = 'uncompleted'}>Incompleto - Nivel 2</DropdownItem>
              </Dropdown>
        </caption>
        <Table shadow>
            <TableHead class="bg-green-300">
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Correo</TableHeadCell>
                <TableHeadCell>Nivel 1</TableHeadCell>
                <TableHeadCell>Nivel 2</TableHeadCell>
                <TableHeadCell/>
            </TableHead>
            <TableBody>
                {#each filteredStudents as student}
                  <TableBodyRow>
                    <TableBodyCell>{student.name + ' ' + student.lastName}</TableBodyCell>
                    <TableBodyCell>{student.email}</TableBodyCell>
                    <TableBodyCell>
                      {#if student.progress['level_1']}
                        <Badge color="green">Completo</Badge>
                      {:else}
                        <Badge color="red">Incompleto</Badge>
                      {/if}
                    </TableBodyCell>
                    <TableBodyCell>
                      {#if student.progress['level_2']}
                        <Badge color="green">Completo</Badge>
                      {:else}
                        <Badge color="red">Incompleto</Badge>
                      {/if}
                    </TableBodyCell>
                    <TableBodyCell>
                      <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400"
                        on:click={() => handleDeleteStudentFromGroup(student.uuid || '')}
                      >Eliminar</Button>
                    </TableBodyCell>
                  </TableBodyRow>
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
            on:click={() => handleDeleteGroup()}
        >Eliminar</Button>
        <Button variant="outlined" size="xs" class="bg-red-500 hover:bg-red-400" on:click={() => {deleteGroupModal = false, currentGroupID = ""}}>Cancelar</Button>
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
        overflow-y: auto;
        overflow-x: auto;
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

    .table-search-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0rem;
    }

    .table-search-container .descriptive {
        font-size: 1rem;
        color: #4B5563;
        margin-top: 1rem;
        margin-right: 1rem;
    }
</style>