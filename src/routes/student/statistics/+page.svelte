<script lang="ts">
    import { authStore } from '../../../stores/auth';
    import { Select } from 'flowbite-svelte'
    import { retrieveStudentProgressById } from '../../../api/Student/homepage';
    import StudentFirstLevelTable from '../../../components/StudentFirstLevelTable.svelte';
    import StudentSecondLevelTable from '../../../components/StudentSecondLevelTable.svelte';
    import type { Student } from '../../../types';

    let currentUserUid = $authStore.uid;

    $: {
        if ($authStore.uid) {
            currentUserUid = $authStore.uid;
        }
    }

    let selectedLevel = "1";

    let studentProgress: Record<string, any> = {};
    let currentStudent: Student = {
        name: '',
        lastName: '',
        email: '',
        group_id: '',
        progress: studentProgress,
    };

    async function getStudentProgress(uid: string) {
        try {
            const studentProgressData = await retrieveStudentProgressById(uid);
            currentStudent.progress = studentProgressData;
        } catch (error) {
            console.log(error);
        }
    }

    $: {
        if (currentUserUid) {
            getStudentProgress(currentUserUid);
        }
    }

</script>   


<div class="stats-container">
    <div class="stats-container-header">
        <h1>Estadísticas</h1>
        <div class="level-selector">
            <Select id="levelSelect" name="levelSelect" placeholder="Niveles" bind:value={selectedLevel}>
                <option selected value="1"> Nivel 1</option>
                <option value="2"> Nivel 2</option>
            </Select>
        </div>
    </div>
    <div class="table-container">
        {#if selectedLevel === "1"}
            {#if currentStudent.progress.level_1}
                <StudentFirstLevelTable student={currentStudent} isStudent={true} />
            {:else}
                <p> No hay datos para mostrar</p>
            {/if}
        {:else if selectedLevel === "2"}
            {#if currentStudent.progress.level_2}
                <StudentSecondLevelTable student={currentStudent} isStudent={true} />
            {:else}
                <p> No hay datos para mostrar</p>
            {/if}
        {:else}
            <p> No hay datos para mostrar</p>
        {/if}
    </div>
</div>


<style>
    .stats-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        width: 100%;
        height: 100%;
        padding: 1rem;
    }

    .stats-container-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 1rem;
    }

    .stats-container-header h1 {
        font-size: 1.2rem;
        font-weight: 800;
    }

    .level-selector {
        width: 20%;
    }

    .table-container {
        width: 100%;
        padding: 1rem;
    }
</style>