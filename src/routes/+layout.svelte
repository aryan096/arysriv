<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { afterNavigate, goto } from '$app/navigation';
	import favicon from '$lib/assets/favicon.png';
	import { page } from '$app/stores';

	let { children } = $props();

	type NavHref = '/' | '/portfolio' | '/pong';

	const channels: { href: NavHref; label: string }[] = [
		{ href: '/', label: 'HOME' },
		{ href: '/portfolio', label: 'PORTFOLIO' },
		{ href: '/pong', label: 'PONG' }
	];

	const isHomePage = $derived($page.url.pathname === '/');
	// Screens that own the whole tube instead of sitting in the scrolling content column
	const isFullScreen = $derived(isHomePage || $page.url.pathname.startsWith('/pong'));

	function isActive(href: string) {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	}

	// Channel number for the current page; pages without a button (e.g. /about) read as AV input
	const channelIndex = $derived(channels.findIndex((c) => isActive(c.href)));
	const osdChannel = $derived(channelIndex === -1 ? 'AV' : `CH ${String(channelIndex + 1).padStart(2, '0')}`);
	const osdLabel = $derived(channelIndex === -1 ? 'INPUT' : channels[channelIndex].label);

	let noiseUrl = $state('');
	let staticBurst = $state(0);
	let osdVisible = $state(false);
	let osdTimer: ReturnType<typeof setTimeout> | undefined;

	function showOsd() {
		osdVisible = true;
		clearTimeout(osdTimer);
		osdTimer = setTimeout(() => (osdVisible = false), 1600);
	}

	afterNavigate(({ from, to, type }) => {
		if (type === 'enter' || !from || from.url.pathname === to?.url.pathname) return;
		staticBurst += 1;
		showOsd();
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
		const target = event.target as HTMLElement | null;
		if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;

		const channel = channels[Number(event.key) - 1];
		if (!channel) return;
		if ($page.url.pathname === channel.href) {
			showOsd();
			return;
		}
		goto(resolve(channel.href));
	}

	onMount(() => {
		// Paint one tile of TV snow, reused for the grain and the channel-switch burst
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = 160;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			const image = ctx.createImageData(160, 160);
			for (let i = 0; i < image.data.length; i += 4) {
				const v = Math.random() * 255;
				image.data[i] = v;
				image.data[i + 1] = v * 0.92;
				image.data[i + 2] = v;
				image.data[i + 3] = 255;
			}
			ctx.putImageData(image, 0, 0);
			noiseUrl = `url(${canvas.toDataURL()})`;
		}

		// Announce the channel once the screen has warmed up
		const warmUp = setTimeout(showOsd, 650);
		return () => {
			clearTimeout(warmUp);
			clearTimeout(osdTimer);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Aryan Srivastava</title>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="tv-container">
	<div class="tv-frame">
		<span class="screw screw-tl" aria-hidden="true"></span>
		<span class="screw screw-tr" aria-hidden="true"></span>
		<span class="screw screw-bl" aria-hidden="true"></span>
		<span class="screw screw-br" aria-hidden="true"></span>

		<header class="frame-header">
			<nav class="frame-nav" aria-label="Channels">
				{#each channels as channel, i (channel.href)}
					<a
						href={resolve(channel.href)}
						class="frame-nav-button"
						class:active={isActive(channel.href)}
						aria-current={isActive(channel.href) ? 'page' : undefined}
						aria-keyshortcuts={String(i + 1)}
					>
						<span class="button-number" aria-hidden="true">{i + 1}</span>
						<span class="button-label">{channel.label}</span>
						<span class="button-indicator" class:lit={isActive(channel.href)}></span>
					</a>
				{/each}
			</nav>

			<div class="social-links">
				<a href="https://github.com/aryan096" target="_blank" rel="noopener noreferrer" class="social-button" title="GitHub" aria-label="GitHub">
					<svg viewBox="0 0 24 24" fill="currentColor" class="social-icon" aria-hidden="true">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
				</a>
				<a href="https://www.linkedin.com/in/aryan096/" target="_blank" rel="noopener noreferrer" class="social-button" title="LinkedIn" aria-label="LinkedIn">
					<svg viewBox="0 0 24 24" fill="currentColor" class="social-icon" aria-hidden="true">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				</a>
				<a href="https://x.com/ary_sriv" target="_blank" rel="noopener noreferrer" class="social-button" title="X (Twitter)" aria-label="X (Twitter)">
					<svg viewBox="0 0 24 24" fill="currentColor" class="social-icon" aria-hidden="true">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
				</a>
				<a href="mailto:srivastava@devdatalab.org" class="social-button" title="Email" aria-label="Email">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="social-icon" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
					</svg>
				</a>
			</div>
		</header>

		<div class="screen-tray">
		<div class="tv-screen" style:--noise={noiseUrl}>
			<div class="screen-power">
				{#key $page.url.pathname}
					<div class="tune-in" class:home={isHomePage}>
						{#if isFullScreen}
							{@render children()}
						{:else}
							<div class="tv-content">
								<div class="content-wrapper">
									{@render children()}
								</div>
							</div>
						{/if}
					</div>
				{/key}
			</div>

			<div class="grain" aria-hidden="true"></div>
			<div class="tracking" aria-hidden="true"></div>
			<div class="scanlines" aria-hidden="true"></div>
			<div class="glass" aria-hidden="true"></div>

			{#key staticBurst}
				{#if staticBurst > 0}
					<div class="static-burst" aria-hidden="true"></div>
				{/if}
			{/key}

			<div class="osd" class:visible={osdVisible} aria-hidden="true">
				<span class="osd-channel">{osdChannel}</span>
				<span class="osd-label">{osdLabel}</span>
			</div>
		</div>
		</div>

		<footer class="frame-footer" aria-hidden="true">
			<span class="grille"></span>
			<span class="power">
				<span class="power-led"></span>
			</span>
		</footer>
	</div>
</div>

<style>
	.tv-container {
		--shell-hi: #4a4a52;
		--shell: #2e2e34;
		--shell-lo: #1c1c21;
		--shell-edge: #0a0a0c;
		--key: #26262c;
		--key-lo: #18181c;
		--key-text: #a8a4b4;
		--chrome: linear-gradient(160deg, #e9e4f0 0%, #8d8696 22%, #f4f0f8 48%, #6f6878 72%, #c9c3d2 100%);

		width: 100vw;
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2.5dvh 2.5vw;
		background:
			radial-gradient(ellipse 60% 30% at 50% 100%, rgba(104, 80, 160, 0.22), transparent 70%),
			radial-gradient(ellipse at 50% 40%, rgba(104, 80, 160, 0.1), transparent 65%),
			var(--color-bg);
		overflow: hidden;
	}

	/* ---------- Cabinet ---------- */

	/* Moulded graphite plastic with a soft top-left light */
	.tv-frame {
		width: 100%;
		height: 100%;
		max-width: 1400px;
		max-height: 900px;
		background:
			radial-gradient(ellipse 90% 70% at 25% 0%, rgba(255, 255, 255, 0.09), transparent 60%),
			repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.015) 0 1px, transparent 1px 3px),
			linear-gradient(170deg, var(--shell-hi), var(--shell) 40%, var(--shell-lo));
		border-radius: 30px;
		padding: 74px 34px 58px;
		box-shadow:
			0 40px 90px -20px rgba(0, 0, 0, 0.9),
			0 12px 0 -4px var(--shell-edge),
			0 0 0 1px var(--shell-edge),
			inset 0 2px 0 rgba(255, 255, 255, 0.16),
			inset 2px 0 0 rgba(255, 255, 255, 0.06),
			inset 0 -6px 14px rgba(0, 0, 0, 0.45),
			inset -3px 0 8px rgba(0, 0, 0, 0.3);
		position: relative;
	}

	.screw {
		position: absolute;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background:
			linear-gradient(45deg, transparent 44%, rgba(0, 0, 0, 0.55) 44% 56%, transparent 56%),
			radial-gradient(circle at 35% 30%, #d8d2e0, #6d6676 70%);
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.12),
			inset 0 -1px 1px rgba(0, 0, 0, 0.4);
	}

	.screw-tl { top: 14px; left: 14px; }
	.screw-tr { top: 14px; right: 14px; transform: rotate(70deg); }
	.screw-bl { bottom: 14px; left: 14px; transform: rotate(20deg); }
	.screw-br { bottom: 14px; right: 14px; transform: rotate(110deg); }

	.frame-header {
		position: absolute;
		top: 16px;
		left: 38px;
		right: 38px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 100;
	}

	.frame-nav {
		display: flex;
		gap: 12px;
	}

	.social-links {
		display: flex;
		gap: 12px;
	}

	/* Channel buttons latch down when their channel is on */
	.frame-nav-button {
		display: grid;
		grid-template-columns: auto auto;
		grid-template-rows: auto auto;
		align-items: center;
		column-gap: 8px;
		row-gap: 5px;
		padding: 7px 14px 7px 10px;
		background: linear-gradient(180deg, var(--key), var(--key-lo));
		border: 1px solid var(--shell-edge);
		border-radius: 8px;
		text-decoration: none;
		text-shadow: none;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.12),
			0 3px 0 var(--shell-edge),
			0 5px 8px rgba(0, 0, 0, 0.35);
		transition:
			transform 0.08s ease,
			box-shadow 0.08s ease,
			background 0.15s ease;
	}

	.frame-nav-button:hover {
		background: linear-gradient(180deg, #33333a, #222227);
	}

	.frame-nav-button:active,
	.frame-nav-button.active {
		transform: translateY(3px);
		background: linear-gradient(180deg, #0e0e11, #1a1a1f);
		box-shadow:
			inset 0 2px 5px rgba(0, 0, 0, 0.6),
			0 0 0 var(--shell-edge);
	}

	.button-number {
		grid-row: 1 / span 2;
		font-family: var(--font-display);
		font-size: 30px;
		line-height: 0.8;
		color: #6e6a7a;
		transition: color 0.15s ease;
	}

	.button-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--key-text);
		letter-spacing: 0.5px;
		transition: color 0.15s ease;
	}

	.frame-nav-button:hover .button-label,
	.frame-nav-button:hover .button-number {
		color: #dcd8e6;
	}

	.frame-nav-button.active .button-label,
	.frame-nav-button.active .button-number {
		color: var(--color-accent-bright);
		text-shadow: 0 0 8px var(--color-accent-bright);
	}

	.button-indicator {
		width: 22px;
		height: 4px;
		border-radius: 2px;
		background: #0a0a0c;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.6);
		transition:
			background 0.15s ease,
			box-shadow 0.15s ease;
	}

	.button-indicator.lit {
		background: var(--color-accent-bright);
		box-shadow:
			0 0 6px var(--color-accent-bright),
			0 0 12px var(--color-accent);
	}

	/* Knurled metal knobs */
	.social-button {
		position: relative;
		width: 38px;
		height: 38px;
		display: flex;
		align-items: center;
		justify-content: center;
		background:
			radial-gradient(circle at 50% 50%, #1f1f24 0 52%, transparent 53%),
			repeating-conic-gradient(#c9c3d2 0 6deg, #7d7687 6deg 12deg);
		border: none;
		border-radius: 50%;
		text-decoration: none;
		text-shadow: none;
		color: #b8b4c4;
		box-shadow:
			0 0 0 1px var(--shell-edge),
			0 4px 6px rgba(0, 0, 0, 0.45),
			inset 0 0 0 1px rgba(255, 255, 255, 0.2);
		transition:
			color 0.15s ease,
			transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1),
			box-shadow 0.15s ease;
	}

	.social-button:hover {
		color: var(--color-accent-bright);
		transform: rotate(-30deg);
		background:
			radial-gradient(circle at 50% 50%, #1f1f24 0 52%, transparent 53%),
			repeating-conic-gradient(#c9c3d2 0 6deg, #7d7687 6deg 12deg);
		box-shadow:
			0 0 0 1px var(--shell-edge),
			0 4px 6px rgba(0, 0, 0, 0.45),
			0 0 12px color-mix(in srgb, var(--color-accent-bright) 55%, transparent);
	}

	.social-button:active {
		transform: rotate(-30deg) scale(0.94);
	}

	.social-icon {
		width: 16px;
		height: 16px;
	}

	.frame-footer {
		position: absolute;
		left: 40px;
		right: 40px;
		bottom: 14px;
		height: 30px;
		display: flex;
		align-items: center;
		gap: 20px;
	}

	/* Punched speaker holes */
	.grille {
		flex: 1;
		max-width: 240px;
		height: 22px;
		margin-left: auto;
		background: radial-gradient(circle, var(--shell-edge) 0 1.6px, transparent 2.1px) 0 0 / 7px 7px;
		filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.07));
	}

	.power {
		display: grid;
		place-items: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--shell-edge);
		box-shadow:
			inset 0 1px 2px rgba(0, 0, 0, 0.8),
			0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.power-led {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 30%, #fff, var(--color-accent-bright) 55%);
		box-shadow:
			0 0 6px var(--color-accent-bright),
			0 0 16px var(--color-accent);
	}

	/* Recessed tray the tube sits in, rimmed in chrome */
	.screen-tray {
		height: 100%;
		padding: 12px;
		border-radius: 22px;
		background: linear-gradient(170deg, #060608, #121216);
		box-shadow:
			inset 0 6px 14px rgba(0, 0, 0, 0.75),
			inset 0 -1px 0 rgba(255, 255, 255, 0.08),
			0 0 0 2px var(--shell-edge),
			0 1px 0 2px rgba(255, 255, 255, 0.07);
		position: relative;
	}

	.screen-tray::before {
		content: '';
		position: absolute;
		inset: 7px;
		border-radius: 17px;
		padding: 2px;
		background: var(--chrome);
		opacity: 0.32;
		-webkit-mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);
		-webkit-mask-composite: xor;
		mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);
		mask-composite: exclude;
		pointer-events: none;
	}

	/* ---------- Screen ---------- */

	.tv-screen {
		width: 100%;
		height: 100%;
		background: radial-gradient(ellipse at center, #121019 0%, var(--color-bg) 75%);
		border-radius: 14px / 18px;
		position: relative;
		overflow: hidden;
		box-shadow: 0 0 0 2px #050307;
	}

	.screen-power {
		position: absolute;
		inset: 0;
		transform-origin: center;
		animation: power-on 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both;
	}

	.tune-in {
		position: absolute;
		inset: 0;
		animation: tune-in 0.28s ease-out both;
	}

	.tv-content {
		position: relative;
		z-index: 20;
		height: 100%;
		padding: 2.5rem 2rem 3rem;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--color-accent-muted) transparent;
	}

	.content-wrapper {
		max-width: 780px;
		margin: 0 auto;
		width: 100%;
	}

	.grain,
	.tracking,
	.scanlines,
	.glass,
	.static-burst {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	/* Noise layers jitter by transform, not background-position, so they never repaint */
	.grain {
		z-index: 30;
		inset: -211px 0 0 -97px;
		background-image: var(--noise);
		opacity: 0.065;
		will-change: transform;
		animation: noise-shift 0.12s steps(3) infinite;
	}

	/* Thin tracking-error streaks that flick across now and then */
	.tracking {
		z-index: 30;
		inset: 0 0 auto;
		height: 2px;
		background-image: var(--noise);
		background-size: 320px;
		opacity: 0;
		animation: tracking 7s steps(1) infinite;
	}

	.scanlines {
		z-index: 31;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.16) 0px,
			rgba(0, 0, 0, 0.16) 1px,
			transparent 1px,
			transparent 3px
		);
	}

	/* Tube curvature and a sliver of room light on the glass */
	.glass {
		z-index: 32;
		border-radius: inherit;
		background:
			radial-gradient(ellipse 120% 90% at 30% 0%, rgba(255, 255, 255, 0.05), transparent 45%),
			radial-gradient(ellipse at center, transparent 58%, rgba(0, 0, 0, 0.55) 100%);
		box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.6);
	}

	.static-burst {
		z-index: 40;
		background-image: var(--noise);
		background-size: 320px;
		animation:
			static-flash 0.24s ease-out both,
			static-roll 0.08s steps(3) infinite;
	}

	.osd {
		position: absolute;
		top: 1.25rem;
		right: 1.75rem;
		z-index: 45;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		font-family: var(--font-display);
		color: #e8dcff;
		text-shadow:
			0 0 6px var(--color-accent-bright),
			2px 2px 0 #3a2a5c;
		opacity: 0;
		pointer-events: none;
	}

	.osd.visible {
		opacity: 1;
	}

	.osd-channel {
		font-size: 44px;
		line-height: 0.9;
	}

	.osd-label {
		font-size: 20px;
		letter-spacing: 2px;
	}

	@keyframes power-on {
		0% {
			transform: scale(0.6, 0.004);
			filter: brightness(8) saturate(0);
		}
		45% {
			transform: scale(1, 0.004);
			filter: brightness(6) saturate(0);
		}
		100% {
			transform: scale(1, 1);
			filter: brightness(1) saturate(1);
		}
	}

	@keyframes tune-in {
		0% {
			opacity: 0;
			filter: blur(2px) brightness(1.8);
			transform: translateX(-6px) skewX(-2deg);
		}
		100% {
			opacity: 1;
			filter: none;
			transform: none;
		}
	}

	@keyframes static-flash {
		0% {
			opacity: 0.95;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes static-roll {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 97px 211px;
		}
	}

	@keyframes noise-shift {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(97px, 211px);
		}
	}

	@keyframes tracking {
		0% {
			top: 22%;
			opacity: 0;
		}
		60% {
			top: 22%;
			opacity: 0.4;
		}
		61% {
			top: 23%;
			opacity: 0.25;
		}
		62% {
			top: 67%;
			opacity: 0.35;
		}
		63% {
			opacity: 0;
		}
		86% {
			top: 38%;
			opacity: 0.3;
		}
		87%,
		100% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.screen-power,
		.tune-in,
		.static-burst,
		.grain {
			animation: none;
		}

		.static-burst,
		.tracking {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.tv-container {
			padding: 0;
		}

		.tv-frame {
			max-width: none;
			max-height: none;
			border-radius: 0;
			padding: 106px 10px 40px;
			box-shadow:
				inset 0 2px 0 rgba(255, 255, 255, 0.16),
				inset 0 -6px 14px rgba(0, 0, 0, 0.45);
		}

		.screw-bl,
		.screw-br {
			display: none;
		}

		.screw-tl,
		.screw-tr {
			top: 10px;
		}

		.screw-tl {
			left: 10px;
		}

		.screw-tr {
			right: 10px;
		}

		.screen-tray {
			padding: 7px;
			border-radius: 16px;
		}

		.screen-tray::before {
			inset: 3px;
			border-radius: 13px;
		}

		.frame-header {
			top: 12px;
			left: 12px;
			right: 12px;
			flex-direction: column;
			gap: 10px;
			align-items: stretch;
		}

		.frame-nav {
			gap: 8px;
			justify-content: center;
		}

		.frame-nav-button {
			padding: 5px 12px 5px 8px;
			column-gap: 6px;
			row-gap: 3px;
		}

		.button-number {
			font-size: 24px;
		}

		.button-label {
			font-size: 10px;
		}

		.social-links {
			justify-content: center;
			gap: 10px;
		}

		.social-button {
			width: 32px;
			height: 32px;
		}

		.social-icon {
			width: 14px;
			height: 14px;
		}

		.frame-footer {
			left: 14px;
			right: 14px;
			bottom: 6px;
		}


		.tv-content {
			padding: 1.75rem 1.1rem 2rem;
		}

		.osd {
			top: 0.9rem;
			right: 1rem;
		}

		.osd-channel {
			font-size: 34px;
		}

		.osd-label {
			font-size: 16px;
		}
	}
</style>
