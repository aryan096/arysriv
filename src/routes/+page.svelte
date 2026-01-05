<script lang="ts">
	// Home page
	import portrait from '$lib/assets/portrait.jpg';
</script>

<svelte:head>
	<title>Aryan Srivastava</title>
	<meta name="description" content="Personal website of Aryan Srivastava" />
</svelte:head>

<div class="space-y-8">
	<!-- Portrait -->
	<img 
		src={portrait} 
		alt="Aryan Srivastava" 
		class="w-32 h-32 rounded-full object-cover border border-[var(--color-border)]"
	/>
	
	<!-- Greeting -->
	<div>
		<h1 class="text-2xl font-semibold mb-4">Hey, I'm Aryan <span class="wave">👋</span></h1>
		<div class="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
			<p>
				I'm a Data Scientist at <a href="https://devdatalab.org" target="_blank" rel="noopener noreferrer">Development Data Lab</a>, 
				where I work on creating novel open data resources, and using large-scale data to drive impactful evidence-based policy research.
            </p>
			<p>
				Some of my work includes harnessing large language models to digitize granular data from the 1951 Indian Population Census, developing novel
                algorithms to define urban areas across the world using satellite imagery, building interactive data visualizations for a global urban data platform,
                and building data pipelines to create and/or process large-scale data for development economics research.
			</p>
			<p>
                I'm also exploring the intersections of interactive digital media, data science, and the social sciences, specifically focusing on 
                the future of the internet, digital public goods, and equitable access to information.
			</p>
		</div>
	</div>
	
	<!-- Quick links -->
	<div class="pt-4">
		<p class="text-[var(--color-text-muted)]">
			Learn more <a href="/about">about me</a>, check out my <a href="/projects">projects</a>, 
			or get in touch via <a href="mailto:srivastava@devdatalab.org">email</a>.
		</p>
	</div>
</div>

<style>
	.wave {
		display: inline-block;
		animation: wave 2.5s infinite;
		transform-origin: 70% 70%;
	}
	
	@keyframes wave {
		0%, 60%, 100% { transform: rotate(0deg); }
		10%, 30% { transform: rotate(14deg); }
		20% { transform: rotate(-8deg); }
		40% { transform: rotate(-4deg); }
		50% { transform: rotate(10deg); }
	}
</style>
