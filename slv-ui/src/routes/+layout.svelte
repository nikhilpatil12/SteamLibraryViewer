<script>
	import '../app.postcss';
	import { page } from '$app/stores';

	import { Alert } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavUl, NavLi, NavHamburger } from 'flowbite-svelte';
	$: activeUrl = $page.url.pathname;
</script>

<div class="relative">
	<Navbar class="fixed">
		<NavBrand href="/">
			<!-- <img src="favicon.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Steam Library Viewer
			</span>
		</NavBrand>
		<NavHamburger />
		<NavUl {activeUrl}>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/docs/components/navbar">Navbar</NavLi>
			<NavLi href="/github">Github</NavLi>
		</NavUl>
	</Navbar>

	<div class="min-h-screen flex items-center justify-center pt-32 p-16">
		<slot />
	</div>
</div>
