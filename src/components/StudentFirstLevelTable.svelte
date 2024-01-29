<script lang="ts">
    import type { Student } from '../../src/types';
    import { Button, Select, Table, TableBody, TableBodyCell, TableHead, TableBodyRow, TableHeadCell, TableSearch, Popover, Badge, Indicator} from 'flowbite-svelte'
    import { ArrowLeftOutline, ArrowRightOutline, AngleDownSolid, InfoCircleSolid, AngleUpSolid, CaretSortSolid } from 'flowbite-svelte-icons';

    export let student: Student | undefined;
    let studentProgress = student?.progress.level_1;
    export let isStudent: boolean = false;

    function parseGameSessionKey(gameSessionKey: string){
        //game_15_11_2023_10_06
        let gameSessionKeySplitted = gameSessionKey.split('_');
        let date = gameSessionKeySplitted[1] + '-' + gameSessionKeySplitted[2] + '-' + gameSessionKeySplitted[3];
        let time = gameSessionKeySplitted[4] + ':' + gameSessionKeySplitted[5];
        return {date, time};
    }

    let currentPage = 1;
    let itemsPerPage: string = '15';
    let start: number = (currentPage - 1) * parseInt(itemsPerPage);
    let end: number = currentPage * parseInt(itemsPerPage);

    $ :{
        start = (currentPage - 1) * parseInt(itemsPerPage);
        end = currentPage * parseInt(itemsPerPage);
    }

    let openRows: string[] = [];

    function toggleRow(gameSessionKey: string) {
        const index = openRows.indexOf(gameSessionKey);
        if (index === -1) {
            openRows = [...openRows, gameSessionKey];
        } else {
            openRows = openRows.filter(key => key !== gameSessionKey);
            // close all subrows of this section
            openSubRows = openSubRows.filter(subRowKey => !subRowKey.startsWith(`${gameSessionKey}-`));
        }
    }

    let sectionDictionary: Record<string, string> = {
        'section_1': 'Sección 1',
        'section_2': 'Sección 2',
        'section_3': 'Sección 3',
        'section_4': 'Sección 4',
    }

    let sectionDataKeys: Record<string, string> = {
        'section_1': 'acidTime',
        'section_2': 'v2',
        'section_3': 'v1',
        'section_4': 'v0'
    };

    let openSubRows: string[] = [];

    function toggleSubRow(gameSessionKey: string) {
        const index = openSubRows.indexOf(gameSessionKey);
        if (index === -1) {
            openSubRows = [...openSubRows, gameSessionKey];
        } else {
            openSubRows = openSubRows.filter(key => key !== gameSessionKey);
        }
    }

    let sortDirection: number = 1;
    function sortByDate() {
        sortDirection = sortDirection * -1;
        let sortedKeys = Object.keys(studentProgress).sort((a, b) => {
            let dateA = parseGameSessionKey(a).date.split('-');
            let dateB = parseGameSessionKey(b).date.split('-');
            let timeA = parseGameSessionKey(a).time.split(':');
            let timeB = parseGameSessionKey(b).time.split(':');
            let dateAObj = new Date(parseInt(dateA[2]), parseInt(dateA[1]), parseInt(dateA[0]), parseInt(timeA[0]), parseInt(timeA[1]));
            let dateBObj = new Date(parseInt(dateB[2]), parseInt(dateB[1]), parseInt(dateB[0]), parseInt(timeB[0]), parseInt(timeB[1]));
            return sortDirection * (dateAObj.getTime() - dateBObj.getTime());
        });
        let sortedStudentProgress: Record<string, any> = {};
        sortedKeys.forEach(key => {
            sortedStudentProgress[key] = studentProgress[key];
        });
        studentProgress = sortedStudentProgress;
    }

</script>


<Table hoverable={true} striped={true} shadow>
    <TableHead class="bg-sky-400">
        <TableHeadCell>
            Num.
        </TableHeadCell>
        <TableHeadCell>
            Id. de sesión
        </TableHeadCell>
        <TableHeadCell class="flex">
            Fecha
            <CaretSortSolid class="w-4 h-4 text-blac ml-3 hover:cursor-pointer" 
                on:click={() => sortByDate()}
            />
        </TableHeadCell>
        <TableHeadCell>
            Hora de inicio
        </TableHeadCell>
        {#if !isStudent}
            <TableHeadCell>
                Datos
            </TableHeadCell>
        {/if}
        <TableHeadCell class="justify-center text-center">
            Secciones
        </TableHeadCell>
    </TableHead>
    <TableBody>
        {#if studentProgress}
            {#each Object.keys(studentProgress).slice(start, end) as gameSessionKey, index}
            <TableBodyRow>
                <TableBodyCell>
                    {(currentPage - 1) * parseInt(itemsPerPage) + index + 1}
                </TableBodyCell>
                <TableBodyCell>
                    {gameSessionKey}
                </TableBodyCell>
                <TableBodyCell>
                    {parseGameSessionKey(gameSessionKey).date}
                </TableBodyCell>
                <TableBodyCell>
                    {parseGameSessionKey(gameSessionKey).time}
                </TableBodyCell>
                {#if !isStudent}
                <TableBodyCell>
                    <div class="flex justify-right">
                        {#if studentProgress[gameSessionKey].data}
                            <InfoCircleSolid class="w-5 h-5 text-black" id='{gameSessionKey}'/>
                            <Popover title="Datos del problema" triggeredBy="#{gameSessionKey}" trigger="click">
                                <Table>
                                    <TableBody>
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                Acid speed
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {(studentProgress[gameSessionKey].data.acidSpeed.toFixed(3))} m/s
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                Acid time
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {(studentProgress[gameSessionKey].data.acidTime.toFixed(3))} s
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                G
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {(studentProgress[gameSessionKey].data.g.toFixed(3))} m/s^2
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                M1
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {(studentProgress[gameSessionKey].data.m1.toFixed(3))} kg
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                M2
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {(studentProgress[gameSessionKey].data.m2.toFixed(3))} kg
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                Surface
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {(studentProgress[gameSessionKey].data.surface.toFixed(3))} m^2
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                V0
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {(studentProgress[gameSessionKey].data.v0.toFixed(3))} m/s
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                V1
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {(studentProgress[gameSessionKey].data.v1.toFixed(3))} m/s
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                V2
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {(studentProgress[gameSessionKey].data.v2.toFixed(3))} m/s
                                            </TableBodyCell>
                                        </TableBodyRow>
                                    </TableBody>
                                </Table>
                            </Popover>
                        {:else}
                            <span>No data</span>
                        {/if}
                    </div>
                </TableBodyCell>
                {/if}
                <TableBodyCell class="text-right">
                    <div class="flex justify-center">
                        {#if studentProgress[gameSessionKey].sections}
                            {#if openRows.includes(gameSessionKey)}
                                <AngleUpSolid class="w-4 h-4 text-black hover:cursor-pointer" 
                                    on:click={() => toggleRow(gameSessionKey)}
                                />
                            {:else}
                                <AngleDownSolid class="w-4 h-4 text-black hover:cursor-pointer" 
                                    on:click={() => toggleRow(gameSessionKey)}
                                />
                            {/if}
                        {:else}
                            <span>No data</span>
                        {/if}
                    </div>
                </TableBodyCell>
            </TableBodyRow>
                {#if openRows.includes(gameSessionKey)}
                    <TableBodyRow class="w-full justify-center items-center">
                        <TableBodyCell colspan={!isStudent ? 6: 5} class="bg-zinc-200">
                            <Table shadow>
                                <TableHead class="bg-green-400">
                                    <TableHeadCell>
                                        Sección
                                    </TableHeadCell>
                                    <TableHeadCell>
                                        Puntaje
                                    </TableHeadCell>
                                    <TableHeadCell>
                                        Intentos
                                    </TableHeadCell>
                                    <TableHeadCell>
                                        Tiempo
                                    </TableHeadCell>
                                    <TableHeadCell class="justify-center text-center">
                                        Respuestas
                                    </TableHeadCell>
                                </TableHead>
                                <TableBody>
                                    {#each Object.keys(studentProgress[gameSessionKey].sections) as sectionKey}
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                {sectionDictionary[sectionKey]}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {studentProgress[gameSessionKey].sections[sectionKey].score}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {studentProgress[gameSessionKey].sections[sectionKey].attempts}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {studentProgress[gameSessionKey].sections[sectionKey].time.toFixed(2)} s.
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                <div class="flex justify-center">
                                                    {#if openSubRows.includes(`${gameSessionKey}-${sectionKey}`)}
                                                        <AngleUpSolid class="w-4 h-4 text-black hover:cursor-pointer" 
                                                            on:click={() => toggleSubRow(`${gameSessionKey}-${sectionKey}`)}
                                                        />
                                                    {:else}
                                                        <AngleDownSolid class="w-4 h-4 text-black hover:cursor-pointer" 
                                                            on:click={() => toggleSubRow(`${gameSessionKey}-${sectionKey}`)}
                                                        />
                                                    {/if}
                                                </div>
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        {#if openSubRows.includes(`${gameSessionKey}-${sectionKey}`)}
                                        <TableBodyRow class="w-full justify-center items-center">
                                            <TableBodyCell colspan={!isStudent ? 6: 5} class="bg-blue-200">
                                                <Table shadow>
                                                    <TableBody>
                                                        <TableBodyRow>
                                                            <TableBodyCell class="text-black font-semibold">
                                                                Respuestas
                                                            </TableBodyCell>
                                                            {#each studentProgress[gameSessionKey].sections[sectionKey].listResults as result}
                                                                <TableBodyCell>
                                                                    {#if Math.abs(result - studentProgress[gameSessionKey].data[sectionDataKeys[sectionKey]]) <= 0.2}
                                                                        <Badge color="green">
                                                                            {result.toFixed(3)}
                                                                        </Badge>
                                                                    {:else}
                                                                        <Badge color="red">
                                                                            {result.toFixed(3)}
                                                                        </Badge>
                                                                    {/if}
                                                                </TableBodyCell>
                                                            {/each}
                                                        </TableBodyRow>
                                                    </TableBody>
                                                </Table>
                                            </TableBodyCell>
                                        </TableBodyRow>
                                    {/if}
                                    {/each}
                                </TableBody>
                            </Table>
                        </TableBodyCell>
                    </TableBodyRow>  
                {/if}
            {/each}
        {/if}
    </TableBody>
    <tfoot>
        <tr class="font-semibold text-gray-900">
            <th scope="row" class="text-sm" colspan={!isStudent ? 6: 5}> 
                <div class="flex justify-between w-full"> 
                    <div class="ml-6 mt-6">
                        {#if studentProgress}
                            {start + 1} - {end > Object.keys(studentProgress).length ? Object.keys(studentProgress).length : end} de {Object.keys(studentProgress).length}
                        {:else}
                            0 - 0 de 0
                        {/if}
                    </div>
                    <div class="mt-4 mb-2">
                        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400" on:click={() => currentPage = currentPage - 1} disabled={currentPage === 1}>
                            <ArrowLeftOutline class="w-4 h-4 text-white" />
                        </Button>
                        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400" on:click={() => currentPage = currentPage + 1} disabled={end >= Object.keys(studentProgress).length}>
                            <ArrowRightOutline class="w-4 h-4 text-white" />
                        </Button>
                    </div> 
                    <div class="mr-6 mt-3 mb-3">
                        <Select bind:value={itemsPerPage} class="w-24" id="pagination-select-level1">
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </Select>
                    </div>
                </div>
            </th>
        </tr>    
    </tfoot>
</Table>


<style>
 
</style>


