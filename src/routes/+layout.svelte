<script lang="ts">
	import '../app.pcss';
	import { authtest } from '$lib/firebase/firebase';
	import { authStore, checkUserGroup, checkUserRole } from '../stores/auth';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	onMount(() => {
		const unsubscribe = authtest.onAuthStateChanged( async (user) => {
			if (user) {

				const role = await checkUserRole(user.uid);
				let group_id: string = '';

				if (role === 'student'){
					group_id = await checkUserGroup(user.uid) ?? '';
				}

				authStore.update((currentUser) => {
					return {
						...currentUser,
						isLogged: true,
						uid: user.uid,
						email: user.email,
						role: role,
						group_id: group_id !== '' ? group_id : null
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
