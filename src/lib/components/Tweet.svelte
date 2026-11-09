<script lang="ts">
	import { onMount } from 'svelte';

	type Twttr = { widgets?: { load: (el?: HTMLElement) => void } };

	let { url, label = 'View this post on X' }: { url: string; label?: string } = $props();

	let container: HTMLDivElement;

	const SCRIPT_SRC = 'https://platform.twitter.com/widgets.js';

	onMount(() => {
		const twttr = (window as unknown as { twttr?: Twttr }).twttr;

		// widgets.js only scans the page when it first loads, so on client-side
		// navigation we have to ask it to render this embed explicitly.
		if (twttr?.widgets) {
			twttr.widgets.load(container);
			return;
		}

		if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
			const script = document.createElement('script');
			script.src = SCRIPT_SRC;
			script.async = true;
			script.charset = 'utf-8';
			document.body.appendChild(script);
		}
	});
</script>

<div class="tweet-embed not-prose" bind:this={container}>
	<blockquote class="twitter-tweet" data-dnt="true" data-theme="dark" data-align="center">
		<a {...{ href: url }} target="_blank" rel="external noopener noreferrer">{label}</a>
	</blockquote>
</div>

<style>
	.tweet-embed {
		display: flex;
		justify-content: center;
		margin: 1.5rem 0;
		min-height: 6rem;
	}
</style>
