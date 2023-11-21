<script>
	export let data;
	export let gameStats = data.data;
	export let gameStatus = data.status;
	export let gameId = data.gameid;
	export let steamId = data.steamid;
	import { Button } from 'flowbite-svelte';
	import { LinkSolid } from 'flowbite-svelte-icons';

	let imageurl = `https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/hero_capsule.jpg`;

	function handleImageError() {
		console.error('Image failed to load');
		imageurl = `https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/library_600x900.jpg`;
	}
</script>

<body>
	{#if gameStatus != 404}
		<div class="dark:bg-gray-800 bg-gray-300 rounded-xl grid grid-cols-1 md:grid-cols-2 w-max">
			<div class="p-8">
				<div>
					<img class="rounded-t-lg" src={imageurl} alt="product 1" on:error={handleImageError} />
				</div>
				<div class="py-2">
					<div>
						<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white py-2">
							{gameStats.name}
						</h5>
					</div>
					<div class="flex justify-between items-center">
						<!-- <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span> -->
						<Button
							shadow
							class="hover:scale-95 duration-300"
							href={'https://store.steampowered.com/app/' + gameId}>View on Steam</Button
						>
						<Button
							color="blue"
							shadow
							class="hover:scale-95 duration-300"
							href={`/gameList/${steamId}`}
						>
							Go to Library
						</Button>
					</div>
				</div>
			</div>
			<div class="p-8">
				<p class="text-3xl font-semibold tracking-tight text-lime-700 dark:text-lime-400 py-2">
					Game Stats
				</p>
				<p class="text tracking-tight text-gray-900 dark:text-white pt-2">Total Playtime:</p>
				<p class="text-xl tracking-tight text-lime-700 dark:text-lime-500 pb-2">
					{gameStats.playtime_forever} minutes
				</p>
				<p class="text tracking-tight text-gray-900 dark:text-white pt-2">Last Played:</p>
				<p class="text-xl tracking-tight text-lime-700 dark:text-lime-500 pb-2">
					{gameStats.rtime_last_played == 0
						? 'Never'
						: new Date(gameStats.rtime_last_played * 1000).toLocaleString()}
				</p>
				<p class="text tracking-tight text-gray-900 dark:text-white pt-2">Playtime on Linux:</p>
				<p class="text-xl tracking-tight text-lime-700 dark:text-lime-500 pb-2">
					{gameStats.playtime_linux_forever} minutes
				</p>
				<p class="text tracking-tight text-gray-900 dark:text-white pt-2">Playtime on MacOS:</p>
				<p class="text-xl tracking-tight text-lime-700 dark:text-lime-500 pb-2">
					{gameStats.playtime_mac_forever} minutes
				</p>
				<p class="text tracking-tight text-gray-900 dark:text-white pt-2">Playtime on Windows:</p>
				<p class="text-xl tracking-tight text-lime-700 dark:text-lime-500 pb-2">
					{gameStats.playtime_windows_forever} minutes
				</p>
				<p class="text tracking-tight text-gray-900 dark:text-white pt-2">Playtime Offline:</p>
				<p class="text-xl tracking-tight text-lime-700 dark:text-lime-500 pb-2">
					{gameStats.playtime_disconnected} minutes
				</p>
				<p class="text-xl tracking-tight text-gray-900 dark:text-white py-2">
					{#if gameStats.has_community_visible_stats}
						<Button
							shadow
							class="hover:scale-95 duration-300"
							href="http://steamcommunity.com/profiles/{steamId}/stats/{gameId}"
						>
							<LinkSolid class="w-3.5 h-3.5 mr-2" />View Community Stats on Steam
						</Button>
					{/if}
				</p>
			</div>
		</div>
	{/if}
</body>
