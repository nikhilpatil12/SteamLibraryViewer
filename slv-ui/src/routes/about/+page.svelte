<script>
	export let appName = 'Steam Library Viewer';
	export let appVersion = '1.0.3';
	export let description = 'Explore your Steam game library with ease.';
	export let author = 'Nikhil Patil';
</script>

<section class="bg-gray-100 rounded-md min-w-full min-h-full">
	<section class="bg-gradient-to-r from-lime-500 to-lime-700 text-white py-16 text-center p-4">
		<h1 class="text-4xl font-extrabold mb-4">{appName}</h1>
		<p class="text-lg mb-6">{description}</p>
		<p class="text-lg">Version: {appVersion}</p>
		<p class="text-lg">By {author}</p>
	</section>

	<section class="dark:bg-gray-400 bg-white py-12 drop-shadow-2xl">
		<div class="container place-content-center mx-auto text-center">
			<h2 class="dark:text-white text-2xl font-semibold mb-8">Key Features</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
				<div class="p-6 rounded-lg shadow-lg bg-green-100">
					<span class="animated-icon text-5xl text-green-600">🎮</span>
					<h3 class="text-xl font-semibold mb-2">Game Library</h3>
					<p>Explore your entire Steam game library at a glance.</p>
				</div>
				<div class="p-6 rounded-lg shadow-lg bg-yellow-100">
					<span class="animated-icon text-5xl text-yellow-600">🔍</span>
					<h3 class="text-xl font-semibold mb-2">Search & Filter</h3>
					<p>Effortlessly search for games and apply filters.</p>
				</div>
				<div class="p-6 rounded-lg shadow-lg bg-pink-100">
					<span class="animated-icon text-5xl text-pink-600">🕹️</span>
					<h3 class="text-xl font-semibold mb-2">Game Details</h3>
					<p>Discover game stats, and more.</p>
				</div>
			</div>
		</div>
	</section>
</section>

<style>
	.animated-icon {
		animation: bounce 2s infinite;
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}
</style>
