<script>
    import { Popover } from 'flowbite-svelte';
    import { CheckOutline, CloseOutline } from 'flowbite-svelte-icons';
    import { createEventDispatcher } from 'svelte';

    export let password = '';
    const dispatch = createEventDispatcher();

    $: lengthRequirement = password.length >= 8;
    $: upperLowerRequirement = /[a-z]/.test(password) && /[A-Z]/.test(password);
    $: symbolRequirement = /[#$&!-.?]/.test(password);
    $: numberRequirement = /[0-9]/.test(password);

    $: passwordIsValid = lengthRequirement && upperLowerRequirement && symbolRequirement && numberRequirement;
    $: progress = ((Number(lengthRequirement) + Number(upperLowerRequirement) + Number(symbolRequirement) + Number(numberRequirement)) / 4) * 100;
    $: dispatch('passwordValid', passwordIsValid);
</script>

<Popover class="text-sm" triggeredBy="#password" placement="bottom" style="z-index: 1000;">
        <h3 class="font-semibold text-gray-900 dark:text-white">Debe de tener al menos 8 caracteres</h3>
        <div class="grid grid-cols-4 gap-2">
            <div class={progress >= 25 ? 'h-1 bg-orange-300 dark:bg-orange-400' : 'h-1 bg-gray-200 dark:bg-gray-600'} />
            <div class={progress >= 50 ? 'h-1 bg-orange-300 dark:bg-orange-400' : 'h-1 bg-gray-200 dark:bg-gray-600'} />
            <div class={progress >= 75 ? 'h-1 bg-orange-300 dark:bg-orange-400' : 'h-1 bg-gray-200 dark:bg-gray-600'} />
            <div class={progress == 100 ? 'h-1 bg-orange-300 dark:bg-orange-400' : 'h-1 bg-gray-200 dark:bg-gray-600'} />
        </div>
        <p class="py-2">Asegurate de agregar:</p>
        <ul>
            <li class="flex items-center mb-1">
                {#if upperLowerRequirement}
                    <CheckOutline class="me-2 w-4 h-4 text-green-400 dark:text-green-500" />
                {:else}
                    <CloseOutline class="me-2 w-4 h-4 text-gray-300 dark:text-gray-400" />
                {/if}
                Mayúsculas &amp; minúsculas
            </li>
            <li class="flex items-center mb-1">
                {#if symbolRequirement}
                    <CheckOutline class="me-2 w-4 h-4 text-green-400 dark:text-green-500" />
                {:else}
                    <CloseOutline class="me-2 w-4 h-4 text-gray-300 dark:text-gray-400" />
                {/if}
                Un caracter especial (#$&amp;!-.?)
            </li>
            <li class="flex items-center">
                {#if numberRequirement}
                    <CheckOutline class="me-2 w-4 h-4 text-green-400 dark:text-green-500" />
                {:else}
                    <CloseOutline class="me-2 w-4 h-4 text-gray-300 dark:text-gray-400" />
                {/if}
                Un número
            </li>
        </ul>
</Popover>