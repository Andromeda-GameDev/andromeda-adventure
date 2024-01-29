<script lang="ts">
    import { page } from '$app/stores';
    import { Students } from '../../../../../stores/professorData'
    import type { Student } from "../../../../../types";
    import StudentFirstLevelTable from '../../../../../components/StudentFirstLevelTable.svelte';

    let { studentId, levelId } = $page.params;
    let student: Student | undefined = undefined;
    let level: string | undefined = undefined;

    $: {
        if (studentId !== undefined || studentId !== null) {
            student = $Students.find(student => student.uuid === studentId);
        }

        if (levelId !== undefined || levelId !== null) {
            level = levelId;
        }
    }

</script>

<div class="table-container">
    <StudentFirstLevelTable student={student} isStudent={false} />    
</div>

<style>
    .table-container {
        height: 100%;
        padding-top: 2rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }
</style>