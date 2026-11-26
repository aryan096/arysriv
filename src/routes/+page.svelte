<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';

	const clockFormat = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Kolkata',
		hour: '2-digit',
		minute: '2-digit'
	});

	// Portrait is hidden for now; flip to true to bring it back.
	const showPortrait = false;

	let bangaloreTime = $state('--:--');

	onMount(() => {
		const tick = () => (bangaloreTime = clockFormat.format(new Date()));
		tick();
		const interval = setInterval(tick, 10_000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Aryan Srivastava</title>
	<meta
		name="description"
		content="Aryan Srivastava is a data scientist at Development Data Lab, building public data infrastructure and tools for development research in India and beyond."
	/>
	<meta property="og:title" content="Aryan Srivastava" />
	<meta
		property="og:description"
		content="Data scientist at Development Data Lab, building public data infrastructure and tools for development research in India and beyond."
	/>
</svelte:head>

<div class="home-screen">
	<div class="home-main">
	<div class="home-content">
		<h1 class="name">
			<span class="sr-only">Aryan Srivastava</span>
			<!-- Desktop: single line -->
			<span class="ascii-art desktop-only" aria-hidden="true"><pre>
▄▀█ █▀█ █▄█ ▄▀█ █▄ █   █▀ █▀█ █ █ █ ▄▀█ █▀ ▀█▀ ▄▀█ █ █ ▄▀█
█▀█ █▀▄  █  █▀█ █ ▀█   ▄█ █▀▄ █ ▀▄▀ █▀█ ▄█  █  █▀█ ▀▄▀ █▀█</pre></span>
			<!-- Mobile: two lines -->
			<span class="ascii-art mobile-only" aria-hidden="true"><pre>
▄▀█ █▀█ █▄█ ▄▀█ █▄ █
█▀█ █▀▄  █  █▀█ █ ▀█</pre><pre>
█▀ █▀█ █ █ █ ▄▀█ █▀ ▀█▀ ▄▀█ █ █ ▄▀█
▄█ █▀▄ █ ▀▄▀ █▀█ ▄█  █  █▀█ ▀▄▀ █▀█</pre></span>
		</h1>

		<p class="tagline">&gt; making things that are fun and/or useful<span class="cursor" aria-hidden="true">█</span></p>

		<p class="tagline role">
			&gt; Data Scientist @
			<a href="https://devdatalab.org" target="_blank" rel="noopener noreferrer"
				>Development Data Lab</a
			>
		</p>

		<a
			class="resume-button"
			href={asset('/documents/resume.pdf')}
			target="_blank"
			rel="noopener noreferrer">Resume</a
		>
	</div>

	{#if showPortrait}
	<figure class="portrait">
		<div class="portrait-frame">
			<img
				src={asset('/images/portrait.webp')}
				alt="Portrait of Aryan Srivastava"
				width="640"
				height="800"
				loading="eager"
				decoding="async"
			/>
		</div>
	</figure>
	{/if}
	</div>


	<div class="status-bar">
		<span>Bangalore</span>
		<span class="separator" aria-hidden="true">|</span>
		<span><time>{bangaloreTime}</time> IST</span>
		<span class="separator" aria-hidden="true">|</span>
		<span class="hint">Press 1, 2 or 3 to change channel</span>
	</div>
</div>

<style>
	.home-screen {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 20;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		padding: 3.5rem 5.5rem 4rem;
		overflow-y: auto;
	}

	.home-main {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: start;
		gap: 2.5rem;
		width: 100%;
	}

	.home-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		text-align: left;
	}

	.name {
		margin: 0;
		text-shadow: none;
	}

	.ascii-art {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.6rem;
		color: var(--color-accent-bright);
		filter: drop-shadow(0 0 4px var(--color-accent-bright));
		cursor: default;
	}

	.ascii-art pre {
		margin: 0;
		font-family: var(--font-mono);
		font-size: clamp(8px, 1.9vw, 19px);
		font-weight: 400;
		line-height: 1.2;
		letter-spacing: 0;
		transition: text-shadow 0.1s steps(2);
	}

	/* Chromatic split when the signal gets poked */
	.name:hover pre {
		text-shadow:
			-2px 0 rgba(0, 212, 255, 0.75),
			2px 0 rgba(255, 51, 51, 0.6);
		animation: jitter 0.3s steps(3) 1;
	}

	.desktop-only {
		display: flex;
	}

	.mobile-only {
		display: none;
	}

	.tagline {
		margin: 2rem 0 0;
		font-size: 1.3rem;
		color: var(--color-text);
	}

	.cursor {
		margin-left: 0.35em;
		color: var(--color-accent-bright);
		text-shadow: 0 0 10px var(--color-accent-bright);
		animation: blink 1s steps(1) infinite;
	}

	.tagline.role {
		margin-top: 0.75rem;
	}

	.resume-button {
		margin-top: 2.25rem;
		display: inline-block;
		padding: 0.1rem 0.8rem 0.15rem;
		border: 2px solid var(--color-accent-bright);
		background: var(--color-bg);
		box-shadow: 3px 3px 0 var(--color-accent-muted);
		font-family: var(--font-display);
		font-size: 1.25rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		color: var(--color-accent-bright);
		text-decoration: none;
		text-shadow: 0 0 6px var(--color-accent-bright);
		transition:
			transform 0.06s steps(1),
			box-shadow 0.06s steps(1);
	}

	.resume-button::before {
		content: '[ ';
	}

	.resume-button::after {
		content: ' ]';
	}

	.resume-button:hover,
	.resume-button:focus-visible {
		background: var(--color-accent-bright);
		color: var(--color-bg);
		text-shadow: none;
		box-shadow:
			3px 3px 0 var(--color-accent-muted),
			0 0 10px color-mix(in srgb, var(--color-accent-bright) 60%, transparent);
	}

	.resume-button:active {
		transform: translate(3px, 3px);
		box-shadow: 0 0 0 var(--color-accent-muted);
	}

	.status-bar {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 1rem;
		white-space: nowrap;
		font-size: 12px;
		color: var(--color-text-muted);
		text-shadow: 0 0 4px var(--color-text-muted);
	}

	.separator {
		color: var(--color-accent-muted);
	}


	/* ---------- Portrait ---------- */

	/* A matted print: thin rule, dark mat, and the same
	   hard offset shadow as the resume button */
	.portrait {
		margin: 0;
		width: clamp(200px, 22vw, 300px);
		padding: 8px;
		border: 1px solid var(--color-accent-muted);
		background: var(--color-bg-secondary);
		box-shadow: 4px 4px 0 color-mix(in srgb, var(--color-accent-muted) 55%, transparent);
	}

	.portrait-frame {
		aspect-ratio: 4 / 5;
		overflow: hidden;
		outline: 1px solid color-mix(in srgb, var(--color-accent-muted) 70%, transparent);
	}

	.portrait-frame img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		image-rendering: auto;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	@keyframes jitter {
		0% {
			transform: translateX(-2px);
		}
		50% {
			transform: translateX(2px);
		}
		100% {
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor,
		.name:hover pre {
			animation: none;
		}
	}

	@media (hover: none) {
		.hint,
		.separator:has(+ .hint) {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.home-screen {
			padding: 2.25rem 2rem 4.5rem;
		}

		/* Center vertically; auto margins (not justify-content) so tall content still scrolls from the top */
		.home-main {
			margin-block: auto;
			grid-template-columns: 1fr;
			justify-items: center;
			gap: 2rem;
		}

		.home-content {
			align-items: center;
			text-align: center;
		}

		.ascii-art {
			align-items: center;
		}

		.portrait {
			width: min(64vw, 240px);
			padding: 6px;
		}

		.desktop-only {
			display: none;
		}

		.mobile-only {
			display: flex;
		}

		.ascii-art pre {
			font-size: clamp(7px, 3.5vw, 14px);
		}

		.tagline {
			font-size: 1rem;
			text-wrap: balance;
		}

		.tagline.role {
			margin-top: 0.5rem;
		}

		.role a {
			white-space: nowrap;
		}

		.status-bar {
			width: calc(100% - 2rem);
			font-size: 10px;
			gap: 0.25rem 0.5rem;
			flex-wrap: wrap;
			justify-content: center;
			white-space: normal;
		}
	}
</style>
