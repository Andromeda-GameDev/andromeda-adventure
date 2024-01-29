<script lang="ts">
    import DashboardCard from "../../components/DashboardCard.svelte";
    import DownloadManualsCard from "../../components/DownloadManualsCard.svelte";
    import { authStore } from "../../stores/auth";
    import { Spinner } from "flowbite-svelte";
    
    let name = ''

    $: name = $authStore.name ?? $authStore.email ?? '';
      
</script>


{#if $authStore.email || $authStore.name}
    <div class="container">
        <div class="greeting">
            <h1>Bienvenid@, </h1> 
            {#if name !== ''}
                <p>{name}</p>
            {:else}
                <p>Usuario</p>
            {/if}
        </div>
        <!-- {#await [groupsPromise, studentsPromise]}
            <div class="skeleton-container">
                <Spinner size="14" color="purple"/>
            </div>
        {:then} -->
        <div class="card-container">
            <DashboardCard
                title="Grupos"
                label="users"
                description="Administra tus grupos"
            />
            <DashboardCard
                title="Estadisticas"
                label="chart"
                description="Conoce los datos de tus grupos"
            />

            <DashboardCard
                title="Solvers"
                label="wand"
                description="Encuentra las herramientas para resolver los ejercicios"
            />

            <DashboardCard
                title="Ajustes"
                label="settings"
                description="Configura tu perfil"
            />
        </div>
        <div class="download-manuals">
            <DownloadManualsCard />
        </div>
    </div>
{:else}
    <div class="skeleton-container">
        <Spinner size="14" color="purple"/>
    </div>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    .greeting {
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 3rem;
        height: 10%;
        padding-bottom: 1rem;
        padding-top: 1rem;
    }

    .greeting h1 {
        font-size: 1.5rem;
        font-weight: 100;
        color: black;
    }

    .greeting p {
        font-size: 1.5rem;
        font-weight: 800;
        color: #9630df;
        padding-left: 0.5rem;
    }

    .card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0;
        flex-wrap: wrap;
        gap: 1.2rem;
    }

    .download-manuals {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0;
        flex-wrap: wrap;
        padding-top: 1.5rem;
        width: 100%;
        padding-bottom: 1.5rem;
    }

    .skeleton-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
        width: 100%;
        padding-left: 3rem;
        padding-right: 3rem;
        padding-bottom: 3rem;
        padding-top: 3rem;
    }

</style>