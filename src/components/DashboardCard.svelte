<script lang="ts">
    import { Card } from 'flowbite-svelte';
    import { goto } from '$app/navigation'; 
    import { GridSolid, UsersGroupOutline, ChartLineUpSolid, WandMagicSparklesOutline, UserSettingsSolid } from 'flowbite-svelte-icons';

    export let title = 'Card title';
    export let label = 'Card label';
    export let description = 'Card description';
    
    const icon: { [key: string]: any} = {
        "grid": GridSolid,
        "users": UsersGroupOutline,
        "chart": ChartLineUpSolid,
        "wand": WandMagicSparklesOutline,
        "settings": UserSettingsSolid,
    }

    let chosenIcon: any = icon[label];

    function handleCardClick() {
        if(label === 'users') {
            goto('/professor/groups');
        } else if(label === 'chart') {
            goto('/professor/statistics');
        } else if(label === 'wand') {
            goto('/professor/solvers');
        } else if(label === 'settings') {
            goto('/professor/settings');
        }
    }


</script>


<Card on:click={handleCardClick} class="hover:bg-purple-200 cursor-pointer">
    <div class="card-content">
        <div class="class-header">
            <h5 class="card-title">{title}</h5>
            <svelte:component this={chosenIcon}/>
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