<script lang="ts">
    import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    import { GridPlusSolid } from 'flowbite-svelte-icons';
    import { page } from '$app/stores';
    import { Students } from '../../../stores/adminData'
	import type { Student } from "../../../types";
    

    $: activeUrl = $page.url.pathname;
    let studentId = $page.params.studentId;
    $: studentId = $page.params.studentId;

    let student: Student | undefined = undefined;

    $: {
        if (studentId !== undefined || studentId !== null) {
            student = $Students.find(student => student.uuid === studentId);
        }
    }
</script>


<div class="main-container">
    <div class="bread-crumb-container">
        <Breadcrumb aria-label="Solid background breadcrumb example" class="bg-gray-50 py-3 px-5 dark:bg-gray-900">
            <BreadcrumbItem href="/admin/statistics" home>
              <svelte:fragment slot="icon">
                <GridPlusSolid class="w-4 h-4 me-2" />
              </svelte:fragment>Estadísticas
            </BreadcrumbItem>
            {#if student && activeUrl !== '/admin/statistics' && activeUrl !== '/admin/statistics/'   }
            <BreadcrumbItem>
                {student.name + ' ' + student.lastName}
            </BreadcrumbItem>
            {/if}
        </Breadcrumb>
    </div>
    <div class="main-content">
        <slot/>
    </div>
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .bread-crumb-container {
        height: 3%;
    }

    .main-content {
        display: flex;
        flex-direction: column;
        height: 97%;
    }
</style>