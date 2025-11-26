<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	
	let menuOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
</svelte:head>

<nav class="nav-premium fixed top-0 left-0 right-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-20">
			<a href="/" class="nav-logo text-3xl font-black tracking-tight">
				JORDEGA
			</a>
			
			<!-- Desktop Menu -->
			<div class="hidden md:flex items-center space-x-10">
				<a href="/about" class="nav-link">About</a>
				<a href="/#packages" class="nav-link">Packages</a>
				<a href="/#portfolio" class="nav-link">Portfolio</a>
				<a href="/costuming" class="nav-link">Costuming</a>
				<a href="/faq" class="nav-link">FAQ</a>
				<a href="/#contact" class="nav-btn">Contact</a>
			</div>
			
			<!-- Mobile Menu Button -->
			<button
				onclick={() => menuOpen = !menuOpen}
				class="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
				aria-label="Toggle menu"
			>
				<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if menuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
					{/if}
				</svg>
			</button>
		</div>
		
		<!-- Mobile Menu -->
		{#if menuOpen}
			<div class="md:hidden pb-6 space-y-4 pt-4 border-t border-white/10">
				<a href="/about" onclick={() => menuOpen = false} class="block nav-link-mobile py-3">About</a>
				<a href="/#packages" onclick={() => menuOpen = false} class="block nav-link-mobile py-3">Packages</a>
				<a href="/#portfolio" onclick={() => menuOpen = false} class="block nav-link-mobile py-3">Portfolio</a>
				<a href="/costuming" onclick={() => menuOpen = false} class="block nav-link-mobile py-3">Costuming</a>
				<a href="/faq" onclick={() => menuOpen = false} class="block nav-link-mobile py-3">FAQ</a>
				<a href="/#contact" onclick={() => menuOpen = false} class="block nav-btn-mobile text-center py-3">Contact</a>
			</div>
		{/if}
	</div>
</nav>

<div class="pt-20">
	{@render children()}
</div>

<style>
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		margin: 0;
		padding: 0;
	}

	.nav-premium {
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%);
		backdrop-filter: blur(20px);
		border-bottom: 2px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5),
					0 0 40px rgba(255, 255, 255, 0.05) inset;
	}

	.nav-logo {
		background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: chrome-shift-nav 4s ease infinite;
		filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
		text-decoration: none;
		transition: filter 0.3s ease;
	}

	.nav-logo:hover {
		filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
	}

	@keyframes chrome-shift-nav {
		0%, 100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	.nav-link {
		color: rgba(255, 255, 255, 0.7);
		font-weight: 600;
		font-size: 0.95rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		text-decoration: none;
		position: relative;
		padding: 0.5rem 0;
		transition: all 0.3s ease;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, white, transparent);
		transition: width 0.3s ease;
	}

	.nav-link:hover {
		color: white;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-btn {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		padding: 0.75rem 1.5rem;
		color: white;
		font-weight: 700;
		font-size: 0.85rem;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3),
					0 0 20px rgba(255, 255, 255, 0.1) inset;
	}

	.nav-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: left 0.5s;
	}

	.nav-btn:hover::before {
		left: 100%;
	}

	.nav-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4),
					0 0 30px rgba(255, 255, 255, 0.15) inset;
		border-color: rgba(255, 255, 255, 0.5);
	}

	.nav-link-mobile {
		color: rgba(255, 255, 255, 0.7);
		font-weight: 600;
		font-size: 1rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		text-decoration: none;
		transition: all 0.3s ease;
		padding-left: 1rem;
		border-left: 2px solid transparent;
	}

	.nav-link-mobile:hover {
		color: white;
		border-left-color: white;
		padding-left: 1.5rem;
	}

	.nav-btn-mobile {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		color: white;
		font-weight: 700;
		font-size: 0.9rem;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
	}

	.nav-btn-mobile:hover {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
		border-color: rgba(255, 255, 255, 0.5);
	}
</style>
