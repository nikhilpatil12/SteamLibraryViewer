<script>
	export let data;
	export let gameStats = data.data;
	export let gameStatus = data.status;
	export let gameId = data.gameid;
	console.log(gameStats);
	console.log(gameStatus);
	console.log(gameId);
	import { Button, Card, Gallery, P } from 'flowbite-svelte';
</script>

{#if gameStatus != 404}
	<Card padding="none">
		<a href="/">
			<img
				class="p-8 rounded-t-lg"
				src="https://steamcdn-a.akamaihd.net/steam/apps/{gameId}/hero_capsule.jpg"
				alt="product 1"
			/>
		</a>
		<div class="px-5 pb-5">
			<a href="/">
				<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
					{gameStats.playerstats.gameName}
				</h5>
			</a>
			<div class="flex justify-between items-center">
				<!-- <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span> -->
				<Button href={'https://store.steampowered.com/app/' + gameId}>View on Steam</Button>
			</div>
		</div>
	</Card>
{/if}
