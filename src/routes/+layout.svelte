<script lang="ts">
	import '../app.pcss';
	import { authtest } from '$lib/firebase/firebase';
	import { authStore, checkUserInfo, checkUserRole, registerStudent, registerProfessor, checkProfessorInfo } from '../stores/auth';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const studentRegex = /^a\d{8}@tec\.mx$/;
    const professorRegex = /^[\w.-]+@tec\.mx$/;

	let isRegistering = false;

	onMount(() => {
		const unsubscribe = authtest.onAuthStateChanged( async (user) => {
			if (user) {
				const role = await checkUserRole(user.uid);

				if(role === null && user.providerData[0].providerId === 'google.com' && !isRegistering){
					isRegistering = true;
					if(studentRegex.test(user.email!)){
						const displayName = user.displayName ? user.displayName.split(' ') : ['',''];
						const name = displayName[0];
						const last_name = displayName.slice(1).join(' ');

						await registerStudent(
							user.uid,
							user.email!,
							name,
							last_name
						)

						authStore.update((currentUser) => {
							return {
								...currentUser,
								isLogged: true,
								uid: user.uid,
								email: user.email,
								role: 'student',
								group_id: null
							}
						});

						return;
						
					} else if(professorRegex.test(user.email!)){
						const displayName = user.displayName ? user.displayName.split(' ') : ['',''];
						const name = displayName[0];
						const last_name = displayName.slice(1).join(' ');

						await registerProfessor(
							user.uid,
							user.email!,
							name,
							last_name
						)

						authStore.update((currentUser) => {
							return {
								...currentUser,
								isLogged: true,
								uid: user.uid,
								email: user.email,
								role: 'professor',
							}
						});

						return;
					} else {
						console.log('User is not a student or professor');
					}
				} else {
					let group_id: string = '';
					let data: any = {};
					let validated: boolean = false;
					let status: string = '';

					if (role === 'student'){
						data = await checkUserInfo(user.uid) ?? '';
						group_id = data.group;
						validated = data.validated;
						status = data.status;
					}

					if(role === 'professor'){
						data = await checkProfessorInfo(user.uid) ?? '';
						status = data.status;
					}

					authStore.update((currentUser) => {
						return {
							...currentUser,
							isLogged: true,
							uid: user.uid,
							email: user.email,
							role: role,
							group_id: group_id !== '' ? group_id : null,
							validated: validated !== null ? validated : null,
							status: status !== '' ? status : null
						}
					});
				}


				
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
