<script>
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	/**
	 * @type {{ displayName: any; id: any; photos: any }}
	 */
	let userData;
	onMount(() => {
		// Extract user data from the query parameter
		fetch('https://steamapi.nikpatil.com/profile', {
			method: 'GET',
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(JSON.parse(data.user));
				if (data.user) {
					if (data.code == 200) {
						userData = JSON.parse(data.user.profile);
					} else {
						console.error('User data not found in the query parameter');
					}
				} else {
					// User is not authenticated, redirect to login or show a message
					goto('/');
				}
			});
		// const queryParams = new URLSearchParams(location.search);
		// let userData = queryParams.get('user');
		// console.log(userData);
	});
</script>

<div>
	<h1>User Profile</h1>
	{#if userData}
		<p><strong>Display Name:</strong> {userData.displayName}</p>
		<p><strong>SteamID:</strong> {userData.id}</p>
	{/if}
</div>
