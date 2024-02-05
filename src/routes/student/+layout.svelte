<script lang="ts"> 
    import { onMount } from "svelte";
    import { authStore, authHandlers } from "../../stores/auth";
    import { browser } from "$app/environment";
    import { Sidebar, SidebarItem, Button, SidebarWrapper, SidebarGroup } from "flowbite-svelte";
    import { GridSolid, UsersSolid, ChartLineUpSolid, WandMagicSparklesOutline, UserSettingsSolid } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';
	import { page } from "$app/stores";
    import { FetchedData } from "../../stores/studentData";

    export let data;
    let mediaPromise = data.media;

    onMount( async () => {
        const [media] = await Promise.all([mediaPromise]);


        if(media) {
            FetchedData.set(media);
        }
    });

    $ : {
        if($authStore) {
            if($authStore.role){
                if($authStore.role !== 'student' || $authStore.role === null) {
                    if(browser) {
                        goto('/');
                    }
                }
            }
        }
    }

    $ : {
        if($authStore) {
            if($authStore.role){
                if($authStore.role !== 'student' || $authStore.role === null) {
                    if(browser) {
                        goto('/');
                    }
                }
            }
        }
    }

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
    let activeClass = 'flex items-center p-2 text-base font-normal bg-sky-200 dark:bg-sky-700 rounded-lg dark:text-white hover:bg-sky-100 dark:hover:bg-gray-700 border-r-4 border-sky-500';
    let nonActiveClass = 'flex items-center p-2 text-base font-normal text-black-900 rounded-lg dark:text-white hover:bg-sky-100 dark:hover:bg-green-700';
    
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
                            <SidebarItem label="Inicio" href="/student">
                                <svelte:fragment slot="icon">
                                    <GridSolid/>
                                </svelte:fragment>
                            </SidebarItem>
                            <SidebarItem label="Estadísticas" href="/student/statistics">
                                <svelte:fragment slot="icon">
                                    <ChartLineUpSolid/>
                                </svelte:fragment>
                            </SidebarItem>
                            <SidebarItem label="Ajustes" href="/student/settings">
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
        color: #298be2;
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



