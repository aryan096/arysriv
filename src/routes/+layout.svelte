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

	const lines = [
		{
			href: 'https://github.com/aryan096',
			label: 'GITHUB',
			external: true,
			stroke: false,
			icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
		},
		{
			href: 'https://www.linkedin.com/in/aryan096/',
			label: 'LINKEDIN',
			external: true,
			stroke: false,
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
		},
		{
			href: 'https://x.com/ary_sriv',
			label: 'X',
			external: true,
			stroke: false,
			icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
		},
		{
			href: 'mailto:aryansrivastava096@gmail.com',
			label: 'MAIL',
			external: false,
			stroke: true,
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		}
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

	// Channel number for the current page; pages without a button (e.g. unknown routes) read as AV input
	const channelIndex = $derived(channels.findIndex((c) => isActive(c.href)));
	const osdChannel = $derived(channelIndex === -1 ? 'AV' : `CH ${String(channelIndex + 1).padStart(2, '0')}`);
	const osdLabel = $derived(channelIndex === -1 ? 'INPUT' : channels[channelIndex].label);

	let switches = $state(0);
	let osdVisible = $state(false);
	let tallyLive = $state(false);
	let osdTimer: ReturnType<typeof setTimeout> | undefined;
	let tallyTimer: ReturnType<typeof setTimeout> | undefined;

	function showOsd() {
		osdVisible = true;
		clearTimeout(osdTimer);
		osdTimer = setTimeout(() => (osdVisible = false), 1600);
	}

	let powered = $state(true);

	function togglePower() {
		powered = !powered;
		if (powered) setTimeout(showOsd, 450);
		else osdVisible = false;
	}

	// Picture collapses to a bright line, then to a dot, like a CRT losing its sweep
	function powerOff(_node: Element, { duration = 260 } = {}) {
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		return {
			duration: reduce ? 0 : duration,
			css: (t: number) => {
				if (t > 0.45) {
					const sy = Math.max((t - 0.45) / 0.55, 0.004);
					return `transform: scale(1, ${sy}); filter: brightness(${1 + (1 - sy) * 5}) saturate(${sy});`;
				}
				const sx = Math.max(t / 0.45, 0.004);
				return `transform: scale(${sx}, 0.004); filter: brightness(6) saturate(0); opacity: ${0.4 + sx * 0.6};`;
			}
		};
	}

	afterNavigate(({ from, to, type }) => {
		if (type === 'enter' || !from || from.url.pathname === to?.url.pathname) return;
		// Picking a channel on a dark set switches it on, like a real TV
		if (!powered) {
			togglePower();
			return;
		}
		switches += 1;
		showOsd();
		// Tally lamp fires while the picture rolls in
		tallyLive = true;
		clearTimeout(tallyTimer);
		tallyTimer = setTimeout(() => (tallyLive = false), 400);
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
		const target = event.target as HTMLElement | null;
		if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;

		const channel = channels[Number(event.key) - 1];
		if (!channel) return;
		if ($page.url.pathname === channel.href) {
			if (!powered) togglePower();
			else showOsd();
			return;
		}
		goto(resolve(channel.href));
	}

	onMount(() => {
		// Announce the channel once the screen has warmed up
		const warmUp = setTimeout(showOsd, 650);
		return () => {
			clearTimeout(warmUp);
			clearTimeout(osdTimer);
			clearTimeout(tallyTimer);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Aryan Srivastava</title>
	<link rel="canonical" href={`https://www.arysriv.com${$page.url.pathname}`} />
	<meta property="og:site_name" content="Aryan Srivastava" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://www.arysriv.com${$page.url.pathname}`} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@ary_sriv" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="tv-container">
	<div class="tv-frame" class:standby={!powered}>
		<div class="frame-top">
			<nav class="buttons" aria-label="Channels">
				{#each channels as channel, i (channel.href)}
					<a
						href={resolve(channel.href)}
						class="panel-button"
						class:active={isActive(channel.href)}
						aria-current={isActive(channel.href) ? 'page' : undefined}
						aria-keyshortcuts={String(i + 1)}
					>
						<span class="cap lamp" aria-hidden="true"></span>
						<span class="label"><span aria-hidden="true">{i + 1}&nbsp;</span>{channel.label}</span>
					</a>
				{/each}
			</nav>
			<span class="tally" class:live={tallyLive} aria-hidden="true">
				<i></i>
			</span>
		</div>

		<div class="bezel">
			<div class="tv-screen">
				{#if powered}
				<div class="screen-power" out:powerOff>
					{#key $page.url.pathname}
						<div class="tune-in" class:rolling={switches > 0}>
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
				{:else}
					<div class="afterglow" aria-hidden="true"></div>
				{/if}

				<div class="grille" aria-hidden="true"></div>
				<div class="safe-area" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
				<div class="glass" aria-hidden="true"></div>

				{#key switches}
					{#if switches > 0}
						<div class="roll-bar" aria-hidden="true"></div>
					{/if}
				{/key}

				<div class="osd" class:visible={osdVisible} aria-hidden="true">
					<span class="osd-channel">{osdChannel}</span>
					<span class="osd-label">{osdLabel}</span>
				</div>
			</div>
		</div>

		<footer class="panel">
			<div class="group power-group">
				<button
					type="button"
					class="power"
					class:off={!powered}
					aria-pressed={powered}
					aria-label={powered ? 'Turn the TV off' : 'Turn the TV on'}
					onclick={togglePower}
				>
					<i aria-hidden="true"></i>
				</button>
			</div>

			<div class="group">
				<div class="buttons">
					{#each lines as line (line.href)}
						<a
							href={line.href}
							class="panel-button line"
							target={line.external ? '_blank' : undefined}
							rel={line.external ? 'noopener noreferrer' : undefined}
						>
							<span class="cap" aria-hidden="true">
								{#if line.stroke}
									<svg viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={line.icon} /></svg>
								{:else}
									<svg viewBox="0 0 24 24" class="icon" fill="currentColor"><path d={line.icon} /></svg>
								{/if}
							</span>
							<span class="label">{line.label}</span>
						</a>
					{/each}
				</div>
			</div>

		</footer>
	</div>
</div>

<style>
	.tv-container {
		--case-hi: #26282c;
		--case: #1c1d20;
		--case-edge: #0b0b0c;
		--print: #c9cbd0;
		--print-dim: #74767c;
		--print-rule: #3a3c41;
		--key-hi: #4a4d53;
		--key: #36383d;
		--lamp: #5dff7a;
		--tally: #ff3b30;
		--f-panel: 'IBM Plex Sans Condensed', 'Arial Narrow', system-ui, sans-serif;

		width: 100vw;
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2.5dvh 2.5vw;
		background:
			radial-gradient(ellipse 70% 40% at 50% 0%, #17181b, transparent 70%),
			var(--color-bg);
		overflow: hidden;
	}

	/* ---------- Cabinet ---------- */

	/* Flat matte charcoal: the tube carries the color, the case stays out of the way */
	.tv-frame {
		width: 100%;
		height: 100%;
		max-width: 1400px;
		max-height: 900px;
		display: flex;
		flex-direction: column;
		padding: 14px 20px 0;
		background:
			repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.012) 0 1px, transparent 1px 3px),
			linear-gradient(180deg, var(--case-hi), var(--case));
		border-radius: 12px;
		box-shadow:
			0 40px 80px -24px rgba(0, 0, 0, 0.95),
			0 0 0 1px var(--case-edge),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	.frame-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 4px 12px;
		font-family: var(--f-panel);
	}

	.tally {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 9px;
		font-weight: 500;
		letter-spacing: 0.25em;
		color: #8b8d93;
	}

	.tally i {
		width: 34px;
		height: 10px;
		border-radius: 2px;
		background: #3a1414;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.7);
		transition:
			background 0.1s ease,
			box-shadow 0.1s ease;
	}

	.tally.live i {
		background: var(--tally);
		box-shadow:
			0 0 8px var(--tally),
			0 0 22px color-mix(in srgb, var(--tally) 50%, transparent);
	}

	.bezel {
		flex: 1;
		min-height: 0;
		padding: 10px;
		background: #0d0e10;
		border-radius: 7px;
		box-shadow:
			inset 0 0 0 1px #000,
			0 1px 0 rgba(255, 255, 255, 0.06);
	}

	/* ---------- Control strip ---------- */

	.panel {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px 28px;
		padding: 14px 4px 16px;
		font-family: var(--f-panel);
	}

	.group {
		display: grid;
		gap: 7px;
	}

	.buttons {
		display: flex;
		gap: 10px;
	}

	/* Label-less key: center it in the strip instead of sitting on the baseline */
	.power-group {
		align-self: center;
	}

	.panel-button {
		display: grid;
		justify-items: center;
		gap: 5px;
		text-decoration: none;
		text-shadow: none;
		color: var(--print);
	}

	.panel-button:hover {
		background: none;
		color: #fff;
	}

	.cap {
		position: relative;
		width: 52px;
		height: 22px;
		border-radius: 3px;
		background: linear-gradient(var(--key-hi), var(--key));
		border: 1px solid var(--case-edge);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.15),
			0 3px 0 var(--case-edge);
		transition:
			transform 0.07s ease,
			box-shadow 0.07s ease,
			background 0.15s ease;
	}

	.line .cap {
		display: grid;
		place-items: center;
		width: 40px;
		color: var(--print);
		background: linear-gradient(#2e3034, #232428);
	}

	.panel-button:hover .cap {
		background: linear-gradient(#55585f, #3d4045);
	}

	.icon {
		width: 12px;
		height: 12px;
	}

	.line:hover .cap {
		color: #fff;
		background: linear-gradient(#3a3c41, #2b2d31);
	}

	.panel-button:active .cap,
	.panel-button.active .cap {
		transform: translateY(2px);
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);
	}

	/* Status lamp inside the channel key */
	.lamp::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		width: 16px;
		height: 4px;
		border-radius: 1px;
		background: #1a2a1d;
		transition:
			background 0.12s ease,
			box-shadow 0.12s ease;
	}

	.panel-button.active .lamp::after {
		background: var(--lamp);
		box-shadow: 0 0 7px var(--lamp);
	}

	/* Everything that draws light goes dark in standby */
	.standby .panel-button.active .lamp::after {
		background: #1a2a1d;
		box-shadow: none;
	}

	.standby .safe-area {
		opacity: 0;
	}

	.label {
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.16em;
		white-space: nowrap;
	}

	.power {
		display: grid;
		justify-items: center;
		gap: 5px;
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		color: var(--print);
		cursor: pointer;
	}

	.power:hover {
		color: #fff;
	}

	.power:hover i {
		background: linear-gradient(#45474d, #303136);
	}

	.power:active i {
		transform: translateY(2px);
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);
	}

	.power i {
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 3px;
		background: linear-gradient(#3b3d42, #2a2b2f);
		border: 1px solid var(--case-edge);
		box-shadow: 0 3px 0 var(--case-edge);
		transition:
			transform 0.07s ease,
			box-shadow 0.07s ease;
	}

	.power i::after {
		content: '';
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--lamp);
		box-shadow: 0 0 7px var(--lamp);
		transition:
			background 0.15s ease,
			box-shadow 0.15s ease;
	}

	/* Standby: lamp goes dark */
	.power.off i::after {
		background: #1a2a1d;
		box-shadow: none;
	}

	/* ---------- Screen ---------- */

	/* Egg-white phosphor */
	.tv-screen {
		width: 100%;
		height: 100%;
		color: var(--color-text);
		text-shadow: 0 0 0.35em rgba(245, 239, 224, 0.2);
		background: radial-gradient(ellipse 80% 80% at 50% 45%, #0f0f0d, #090908 70%);
		border-radius: 10px / 14px;
		position: relative;
		overflow: hidden;
		isolation: isolate;
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
	}

	/* Vertical hold slips and settles on a channel change */
	.tune-in.rolling {
		animation: vertical-roll 0.22s cubic-bezier(0.2, 0.7, 0.2, 1) both;
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

	.grille,
	.safe-area,
	.glass,
	.roll-bar {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	/* RGB aperture grille with a faint line structure */
	.grille {
		z-index: 30;
		mix-blend-mode: multiply;
		opacity: 0.14;
		background:
			repeating-linear-gradient(
				90deg,
				rgba(255, 90, 90, 0.9) 0 1px,
				rgba(90, 255, 120, 0.9) 1px 2px,
				rgba(100, 120, 255, 0.9) 2px 3px
			),
			repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0 1px, transparent 1px 3px);
	}

	/* Underscan corner marks */
	.safe-area {
		z-index: 31;
		inset: 10px;
	}

	.safe-area i {
		position: absolute;
		width: 16px;
		height: 16px;
		border: 0 solid rgba(235, 228, 210, 0.2);
	}

	.safe-area i:nth-child(1) { top: 0; left: 0; border-top-width: 1px; border-left-width: 1px; }
	.safe-area i:nth-child(2) { top: 0; right: 0; border-top-width: 1px; border-right-width: 1px; }
	.safe-area i:nth-child(3) { bottom: 0; left: 0; border-bottom-width: 1px; border-left-width: 1px; }
	.safe-area i:nth-child(4) { bottom: 0; right: 0; border-bottom-width: 1px; border-right-width: 1px; }

	/* Corner falloff and a sliver of room light on the glass */
	.glass {
		z-index: 32;
		border-radius: inherit;
		background:
			radial-gradient(ellipse 55% 30% at 28% 6%, rgba(255, 255, 255, 0.06), transparent 70%),
			radial-gradient(ellipse 80% 75% at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.6) 100%);
		box-shadow:
			inset 0 0 50px rgba(0, 0, 0, 0.7),
			inset 0 0 8px rgba(0, 0, 0, 0.9);
	}

	.roll-bar {
		z-index: 33;
		inset: auto 0;
		height: 18%;
		opacity: 0;
		background: linear-gradient(
			transparent,
			rgba(235, 228, 210, 0.06) 45%,
			rgba(255, 255, 255, 0.08) 50%,
			transparent
		);
		animation: roll-bar 0.22s linear both;
	}

	.afterglow {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 6px;
		height: 6px;
		translate: -50% -50%;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 0 10px 3px rgba(235, 228, 210, 0.6);
		opacity: 0;
		animation: afterglow 1.1s ease-out 0.24s both;
	}

	@keyframes afterglow {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scale(0.3);
		}
	}

	.osd {
		position: absolute;
		top: 1.5rem;
		right: 2rem;
		z-index: 45;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		font-family: var(--font-mono);
		color: #fff;
		text-shadow: 0 0 0.15em rgba(255, 255, 255, 0.6);
		opacity: 0;
		pointer-events: none;
	}

	.osd.visible {
		opacity: 1;
	}

	.osd-channel {
		font-size: 28px;
		font-weight: 600;
		line-height: 1;
	}

	.osd-label {
		font-size: 12px;
		letter-spacing: 0.16em;
		margin-top: 4px;
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

	@keyframes vertical-roll {
		0% {
			transform: translateY(-3%);
			filter: brightness(1.25);
			opacity: 0.6;
		}
		60% {
			transform: translateY(0.6%);
			opacity: 1;
		}
		100% {
			transform: none;
			filter: none;
		}
	}

	@keyframes roll-bar {
		0% {
			top: -20%;
			opacity: 1;
		}
		100% {
			top: 110%;
			opacity: 0.2;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.screen-power,
		.tune-in.rolling {
			animation: none;
		}

		.roll-bar,
		.afterglow {
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
			padding: 10px 8px 0;
			box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
		}

		.frame-top {
			padding-bottom: 8px;
		}

		/* No power switch on phones */
		.power-group {
			display: none;
		}


		.bezel {
			padding: 6px;
		}

		.panel {
			flex-direction: column;
			align-items: stretch;
			gap: 10px;
			padding: 10px 0 12px;
		}

		.buttons {
			justify-content: center;
		}

		.cap {
			width: 46px;
		}

		.line .cap {
			width: 34px;
		}

		.tv-content {
			padding: 1.75rem 1.1rem 2rem;
		}

		.osd {
			top: 0.9rem;
			right: 1rem;
		}

		.osd-channel {
			font-size: 22px;
		}

		.osd-label {
			font-size: 11px;
		}
	}
</style>
