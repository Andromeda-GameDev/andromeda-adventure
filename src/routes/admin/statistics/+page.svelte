<script lang="ts">
    import { authStore } from '../../../stores/auth';
    import type { Group, Student } from '../../../types';
    import { Groups, Students } from '../../../stores/adminData';
    import { Button, Select, Table, TableBody, TableBodyCell, TableHead, TableBodyRow, TableHeadCell, TableSearch, Badge, Modal, Tabs, TabItem, Dropdown, DropdownItem, Checkbox} from 'flowbite-svelte'
    import { FileExportSolid, ArrowLeftOutline, ArrowRightOutline, FileSearchSolid } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';
    import * as XLSX from 'xlsx';

    let currentUserUid = $authStore.uid;
    let searchTerm = '';
    let professorGroups: Group[] = [];

    $: {
        if ($authStore.uid) {
            currentUserUid = $authStore.uid;
        }

        if ($Groups.length > 0 && currentUserUid) {
            professorGroups = $Groups
        }
    }

    let selectedGroup = 'General';
    let selectedLevel = '1';
    let selectedLevelToExportData = '1';
    let selectedLevelToExportTiming = '1';


    let currentPage: number = 1;
    let itemsPerPage: string = '15';
    let start: number = (currentPage - 1) * parseInt(itemsPerPage);
    let end: number = currentPage * parseInt(itemsPerPage);

    $ :{
        start = (currentPage - 1) * parseInt(itemsPerPage);
        end = currentPage * parseInt(itemsPerPage);
    }

    let filteredStudents: Student[] = [];
    $ : {
        if (selectedGroup === 'General') {
            filteredStudents = $Students.filter(student => 
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            filteredStudents = $Students.filter(student => 
                (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.lastName.toLowerCase().includes(searchTerm.toLowerCase())) && 
                student.group_id === selectedGroup
            );
        }
    }

    let pagedStudents: Student[] = [];
    $ : {
        pagedStudents = filteredStudents.slice(start, end);
    }
    
    $ : selectedLevel = '1';
    $ : selectedLevelToExportData = '1';
    $ : selectedLevelToExportTiming = '1';

    // sorting
    let sortDirection = 1;

    function sortByName() {
        filteredStudents = [...filteredStudents].sort((a, b) => {
            return sortDirection * a.name.localeCompare(b.name);
        });

        sortDirection *= -1; 
    }

    function resetOriginalOrder() {
        filteredStudents = [...$Students];
    }   

    function sortByData(level: number) {
        filteredStudents = [...filteredStudents].sort((a, b) => {
            if (level === 1) {
                if (a.progress.level_1 === undefined) {
                    return 1;
                } else if (b.progress.level_1 === undefined) {
                    return -1;
                } else {
                    return sortDirection * (a.progress.level_1 - b.progress.level_1);
                }
            } else if (level === 2) {
                if (a.progress.level_2 === undefined) {
                    return 1;
                } else if (b.progress.level_2 === undefined) {
                    return -1;
                } else {
                    return sortDirection * (a.progress.level_2 - b.progress.level_2);
                }
            } else {
                return 0;
            }
        });

        sortDirection *= -1;
    }

    function navigateToStudentDetail(studentId: string, levelId: string) {
        goto(`/admin/statistics/${studentId}/${levelId}`);
    }

    interface ExcelRow {
        name: string;
        email: string;
        group: string;
        level: string;
        date: string;
        time: string;
        section: string;
        attempts: number;
        score: number;
        timeInSection: number;
        acidSpeed: number;
        acidTime: number;
        g: number;
        m1: number;
        m2: number;
        surface: number;
        v0: number;
        v1: number;
        v2: number;
        studentAnswer: number;
        isCorrect: boolean;
        correctAnswer: number;
    }

    function parseGameSessionKey(gameSessionKey: string){
        //game_15_11_2023_10_06
        let gameSessionKeySplitted = gameSessionKey.split('_');
        let date = gameSessionKeySplitted[1] + '-' + gameSessionKeySplitted[2] + '-' + gameSessionKeySplitted[3];
        let time = gameSessionKeySplitted[4] + ':' + gameSessionKeySplitted[5];
        return {date, time};
    }

    function getStudentAnswer(listResults: number[]){
        return listResults[listResults.length - 1] || 0;
    }

    function getCorrectAnswerLevel_1(gameData: any, sectionKey: string){
        if(sectionKey == "section_1"){
            return gameData.acidTime;
        } else if(sectionKey == "section_2"){
            return gameData.v2;
        } else if(sectionKey == "section_3"){
            return gameData.v1;
        } else if(sectionKey == "section_4"){
            return gameData.v0;
        } else {
            return 0;
        }
    }

    function isCorrect(value1: number, value2: number, tolerence: number){
        return Math.abs(value1 - value2) <= tolerence;
    }

    interface Level2_SessionOverviewSheet {
        name: string;
        email: string;
        group: string;
        level: string;
        date: string;
        time: string;
        session_id: string;
        stage: string;
        weight: number;
        a_value: number;
    }

    interface Level2_DetailedQuestionSheet {
        session_id: string;
        stage: string;
        question_id: string;
        formula: string;
        question: string;
        question_type: string;
        answers: string;
    }

    interface Level2_DetailedAnswersSheet {
        session_id: string;
        stage: string;
        question_id: string;
        part_id: string;
        answer_given: string;
        is_correct: boolean;
        score: number;
        time: number;
    }

    function exportToExcel(){
        const excelRows: ExcelRow[] = [];
        let studentsToExport: Student[] = [];
        if(selectedGroupsCheckbox.length === 1 && selectedGroupsCheckbox[0] === 'General'){
            studentsToExport = filteredStudents;
        } else {
            //studentsToExport = filteredStudents.filter(student => student.group_id === selectedGroup);
            studentsToExport = filteredStudents.filter(student => selectedGroupsCheckbox.includes(student.group_id));
        }

        if(selectedLevelToExportData === '1'){
            for(let student of studentsToExport){
                const levelData = student.progress['level_' + selectedLevelToExportData];
                if(levelData){
                    for(let gameSessionKey of Object.keys(levelData)){
                        const gameSessionData = levelData[gameSessionKey];
                        const gameSessionKeySplitted = parseGameSessionKey(gameSessionKey);
                        
                        if(gameSessionData.data && gameSessionData.sections){
                            for(let sectionKey of Object.keys(gameSessionData.sections)){
                                const sectionData = gameSessionData.sections[sectionKey];
                                if(sectionData){
                                    const excelRow: ExcelRow = {
                                        name: student.name + ' ' + student.lastName,
                                        email: student.email,
                                        group: $Groups.find(group => group.group_id === student.group_id)?.group_name || '',
                                        level: 'Nivel ' + selectedLevel,
                                        date: gameSessionKeySplitted.date,
                                        time: gameSessionKeySplitted.time,
                                        section: sectionKey.split('_')[1], // assuming sectionKey is in the format 'section_X'
                                        attempts: sectionData.attempts,
                                        score: sectionData.score,
                                        timeInSection: sectionData.time,
                                        acidSpeed: gameSessionData.data.acidSpeed,
                                        acidTime: gameSessionData.data.acidTime,
                                        g: gameSessionData.data.g,
                                        m1: gameSessionData.data.m1,
                                        m2: gameSessionData.data.m2,
                                        surface: gameSessionData.data.surface,
                                        v0: gameSessionData.data.v0,
                                        v1: gameSessionData.data.v1,
                                        v2: gameSessionData.data.v2,
                                        studentAnswer: sectionData.listResults ? getStudentAnswer(sectionData.listResults) : 0,
                                        isCorrect: sectionData.listResults ? isCorrect(getStudentAnswer(sectionData.listResults), getCorrectAnswerLevel_1(gameSessionData.data, sectionKey), 0.1) : false,
                                        correctAnswer: sectionData.listResults ? getCorrectAnswerLevel_1(gameSessionData.data, sectionKey) : 0
                                    }

                                    excelRows.push(excelRow);
                                }
                            }
                        } else {
                            const excelRow: ExcelRow = {
                                name: student.name + ' ' + student.lastName,
                                email: student.email,
                                group: $Groups.find(group => group.group_id === student.group_id)?.group_name || '',
                                level: 'Nivel ' + selectedLevel,
                                date: gameSessionKeySplitted.date,
                                time: gameSessionKeySplitted.time,
                                section: 'N/A',
                                attempts: 0,
                                score: 0,
                                timeInSection: 0,
                                acidSpeed: 0,
                                acidTime: 0,
                                g: 0,
                                m1: 0,
                                m2: 0,
                                surface: 0,
                                v0: 0,
                                v1: 0,
                                v2: 0,
                                studentAnswer: 0,
                                isCorrect: false,
                                correctAnswer: 0
                            }

                            excelRows.push(excelRow);
                        }
                    }
                }
            }

            const worksheet = XLSX.utils.json_to_sheet(excelRows);  
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes');
            const date = new Date();
            const dateString = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
            const fileName = 'estudiantes_' + dateString + '.xlsx';
            XLSX.writeFile(workbook, fileName);
        } else if(selectedLevelToExportData === "2"){
            // const sessionOverviewRows: Level2_SessionOverviewSheet[] = [];
            // const detailedQuestionRows: Level2_DetailedQuestionSheet[] = [];
            // const detailedAnswersRows: Level2_DetailedAnswersSheet[] = [];

            // for(let student of studentsToExport){
            //     const levelData = student.progress['level_' + selectedLevelToExportData];
            //     if(levelData){
            //         for(let gameSessionKey of Object.keys(levelData)){
            //             const gameSessionData = levelData[gameSessionKey];
            //             const gameSessionKeySplitted = parseGameSessionKey(gameSessionKey);

            //             const sessionOverviewRow: Level2_SessionOverviewSheet = {
            //                 name: student.name + ' ' + student.lastName,
            //                 email: student.email,
            //                 group: $Groups.find(group => group.group_id === student.group_id)?.group_name || '',
            //                 level: 'Nivel ' + selectedLevel,
            //                 date: gameSessionKeySplitted.date,
            //                 time: gameSessionKeySplitted.time,
            //                 session_id: gameSessionKey,
            //                 stage: '',
            //                 weight: 0,
            //                 a_value: 0
            //             };

            //             if(gameSessionData.data){
            //                 for(let stageKey of Object.keys(gameSessionData.data)){
            //                     const stageData = gameSessionData.data[stageKey];
            //                     sessionOverviewRow.stage = stageKey;
            //                     sessionOverviewRow.weight = stageData.weight;
            //                     sessionOverviewRow.a_value = stageData.a;

            //                     for(let question of stageData.questionList){
            //                         const detailedQuestionRow: Level2_DetailedQuestionSheet = {
            //                             session_id: gameSessionKey,
            //                             stage: stageKey,
            //                             question_id: question.question,
            //                             formula: question.formula,
            //                             question: question.question,
            //                             question_type: question.questionType,
            //                             answers: question.answers.join(', ')
            //                         };
            //                         detailedQuestionRows.push(detailedQuestionRow);
            //                     }
            //                 }
            //             }

            //             if(gameSessionData.sections){
            //                 for(let sectionKey of Object.keys(gameSessionData.sections)){
            //                     const sectionData = gameSessionData.sections[sectionKey];
            //                     for(let partKey of Object.keys(sectionData)){
            //                         const partData = sectionData[partKey];
            //                         const detailedAnswersRow: Level2_DetailedAnswersSheet = {
            //                             session_id: gameSessionKey,
            //                             stage: sectionKey,
            //                             question_id: partKey,
            //                             part_id: partKey,
            //                             answer_given: partData ? partData.answer_given : '',
            //                             is_correct: partData.is_correct,
            //                             score: partData.score,
            //                             time: partData.time
            //                         };
            //                         detailedAnswersRows.push(detailedAnswersRow);
            //                     }
            //                 }
            //             }

            //             sessionOverviewRows.push(sessionOverviewRow);
            //         }
            //     }
            // }

            // const sessionOverviewWorksheet = XLSX.utils.json_to_sheet(sessionOverviewRows);
            // const detailedQuestionWorksheet = XLSX.utils.json_to_sheet(detailedQuestionRows);
            // const detailedAnswersWorksheet = XLSX.utils.json_to_sheet(detailedAnswersRows);

            // const workbook = XLSX.utils.book_new();
            // XLSX.utils.book_append_sheet(workbook, sessionOverviewWorksheet, 'Session Overview');
            // XLSX.utils.book_append_sheet(workbook, detailedQuestionWorksheet, 'Detailed Questions');
            // XLSX.utils.book_append_sheet(workbook, detailedAnswersWorksheet, 'Detailed Answers');

            // const date = new Date();
            // const dateString = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
            // const fileName = 'estudiantes_' + dateString + '.xlsx';
            // XLSX.writeFile(workbook, fileName);
            
            // open new window with link: https://v4-gm6ts4osaa-uc.a.run.app/report/level-2
            window.open('https://v4-gm6ts4osaa-uc.a.run.app/report/level-2');
        }
}

function exportStudentTimeAndSessionsToExcel() {
    const excelRows = [];
    let studentsToExport: Student[] = [];

    if(selectedGroupsCheckboxTiming.length === 1 && selectedGroupsCheckboxTiming[0] === 'General'){
        studentsToExport = filteredStudents;
    } else {
        studentsToExport = filteredStudents.filter(student => selectedGroupsCheckboxTiming.includes(student.group_id));
    }

    if(selectedLevelToExportTiming === '1'){
        for(let student of studentsToExport){
            // Skip students without a group
            if(!student.group_id) {
                continue;
            }
            
            let totalTime = 0;
            let gameSessionsCount = 0;
            for(let levelKey of Object.keys(student.progress)){
                const levelData = student.progress[levelKey];
                for(let gameSessionKey of Object.keys(levelData)){
                    const gameSessionData = levelData[gameSessionKey];
                    if(gameSessionData.data && gameSessionData.sections){
                        for(let sectionKey of Object.keys(gameSessionData.sections)){
                            const sectionData = gameSessionData.sections[sectionKey];
                            if(sectionData){
                                totalTime += sectionData.time;
                                gameSessionsCount++;
                            }
                        }
                    }
                }
            }
            const excelRow = {
                name: student.name + ' ' + student.lastName,
                email: student.email,
                group: $Groups.find(group => group.group_id === student.group_id)?.group_name || '',
                'Tiempo Total (min)' : Math.round(totalTime / 60),
                NumeroDeSesionesDeJuego: gameSessionsCount
            }
            excelRows.push(excelRow);
        }
        const worksheet = XLSX.utils.json_to_sheet(excelRows);  
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes');
        const date = new Date();
        const dateString = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        const fileName = 'estudiantes_' + dateString + '.xlsx';
        XLSX.writeFile(workbook, fileName);
    } else if (selectedLevelToExportTiming === '2'){
        console.log('Exporting level 2');
    }
}

let downloadSelectionModal = false;
let selectedGroupsCheckbox: string[] = [];
let selectedGroupsCheckboxTiming: string[] = [];

    
</script>

<div class="stats-container">
    <div class="stats-container-header">
        <div class="search-container">
            <TableSearch divClass='overflow-x-auto sm:rounded-lg' bind:inputValue={searchTerm} placeholder="Buscar estudiantes"/>
        </div>
        <div class="flex-grow"></div>
        <div class="filter-container">
            <Select id="groupSelect" name="groupSelect" placeholder="Grupos" bind:value={selectedGroup}>
                <option selected value="General"> General </option>
                {#each professorGroups as group (group.group_id)}
                    <option value={group.group_id}> {group.group_name} </option>
                {/each}
            </Select>
            <Select id="levelSelect" name="levelSelect" placeholder="Niveles" bind:value={selectedLevel}>
                <option selected value="1"> Nivel 1</option>
                <option value="2"> Nivel 2</option>
            </Select>
            <Button color="green" variant="outline" size="sm"
                on:click={() => {
                    downloadSelectionModal = true,
                    selectedGroupsCheckbox = []
                }}
            >
                Exportar
                <FileExportSolid class="ml-3" size="sm"/>
            </Button>
        </div>
    </div>
    <div class="table-container">
        <Table hoverable={true} striped={true} shadow>
            <TableHead class="bg-sky-400">
                <TableHeadCell
                    on:click={resetOriginalOrder}
                    class="cursor-pointer"
                >Id</TableHeadCell>
                <TableHeadCell
                    on:click={sortByName}
                    class="cursor-pointer"
                >Nombre</TableHeadCell>
                <TableHeadCell>Grupo</TableHeadCell>
                <TableHeadCell>Correo</TableHeadCell>
                <TableHeadCell
                    on:click={
                        () => {
                            sortByData(parseInt(selectedLevel));
                        }
                    }
                    class="cursor-pointer"
                >Data</TableHeadCell>
                <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody>
                {#each pagedStudents as student (student.email + student.name)}
                    <TableBodyRow>
                        <TableBodyCell>{($Students.indexOf(student) + 1)}</TableBodyCell>
                        <TableBodyCell>{student.name + " " + student.lastName}</TableBodyCell>
                        <TableBodyCell>{student.group_id}</TableBodyCell>
                        <TableBodyCell>{student.email}</TableBodyCell>
                        <TableBodyCell>
                            {#if selectedLevel === '1'}
                                {#if student.progress.level_1 === undefined}
                                <Badge color="red" class="items-center justify-center w-auto">
                                    <p class="text-red-700 font-semibold">Sin datos</p>
                                </Badge>
                                {:else}
                                    <Badge color="green" class="items-center justify-center w-auto">
                                        <p class="text-green-700 font-semibold">Disponible</p>
                                    </Badge>
                                {/if}
                            {:else if selectedLevel === '2'}
                                {#if student.progress.level_2 === undefined}
                                    <Badge color="red" class="items-center justify-center w-auto">
                                        <p class="text-red-700 font-semibold">Sin datos</p>
                                    </Badge>
                                {:else}
                                    <Badge color="green" class="items-center justify-center w-auto">
                                        <p class="text-green-700 font-semibold">Disponible</p>
                                    </Badge>
                                {/if}
                            {/if}
                        </TableBodyCell>
                        <TableBodyCell>
                            {#if selectedLevel === '1'}
                                {#if student.progress.level_1 === undefined}
                                    <FileSearchSolid class="w-5 h-5 text-gray-400" />
                                {:else}
                                    <FileSearchSolid class="w-5 h-5 text-sky-600 hover:cursor-pointer" 
                                        on:click={() => navigateToStudentDetail(student.uuid || "", '1')}
                                    />
                                {/if}
                            {:else if selectedLevel === '2'}
                                {#if student.progress.level_2 === undefined}
                                    <FileSearchSolid class="w-5 h-5 text-gray-400" />
                                {:else}
                                    <FileSearchSolid class="w-5 h-5 text-sky-600 hover:cursor-pointer"
                                        on:click={() => navigateToStudentDetail(student.uuid || "", '2')}
                                    />
                                {/if}
                            {/if}
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
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </Select>
            </div>
        </div>
    </div>
</div>

<Modal bind:open={downloadSelectionModal} title="Descargas">
    <div class="download-modal-content">
        <Tabs style="pill">
            <TabItem open activeClasses='p-4 text-black font-bold bg-green-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                <span slot="title"> Datos de juego </span>
                <div class="game-data-export-container">
                    <p class="font-bold text-black mb-5"> Parámetros actuales, datos de juego: </p>
                    <div class="flex justify-left align-center mb-5">
                        <p class="mr-11 mt-3">Nivel: </p>
                        <Select id="levelSelect" name="levelSelect" placeholder="Niveles" bind:value={selectedLevelToExportData}>
                            <option selected value="1"> Nivel 1</option>
                            <option value="2"> Nivel 2</option>
                        </Select>
                    </div>
                    {#if selectedLevelToExportData === '1'}
                    <div class="flex justify-left align-center mb-5">
                        <p class="mr-7 mt-3">Grupos: </p>
                        <Button color="green">
                            Selecciona grupo(s) a exportar
                        </Button>
                        <Dropdown class="w-56 overflow-y-auto py-1 h-48">
                            <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <Checkbox value="General" checked={selectedGroupsCheckbox.includes('General')}
                                    on:click={() => {
                                        if(selectedGroupsCheckbox.includes('General')){
                                            selectedGroupsCheckbox = selectedGroupsCheckbox.filter(item => item !== 'General');
                                        } else {
                                            selectedGroupsCheckbox = ['General'];
                                        }
                                    }}
                                >General</Checkbox>
                            </li>
                            {#each professorGroups as group (group.group_id)}
                                <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <Checkbox value={group.group_id} checked={selectedGroupsCheckbox.includes(group.group_id)} disabled={selectedGroupsCheckbox.includes('General')}
                                        on:click={() => {
                                            if(selectedGroupsCheckbox.includes(group.group_id)){
                                                selectedGroupsCheckbox = selectedGroupsCheckbox.filter(item => item !== group.group_id);
                                            } else {
                                                selectedGroupsCheckbox = [...selectedGroupsCheckbox, group.group_id];
                                            }
                                        }}
                                    >{group.group_name}</Checkbox>
                                </li>
                            {/each}
                        </Dropdown>
                    </div>
                    {/if}
                    <div class="flex justify-end">
                        <Button color="green" variant="outline" size="sm"
                        disabled={selectedGroupsCheckbox.length === 0 && selectedLevelToExportData === '1'}
                        on:click={
                            () => {
                                exportToExcel()
                            }
                        }
                    >
                        Exportar
                        <FileExportSolid class="ml-3" size="sm"/>
                    </Button>
                    </div>
                </div>
            </TabItem>
            <TabItem activeClasses='p-4 text-black font-bold bg-green-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                <span slot="title"> Tiempos </span>
                <div class="game-data-export-container">
                    <p class="font-bold text-black mb-5"> Parámetros actuales, tiempo en sesiones de juego: </p>
                    <div class="flex justify-left align-center mb-5">
                        <p class="mr-11 mt-3">Nivel: </p>
                        <Select id="levelSelect" name="levelSelect" placeholder="Niveles" bind:value={selectedLevelToExportTiming}>
                            <option selected value="1"> Nivel 1</option>
                            <!-- <option value="2"> Nivel 2</option> -->
                        </Select>
                    </div>
                    <div class="flex justify-left align-center mb-5">
                        <p class="mr-7 mt-3">Grupos: </p>
                        <Button color="green">
                            Selecciona grupo(s) a exportar
                        </Button>
                        <Dropdown class="w-56 overflow-y-auto py-1 h-48">
                            <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <Checkbox value="General" checked={selectedGroupsCheckboxTiming.includes('General')}
                                    on:click={() => {
                                        if(selectedGroupsCheckboxTiming.includes('General')){
                                            selectedGroupsCheckboxTiming = selectedGroupsCheckboxTiming.filter(item => item !== 'General');
                                        } else {
                                            selectedGroupsCheckboxTiming = ['General'];
                                        }
                                    }}
                                >General</Checkbox>
                            </li>
                            {#each professorGroups as group (group.group_id)}
                                <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <Checkbox value={group.group_id} checked={selectedGroupsCheckboxTiming.includes(group.group_id)} disabled={selectedGroupsCheckboxTiming.includes('General')}
                                        on:click={() => {
                                            if(selectedGroupsCheckboxTiming.includes(group.group_id)){
                                                selectedGroupsCheckboxTiming = selectedGroupsCheckboxTiming.filter(item => item !== group.group_id);
                                            } else {
                                                selectedGroupsCheckboxTiming = [...selectedGroupsCheckboxTiming, group.group_id];
                                            }
                                        }}
                                    >{group.group_name}</Checkbox>
                                </li>
                            {/each}
                        </Dropdown>
                    </div>
                    <div class="flex justify-end">
                        <Button color="green" variant="outline" size="sm"
                            disabled={selectedGroupsCheckboxTiming.length === 0}
                            on:click={
                                () => {
                                    exportStudentTimeAndSessionsToExcel()
                                }
                            }
                        >
                            Exportar
                            <FileExportSolid class="ml-3" size="sm"/>
                        </Button>
                    </div>
                </div>
            </TabItem>
        </Tabs>
    </div>
</Modal>

<style>
    .stats-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding-top: 1rem;
    }

    .stats-container-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 10%;
        padding-left: 3rem;
        padding-right: 3rem;
        margin-top: 1rem;
    }

    .search-container {
        display: flex;
        align-items: center;
        width: 40%;
        height: 100%;   
    }

    .filter-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 50%;
        gap: 1rem;
    }

    .table-container {
        width: 100%;
        height: 100%;
        padding-left: 3rem;
        padding-right: 3rem;
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