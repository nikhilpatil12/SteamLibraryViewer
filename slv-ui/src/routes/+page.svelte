<script>
	import { goto } from '$app/navigation';
	import { Button, Card, P, Heading, Input, Label, Helper, Hr } from 'flowbite-svelte';
	import { onMount, setContext } from 'svelte';
	let userId = '';
	const loginToSteam = () => {
		// Redirect to the Steam login route on the Express server
		window.location.href = 'https://steamapi.nikpatil.com/auth/steam';
	};
	const getGamesWithoutLogin = () => {
		console.log('REDIR');
		console.log(userId);
		window.location.href = `/gameList/${userId}`;
	};
	let isUserLoggedIn = false;
	let userDetails = {};
	let code;
	onMount(() => {
		fetch('https://steamapi.nikpatil.com/profile', {
			method: 'GET',
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				code = data.code;
				isUserLoggedIn = code != 401;
				userDetails = JSON.stringify(data.user);
			});
	});
</script>

<body>
	{#if isUserLoggedIn}
		<Card class="p-8 rounded-lg shadow-md w-96">
			<Heading tag="h1" class="mb-4">Steam Library Stats Tool</Heading>

			<P size="sm" weight="light">
				Welcome to our Steam Library Stats Tool. Enter a SteamID or URL below to get detailed stats
				for a Steam user's profile.
			</P>
			<Hr />
			<form on:submit={getGamesWithoutLogin} method="GET" class="mb-4">
				<div class="mb-4">
					<Label for="userId" class="mb-2">SteamID or Profile URL</Label>
					<Input
						type="text"
						bind:value={userId}
						name="userId"
						class="w-full px-3 py-2 border rounded-md"
						placeholder="Enter SteamID or Profile URL"
					/>
				</div>
				<Button type="submit">Get Stats</Button>
			</form>

			<div class="text-gray-600">
				<P size="sm" weight="thin">
					Once you've entered the information, we'll retrieve the user's profile stats and display
					them here.
				</P>
			</div>
			<Hr />
			<div class="text-gray-600">
				<P size="sm" weight="thin">
					You can sign in instead to see your own library<br />
				</P>
				<button on:click={loginToSteam}>
					<img
						src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png"
						alt="Login with Steam"
					/>
				</button>
			</div>
		</Card>
	{:else}
		<div>
			<p class="text-lg dark:text-white">Welcome, {userDetails}</p>
		</div>
	{/if}
</body>
