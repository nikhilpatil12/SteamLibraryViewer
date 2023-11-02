<script>
	import { browser, dev, building, version } from '$app/environment';
	import { slide } from 'svelte/transition';
	import clipboardCopy from 'clipboard-copy';
	import { toast } from '@zerodevx/svelte-toast';
	import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
	import {
		Card,
		Dropdown,
		DropdownItem,
		Avatar,
		Button,
		P,
		Heading,
		Input,
		Label,
		Helper,
		Hr
	} from 'flowbite-svelte';
	import { onMount, setContext } from 'svelte';
	let userId = '';
	const loginToSteam = () => {
		// Redirect to the Steam login route on the Express server
		window.location.href = !dev
			? 'https://steamapi.nikpatil.com/auth/steam'
			: 'http://localhost:3000/auth/steam';
	};

	const copyProfileUrl = () => {
		clipboardCopy(userDetails._json.profileurl)
			.then(() => {
				toast.push('Profile link copied to clipboard!', {
					theme: {
						'--toastBackground': '#64a30d',
						'--toastBarBackground': '#fff'
					}
				});
			})
			.catch((error) => {
				console.error('Copy to clipboard failed:', error);
			});
	};
	const logoutUser = () => {
		fetch(!dev ? 'https://steamapi.nikpatil.com/logout' : 'http://localhost:3000/logout', {
			method: 'POST',
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status == 200) {
					isUserLoggedIn = false;
					userDetails = { displayName: '', id: '', photos: '', _json: '' };
				}
			});
	};
	const getGamesWithoutLogin = () => {
		console.log('REDIR');
		console.log(userId);
		window.location.href = `/gameList/${userId}`;
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

<body>
	{#if !isUserLoggedIn}
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
			<p class="text-lg dark:text-white">Welcome, {userDetails.displayName}</p>
			<Card padding="sm">
				<div class="flex justify-end">
					<!-- <DotsHorizontalOutline /> -->
					<Dropdown class="w-36">
						<DropdownItem>Edit</DropdownItem>
						<DropdownItem>Export data</DropdownItem>
						<DropdownItem>Delete</DropdownItem>
					</Dropdown>
				</div>
				<div class="flex flex-col items-center pb-4">
					<Avatar size="lg" src={userDetails.photos[2].value} />
					<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
						{userDetails._json.realname}
					</h5>
					<span class="text-sm text-gray-500 dark:text-gray-400">
						{userDetails.displayName}
					</span>
					<span class="text-sm text-gray-500 dark:text-gray-400">
						{userDetails._json.loccountrycode}
					</span>
					<div class="flex mt-4 space-x-3 lg:mt-6">
						<Button href={userDetails._json.profileurl}>View on Steam</Button>
						<Button on:click={copyProfileUrl} color="light" class="dark:text-white">
							Share Profile
						</Button>
						<Button on:click={logoutUser} color="light" class="dark:text-white">Logout</Button>
					</div>
				</div>
			</Card>
		</div>
	{/if}
</body>
