<script lang="ts">
	import '../app.pcss';
	import { onMount } from 'svelte';
	import { auth } from '$lib/client/firebase';
	import { authStore } from '../stores/auth';
	import { browser } from '$app/environment';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				authStore.update((currentUser) => {
					return {
						...currentUser,
						isLogged: true,
						uid: user.uid,
						email: user.email,
						role: currentUser.role,
						name: user.displayName,
					}
				});
			} else {
				console.log('User is not logged in');
			}

			if(browser){
				if(!$authStore.isLogged && window.location.pathname !== '/'){
					window.location.href = '/';
				} 
			}
		});

		return () => {
			unsubscribe();
		}
	});


</script>

<slot />

<!-- <style>
	:global(body, html) {
		margin: 0;
		padding: 0;
        font-family: 'Roboto', sans-serif;
	}
</style> -->
