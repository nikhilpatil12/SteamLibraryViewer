<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { Navbar, NavBrand, NavUl, NavLi, NavHamburger } from 'flowbite-svelte';
	$: activeUrl = $page.url.pathname;
	import { DarkMode } from 'flowbite-svelte';
</script>

<body class="relative">
	<Navbar class="fixed border px-5 py-2 rounded-lg bg-gray-300 z-50 rounded-none">
		<NavBrand href="/">
			<img src="/favicon.png" class="mr-3 h-6 sm:h-9" alt="SLV Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Steam Library Viewer
			</span>
		</NavBrand>
		<NavUl {activeUrl}>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="https://github.com/nikhilpatil12">Github</NavLi>
		</NavUl>
		<DarkMode />
		<NavHamburger />
	</Navbar>

	<div
		class="min-h-screen bg-gray-100 dark:bg-gray-500 flex items-center justify-center pt-32 pb-16"
	>
		<slot />
	</div>
</body>
<SvelteToast options={{ duration: 2000, reversed: true, intro: { y: 50 } }} />

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 1rem;
		--toastContainerLeft: calc(50vw - 10rem);
		--toastBorderRadius: 1rem;
		--toastBorder: 1px solid rgb(184, 184, 184);
		--toastWidth: 20rem;
		--toastPadding: 0.2rem;
	}
</style>
