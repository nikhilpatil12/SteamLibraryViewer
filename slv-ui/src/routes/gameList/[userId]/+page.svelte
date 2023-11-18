<script>
	// @ts-nocheck
	import { Spinner } from 'flowbite-svelte';
	import { Button, Card, Gallery, P } from 'flowbite-svelte';
	import { ArrowLeftSolid } from 'flowbite-svelte-icons';

	export let data;
	// export let gamelist = data.data.response;
	// export let userId = data.user;
	// console.log(data);
	// console.log(gamelist);

	export let errorMessage = 'Something Went wrong';
	if (data.info.status != 200) {
		errorMessage = data.info.data.response.message;
	}
</script>

{#await data.info}
	{console.log('SADDADAD')}
	{console.log('SADDADAD')}
	{console.log('SADDADAD')}
	{console.log('SADDADAD')}
	{console.log('SADDADAD')}
	{console.log('SADDADAD')}
	{console.log('SADDADAD')}
	{alert('SADDADAD')}

	Loading...
{:then data1}
	<!-- "data1"{data1}
	{data1} -->
	{#if data1.status == 200}
		<body class="rounded-md">
			<Gallery class="gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
				{#each data1.data.response.games as d}
					<Card class="hover:scale-95 duration-75" href="/gameStats/{data1.user}/{d.appid}">
						<P size="lg" weight="thin">{d.name}</P>
						<P size="sm" weight="thin">Total Playtime: {d.playtime_forever} minutes</P>
						{#if d.playtime_forever != 0}
							<P size="sm" weight="thin">
								Last played: {new Date(d.rtime_last_played * 1000).toLocaleString()}
							</P>
						{/if}
						<img
							class="rounded-lg"
							alt="Steam Game Poster"
							src="https://steamcdn-a.akamaihd.net/steam/apps/{d.appid}/capsule_231x87.jpg"
						/>
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
	<!-- {console.log(data1)} -->
{:catch error}
	{error.message}
{/await}
