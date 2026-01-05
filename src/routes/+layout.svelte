<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Aryan Srivastava</title>
</svelte:head>

<div class="min-h-screen flex flex-col lg:flex-row">
	<!-- Sidebar: hidden on mobile, visible on desktop -->
	<aside class="hidden lg:flex lg:w-72 lg:flex-shrink-0 lg:fixed lg:h-screen border-r border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
		<Sidebar />
	</aside>
	
	<!-- Main content -->
	<main class="flex-1 lg:ml-72 px-6 py-12 lg:px-16 lg:py-16">
		<div class="max-w-3xl">
			{@render children()}
		</div>
	</main>
	
	<!-- Footer sidebar: visible on mobile only -->
	<footer class="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
		<Sidebar mobile={true} />
	</footer>
</div>
