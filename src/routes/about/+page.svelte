<script lang="ts">
	// About + CV page
</script>

<svelte:head>
	<title>About | Aryan Srivastava</title>
	<meta name="description" content="About Aryan Srivastava - Data Scientist at Development Data Lab" />
</svelte:head>

<div class="space-y-10">
	<div>
		<h1 class="text-2xl font-semibold mb-6">About Me</h1>
		<div class="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
			<p>
				I grew up in Lucknow, India, where I completed my schooling before moving to the United States to study at Brown University. 
                There, I earned an Sc.B. with Honors in Computer Science and developed a strong interest in data science and machine learning, 
                particularly their applications to societal questions. 
            </p>
            <p>
                My honors thesis explored how low-level design 
                choices in social media platforms can be reimagined to mitigate issues 
                such as misinformation and echo chambers. 
                Alongside this, I contributed to multiple research projects, including building models to analyze large-scale Reddit 
                discussions around marijuana legalization in the U.S., 
                developing methods to study hate speech on a major Indian social media platform, 
                and creating an open database of geolocated villages and Panchayat election candidates in Uttar Pradesh. 
            </p>
            <p>
            Outside academics, I co-founded the Brown–RISD Innovation community, sang in an a cappella group, worked at the Ladd Observatory, and broadly learned how to collaborate, and grow in diverse settings.
            </p>    

            <p>
                After graduating, I chose to work at the intersection of technology, social impact, and public policy. 
                I am currently a Data Scientist based in Bangalore at <a href="https://devdatalab.org" target="_blank" rel="noopener noreferrer">Development Data Lab</a>, where I apply data science, machine learning, and software engineering 
                to problems in development economics and policy. A central part of my work involves building high-quality open data resources and analytical tools 
                intended for public use and research.
            </p>

            <p>
                My hobbies include (but are not limited to):
            </p>

            <ul class="list-disc list-inside mt-2">
                <li>Photography</li>
                <li>Digital Art</li>
                <li>Game Design and Development</li>
                <li>Cooking</li>
                <li>Protecting my plants from my cats</li>
            </ul>

		</div>
	</div>
	
	<!-- Education -->
	<div>
		<h2 class="text-xl font-semibold mb-4">Education</h2>
		<div class="space-y-4">
			<div class="border-l-2 border-[var(--color-border)] pl-4">
				<h3 class="font-medium">Sc.B Honors in Computer Science</h3>
				<p class="text-sm text-[var(--color-accent)]">Brown University</p>
				<p class="text-sm text-[var(--color-text-muted)]">2018 – 2022.5</p>
			</div>
		</div>
	</div>
	
	<!-- Documents -->
	<div>
		<h2 class="text-xl font-semibold mb-4">Documents</h2>
		<div class="flex flex-wrap gap-4">
			<a 
				href="/documents/resume.pdf" 
				class="inline-flex items-center gap-2 bg-[var(--color-bg-secondary)] px-4 py-2 rounded border border-[var(--color-border)] hover:border-[var(--color-accent-muted)] transition-colors"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
				<span>Download Resume</span>
			</a>
			<!-- <a 
				href="/documents/resume.pdf" 
				class="inline-flex items-center gap-2 bg-[var(--color-bg-secondary)] px-4 py-2 rounded border border-[var(--color-border)] hover:border-[var(--color-accent-muted)] transition-colors"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
				<span>Resume (1-page)</span>
			</a> -->
		</div>
		<!-- <p class="text-sm text-[var(--color-text-muted)] mt-3">
			* Add your PDF files to <code class="text-[var(--color-accent)]">static/documents/</code>
		</p> -->
	</div>
</div>
