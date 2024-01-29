<script lang="ts"> 
    import { onMount } from "svelte";
    import { authStore, authHandlers } from "../../stores/auth";
    import { browser } from "$app/environment";
    import { Sidebar, SidebarItem, Button, SidebarWrapper, SidebarGroup } from "flowbite-svelte";
    import { GridSolid, UsersSolid, ChartLineUpSolid, WandMagicSparklesOutline, UserSettingsSolid } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';
	import { page } from "$app/stores";
    import { Groups, Students, FetchedData } from "../../stores/professorData";
    import type { Student } from "../../types";

    export let data;
    let groupsPromise = data.groups;
    let studentsPromise = data.students;
    let mediaPromise = data.media;

    onMount( async () => {
        const [groups, students, media] = await Promise.all([groupsPromise, studentsPromise, mediaPromise]);
        if(groups) {
            Groups.set(Object.values(groups));
        }

        if(students) {
            Students.set(Object.values(students).filter(student => student !== null) as Student[]);
        }

        if(media) {
            FetchedData.set(media);
        }
        // check for role
        // if($authStore.role) {
        //     if($authStore.role !== 'professor') {
        //         authHandlers.logout();
        //         goto('/');
        //     }
        // }
    });

    let currentDate: string;

    $: {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        let dateStr = new Date().toLocaleDateString('es-ES', options);
        currentDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }

    function handleLogout() {
        authHandlers.logout();
        goto('/');
    }

    $: activeUrl = $page.url.pathname;
    let activeClass = 'flex items-center p-2 text-base font-normal bg-purple-200 dark:bg-purple-700 rounded-lg dark:text-white hover:bg-purple-100 dark:hover:bg-gray-700 border-r-4 border-purple-500';
    let nonActiveClass = 'flex items-center p-2 text-base font-normal text-black-900 rounded-lg dark:text-white hover:bg-purple-100 dark:hover:bg-green-700';
    
</script>


<div class="main-container">
    <div class="sidebar">
        <div class="sidebar-content">
            <div class="sidebar-header-content">
                <img src="/planet_andromeda_logo.png" alt="Logo" style="width: 50px; height: auto; margin-right: 1rem;"/>
                <p>Andromeda</p>
            </div>
            <div class="sidebar-container">
                <Sidebar {activeUrl} {activeClass} {nonActiveClass} class="w-full">
                    <SidebarWrapper class="bg-white">
                        <SidebarGroup class="bg-white space-y-3">
                            <SidebarItem label="Inicio" href="/professor">
                                <svelte:fragment slot="icon">
                                    <GridSolid/>
                                </svelte:fragment>
                            </SidebarItem>
                            <SidebarItem label="Grupos" href="/professor/groups">
                                <svelte:fragment slot="icon">
                                    <UsersSolid/>
                                </svelte:fragment>
                            </SidebarItem>
                            <SidebarItem label="Estadísticas" href="/professor/statistics">
                                <svelte:fragment slot="icon">
                                    <ChartLineUpSolid/>
                                </svelte:fragment>
                            </SidebarItem>
                            <SidebarItem label="Solvers" href="/professor/solvers">
                                <svelte:fragment slot="icon">
                                    <WandMagicSparklesOutline/>
                                </svelte:fragment>
                            </SidebarItem>
                            <SidebarItem label="Ajustes" href="/professor/settings">
                                <svelte:fragment slot="icon">
                                    <UserSettingsSolid/>
                                </svelte:fragment>
                            </SidebarItem>
                        </SidebarGroup>
                    </SidebarWrapper>
                </Sidebar>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="header">
            {currentDate}
            <Button on:click={handleLogout} color="primary" outline={true} style="margin-left: auto;" size="xs" class="text-sm">Cerrar sesión</Button>
        </div>
        <div class="main-content">
            <div class="page">
                <slot/>
            </div>
        </div>
    </div>
</div>

<style>
    :global(body, html) {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }

    .main-container {
        display: flex;
        flex-direction: row;
        height: 100vh;
        background-color: #f5f5f5;
    }

    .sidebar {
        width: 15%;
        height: 100%;
        background-color: white;
    }

    .sidebar-content {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: white;
    }

    .sidebar-header-content {
        height: 7%;
        background-color: white;
        justify-content: center;
        align-items: center;
        display: flex;
        font-size: 1.2rem;
        padding-left: 1rem;
        padding-right: 1rem;
        color: #9630df;
        font-weight: 800;
        width: 100%;
    }

    .sidebar-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .header {
        height: 7%;
        background-color: white;
        justify-content: left;
        align-items: center;
        display: flex;
        font-size: 1rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }

    .main-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
    }

    .page {
        width: 100%;
        height: 100%;
    }
    
</style>



