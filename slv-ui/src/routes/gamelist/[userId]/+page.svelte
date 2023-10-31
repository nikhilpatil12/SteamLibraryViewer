<script>
	export let data;
	export let gamelist = data.data;
	console.log(gamelist);
	import { Button, Card, Gallery, P } from 'flowbite-svelte';
</script>

<h1>
	{#each gamelist.response.games as d}
		<Card>
			<P size="lg" weight="thin">{d.name}</P>
			<P size="sm" weight="thin">Total Playtime: {d.playtime_forever} minutes</P>
			<P size="sm" weight="thin">Last played: {new Date(d.rtime_last_played).toUTCString()}</P>
			<img src="https://steamcdn-a.akamaihd.net/steam/apps/{d.appid}/capsule_231x87.jpg" />
			<img src="https://steamcdn-a.akamaihd.net/steam/apps/{d.appid}/capsule_616x353.jpg" />
			<img src="https://steamcdn-a.akamaihd.net/steam/apps/{d.appid}/hero_capsule.jpg" />
		</Card>
	{/each}
</h1>
