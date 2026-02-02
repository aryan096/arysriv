<script lang="ts">
	// Home page with icons and decorative elements
</script>

<svelte:head>
	<title>Aryan Srivastava</title>
	<meta name="description" content="Personal website of Aryan Srivastava" />
</svelte:head>

<div class="home-screen">
	<!-- Central content -->
	<div class="home-content">
		<div class="ascii-art">
			<pre>
   ▄▀█ █▀█ █▄█ ▄▀█ █▄ █   █▀ █▀█ █ █ █ ▄▀█ █▀ ▀█▀ ▄▀█ █ █ ▄▀█
   █▀█ █▀▄  █  █▀█ █ ▀█   ▄█ █▀▄ █ ▀▄▀ █▀█ ▄█  █  █▀█ ▀▄▀ █▀█
			</pre>
		</div>
		
		<div class="status-text">
			<p>&gt; Data Scientist @ Development Data Lab</p>
			<p>&gt; Building digital tools for social impact</p>
		</div>
		
		<div class="terminal-header">
			<span class="blink">█</span> IN TRANSIT
		</div>
	</div>
	
	<!-- Status bar at bottom -->
	<div class="status-bar">
		<span>STATUS: ACTIVE</span>
		<span class="separator">|</span>
		<span>LOCATION: BANGALORE</span>
		<span class="separator">|</span>
		<span>READY</span>
	</div>
</div>

<style>
	.home-screen {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		z-index: 20;
	}
	
	.home-content {
		text-align: center;
		max-width: 100%;
		width: 100%;
	}
	
	.terminal-header {
		font-size: 14px;
		color: var(--color-accent-bright);
		text-shadow: 0 0 10px var(--color-accent-bright);
		margin-top: 3rem;
		letter-spacing: 2px;
	}
	
	.ascii-art {
		margin: 2rem 0;
		filter: drop-shadow(0 0 8px var(--color-accent-bright));
		display: flex;
		justify-content: center;
		width: 100%;
	}
	
	.ascii-art pre {
		font-size: clamp(8px, 2.5vw, 20px);
		line-height: 1.2;
		color: var(--color-accent-bright);
		font-family: var(--font-mono);
		margin: 0;
		display: inline-block;
	}
	
	.status-text {
		margin-top: 2rem;
		font-size: 16px;
		line-height: 1.8;
	}
	
	.status-text p {
		margin: 0.5rem 0;
		color: var(--color-text);
	}
	
	.status-bar {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 1rem;
		font-size: 12px;
		color: var(--color-text-muted);
		text-shadow: 0 0 4px var(--color-text-muted);
	}
	
	.separator {
		color: var(--color-accent-muted);
	}
	
	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}
	
	.blink {
		animation: blink 1s infinite;
	}
	
	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}
	
	@media (max-width: 768px) {
		.home-screen {
			padding: 1rem;
		}
		
		.ascii-art pre {
			font-size: 14px;
		}
		
		.status-text {
			font-size: 14px;
		}
		
		.status-bar {
			font-size: 10px;
			gap: 0.5rem;
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>

