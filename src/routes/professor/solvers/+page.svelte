<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableHeadCell, TableHead, TableBodyRow, Button } from 'flowbite-svelte';
    import { FetchedData } from '../../../stores/professorData';
    import type { Solver } from '../../../types';
    
    let links: Solver[] = [];

    $ : {
        if($FetchedData) {
            links = $FetchedData.levelSolvers;
        }
    }


</script>


<div class="solvers-container">
    <Table hoverable shadow>
        <TableHead class="bg-sky-300">
            <TableHeadCell>Id</TableHeadCell>
            <TableHeadCell>Nivel</TableHeadCell>
            <TableHeadCell>URL</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each links as link, index}
                <TableBodyRow>
                    <TableBodyCell>{index + 1}</TableBodyCell>
                    <TableBodyCell>{link.level_id}</TableBodyCell>
                    <TableBodyCell>
                        <Button href={link.url} pill color="blue" target="_blank">Ver</Button>
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>


<style>
    .solvers-container {
        margin: 0 auto;
        margin-top: 20px;
        width: 80%;
    }
</style>


