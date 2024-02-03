<script lang="ts">
    import type { Student } from '../../src/types';
    import { Button, Select, Table, TableBody, TableBodyCell, TableHead, TableBodyRow, TableHeadCell, TableSearch, Popover, Badge, Indicator, Tabs, TabItem, Modal, Sidebar, SidebarWrapper, SidebarGroup, SidebarItem} from 'flowbite-svelte'
    import { ArrowLeftOutline, ArrowRightOutline, AngleDownSolid, InfoCircleSolid, AngleUpSolid, CaretSortSolid } from 'flowbite-svelte-icons';
    import MathML from 'svelte-tex/package/MathML.svelte';


    export let student: Student | undefined;
    let studentProgress = student?.progress.level_2;
    let sortedKeys = Object.keys(studentProgress).sort((a, b) => {
        let dateA = parseGameSessionKey(a).date.split('-');
        let dateB = parseGameSessionKey(b).date.split('-');
        let timeA = parseGameSessionKey(a).time.split(':');
        let timeB = parseGameSessionKey(b).time.split(':');
        let dateAObj = new Date(parseInt(dateA[2]), parseInt(dateA[1]), parseInt(dateA[0]), parseInt(timeA[0]), parseInt(timeA[1]));
        let dateBObj = new Date(parseInt(dateB[2]), parseInt(dateB[1]), parseInt(dateB[0]), parseInt(timeB[0]), parseInt(timeB[1]));
        return dateBObj.getTime() - dateAObj.getTime();
    });
    let sortedStudentProgress: Record<string, any> = {};
    sortedKeys.forEach(key => {
        sortedStudentProgress[key] = studentProgress[key];
    });
    studentProgress = sortedStudentProgress;
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

    let sortDirection: number = -1;
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

    let dataModalOpen = false;
    let sectionModalOpen = false;

    let currentData: Record<string, any> = {};

    function openDataModal(gameSessionKey: string){
        currentData = studentProgress[gameSessionKey].data;
        dataModalOpen = true;
    }
    
    function parseLatex(formula: string){
        let parsedFormula = formula.replace(/^\\/, '')
                                .replace(/\\\]$/, '')
                                .replace(/\\a/g, ' ');
        return parsedFormula;
    }

    function toLatex(expression: string) {
        let parts = expression.split('*');

        let latexParts = parts.map(part => {
            if (part === 'pi') {
                return '\\\\pi';
            } else if (part.includes('/')) {
                let [numerator, denominator] = part.split('/');
                return `\\frac{${numerator}}{${denominator}}`;
            } else {
                return part;
            }
        });

        let latexExpression = latexParts.join('');
        return `${latexExpression}`;
    }

    let currentSection: Record<string, any> = {};
    function openSectionModal(gameSessionKey: string){
        currentSection = studentProgress[gameSessionKey].sections;
        sectionModalOpen = true;
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
        <TableHeadCell>
            Datos
        </TableHeadCell>
        <TableHeadCell>
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
                <TableBodyCell>
                    {#if studentProgress[gameSessionKey].data}
                        <InfoCircleSolid class="w-5 h-5 text-black" id='{gameSessionKey}'
                            on:click={() => openDataModal(gameSessionKey)}
                        />
                    {:else}
                        <span>No data</span>
                    {/if}
                </TableBodyCell>
                <TableBodyCell>
                    {#if studentProgress[gameSessionKey].sections}
                        <Button variant="outlined" size="xs" class="bg-blue-500 hover:bg-blue-400" on:click={() => openSectionModal(gameSessionKey)}>
                            Ver más
                        </Button>
                    {:else}
                        <span>No sections</span>
                    {/if}
                </TableBodyCell>
            </TableBodyRow>
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

<Modal bind:open={dataModalOpen} size="xl" autoclose={false} class="w-full">
    <div class="data-container">
        <Tabs style="pill">
            {#each Object.keys(currentData) as stage, index}
                {#if index === 0}
                <TabItem open activeClasses='p-4 text-black font-bold bg-purple-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                    <span slot ="title"> Stage {index + 1}</span>
                    <div class="data-content">
                        <div class="flex flex-row justify-center w-full mb-4">
                            <div class="w-1/2">
                                <div class="value-holder">
                                    <strong>a:</strong> {currentData[stage].a.toFixed(4)}
                                </div>
                            </div>
                            <div class="w-1/2">
                                <div class="value-holder">
                                    <strong>peso: </strong> {currentData[stage].weight.toFixed(4)}
                                </div>
                            </div>
                        </div>
                        <Table>
                            <TableHead class="bg-sky-400">
                                <TableHeadCell>
                                    Pregunta
                                </TableHeadCell>
                                <TableHeadCell>
                                    Tipo
                                </TableHeadCell>
                                <TableHeadCell>
                                    Expresión
                                </TableHeadCell>
                                <TableHeadCell>
                                    Respuestas
                                </TableHeadCell>
                            </TableHead>
                            <TableBody>
                                {#each Object.keys(currentData[stage].questionList) as question, index}
                                <TableBodyRow>
                                    <TableBodyCell>
                                        {Number(question) + 1}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {#if currentData[stage].questionList[question].questionType === "FORMULA"}
                                            <Badge class="bg-blue-500 text-white p-2">FORMULA</Badge>
                                        {:else if currentData[stage].questionList[question].questionType === "INTEGRAL"}
                                            <Badge class="bg-yellow-500 text-white p-2">INTEGRAL</Badge>
                                        {:else if currentData[stage].questionList[question].questionType === "VOLUME"}
                                            <Badge class="bg-green-500 text-white p-2">VOLUMEN</Badge>
                                        {/if}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <MathML tex={String.raw`${parseLatex(currentData[stage].questionList[question].formula)}`} />
                                      </TableBodyCell>
                                    <TableBodyCell>
                                        {#if currentData[stage].questionList[question].questionType === "INTEGRAL"}
                                            ({currentData[stage].questionList[question].answers.join(', ')})
                                        {:else}
                                            {#each currentData[stage].questionList[question].answers as answer, index}
                                                <MathML tex={String.raw`${toLatex(answer)}`} />
                                            {/each}
                                        {/if}
                                    </TableBodyCell>
                                </TableBodyRow>
                                {/each}
                            </TableBody>
                        </Table>
                    </div>  
                </TabItem>
                {:else}
                <TabItem activeClasses='p-4 text-black font-bold bg-purple-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                    <span slot ="title"> Stage {index + 1}</span>
                    <div class="data-content">
                        <div class="flex flex-row justify-center w-full mb-4">
                            <div class="w-1/2">
                                <div class="value-holder">
                                    <strong>a:</strong> {currentData[stage].a.toFixed(4)}
                                </div>
                            </div>
                            <div class="w-1/2">
                                <div class="value-holder">
                                    <strong>peso: </strong> {currentData[stage].weight.toFixed(4)}
                                </div>
                            </div>
                        </div>
                        <Table>
                            <TableHead class="bg-sky-400">
                                <TableHeadCell>
                                    Pregunta
                                </TableHeadCell>
                                <TableHeadCell>
                                    Tipo
                                </TableHeadCell>
                                <TableHeadCell>
                                    Expresión
                                </TableHeadCell>
                                <TableHeadCell>
                                    Respuestas
                                </TableHeadCell>
                            </TableHead>
                            <TableBody>
                                {#each Object.keys(currentData[stage].questionList) as question, index}
                                <TableBodyRow>
                                    <TableBodyCell>
                                        {Number(question) + 1}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {#if currentData[stage].questionList[question].questionType === "FORMULA"}
                                            <Badge class="bg-blue-500 text-white p-2">FORMULA</Badge>
                                        {:else if currentData[stage].questionList[question].questionType === "INTEGRAL"}
                                            <Badge class="bg-yellow-500 text-white p-2">INTEGRAL</Badge>
                                        {:else if currentData[stage].questionList[question].questionType === "VOLUME"}
                                            <Badge class="bg-green-500 text-white p-2">VOLUMEN</Badge>
                                        {/if}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <MathML tex={String.raw`${parseLatex(currentData[stage].questionList[question].formula)}`} />
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {#if currentData[stage].questionList[question].questionType === "INTEGRAL"}
                                            ({currentData[stage].questionList[question].answers.join(', ')})
                                        {:else}
                                            {#each currentData[stage].questionList[question].answers as answer, index}
                                                <MathML tex={String.raw`${toLatex(answer)}`} />
                                            {/each}
                                        {/if}
                                    </TableBodyCell>
                                </TableBodyRow>
                                {/each}
                            </TableBody>
                        </Table>
                    </div>  
                </TabItem>
                {/if}
            {/each}
        </Tabs>
    </div>
</Modal>

<Modal bind:open={sectionModalOpen} size="xl" autoclose={false} class="w-full">
    <div class="data-container">
        <Tabs style="pill">
            {#each Object.keys(currentSection) as section, index}
                {#if index === 0}
                <TabItem open activeClasses='p-4 text-black font-bold bg-purple-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                    <span slot ="title"> Section {index + 1}</span>
                    <Tabs style="full" defaultClass="flex rounded-lg divide-x rtl:divide-x-reverse divide-gray-200 shadow dark:divide-gray-700">
                        {#each Object.keys(currentSection[section]) as subsection, index}
                            {#if index === 0}
                                <TabItem class="w-full" open>
                                    <span slot="title">Subsection {index + 1}</span>
                                    <Table>
                                        <TableHead class="bg-sky-400">
                                            <TableHeadCell>
                                                Parte
                                            </TableHeadCell>
                                            <TableHeadCell>
                                                Respuestas
                                            </TableHeadCell>
                                            <TableHeadCell>
                                                Puntaje
                                            </TableHeadCell>
                                            <TableHeadCell>
                                                Tiempo
                                            </TableHeadCell>
                                        </TableHead>
                                        <TableBody>
                                            {#each Object.keys(currentSection[section][subsection]) as part, index}
                                            <TableBodyRow>
                                                <TableBodyCell>
                                                    {part}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    <div class="flex flex-row space-x-4">
                                                        {#if currentSection[section][subsection][part].answers.length > 1}
                                                            ({#each currentSection[section][subsection][part].answers as answer, index}
                                                                {#if index === 0}
                                                                    <MathML tex={String.raw`${toLatex(answer)}`} />
                                                                {:else}
                                                                    , <MathML tex={String.raw`${toLatex(answer)}`} />
                                                                {/if}
                                                            {/each})
                                                            {#if currentSection[section][subsection][part].is_correct}
                                                                <Indicator class="bg-green-500" />
                                                            {:else}
                                                                <Indicator class="bg-red-500" />
                                                            {/if}
                                                        {:else}
                                                            <MathML tex={String.raw`${toLatex(currentSection[section][subsection][part].answers[0])}`} />
                                                            {#if currentSection[section][subsection][part].is_correct}
                                                                <Indicator class="bg-green-500" />
                                                            {:else}
                                                                <Indicator class="bg-red-500" />
                                                            {/if}
                                                        {/if}
                                                    </div>
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {currentSection[section][subsection][part].score.toFixed(4)}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {currentSection[section][subsection][part].time.toFixed(4)}
                                                </TableBodyCell>
                                            </TableBodyRow>
                                            {/each}
                                        </TableBody>
                                    </Table>
                                </TabItem>
                            {:else}
                            <TabItem class="w-full">
                                <span slot="title">Subsection {index + 1}</span>
                                <Table>
                                    <TableHead class="bg-sky-400">
                                        <TableHeadCell>
                                            Parte
                                        </TableHeadCell>
                                        <TableHeadCell>
                                            Respuestas
                                        </TableHeadCell>
                                        <TableHeadCell>
                                            Puntaje
                                        </TableHeadCell>
                                        <TableHeadCell>
                                            Tiempo
                                        </TableHeadCell>
                                    </TableHead>
                                    <TableBody>
                                        {#each Object.keys(currentSection[section][subsection]) as part, index}
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                {part}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                <div class="flex flex-row space-x-4">
                                                    {#if currentSection[section][subsection][part].answers.length > 1}
                                                    ({#each currentSection[section][subsection][part].answers as answer, index}
                                                        {#if index === 0}
                                                            <MathML tex={String.raw`${toLatex(answer)}`}/>
                                                        {:else}
                                                            ,<MathML tex={String.raw`${toLatex(answer)}`}/>
                                                        {/if}
                                                    {/each})
                                                    {#if currentSection[section][subsection][part].is_correct}
                                                        <Indicator class="bg-green-500" />
                                                    {:else}
                                                        <Indicator class="bg-red-500" />
                                                    {/if}
                                                {:else}
                                                    <MathML tex={String.raw`${toLatex(currentSection[section][subsection][part].answers[0])}`} />
                                                    {#if currentSection[section][subsection][part].is_correct}
                                                        <Indicator class="bg-green-500" />
                                                    {:else}
                                                        <Indicator class="bg-red-500" />
                                                    {/if}
                                                {/if}
                                                </div>
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {currentSection[section][subsection][part].score.toFixed(4)}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {currentSection[section][subsection][part].time.toFixed(4)}
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        {/each}
                                    </TableBody>
                                </Table>
                            </TabItem>
                            {/if}
                        {/each}
                        
                      </Tabs>
                </TabItem>
                {:else}
                <TabItem activeClasses='p-4 text-black font-bold bg-purple-300 rounded-t-lg' inactiveClasses='p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'>
                    <span slot ="title"> Section {index + 1}</span>
                    <Tabs style="full" defaultClass="flex rounded-lg divide-x rtl:divide-x-reverse divide-gray-200 shadow dark:divide-gray-700">
                        {#each Object.keys(currentSection[section]) as subsection, index}
                            {#if index === 0}
                                <TabItem class="w-full" open>
                                    <span slot="title">Subsection {index + 1}</span>
                                    <Table>
                                        <TableHead class="bg-sky-400">
                                            <TableHeadCell>
                                                Parte
                                            </TableHeadCell>
                                            <TableHeadCell>
                                                Respuestas
                                            </TableHeadCell>
                                            <TableHeadCell>
                                                Puntaje
                                            </TableHeadCell>
                                            <TableHeadCell>
                                                Tiempo
                                            </TableHeadCell>
                                        </TableHead>
                                        <TableBody>
                                            {#each Object.keys(currentSection[section][subsection]) as part, index}
                                            <TableBodyRow>
                                                <TableBodyCell>
                                                    {part}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {#each currentSection[section][subsection][part].answers as answer, index}
                                                        <MathML tex={String.raw`${toLatex(answer)}`} />
                                                    {/each}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {currentSection[section][subsection][part].score}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {currentSection[section][subsection][part].time.toFixed(4)}
                                                </TableBodyCell>
                                            </TableBodyRow>
                                            {/each}
                                        </TableBody>
                                    </Table>
                                </TabItem>
                            {:else}
                            <TabItem class="w-full">
                                <span slot="title">Subsection {index + 1}</span>
                                <Table>
                                    <TableHead class="bg-sky-400">
                                        <TableHeadCell>
                                            Parte
                                        </TableHeadCell>
                                        <TableHeadCell>
                                            Respuestas
                                        </TableHeadCell>
                                        <TableHeadCell>
                                            Puntaje
                                        </TableHeadCell>
                                        <TableHeadCell>
                                            Tiempo
                                        </TableHeadCell>
                                    </TableHead>
                                    <TableBody>
                                        {#each Object.keys(currentSection[section][subsection]) as part, index}
                                        <TableBodyRow>
                                            <TableBodyCell>
                                                {part}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {#each currentSection[section][subsection][part].answers as answer, index}
                                                    <MathML tex={String.raw`${toLatex(answer)}`} />
                                                {/each}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {currentSection[section][subsection][part].score.toFixed(4)}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {currentSection[section][subsection][part].time.toFixed(4)}
                                            </TableBodyCell>
                                        </TableBodyRow>
                                        {/each}
                                    </TableBody>
                                </Table>
                            </TabItem>
                            {/if}
                        {/each}
                        
                      </Tabs>
                </TabItem>
                {/if}
            {/each}
        </Tabs>
    </div>
                                        
</Modal>

<style>
    .data-container{
        width: 100%;
    }

    .value-holder{
        width: 99%;
        padding: 0.5rem;
        border-radius: 0.5rem;
        background-color: #bbcef4;
        text-align: center;
        color: #000;
    }
</style>


