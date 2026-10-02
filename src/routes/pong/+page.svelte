<script lang="ts">
	import { onMount } from 'svelte';

	const WIN_SCORE = 3;

	let court: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();

	// Touch slider: -1 (full left) .. 1 (full right), springs back to 0 on release
	let slide = $state(0);
	let sliderTrack: HTMLDivElement | undefined = $state();
	let activePointer: number | null = null;

	const keys = { left: false, right: false };

	// Once a game ends, input is ignored until the reset button starts a new one
	let gameOver = $state(false);
	let resetTop = $state(0);
	let restart = $state(() => {});

	function handleKeydown(event: KeyboardEvent) {
		if (event.metaKey || event.ctrlKey || event.altKey) return;
		const key = event.key.toLowerCase();
		if (key === 'arrowleft' || key === 'a') keys.left = true;
		else if (key === 'arrowright' || key === 'd') keys.right = true;
		else return;
		event.preventDefault();
	}

	function handleKeyup(event: KeyboardEvent) {
		const key = event.key.toLowerCase();
		if (key === 'arrowleft' || key === 'a') keys.left = false;
		else if (key === 'arrowright' || key === 'd') keys.right = false;
	}

	// Mouse is deliberately ignored; the slider is for fingers only
	function updateSlide(event: PointerEvent) {
		if (!sliderTrack) return;
		const rect = sliderTrack.getBoundingClientRect();
		const half = rect.width / 2;
		const offset = (event.clientX - (rect.left + half)) / half;
		slide = Math.max(-1, Math.min(1, offset));
	}

	// A small dead zone lets a resting thumb hold still, full speed arrives before the track's
	// edge so thumbs needn't reach it, and the mild curve keeps fine nudges near the center
	const DEAD_ZONE = 0.08;
	const FULL_AT = 0.75;

	function sliderCurve(value: number) {
		const t = Math.min(1, Math.max(0, (Math.abs(value) - DEAD_ZONE) / (FULL_AT - DEAD_ZONE)));
		return Math.sign(value) * t ** 1.4;
	}

	function sliderDown(event: PointerEvent) {
		if (event.pointerType === 'mouse' || activePointer !== null) return;
		activePointer = event.pointerId;
		sliderTrack?.setPointerCapture(event.pointerId);
		updateSlide(event);
	}

	function sliderMove(event: PointerEvent) {
		if (event.pointerId === activePointer) updateSlide(event);
	}

	function sliderUp(event: PointerEvent) {
		if (event.pointerId !== activePointer) return;
		activePointer = null;
		slide = 0;
	}

	onMount(() => {
		if (!canvas || !court) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const ink = getComputedStyle(court).getPropertyValue('--ink').trim() || '#d4b8ff';

		let W = 0;
		let H = 0;
		let block = 8; // Ball size and paddle thickness
		let paddleW = 60;

		const player = { x: 0 };
		const cpu = { x: 0, aim: 0 };
		const ball = { x: 0, y: 0, vx: 0, vy: 0 };
		const score = { player: 0, cpu: 0 };

		type Phase = 'ready' | 'serve' | 'play' | 'over';
		let phase: Phase = 'ready';
		let serveTimer = 0;
		let serveDir = 1; // 1 = toward the player at the bottom
		let hits = 0;

		const paddleY = () => ({ cpu: block * 2, player: H - block * 3 });

		// shadowBlur is expensive, so glow is baked once: the net, scores and text into a
		// layer that only redraws when they change, and the paddle and ball into sprites
		const GLOW = 8;
		const coarse = matchMedia('(pointer: coarse)');
		const layer = document.createElement('canvas');
		const layerCtx = layer.getContext('2d')!;
		let layerKey = '';
		let paddleSprite = document.createElement('canvas');
		let ballSprite = document.createElement('canvas');

		function makeSprite(w: number, h: number, dpr: number) {
			const sprite = document.createElement('canvas');
			sprite.width = Math.round((w + GLOW * 2) * dpr);
			sprite.height = Math.round((h + GLOW * 2) * dpr);
			const sctx = sprite.getContext('2d')!;
			sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			sctx.fillStyle = ink;
			sctx.shadowColor = ink;
			sctx.shadowBlur = GLOW;
			sctx.fillRect(GLOW, GLOW, w, h);
			return sprite;
		}
		const baseSpeed = () => Math.max(H * 0.5, 220);

		function resize() {
			if (!court || !canvas || !ctx) return;
			// Layout size, not getBoundingClientRect: the tube's power-on animation scales the screen
			const nextW = Math.max(1, court.clientWidth);
			const nextH = Math.max(1, court.clientHeight);
			const dpr = window.devicePixelRatio || 1;
			canvas.width = Math.round(nextW * dpr);
			canvas.height = Math.round(nextH * dpr);
			canvas.style.width = `${nextW}px`;
			canvas.style.height = `${nextH}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.imageSmoothingEnabled = false;

			// Keep everything where it was, proportionally
			if (W && H) {
				const sx = nextW / W;
				const sy = nextH / H;
				player.x *= sx;
				cpu.x *= sx;
				cpu.aim *= sx;
				ball.x *= sx;
				ball.y *= sy;
				ball.vx *= sx;
				ball.vy *= sy;
			}
			W = nextW;
			H = nextH;
			block = Math.max(6, Math.round(Math.min(W, H) / 55));
			paddleW = Math.max(block * 6, Math.round(W * 0.14));

			layer.width = canvas.width;
			layer.height = canvas.height;
			layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
			layerKey = '';
			paddleSprite = makeSprite(paddleW, block, dpr);
			ballSprite = makeSprite(block, block, dpr);
			if (phase === 'ready') {
				player.x = cpu.x = (W - paddleW) / 2;
				centerBall();
			}
		}

		function centerBall() {
			ball.x = (W - block) / 2;
			ball.y = (H - block) / 2;
			ball.vx = 0;
			ball.vy = 0;
		}

		function queueServe() {
			phase = 'serve';
			serveTimer = 0.9;
			hits = 0;
			centerBall();
		}

		function serve() {
			const speed = baseSpeed();
			ball.vy = speed * serveDir;
			ball.vx = speed * (Math.random() * 0.8 - 0.4);
			cpu.aim = (Math.random() - 0.5) * paddleW * 0.6;
			phase = 'play';
		}

		function resetGame() {
			gameOver = false;
			score.player = score.cpu = 0;
			serveDir = 1;
			queueServe();
		}

		// Where the ball meets the paddle sets the return angle, like the original's segmented paddles
		function bounceOff(paddleX: number, dir: 1 | -1) {
			hits += 1;
			const speed = Math.min(baseSpeed() * (1 + hits * 0.12), H * 2);
			const offset = (ball.x + block / 2 - (paddleX + paddleW / 2)) / (paddleW / 2 + block / 2);
			const segment = Math.round(Math.max(-1, Math.min(1, offset)) * 3) / 3;
			ball.vy = speed * dir;
			ball.vx = speed * segment * 1.1;
		}

		function step(dt: number) {
			const input = keys.left !== keys.right ? (keys.right ? 1 : -1) : sliderCurve(slide);
			const playerSpeed = Math.max(W * 1.3, 560);

			if (phase === 'over') return;
			if (phase === 'ready') {
				if (input !== 0) resetGame();
				return;
			}

			player.x = Math.max(0, Math.min(W - paddleW, player.x + input * playerSpeed * dt));

			// CPU chases the ball when it's coming its way, otherwise drifts home; aim error keeps it beatable
			const cpuSpeed = Math.max(W * 0.5, 260);
			const target =
				phase === 'play' && ball.vy < 0
					? ball.x + block / 2 - paddleW / 2 + cpu.aim
					: (W - paddleW) / 2;
			const delta = target - cpu.x;
			cpu.x += Math.sign(delta) * Math.min(Math.abs(delta), cpuSpeed * dt);
			cpu.x = Math.max(0, Math.min(W - paddleW, cpu.x));

			if (phase === 'serve') {
				serveTimer -= dt;
				if (serveTimer <= 0) serve();
				return;
			}

			const prevY = ball.y;
			ball.x += ball.vx * dt;
			ball.y += ball.vy * dt;

			if (ball.x < 0) {
				ball.x = -ball.x;
				ball.vx = Math.abs(ball.vx);
			} else if (ball.x + block > W) {
				ball.x = 2 * (W - block) - ball.x;
				ball.vx = -Math.abs(ball.vx);
			}

			const { cpu: cpuY, player: playerY } = paddleY();
			const overlaps = (px: number) => ball.x + block >= px && ball.x <= px + paddleW;

			// Sweep the paddle line so fast balls can't tunnel through
			if (ball.vy > 0 && prevY + block <= playerY && ball.y + block >= playerY && overlaps(player.x)) {
				ball.y = playerY - block;
				bounceOff(player.x, -1);
				cpu.aim = (Math.random() - 0.5) * paddleW * (0.6 + hits * 0.08);
			} else if (ball.vy < 0 && prevY >= cpuY + block && ball.y <= cpuY + block && overlaps(cpu.x)) {
				ball.y = cpuY + block;
				bounceOff(cpu.x, 1);
			}

			if (ball.y > H) {
				score.cpu += 1;
				serveDir = 1;
				pointScored();
			} else if (ball.y + block < 0) {
				score.player += 1;
				serveDir = -1;
				pointScored();
			}
		}

		function pointScored() {
			if (score.player >= WIN_SCORE || score.cpu >= WIN_SCORE) {
				phase = 'over';
				gameOver = true;
				centerBall();
			} else {
				queueServe();
			}
		}

		function drawLayer() {
			const c = layerCtx;
			c.clearRect(0, 0, W, H);
			c.fillStyle = ink;
			c.shadowColor = ink;
			c.shadowBlur = GLOW;

			// Net
			const dash = block;
			for (let x = dash / 2; x < W; x += dash * 2) {
				c.fillRect(Math.round(x), Math.round(H / 2 - block / 4), dash, Math.max(2, block / 2));
			}

			// Scores sit either side of the net, CPU above and player below
			const digit = Math.round(Math.min(W, H) * 0.14);
			c.font = `${digit}px VT323, monospace`;
			c.textAlign = 'left';
			c.textBaseline = 'bottom';
			c.fillText(String(score.cpu), block * 3, H / 2 - block);
			c.textBaseline = 'top';
			c.fillText(String(score.player), block * 3, H / 2 + block);

			if (phase === 'ready' || phase === 'over') {
				const title =
					phase === 'ready' ? 'PONG' : score.player > score.cpu ? 'YOU WIN' : 'CPU WINS';
				c.textAlign = 'center';
				c.textBaseline = 'middle';
				c.font = `${Math.round(digit * 0.6)}px VT323, monospace`;
				c.fillText(title, W / 2, H / 2 - digit * 0.9);
				// The reset button takes the prompt's place once a game is over
				resetTop = H / 2 + digit * 0.9;
				if (phase === 'ready') {
					const prompt = coarse.matches ? 'SLIDE TO PLAY' : 'PRESS ← → TO PLAY';
					c.font = `${Math.max(14, Math.round(digit * 0.25))}px VT323, monospace`;
					c.fillText(prompt, W / 2, resetTop);
				}
			}
		}

		function draw() {
			if (!ctx) return;
			const overlay = phase === 'ready' || phase === 'over' ? phase : '';
			const key = `${score.cpu}:${score.player}:${overlay}:${coarse.matches}`;
			if (key !== layerKey) {
				layerKey = key;
				drawLayer();
			}

			ctx.clearRect(0, 0, W, H);
			ctx.drawImage(layer, 0, 0, W, H);

			const { cpu: cpuY, player: playerY } = paddleY();
			const pw = paddleW + GLOW * 2;
			const ph = block + GLOW * 2;
			ctx.drawImage(paddleSprite, Math.round(cpu.x) - GLOW, cpuY - GLOW, pw, ph);
			ctx.drawImage(paddleSprite, Math.round(player.x) - GLOW, playerY - GLOW, pw, ph);

			if (phase === 'serve' || phase === 'play') {
				ctx.drawImage(ballSprite, Math.round(ball.x) - GLOW, Math.round(ball.y) - GLOW, ph, ph);
			}
		}

		let frame = 0;
		let last = performance.now();
		function loop(now: number) {
			const dt = Math.min((now - last) / 1000, 1 / 30);
			last = now;
			step(dt);
			draw();
			frame = requestAnimationFrame(loop);
		}

		// Drop held keys when focus leaves, so the paddle doesn't run away
		const releaseKeys = () => {
			keys.left = keys.right = false;
		};

		restart = () => {
			releaseKeys();
			resetGame();
		};

		const observer = new ResizeObserver(resize);
		observer.observe(court);
		resize();
		window.addEventListener('blur', releaseKeys);
		// Scores and text were drawn in a fallback font until VT323 arrives
		document.fonts?.ready.then(() => {
			layerKey = '';
		});
		frame = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener('blur', releaseKeys);
		};
	});
</script>

<svelte:head>
	<title>Pong | Aryan Srivastava</title>
	<meta name="description" content="A game of Pong, the way it was first played" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} onkeyup={handleKeyup} />

<div class="pong-screen">
	<div class="court" bind:this={court}>
		<canvas bind:this={canvas} aria-label="Pong. Move your paddle with the left and right arrow keys."
		></canvas>
		{#if gameOver}
			<button class="reset" style:top="{resetTop}px" onclick={restart}>↻ PLAY AGAIN</button>
		{/if}
	</div>

	<div
		class="slider"
		bind:this={sliderTrack}
		onpointerdown={sliderDown}
		onpointermove={sliderMove}
		onpointerup={sliderUp}
		onpointercancel={sliderUp}
		aria-hidden="true"
	>
		<span class="slider-center"></span>
		<span class="slider-fill" style:left="{50 + Math.min(slide, 0) * 50}%" style:width="{Math.abs(slide) * 50}%"
		></span>
		<span class="slider-thumb" class:held={slide !== 0} style:left="{50 + slide * 50}%"></span>
	</div>

	<p class="hint">← → or A D to move · first to {WIN_SCORE}</p>
</div>

<style>
	.pong-screen {
		--ink: var(--color-accent-bright);

		position: relative;
		z-index: 20;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 1.25rem 1.5rem 0.75rem;
	}

	.court {
		flex: 1;
		min-height: 0;
		position: relative;
	}

	/* Desktop: a narrower, darker court centred on the tube */
	@media (min-width: 769px) {
		.court {
			width: 75%;
			margin: 0 auto;
			background: rgba(0, 0, 0, 0.55);
			box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent-muted) 35%, transparent);
		}
	}

	canvas {
		position: absolute;
		inset: 0;
		display: block;
	}

	.reset {
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 0.3rem 0.9rem;
		font-family: var(--font-display);
		font-size: 20px;
		letter-spacing: 1px;
		color: var(--ink);
		background: rgba(0, 0, 0, 0.4);
		border: 2px solid var(--ink);
		box-shadow: 0 0 8px var(--ink);
		text-shadow: 0 0 6px var(--ink);
		cursor: pointer;
	}

	.reset:hover,
	.reset:focus-visible {
		color: #000;
		background: var(--ink);
		text-shadow: none;
		outline: none;
	}

	.hint {
		margin: 0.5rem 0 0;
		text-align: center;
		font-size: 12px;
		color: var(--color-text-muted);
		text-shadow: 0 0 4px var(--color-text-muted);
	}

	/* Only shown on touch screens */
	.slider {
		display: none;
		position: relative;
		height: 52px;
		margin-top: 0.75rem;
		border: 2px solid var(--color-accent-muted);
		background: color-mix(in srgb, var(--color-accent-muted) 15%, transparent);
		touch-action: none;
		user-select: none;
		-webkit-user-select: none;
	}

	.slider-center {
		position: absolute;
		left: 50%;
		top: 6px;
		bottom: 6px;
		width: 2px;
		transform: translateX(-50%);
		background: var(--color-accent-muted);
	}

	.slider-fill {
		position: absolute;
		top: 50%;
		height: 6px;
		transform: translateY(-50%);
		background: var(--color-accent);
		box-shadow: 0 0 8px var(--color-accent);
	}

	.slider-thumb {
		position: absolute;
		top: 50%;
		width: 22px;
		height: 36px;
		transform: translate(-50%, -50%);
		background: var(--ink);
		box-shadow: 0 0 10px var(--ink);
		transition: left 0.12s ease-out;
	}

	.slider-thumb.held {
		transition: none;
	}

	@media (pointer: coarse) {
		.slider {
			display: block;
		}

		.hint {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.pong-screen {
			padding: 1rem 0.9rem 0.9rem;
		}
	}
</style>
