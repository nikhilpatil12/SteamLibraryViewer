<script>
	import { onMount } from 'svelte';
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
		Hr
	} from 'flowbite-svelte';
	import clipboardCopy from 'clipboard-copy';
	import { toast } from '@zerodevx/svelte-toast';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { browser, dev, building, version } from '$app/environment';

	let isUserLoggedIn = false;
	const copyProfileUrl = () => {
		clipboardCopy(userData._json.profileurl)
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
					goto('/');
				}
			});
	};
	/**
	 * @type {{ displayName: any; id: any; photos: any, _json:any }}
	 */
	let userData;
	onMount(() => {
		// Extract user data from the query parameter
		fetch(!dev ? 'https://steamapi.nikpatil.com/profile' : 'http://localhost:3000/profile', {
			method: 'GET',
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(JSON.parse(data.user));
				isUserLoggedIn = true;
				if (data.user) {
					if (data.code == 200) {
						userData = JSON.parse(data.user.profile);
						// goto(`/gameList/${userData.id}`);
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

<body>
	{#if userData}
		<div>
			<p class="text-lg dark:text-white">Welcome, {userData.displayName}</p>
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
					<Avatar size="lg" src={userData.photos[2].value} />
					<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
						{userData._json.realname}
					</h5>
					<span class="text-sm text-gray-500 dark:text-gray-400">
						{userData.displayName}
					</span>
					<span class="text-sm text-gray-500 dark:text-gray-400">
						{userData._json.loccountrycode}
					</span>
					<div class="flex mt-4 space-x-3 lg:mt-6">
						<Button href={userData._json.profileurl}>View on Steam</Button>
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
