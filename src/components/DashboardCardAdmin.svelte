<script lang="ts">
    import { Card } from 'flowbite-svelte';
    import { goto } from '$app/navigation'; 
    import { GridSolid, UsersSolid, UsersGroupOutline, ChartLineUpSolid, WandMagicSparklesOutline, UserSettingsSolid } from 'flowbite-svelte-icons';

    export let title = 'Card title';
    export let label = 'Card label';
    export let description = 'Card description';
    
    const icon: { [key: string]: any} = {
        "students": 
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
            <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
            <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
            </svg>`,
        "professors": UsersGroupOutline,
        "groups": 
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clip-rule="evenodd" />
            </svg>`,
        "stats": ChartLineUpSolid,
        "settings": UserSettingsSolid,
    }

    let chosenIcon: any = icon[label];

    function handleCardClick() {
        if(label === 'students') {
            goto('/admin/students');
        } else if(label === 'professors') {
            goto('/admin/professors');
        } else if(label === 'groups') {
            goto('/admin/groups');
        } else if (label === 'stats'){
            goto('/admin/statistics');
        } else if(label === 'settings') {
            goto('/admin/settings');
        }
    }


</script>


<Card on:click={handleCardClick} class="hover:bg-green-200 cursor-pointer">
    <div class="card-content">
        <div class="class-header">
            <h5 class="card-title">{title}</h5>
            {#if label === 'students' || label === 'groups'}
                {@html chosenIcon}
            {:else}
                <svelte:component this={chosenIcon}/>
            {/if}
        </div>
        <div class="card-body">
            <p>{description}</p>
        </div>
    </div>
</Card>

<style>

    .card-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: left;
        overflow: auto;
        width: 200px;
        height: 120px;
    }

    .class-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 1rem;
    }

    .card-title {
        font-size: 1.2rem;
        font-weight: 800;
        color: black;
    }

    .card-body {
        display: flex;
        justify-content: flex-start;
        align-items: top;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;
    }

</style>