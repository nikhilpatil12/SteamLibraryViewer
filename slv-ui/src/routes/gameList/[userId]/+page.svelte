<script>
	export let data;
	export let gamelist = data.data;
	export let userId = data.user;
	console.log(gamelist);
	import { Button, Card, Gallery, P } from 'flowbite-svelte';
</script>

<body>
	<h1>
		<Gallery class="gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
			{#each gamelist.response.games as d}
				<Card class="hover:scale-110 duration-75" href="/gameStats/{userId}/{d.appid}">
					<P size="lg" weight="thin">{d.name}</P>
					<P size="sm" weight="thin">Total Playtime: {d.playtime_forever} minutes</P>
					<P size="sm" weight="thin">Last played: {new Date(d.rtime_last_played).toUTCString()}</P>
					<img
						class="rounded-lg"
						alt="Steam Game Poster"
						src="https://steamcdn-a.akamaihd.net/steam/apps/{d.appid}/capsule_231x87.jpg"
					/>
					<!-- <img src="https://steamcdn-a.akamaihd.net/steam/apps/{d.appid}/capsule_616x353.jpg" />
				<img src="https://steamcdn-a.akamaihd.net/steam/apps/{d.appid}/hero_capsule.jpg" /> -->
				</Card>
			{/each}
		</Gallery>
	</h1>
</body>
