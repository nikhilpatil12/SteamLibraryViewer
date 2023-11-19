<script>
	// @ts-nocheck
	import { Button, Card, Gallery, P, Input, Dropdown, DropdownItem } from 'flowbite-svelte';
	import {
		ArrowLeftSolid,
		SearchOutline,
		ChevronDownSolid,
		SortVerticalSolid
	} from 'flowbite-svelte-icons';

	export let data;
	export let gameList = {};
	export let userId = data.allData.user;

	export let errorMessage = 'Something Went wrong';
	export let statusCode = 200;
	export let isAscending = true;

	if (data.allData.status != 200) {
		errorMessage = data.allData.data.response.message;
		statusCode = data.allData.status;
	} else {
		gameList = data.allData.data.response.games;
	}
	var oldGameList = gameList;
	var searchText = '';
	const searchGames = () => {
		gameList = oldGameList;
		gameList = gameList.filter((obj) => obj.name.toLowerCase().includes(searchText.toLowerCase()));
	};
	var activeSorting = 0;
	const sortByName = () => {
		activeSorting = 1;
		if (isAscending) gameList = [...gameList].sort((a, b) => (a.name > b.name ? 1 : -1));
		else gameList = [...gameList].sort((a, b) => (a.name > b.name ? -1 : 1));
	};
	const sortByPlaytime = () => {
		activeSorting = 2;
		if (isAscending)
			gameList = [...gameList].sort((a, b) => (a.playtime_forever > b.playtime_forever ? 1 : -1));
		else
			gameList = [...gameList].sort((a, b) => (a.playtime_forever > b.playtime_forever ? -1 : 1));
	};
	const sortByLastPlayed = () => {
		activeSorting = 3;
		if (isAscending)
			gameList = [...gameList].sort((a, b) => (a.rtime_last_played > b.rtime_last_played ? 1 : -1));
		else
			gameList = [...gameList].sort((a, b) => (a.rtime_last_played > b.rtime_last_played ? -1 : 1));
	};
	const toggleAscending = () => {
		isAscending = !isAscending;
		switch (activeSorting) {
			case 0:
				isAscending = true;
				sortByName();
				break;
			case 1:
				sortByName();
				break;
			case 2:
				sortByPlaytime();
				break;
			case 3:
				sortByLastPlayed();
				break;
		}
	};
</script>

{#if statusCode == 200}
	<body>
		<div class="flex flex-row">
			<div class="pb-5 relative grow">
				<div
					class="flex absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none text-black dark:text-white"
				>
					<SearchOutline class="w-4 h-4" />
				</div>
				<Input
					bind:value={searchText}
					on:input={searchGames}
					id="search-navbar"
					class="pl-10 inset-y-0 items-center"
					placeholder="Search for your games"
				/>
			</div>
			<div class="pl-6">
				<Button
					pill={true}
					on:click={toggleAscending}
					outline={!isAscending}
					class="!p-2"
					size="xl"
				>
					<SortVerticalSolid />
				</Button>
			</div>
			<div class="pl-2 right-0">
				<Button>
					Sort By
					<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white" />
				</Button>
				<Dropdown>
					<DropdownItem on:click={sortByName}>Name</DropdownItem>
					<DropdownItem on:click={sortByPlaytime}>Total Playtime</DropdownItem>
					<DropdownItem on:click={sortByLastPlayed}>Last Played</DropdownItem>
				</Dropdown>
			</div>
		</div>
		<Gallery class="gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
			{#each gameList as d}
				<Card class="hover:scale-95 duration-75" href="/gameStats/{userId}/{d.appid}">
					<P size="lg">{d.name}</P>
					<P size="sm" weight="thin">Total Playtime: {d.playtime_forever} minutes</P>
					{#if d.playtime_forever != 0}
						<P size="sm" weight="thin">
							Last played: {new Date(d.rtime_last_played * 1000).toLocaleString()}
						</P>
					{/if}
					<div class="inset-x-0 w-full h-full flex flex-col items-end pt-4">
						<img
							class="rounded-lg w-full"
							alt="Steam Game Poster"
							src="https://steamcdn-a.akamaihd.net/steam/apps/{d.appid}/capsule_231x87.jpg"
						/>
					</div>
				</Card>
			{/each}
		</Gallery>
	</body>
{:else}
	<body class="bg-gray-100 rounded-md w-full h-full">
		<div>
			<Card class="rounded-lg shadow-lg p-8 dark:bg-gray-800">
				<div class="text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-24 h-24 text-red-600 mx-auto"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
					<h1 class="text-4xl text-lime-800 font-extrabold mt-4">{errorMessage}</h1>
					<p class="text-lime-600 mt-2">
						Oops! The Steam ID you you entered is either invalid or is private.
					</p>
				</div>
				<Button
					href="/"
					class="bg-lime-600 mt-6 hover:scale-95 hover:bg-lime-700 font-semibold transition duration-200 ease-in-out"
				>
					<ArrowLeftSolid class="m-2 w-3.5 h-3.5 ml-2 text-white" /> Back to Home
				</Button>
			</Card>
		</div>
	</body>
{/if}
