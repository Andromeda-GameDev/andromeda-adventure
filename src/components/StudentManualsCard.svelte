<script lang="ts">
    import { Button, A } from 'flowbite-svelte';
    import { AppleSolid, ArrowDownSolid, ArrowDownToBracketOutline } from 'flowbite-svelte-icons';
    import { FetchedData } from '../stores/studentData';
    import type { Media } from '../types'

    let media: Media = {
        levelSolvers: [],
        galactic_marker: '',
        global_tolerance: 0,
        downloads: [],
    }

    $: {
        if(FetchedData){
            media = $FetchedData;
        }
    }

    async function downloadImage(){
        try{
            const marker = media.galactic_marker;
            const res = await fetch(marker);
            if(!res.ok){
                throw new Error('No se pudo descargar la imagen');
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'marcador-galactico.png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.log(error);
        }
    }

    function apkLink(){
        if(media && media.downloads && media.downloads.length > 0 && media.downloads[0].url){
            return media.downloads[0].url;
        } else {
            return '';
        }
    }

    function guideLinks(platform: string){
        if(media){
            if(media.downloads != null && media.downloads.length > 0){
                const guide = media.downloads.find((download) => download.platform == platform);
                if(guide){
                    return guide.guide;
                }
            }
        }
        return '';
    }

</script>


<div class="card-content">
    <div class="class-header">
        <h5 class="card-title">Instalación</h5>
        <Button class="hover:bg-blue-100 text-blue-500 font-bold px-3 bg-opacity-0"
            target="_blank"
            on:click={() =>
                downloadImage()
            }
        >
            Marcador Galáctico
            <svelte:component this={ArrowDownSolid} class="ml-5" size="md"/>
        </Button>
    </div>
    <div class="card-body">
        <div class="apple-side">
            <svelte:component this={AppleSolid} class="h-12 w-12"/>
            <p class="system-name">Apple</p>
            <A href="https://drive.google.com/file/d/1OscZynpgVtbr_7WZWQvL30VLDwt1vVLp/view" class="text-blue-600 hover:text-blue-400 mt-6" target="_blank">Guia de instalación</A>
            <Button class="bg-blue-600 hover:bg-blue-400 text-white font-bold px-3 mt-10" disabled target="_blank">
                Descargar
                <svelte:component this={ArrowDownToBracketOutline} class="ml-5" size="md"/>
            </Button>
        </div>
        <div class="android-side">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48">
                <path fill="#30dc80" d="M24,14.088C11.427,14.088,1.108,23.716,0,36h48C46.892,23.716,36.573,14.088,24,14.088z M33.179,27.079c0-1.104,0.895-1.999,1.999-1.999c1.104,0,1.999,0.895,1.999,1.999c0,1.104-0.895,1.999-1.999,1.999	C34.074,29.078,33.179,28.183,33.179,27.079z M12.822,29.078c-1.104,0-1.999-0.895-1.999-1.999c0-1.104,0.895-1.999,1.999-1.999	s1.999,0.895,1.999,1.999C14.821,28.183,13.926,29.078,12.822,29.078z"></path><path fill="#30dc80" d="M34.038,19.313c-0.14,0-0.281-0.035-0.41-0.11c-0.393-0.227-0.527-0.729-0.301-1.122l5.197-9.008	c0.227-0.394,0.729-0.529,1.122-0.301c0.393,0.227,0.527,0.729,0.301,1.122l-5.197,9.008C34.598,19.166,34.322,19.313,34.038,19.313	z"></path><path fill="#30dc80" d="M13.962,19.313c-0.284,0-0.56-0.148-0.712-0.411L8.054,9.894C7.827,9.501,7.962,8.999,8.354,8.772	c0.392-0.228,0.895-0.093,1.122,0.301l5.197,9.008c0.227,0.394,0.092,0.896-0.301,1.122C14.243,19.278,14.102,19.313,13.962,19.313z"></path>
            </svg>
            <p class="system-name">Android</p>
            <A href="https://drive.google.com/file/d/1txEf6nDp-5t8CbooajdORomQUtMxeaKK/view" class="text-blue-600 hover:text-blue-400 mt-6" target="_blank">Guia de instalación</A>
            <Button class="bg-blue-600 hover:bg-blue-400 text-white font-bold px-3 mt-10" target="_blank"
                href="https://drive.google.com/file/d/18TP2vH3yF_AGe-dQ3FKT4pxIxYZKvjGR/view?usp=drive_link"
            >
                Descargar
                <svelte:component this={ArrowDownToBracketOutline} class="ml-5" size="md"/>
            </Button>
        </div>
    </div>  
</div>

<style>

    .card-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: auto;
        width: 100%;
        background-color: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
        margin: 1rem;
    }

    .class-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .card-title {
        font-size: 1.2rem;
        font-weight: 800;
        color: black;
    }

    .card-body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;
        padding-bottom: 3rem;
        padding-top: 1.5rem;
    }

    .apple-side {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 50%;
        height: 100%;
    }

    .android-side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
    }
   
    .system-name {
        font-size: 1.2rem;
        font-weight: 400;
        color: black;
        padding-top: 2rem;
    }

</style>