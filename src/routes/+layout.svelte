<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import { page } from '$app/stores';

	let { children } = $props();
	
	// Check if we're on the home page
	const isHomePage = $derived($page.url.pathname === '/');
	
	const navButtons = [
		{ href: '/', label: 'HOME' },
		{ href: '/about', label: 'ABOUT' },
		{ href: '/experimental', label: 'EXPERIMENTAL' },
		{ href: '/portfolio', label: 'PORTFOLIO' }
	];
	
	function isActive(href: string) {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Aryan Srivastava</title>
</svelte:head>

<div class="tv-container">
	<div class="tv-frame">
		<!-- Frame Navigation and Social Links -->
		<div class="frame-header">
			<div class="frame-nav">
				{#each navButtons as button}
					<a 
						href={button.href}
						class="frame-nav-button"
						class:active={isActive(button.href)}
					>
						<span class="button-label">{button.label}</span>
						<div class="button-indicator" class:lit={isActive(button.href)}></div>
					</a>
				{/each}
			</div>
			
			<div class="social-links">
				<a href="https://github.com/aryan096" target="_blank" rel="noopener noreferrer" class="social-button" title="GitHub">
					<svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
				</a>
				<a href="https://www.linkedin.com/in/aryan096/" target="_blank" rel="noopener noreferrer" class="social-button" title="LinkedIn">
					<svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				</a>
				<a href="https://x.com/ary_sriv" target="_blank" rel="noopener noreferrer" class="social-button" title="X (Twitter)">
					<svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
				</a>
				<a href="mailto:srivastava@devdatalab.org" class="social-button" title="Email">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="social-icon">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
					</svg>
				</a>
			</div>
		</div>
		
		<div class="tv-screen">
			<div class="scanlines"></div>
			<div class="crt-glow"></div>
			{#if isHomePage}
				<!-- Home page: icons and doodles -->
				{@render children()}
			{:else}
				<!-- Content pages: with padding -->
				<div class="tv-content">
					<div class="content-wrapper">
						{@render children()}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.tv-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg);
		overflow: hidden;
	}
	
	.tv-frame {
		width: 95vw;
		height: 95vh;
		max-width: 1400px;
		max-height: 900px;
		background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
		border-radius: 20px;
		padding: 30px;
		padding-top: 80px;
		box-shadow: 
			0 0 50px rgba(0, 0, 0, 0.8),
			inset 0 0 20px rgba(0, 0, 0, 0.5),
			inset 0 2px 0 rgba(255, 255, 255, 0.1);
		position: relative;
	}
	
	.frame-header {
		position: absolute;
		top: 15px;
		left: 30px;
		right: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 100;
	}
	
	.frame-nav {
		display: flex;
		gap: 15px;
	}
	
	.social-links {
		display: flex;
		gap: 12px;
	}
	
	.frame-nav-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		background: linear-gradient(180deg, #3a3a3a, #2a2a2a);
		border: 2px solid #1a1a1a;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		text-decoration: none;
		box-shadow: 
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			0 2px 4px rgba(0, 0, 0, 0.3);
	}
	
	.frame-nav-button:hover {
		background: linear-gradient(180deg, #4a4a4a, #3a3a3a);
		transform: translateY(-1px);
	}
	
	.frame-nav-button:active {
		transform: translateY(0);
		box-shadow: 
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			inset 0 2px 4px rgba(0, 0, 0, 0.4);
	}
	
	.button-label {
		font-size: 11px;
		font-weight: 600;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-family: var(--font-mono);
	}
	
	.frame-nav-button.active .button-label {
		color: var(--color-accent-bright);
		text-shadow: 0 0 8px var(--color-accent-bright);
	}
	
	.button-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #333;
		border: 1px solid #222;
		transition: all 0.2s;
	}
	
	.button-indicator.lit {
		background: var(--color-accent-bright);
		box-shadow: 
			0 0 8px var(--color-accent-bright),
			0 0 12px var(--color-accent-bright),
			inset 0 0 4px rgba(255, 255, 255, 0.5);
		border-color: var(--color-accent-bright);
	}
	
	.social-button {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(180deg, #3a3a3a, #2a2a2a);
		border: 2px solid #1a1a1a;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s;
		text-decoration: none;
		color: #888;
		box-shadow: 
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			0 2px 4px rgba(0, 0, 0, 0.3);
	}
	
	.social-button:hover {
		background: linear-gradient(180deg, #4a4a4a, #3a3a3a);
		color: var(--color-accent-bright);
		transform: translateY(-1px);
		box-shadow: 
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			0 3px 6px rgba(0, 0, 0, 0.4),
			0 0 8px var(--color-accent-bright);
	}
	
	.social-button:active {
		transform: translateY(0);
	}
	
	.social-icon {
		width: 18px;
		height: 18px;
	}
	
	.tv-screen {
		width: 100%;
		height: 100%;
		background: var(--color-bg);
		border-radius: 10px;
		position: relative;
		overflow: hidden;
		box-shadow: 
			inset 0 0 30px rgba(0, 0, 0, 0.5),
			inset 0 0 60px rgba(0, 200, 100, 0.03);
	}
	
	.scanlines {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.1) 0px,
			rgba(0, 0, 0, 0.1) 1px,
			transparent 1px,
			transparent 2px
		);
		z-index: 10;
	}
	
	.crt-glow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		background: radial-gradient(
			ellipse at center,
			rgba(0, 255, 100, 0.02) 0%,
			transparent 60%
		);
		z-index: 5;
	}
	
	.tv-content {
		position: relative;
		z-index: 20;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		overflow-y: auto;
	}
	
	.content-wrapper {
		flex: 1;
		max-width: 800px;
		margin: 0 auto;
		width: 100%;
	}
	
	@media (max-width: 768px) {
		.tv-frame {
			width: 100vw;
			height: 100vh;
			max-width: none;
			max-height: none;
			border-radius: 0;
			padding: 15px;
			padding-top: 105px;
		}
		
		.frame-header {
			top: 12px;
			left: 15px;
			right: 15px;
			flex-direction: column;
			gap: 8px;
			align-items: stretch;
		}
		
		.frame-nav {
			gap: 6px;
			flex-wrap: nowrap;
			justify-content: center;
			overflow-x: auto;
			scrollbar-width: none;
		}
		
		.frame-nav::-webkit-scrollbar {
			display: none;
		}
		
		.frame-nav-button {
			padding: 6px 10px;
			gap: 3px;
			flex-shrink: 0;
		}
		
		.button-label {
			font-size: 9px;
			letter-spacing: 0.3px;
		}
		
		.button-indicator {
			width: 6px;
			height: 6px;
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
			width: 16px;
			height: 16px;
		}
		
		.tv-content {
			padding: 1rem;
		}
	}
</style>
