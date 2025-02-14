<script>
	import { dev } from '$app/environment';
	import { Card, Button, P, Heading, Input, Label, Hr } from 'flowbite-svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	let userId = '';
	let isSteamIdValid = false;
	const checkValidSteamID = () => {
		if (userId != '') {
			isSteamIdValid = true;
		} else {
			isSteamIdValid = false;
		}
	};
	const loginToSteam = () => {
		// Redirect to the Steam login route on the Express server
		window.location.href = !dev
			? 'https://steamapi.nikpatil.com/auth/steam'
			: 'http://localhost:3000/auth/steam';
	};

	const getGamesWithoutLogin = () => {
		checkValidSteamID();
		if (isSteamIdValid) window.location.href = `/gameList/${userId}`;
		else
			toast.push('Please enter a valid Steam ID!', {
				theme: {
					'--toastBackground': '#fc5e03',
					'--toastBarBackground': '#fff'
				}
			});
	};
	let isUserLoggedIn = false;
	/**
	 * @type {{ displayName: any; id: any; photos: any, _json:any }}
	 */
	let userDetails;
	onMount(() => {
		fetch(!dev ? 'https://steamapi.nikpatil.com/profile' : 'http://localhost:3000/profile', {
			method: 'GET',
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.code == 200) {
					isUserLoggedIn = true;
					userDetails = JSON.parse(data.user.profile);
				}
			});
	});
</script>

<section>
	<Card class="p-8 rounded-lg shadow-md w-96">
		<Heading tag="h1" class="mb-4">Steam Library Viewer</Heading>

		<P size="sm" weight="light">
			Welcome to the Steam Library Viewer. Enter a SteamID below to get detailed stats for a Steam
			user's profile.
		</P>
		<div class="text-xs text-red-500">
			Note: Your Steam library must be public in order to browse it here.
		</div>
		<Hr />
		<form on:submit={getGamesWithoutLogin} method="GET" class="mb-4">
			<div class="mb-4">
				<Label for="userId" class="mb-2">SteamID</Label>
				<Input
					type="text"
					bind:value={userId}
					name="userId"
					class="w-full px-3 py-2 border rounded-md"
					placeholder="Enter SteamID"
				/>
			</div>
			<Button shadow class="primary-200 hover:scale-95 duration-300" type="submit">Get Stats</Button
			>
		</form>

		<div class="text-gray-600">
			<P size="sm" weight="thin">
				Once you've entered the information, we'll retrieve the user's profile stats and display
				them here.
			</P>
		</div>
		<Hr />
		{#if !isUserLoggedIn}
			<div class="text-gray-600">
				<P size="sm" weight="thin">You can sign in instead to see your library</P>
				<Button class="p-0 hover:scale-95 duration-300" shadow on:click={loginToSteam}>
					<img
						src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png"
						alt="Login with Steam"
					/>
				</Button>
			</div>
		{:else}
			<div class="text-gray-600">
				<P size="sm" weight="thin">You are already logged in to your steam account</P>
				<Button class="hover:scale-95 duration-300" shadow href="/profile">Go to Profile</Button>
				<Button
					color="blue"
					class="hover:scale-95 duration-300"
					shadow
					href="/gameList/{userDetails.id}">View Steam Library</Button
				>
			</div>
		{/if}
	</Card>
</section>
