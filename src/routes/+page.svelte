<script>
	import { onMount } from 'svelte';

	let formData = {
		name: '',
		email: '',
		phone: '',
		eventType: '',
		date: '',
		message: ''
	};

	let submitted = false;

	function handleSubmit(event) {
		event.preventDefault();
		// In a real app, this would send to a backend
		console.log('Form submitted:', formData);
		submitted = true;
		setTimeout(() => {
			submitted = false;
			formData = {
				name: '',
				email: '',
				phone: '',
				eventType: '',
				date: '',
				message: ''
			};
		}, 3000);
	}

	// Generate sparkles for hero
	let sparkles = Array.from({ length: 20 }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		delay: Math.random() * 3,
		size: Math.random() * 4 + 2
	}));

	// Instagram account - update with your Instagram username
	const instagramUsername = 'jordygpolefit';
	const instagramUrl = `https://www.instagram.com/${instagramUsername}/`;

	// Portfolio images state
	let portfolioImages = $state([]);
	let loadingPortfolio = $state(true);
	let portfolioError = $state(null);

	// Lightbox state
	let lightboxOpen = $state(false);
	let currentImageIndex = $state(0);

	function openLightbox(index) {
		currentImageIndex = index;
		lightboxOpen = true;
		document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
	}

	function closeLightbox() {
		lightboxOpen = false;
		document.body.style.overflow = '';
	}

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
	}

	function previousImage() {
		currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
	}

	// Keyboard navigation
	function handleKeydown(event) {
		if (!lightboxOpen) return;
		
		if (event.key === 'Escape') {
			closeLightbox();
		} else if (event.key === 'ArrowRight') {
			nextImage();
		} else if (event.key === 'ArrowLeft') {
			previousImage();
		}
	}

	// Fetch portfolio images on mount
	onMount(async () => {
		try {
			const response = await fetch('/api/portfolio');
			const data = await response.json();
			
			if (data.success && data.images) {
				portfolioImages = data.images;
			} else {
				portfolioError = data.message || 'No images found';
			}
		} catch (error) {
			console.error('Error fetching portfolio images:', error);
			portfolioError = 'Unable to load portfolio images';
		} finally {
			loadingPortfolio = false;
		}

		// Add keyboard event listener
		window.addEventListener('keydown', handleKeydown);
		
		return () => {
			window.removeEventListener('keydown', handleKeydown);
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:head>
	<title>Jordega - Professional Pole Dancing Services | Jordan Garbett</title>
	<meta name="description" content="Professional pole dancing instruction and event entertainment by Jordan Garbett. Custom performances, private lessons, and event entertainment services." />
	<meta name="keywords" content="pole dancing, pole fitness, pole dancing instruction, pole dancing lessons, pole dancing events, pole dancing performance, Jordan Garbett, pole dancing instructor" />
	<meta name="author" content="Jordan Garbett" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://polefit.com/" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://polefit.com/" />
	<meta property="og:title" content="Jordega - Professional Pole Dancing Services | Jordan Garbett" />
	<meta property="og:description" content="Professional pole dancing instruction and event entertainment by Jordan Garbett. Custom performances, lessons, and events." />
	<meta property="og:image" content="https://polefit.com/images/og-image.jpg" />
	<meta property="og:site_name" content="Jordega" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://polefit.com/" />
	<meta name="twitter:title" content="Jordega - Professional Pole Dancing Services | Jordan Garbett" />
	<meta name="twitter:description" content="Professional pole dancing instruction and event entertainment by Jordan Garbett." />
	<meta name="twitter:image" content="https://polefit.com/images/og-image.jpg" />
	
	<!-- Schema.org Structured Data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"name": "Jordega",
		"image": "https://polefit.com/images/og-image.jpg",
		"@id": "https://polefit.com",
		"url": "https://polefit.com",
		"telephone": "",
		"priceRange": "$$",
		"address": {
			"@type": "PostalAddress",
			"addressCountry": "US"
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": "",
			"longitude": ""
		},
		"openingHoursSpecification": {
			"@type": "OpeningHoursSpecification",
			"dayOfWeek": [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday"
			],
			"opens": "00:00",
			"closes": "23:59"
		},
		"sameAs": [
			"https://www.instagram.com/jordygpolefit/"
		],
		"founder": {
			"@type": "Person",
			"name": "Jordan Garbett"
		}
	}
	</script>`}
	
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Service",
		"serviceType": "Pole Dancing Instruction and Entertainment",
		"provider": {
			"@type": "Person",
			"name": "Jordan Garbett",
			"url": "https://polefit.com/about"
		},
		"areaServed": {
			"@type": "Country",
			"name": "United States"
		},
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Pole Dancing Services",
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Showgirl Package",
						"description": "Standard pole only with aerial insurance, equipment setup, costuming, two custom dances, and ambient set."
					},
					"price": "350",
					"priceCurrency": "USD",
					"priceSpecification": {
						"@type": "UnitPriceSpecification",
						"price": "350",
						"priceCurrency": "USD",
						"unitText": "hour"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Gentlemen's Package",
						"description": "Standard pole only with aerial insurance, equipment setup, costuming, two custom dances, and ambient set."
					},
					"price": "350",
					"priceCurrency": "USD",
					"priceSpecification": {
						"@type": "UnitPriceSpecification",
						"price": "350",
						"priceCurrency": "USD",
						"unitText": "hour"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Atmosphere Package",
						"description": "Perfect for galas, corporate events, cocktail hours, weddings or parties. Option to choose between lollipop pole or standard pole."
					},
					"price": "250",
					"priceCurrency": "USD",
					"priceSpecification": {
						"@type": "UnitPriceSpecification",
						"price": "250",
						"priceCurrency": "USD",
						"unitText": "hour"
					}
				}
			]
		}
	}
	</script>`}
</svelte:head>

<main class="min-h-screen bg-black text-white overflow-x-hidden">
	<!-- Hero Section -->
	<header class="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner">
		<!-- Video Background -->
		<div class="video-container absolute inset-0">
			<!-- Fallback gradient background (shows if video doesn't load) -->
			<div class="video-fallback"></div>
			<video
				autoplay
				muted
				loop
				playsinline
				class="hero-video"
				preload="auto"
				aria-label="Pole dancing performance video"
			>
				<!-- Add your video file here - replace with actual video path -->
				<!-- Place your video file in the /static/videos/ folder -->
				<source src="/videos/pole-dancing-hero.mp4" type="video/mp4" />
				<source src="/videos/pole-dancing-hero.webm" type="video/webm" />
				<!-- Fallback if video doesn't load -->
			</video>
			<!-- Dark overlay for text readability -->
			<div class="video-overlay"></div>
		</div>

		<!-- Animated sparkles -->
		{#each sparkles as sparkle}
			<div
				class="sparkle absolute z-20"
				style="left: {sparkle.x}%; top: {sparkle.y}%; width: {sparkle.size}px; height: {sparkle.size}px; animation-delay: {sparkle.delay}s;"
			></div>
		{/each}

		<!-- Animated background elements (now on top of video) -->
		<div class="absolute inset-0 opacity-20 z-10">
			<div class="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
			<div class="absolute bottom-20 right-10 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-float-delayed"></div>
			<div class="absolute top-1/2 left-1/2 w-72 h-72 bg-white rounded-full blur-3xl animate-float-slow"></div>
		</div>

		<!-- Grid pattern overlay -->
		<div class="absolute inset-0 grid-pattern opacity-10 z-10"></div>

		<div class="relative z-30 text-center px-4 max-w-5xl mx-auto">
			<h1 class="sr-only">Jordega - Professional Pole Dancing Services by Jordan Garbett</h1>
			<div class="mb-8" aria-hidden="true">
				<span class="inline-block text-6xl md:text-8xl font-black tracking-wider chrome-text animate-glow">
					POLE
				</span>
			</div>
			<div class="mb-8" aria-hidden="true">
				<span class="inline-block text-6xl md:text-8xl font-black tracking-wider chrome-text-reverse animate-glow-delayed">
					FIT
				</span>
			</div>
			<p class="text-3xl md:text-4xl mb-4 text-gray-200 font-light tracking-wide">
				<span class="inline-block animate-slide-up">Professional</span>
				<span class="inline-block mx-2 animate-slide-up-delayed">Pole</span>
				<span class="inline-block animate-slide-up-delayed-2">Dancing</span>
			</p>
			<p class="text-xl md:text-2xl mb-12 text-gray-400 font-light">
				Instruction & Events
			</p>
			<div class="flex gap-6 justify-center flex-wrap">
				<a href="#packages" class="glossy-btn-mega px-10 py-5 text-xl font-bold">
					<span class="relative z-10">VIEW PACKAGES</span>
					<div class="absolute inset-0 shine-effect"></div>
				</a>
				<a href="#contact" class="glossy-btn-mega-secondary px-10 py-5 text-xl font-bold">
					<span class="relative z-10">GET IN TOUCH</span>
					<div class="absolute inset-0 shine-effect"></div>
				</a>
			</div>
		</div>

		<!-- Scroll indicator with animation -->
		<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow" aria-hidden="true">
			<div class="flex flex-col items-center gap-2">
				<span class="text-xs text-gray-400 uppercase tracking-wider">Scroll</span>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
				</svg>
			</div>
		</div>
	</header>

	<!-- Section Divider -->
	<div class="section-divider"></div>

	<!-- Packages Section -->
	<section id="packages" class="py-24 px-4 relative bg-gradient-to-b from-black via-gray-950 to-black" aria-labelledby="packages-heading">
		<!-- Animated background stars -->
		<div class="absolute inset-0 stars-bg" aria-hidden="true"></div>

		<div class="max-w-7xl mx-auto relative z-10">
			<div class="text-center mb-20">
				<h2 id="packages-heading" class="text-7xl md:text-8xl font-black mb-4 tracking-tight">
					<span class="chrome-text-section animate-glow">PACKAGES</span>
				</h2>
				<div class="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto" aria-hidden="true"></div>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
				<!-- Showgirl Package -->
				<article class="package-card-premium group">
					<div class="package-badge" aria-label="Popular package">POPULAR</div>
					<div class="package-header-premium">
						<h3 class="text-4xl font-black mb-3 tracking-tight">Showgirl</h3>
						<div class="text-5xl font-black text-white mb-2">
							$350<span class="text-2xl font-bold">/hour</span>
						</div>
						<div class="text-sm text-gray-400 uppercase tracking-wider">Standard pole only</div>
					</div>
					<div class="package-content-premium">
						<ul class="space-y-4 text-gray-200">
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Aerial Insurance</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Equipment setup</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Costuming</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Costume requests available</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Two custom dances to song of choice in style of choice (3-6 minutes)</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Ambient set</span>
							</li>
						</ul>
					</div>
					<div class="package-glow"></div>
				</article>

				<!-- Gentlemen's Package -->
				<article class="package-card-premium group">
					<div class="package-badge" aria-label="Premium package">PREMIUM</div>
					<div class="package-header-premium">
						<h3 class="text-4xl font-black mb-3 tracking-tight">Gentlemen's</h3>
						<div class="text-5xl font-black text-white mb-2">
							$350<span class="text-2xl font-bold">/hour</span>
						</div>
						<div class="text-sm text-gray-400 uppercase tracking-wider">Standard pole only</div>
					</div>
					<div class="package-content-premium">
						<ul class="space-y-4 text-gray-200">
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Aerial Insurance</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Equipment setup</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Costuming</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Costume requests available</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Two custom dances to song of choice in style of choice (3-6 minutes)</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Ambient set</span>
							</li>
						</ul>
					</div>
					<div class="package-glow"></div>
				</article>

				<!-- Atmosphere Package -->
				<article class="package-card-premium group">
					<div class="package-badge" aria-label="Events package">EVENTS</div>
					<div class="package-header-premium">
						<h3 class="text-4xl font-black mb-3 tracking-tight">Atmosphere</h3>
						<div class="text-5xl font-black text-white mb-2">
							$250<span class="text-2xl font-bold">/hour</span>
						</div>
						<div class="text-sm text-gray-400 uppercase tracking-wider">Perfect for galas, corporate events, cocktail hours, weddings or parties</div>
					</div>
					<div class="package-content-premium">
						<p class="text-gray-300 mb-4 text-sm">Option to choose between lollipop pole or standard pole</p>
						<ul class="space-y-4 text-gray-200">
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Aerial Insurance</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Equipment setup</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Costuming</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Costume requests available</span>
							</li>
							<li class="flex items-start group/item">
								<span class="check-icon">✓</span>
								<span>Ambient set</span>
							</li>
						</ul>
					</div>
					<div class="package-glow"></div>
				</article>
			</div>

			<!-- Collab Requests -->
			<div class="mt-16 text-center">
				<article class="package-card-special inline-block max-w-lg">
					<div class="package-header-premium">
						<h3 class="text-4xl font-black mb-3 tracking-tight">Collab Requests</h3>
						<div class="text-3xl font-black text-white mb-4 tracking-wider">COST VARIES</div>
					</div>
					<div class="package-content-premium">
						<p class="text-gray-200 text-lg">Interested in collaborating? Let's discuss your vision and create something amazing together.</p>
					</div>
					<div class="package-glow"></div>
				</article>
			</div>
		</div>
	</section>

	<!-- Section Divider -->
	<div class="section-divider"></div>

	<!-- Portfolio Section -->
	<section id="portfolio" class="py-24 px-4 bg-black relative overflow-hidden" aria-labelledby="portfolio-heading">
		<!-- Animated grid background -->
		<div class="absolute inset-0 grid-pattern opacity-5" aria-hidden="true"></div>

		<div class="max-w-7xl mx-auto relative z-10">
			<div class="text-center mb-20">
				<h2 id="portfolio-heading" class="text-7xl md:text-8xl font-black mb-4 tracking-tight">
					<span class="chrome-text-section animate-glow">PORTFOLIO</span>
				</h2>
				<div class="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto" aria-hidden="true"></div>
			</div>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{#if loadingPortfolio}
					<!-- Loading skeletons -->
					{#each Array(8) as _, i}
						<div class="portfolio-item-premium aspect-square bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-gray-800 rounded-xl overflow-hidden relative animate-pulse">
							<div class="w-full h-full flex items-center justify-center text-gray-700">
								<svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
							</div>
						</div>
					{/each}
				{:else if portfolioImages.length > 0}
					<!-- Portfolio images -->
					{#each portfolioImages as image, index}
						<button
							type="button"
							onclick={() => openLightbox(index)}
							class="portfolio-item-premium aspect-square bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-gray-800 rounded-xl overflow-hidden group cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-white/50"
							aria-label="View {image.alt || 'portfolio image'} in expanded view"
						>
							<img 
								src={image.src} 
								alt={image.alt || 'Portfolio image'}
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								loading="lazy"
							/>
							<div class="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-xl transition-all duration-500"></div>
						</button>
					{/each}
				{:else}
					<!-- Fallback if no images found -->
					<div class="col-span-full text-center py-12">
						<p class="text-gray-500 mb-4">No portfolio images found.</p>
						<p class="text-sm text-gray-600">Add images to <code class="px-2 py-1 bg-gray-900 rounded text-gray-400">/static/portfolio/</code> directory</p>
					</div>
				{/if}
			</div>
			
			<!-- Instagram Link -->
			<div class="mt-16 text-center">
				<div class="inline-flex flex-col items-center gap-6">
					<p class="text-gray-400 text-lg uppercase tracking-wider mb-2">See More on Instagram</p>
					<a 
						href={instagramUrl} 
						target="_blank" 
						rel="noopener noreferrer nofollow"
						class="instagram-btn group"
						aria-label="Visit Jordan Garbett's Instagram profile"
					>
						<div class="flex items-center gap-4">
							<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4 2.209 0 4 1.791 4 4 0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
							</svg>
							<span class="text-xl font-bold uppercase tracking-wider">@{instagramUsername}</span>
							<svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
							</svg>
						</div>
						<div class="absolute inset-0 shine-effect"></div>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Section Divider -->
	<div class="section-divider"></div>

	<!-- Contact Section -->
	<section id="contact" class="py-24 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative" aria-labelledby="contact-heading">
		<!-- Animated background -->
		<div class="absolute inset-0 stars-bg opacity-50" aria-hidden="true"></div>

		<div class="max-w-3xl mx-auto relative z-10">
			<div class="text-center mb-20">
				<h2 id="contact-heading" class="text-7xl md:text-8xl font-black mb-4 tracking-tight">
					<span class="chrome-text-section animate-glow">GET IN TOUCH</span>
				</h2>
				<div class="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto" aria-hidden="true"></div>
			</div>

			{#if submitted}
				<div class="glossy-card-premium p-12 text-center">
					<div class="text-6xl mb-6 animate-bounce">✓</div>
					<p class="text-2xl text-gray-200 font-semibold">Thank you! Your message has been sent.</p>
					<p class="text-gray-400 mt-2">We'll get back to you soon.</p>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="glossy-card-premium p-10 space-y-6" method="POST" aria-label="Contact form">
					<div>
						<label for="name" class="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">Name</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="input-premium"
							placeholder="Your name"
						/>
					</div>

					<div>
						<label for="email" class="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">Email</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="input-premium"
							placeholder="your.email@example.com"
						/>
					</div>

					<div>
						<label for="phone" class="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">Phone</label>
						<input
							type="tel"
							id="phone"
							bind:value={formData.phone}
							class="input-premium"
							placeholder="(555) 123-4567"
						/>
					</div>

					<div>
						<label for="eventType" class="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">Event Type</label>
						<select
							id="eventType"
							bind:value={formData.eventType}
							class="input-premium"
						>
							<option value="">Select an option</option>
							<option value="showgirl">Showgirl Package</option>
							<option value="gentlemens">Gentlemen's Package</option>
							<option value="atmosphere">Atmosphere Package</option>
							<option value="collab">Collab Request</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div>
						<label for="date" class="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">Event Date</label>
						<input
							type="date"
							id="date"
							bind:value={formData.date}
							class="input-premium"
						/>
					</div>

					<div>
						<label for="message" class="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">Message</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="6"
							class="input-premium resize-none"
							placeholder="Tell us about your event..."
						></textarea>
					</div>

					<button type="submit" class="glossy-btn-mega w-full py-5 text-xl font-bold">
						<span class="relative z-10">SEND MESSAGE</span>
						<div class="absolute inset-0 shine-effect"></div>
					</button>
				</form>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-16 px-4 border-t border-gray-800 relative" role="contentinfo">
		<div class="absolute inset-0 grid-pattern opacity-5" aria-hidden="true"></div>
		<div class="max-w-6xl mx-auto text-center text-gray-500 relative z-10">
			<p class="text-sm uppercase tracking-wider">&copy; 2025 Jordega. All rights reserved.</p>
		</div>
	</footer>
</main>

<!-- Lightbox Modal -->
{#if lightboxOpen && portfolioImages.length > 0}
	<div 
		class="lightbox-overlay"
		onclick={closeLightbox}
		onkeydown={(e) => e.key === 'Escape' && closeLightbox()}
		role="dialog"
		aria-modal="true"
		aria-label="Image lightbox"
	>
		<div class="lightbox-container" onclick={(e) => e.stopPropagation()}>
			<!-- Close Button -->
			<button
				onclick={closeLightbox}
				class="lightbox-close"
				aria-label="Close lightbox"
			>
				<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>

			<!-- Image -->
			<div class="lightbox-image-wrapper">
				<img 
					src={portfolioImages[currentImageIndex].src}
					alt={portfolioImages[currentImageIndex].alt || 'Portfolio image'}
					class="lightbox-image"
				/>
			</div>

			<!-- Navigation -->
			{#if portfolioImages.length > 1}
				<!-- Previous Button -->
				<button
					onclick={previousImage}
					class="lightbox-nav lightbox-nav-prev"
					aria-label="Previous image"
				>
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
					</svg>
				</button>

				<!-- Next Button -->
				<button
					onclick={nextImage}
					class="lightbox-nav lightbox-nav-next"
					aria-label="Next image"
				>
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
					</svg>
				</button>

				<!-- Image Counter -->
				<div class="lightbox-counter">
					{currentImageIndex + 1} / {portfolioImages.length}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* Animations */
	@keyframes float {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -30px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	@keyframes float-delayed {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(-40px, 40px) scale(1.15);
		}
		66% {
			transform: translate(25px, -25px) scale(0.85);
		}
	}

	@keyframes float-slow {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(20px, -20px) scale(1.05);
		}
	}

	@keyframes glow {
		0%, 100% {
			text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
						0 0 40px rgba(255, 255, 255, 0.3),
						0 0 60px rgba(255, 255, 255, 0.1);
		}
		50% {
			text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
						0 0 60px rgba(255, 255, 255, 0.5),
						0 0 90px rgba(255, 255, 255, 0.2);
		}
	}

	@keyframes glow-delayed {
		0%, 100% {
			text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
						0 0 40px rgba(255, 255, 255, 0.3),
						0 0 60px rgba(255, 255, 255, 0.1);
		}
		50% {
			text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
						0 0 60px rgba(255, 255, 255, 0.5),
						0 0 90px rgba(255, 255, 255, 0.2);
		}
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes sparkle {
		0%, 100% {
			opacity: 0;
			transform: scale(0) rotate(0deg);
		}
		50% {
			opacity: 1;
			transform: scale(1) rotate(180deg);
		}
	}

	@keyframes shine {
		0% {
			transform: translateX(-100%) translateY(-100%) rotate(45deg);
		}
		100% {
			transform: translateX(100%) translateY(100%) rotate(45deg);
		}
	}

	@keyframes bounce-slow {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.animate-float {
		animation: float 20s ease-in-out infinite;
	}

	.animate-float-delayed {
		animation: float-delayed 25s ease-in-out infinite;
	}

	.animate-float-slow {
		animation: float-slow 15s ease-in-out infinite;
	}

	.animate-glow {
		animation: glow 3s ease-in-out infinite;
	}

	.animate-glow-delayed {
		animation: glow 3s ease-in-out infinite;
		animation-delay: 0.5s;
	}

	.animate-slide-up {
		animation: slide-up 0.8s ease-out;
	}

	.animate-slide-up-delayed {
		animation: slide-up 0.8s ease-out 0.2s both;
	}

	.animate-slide-up-delayed-2 {
		animation: slide-up 0.8s ease-out 0.4s both;
	}

	.animate-bounce-slow {
		animation: bounce-slow 2s ease-in-out infinite;
	}

	/* Chrome Text Effect */
	.chrome-text {
		background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 25%, #ffffff 50%, #c0c0c0 75%, #ffffff 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: chrome-shift 3s ease infinite;
		filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.5));
	}

	.chrome-text-reverse {
		background: linear-gradient(135deg, #c0c0c0 0%, #ffffff 25%, #e0e0e0 50%, #ffffff 75%, #c0c0c0 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: chrome-shift 3s ease infinite reverse;
		filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.5));
	}

	.chrome-text-section {
		background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: chrome-shift 4s ease infinite;
		filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.4));
	}

	@keyframes chrome-shift {
		0%, 100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	/* Sparkles */
	.sparkle {
		background: white;
		border-radius: 50%;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
					0 0 20px rgba(255, 255, 255, 0.6);
		animation: sparkle 2s ease-in-out infinite;
	}

	/* Grid Pattern */
	.grid-pattern {
		background-image: 
			linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
		background-size: 50px 50px;
	}

	/* Stars Background */
	.stars-bg {
		background-image: 
			radial-gradient(2px 2px at 20% 30%, white, transparent),
			radial-gradient(2px 2px at 60% 70%, white, transparent),
			radial-gradient(1px 1px at 50% 50%, white, transparent),
			radial-gradient(1px 1px at 80% 10%, white, transparent),
			radial-gradient(2px 2px at 90% 60%, white, transparent),
			radial-gradient(1px 1px at 33% 80%, white, transparent),
			radial-gradient(2px 2px at 10% 50%, white, transparent);
		background-repeat: repeat;
		background-size: 200px 200px;
		animation: stars-move 100s linear infinite;
	}

	@keyframes stars-move {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 200px 200px;
		}
	}

	/* Section Divider */
	.section-divider {
		height: 2px;
		background: linear-gradient(90deg, 
			transparent 0%, 
			rgba(255, 255, 255, 0.3) 20%, 
			rgba(255, 255, 255, 0.6) 50%, 
			rgba(255, 255, 255, 0.3) 80%, 
			transparent 100%);
		position: relative;
		overflow: hidden;
	}

	.section-divider::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
		animation: divider-shine 3s infinite;
	}

	@keyframes divider-shine {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	/* Glossy Button Mega */
	.glossy-btn-mega {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
		border: 2px solid rgba(255, 255, 255, 0.4);
		border-radius: 16px;
		color: white;
		position: relative;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
					0 0 40px rgba(255, 255, 255, 0.15) inset,
					0 0 60px rgba(255, 255, 255, 0.1);
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	.glossy-btn-mega::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
		transition: left 0.8s;
	}

	.glossy-btn-mega:hover::before {
		left: 100%;
	}

	.glossy-btn-mega:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45),
					0 0 50px rgba(255, 255, 255, 0.18) inset,
					0 0 70px rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.5);
	}

	.glossy-btn-mega-secondary {
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 16px;
		color: white;
		position: relative;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6),
					0 0 20px rgba(255, 255, 255, 0.1) inset;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	.glossy-btn-mega-secondary::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
		transition: left 0.8s;
	}

	.glossy-btn-mega-secondary:hover::before {
		left: 100%;
	}

	.glossy-btn-mega-secondary:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.65),
					0 0 25px rgba(255, 255, 255, 0.12) inset;
		border-color: rgba(255, 255, 255, 0.4);
	}

	.shine-effect {
		background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%);
		animation: shine 4s infinite;
	}

	/* Package Card Premium */
	.package-card-premium {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
		border: 2px solid rgba(255, 255, 255, 0.15);
		border-radius: 24px;
		padding: 2.5rem;
		padding-top: 3.5rem;
		position: relative;
		overflow: visible;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4),
					0 0 60px rgba(255, 255, 255, 0.08) inset;
		backdrop-filter: blur(10px);
		margin-top: 1rem;
	}

	.package-card-premium::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.5s ease;
		pointer-events: none;
		z-index: 0;
	}
	
	/* Inner wrapper to maintain overflow hidden for effects */
	.package-card-premium > *:not(.package-badge) {
		position: relative;
		z-index: 1;
	}

	.package-card-premium:hover::before {
		opacity: 1;
	}

	.package-card-premium:hover {
		transform: translateY(-12px) scale(1.02);
		border-color: rgba(255, 255, 255, 0.4);
		box-shadow: 0 20px 64px rgba(0, 0, 0, 0.5),
					0 0 80px rgba(255, 255, 255, 0.15) inset;
	}

	.package-badge {
		position: absolute;
		top: -16px;
		right: 20px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 0.5rem 1.5rem;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 1px;
		text-transform: uppercase;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		z-index: 10;
	}

	.package-header-premium {
		border-bottom: 2px solid rgba(255, 255, 255, 0.15);
		padding-bottom: 1.5rem;
		margin-bottom: 2rem;
		position: relative;
		z-index: 1;
	}

	.package-content-premium {
		position: relative;
		z-index: 1;
	}

	.check-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		margin-right: 12px;
		margin-top: 2px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		color: white;
		font-weight: bold;
		font-size: 14px;
		flex-shrink: 0;
		transition: all 0.3s ease;
	}

	.group:hover .check-icon {
		transform: scale(1.2);
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
	}

	.package-glow {
		position: absolute;
		inset: -2px;
		background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent, rgba(255, 255, 255, 0.1));
		border-radius: 24px;
		opacity: 0;
		transition: opacity 0.5s ease;
		z-index: -1;
		filter: blur(10px);
	}

	.package-card-premium:hover .package-glow {
		opacity: 1;
	}

	.package-card-special {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 24px;
		padding: 3rem;
		position: relative;
		overflow: hidden;
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4),
					0 0 60px rgba(255, 255, 255, 0.1) inset;
		backdrop-filter: blur(10px);
	}

	/* Instagram Button */
	.instagram-btn {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
		border: 2px solid rgba(255, 255, 255, 0.4);
		border-radius: 16px;
		padding: 1.25rem 2.5rem;
		color: white;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
					0 0 40px rgba(255, 255, 255, 0.15) inset,
					0 0 60px rgba(255, 255, 255, 0.1);
		display: inline-block;
	}

	.instagram-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
		transition: left 0.8s;
	}

	.instagram-btn:hover::before {
		left: 100%;
	}

	.instagram-btn:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45),
					0 0 50px rgba(255, 255, 255, 0.18) inset,
					0 0 70px rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.5);
	}

	.instagram-btn svg:first-child {
		filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
		transition: all 0.3s ease;
	}

	.instagram-btn:hover svg:first-child {
		filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
		transform: scale(1.05);
	}

	/* Portfolio Item Premium */
	.portfolio-item-premium {
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
		background: none;
		border: none;
		padding: 0;
		width: 100%;
	}

	.portfolio-item-premium img {
		transition: transform 0.5s ease;
		pointer-events: none;
	}

	.portfolio-item-premium:hover img {
		transform: scale(1.1);
	}

	.portfolio-item-premium::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.portfolio-item-premium:hover::after {
		opacity: 1;
	}

	.portfolio-item-premium:hover {
		transform: scale(1.08) rotate(1deg);
		border-color: rgba(255, 255, 255, 0.5);
		box-shadow: 0 16px 48px rgba(255, 255, 255, 0.2),
					0 0 60px rgba(255, 255, 255, 0.1);
	}

	/* Glossy Card Premium */
	.glossy-card-premium {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
		border: 2px solid rgba(255, 255, 255, 0.15);
		border-radius: 24px;
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4),
					0 0 60px rgba(255, 255, 255, 0.08) inset;
		backdrop-filter: blur(15px);
		position: relative;
		overflow: hidden;
	}

	.glossy-card-premium::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
		opacity: 0.5;
		animation: rotate-glow 10s linear infinite;
	}

	@keyframes rotate-glow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Input Premium */
	.input-premium {
		width: 100%;
		padding: 1rem 1.25rem;
		background: rgba(0, 0, 0, 0.6);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		color: white;
		font-size: 1rem;
		transition: all 0.3s ease;
		position: relative;
		z-index: 1;
	}

	.input-premium:focus {
		outline: none;
		border-color: rgba(255, 255, 255, 0.5);
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
					0 0 40px rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.8);
	}

	.input-premium::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	/* Video Background */
	.video-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 1;
	}

	.video-fallback {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
		z-index: 1;
	}

	.hero-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 0.6;
		filter: grayscale(30%) contrast(1.2) brightness(0.7);
		transition: opacity 0.5s ease;
		z-index: 2;
	}

	/* Hide video on very small screens to improve performance */
	@media (max-width: 640px) {
		.hero-video {
			opacity: 0.4;
		}
	}

	.video-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.7) 0%,
			rgba(0, 0, 0, 0.5) 50%,
			rgba(0, 0, 0, 0.7) 100%
		);
		z-index: 2;
	}

	/* Add a subtle scanline effect for Y2K aesthetic */
	.video-container::after {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(255, 255, 255, 0.03) 2px,
			rgba(255, 255, 255, 0.03) 4px
		);
		pointer-events: none;
		z-index: 3;
		opacity: 0.5;
	}

	/* Screen reader only - for accessibility */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	/* Lightbox Modal */
	.lightbox-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.95);
		backdrop-filter: blur(10px);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		animation: fadeIn 0.3s ease;
	}

	.lightbox-container {
		position: relative;
		max-width: 90vw;
		max-height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lightbox-image-wrapper {
		position: relative;
		max-width: 100%;
		max-height: 90vh;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 20px 80px rgba(0, 0, 0, 0.8),
					0 0 100px rgba(255, 255, 255, 0.1);
		border: 2px solid rgba(255, 255, 255, 0.2);
		animation: zoomIn 0.3s ease;
	}

	.lightbox-image {
		max-width: 100%;
		max-height: 90vh;
		width: auto;
		height: auto;
		object-fit: contain;
		display: block;
	}

	.lightbox-close {
		position: absolute;
		top: -3rem;
		right: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 10000;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}

	.lightbox-close:hover {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
		border-color: rgba(255, 255, 255, 0.5);
		transform: scale(1.1);
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
	}

	.lightbox-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 10000;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}

	.lightbox-nav:hover {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-50%) scale(1.1);
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
	}

	.lightbox-nav-prev {
		left: -4.5rem;
	}

	.lightbox-nav-next {
		right: -4.5rem;
	}

	@media (max-width: 1024px) {
		.lightbox-close {
			top: 1rem;
			right: 1rem;
		}

		.lightbox-nav-prev {
			left: 1rem;
		}

		.lightbox-nav-next {
			right: 1rem;
		}

		.lightbox-counter {
			bottom: 1rem;
		}

		.lightbox-container {
			max-width: 95vw;
		}
	}

	.lightbox-counter {
		position: absolute;
		bottom: -3rem;
		left: 50%;
		transform: translateX(-50%);
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		padding: 0.75rem 1.5rem;
		color: white;
		font-weight: 700;
		font-size: 0.9rem;
		letter-spacing: 1px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}

	@keyframes zoomIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Smooth scroll */
	html {
		scroll-behavior: smooth;
	}

	/* Custom scrollbar */
	::-webkit-scrollbar {
		width: 12px;
	}

	::-webkit-scrollbar-track {
		background: #000;
	}

	::-webkit-scrollbar-thumb {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
		border-radius: 6px;
		border: 2px solid #000;
	}

	::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%);
	}
</style>
