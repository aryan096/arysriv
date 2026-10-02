<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';

	const clockFormat = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Kolkata',
		hour: '2-digit',
		minute: '2-digit'
	});

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
	<meta name="description" content="Personal website of Aryan Srivastava" />
</svelte:head>

<div class="home-screen">
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

		<section class="role">
			<p>
				Data Scientist @
				<a href="https://devdatalab.org" target="_blank" rel="noopener noreferrer"
					>Development Data Lab</a
				>
			</p>
		</section>
	</div>

	<a
		class="resume-button"
		href={asset('/documents/resume.pdf')}
		target="_blank"
		rel="noopener noreferrer">Resume</a
	>

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
		align-items: center;
		justify-content: center;
		padding: 2rem 2rem 3.5rem;
		overflow-y: auto;
	}

	.home-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin: auto 0;
		text-align: center;
	}

	.name {
		margin: 0;
		text-shadow: none;
	}

	.ascii-art {
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		color: var(--color-accent-bright);
		filter: drop-shadow(0 0 4px var(--color-accent-bright));
		cursor: default;
	}

	.ascii-art pre {
		margin: 0;
		font-family: var(--font-mono);
		font-size: clamp(8px, 2.3vw, 20px);
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
		margin: 2.25rem 0 0;
		font-size: 1rem;
		color: var(--color-text);
	}

	.cursor {
		margin-left: 0.35em;
		color: var(--color-accent-bright);
		text-shadow: 0 0 10px var(--color-accent-bright);
		animation: blink 1s steps(1) infinite;
	}

	.role {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		margin-top: 3rem;
	}

	.role p {
		margin: 0;
		font-size: 0.75rem;
		color: var(--color-text);
	}

	.resume-button {
		position: absolute;
		left: 1.5rem;
		bottom: 1rem;
		display: inline-block;
		padding: 0.05rem 0.65rem 0.1rem;
		border: 2px solid var(--color-accent-bright);
		background: var(--color-bg);
		box-shadow: 3px 3px 0 var(--color-accent-muted);
		font-family: var(--font-display);
		font-size: 0.95rem;
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
			padding: 1.5rem 1rem 5.5rem;
		}

		.desktop-only {
			display: none;
		}

		.mobile-only {
			display: flex;
		}

		.ascii-art pre {
			font-size: clamp(7px, 2.9vw, 12px);
		}

		.tagline {
			font-size: 0.85rem;
		}

		.role {
			margin-top: 2.25rem;
		}

		/* Sit above the wrapped status bar instead of beside it */
		.resume-button {
			left: 1rem;
			bottom: 3rem;
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
