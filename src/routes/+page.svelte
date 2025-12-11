<script lang="ts">
	import rangerstation from '$lib/assets/rangerstation.webp';
	import NoteLogo from '$lib/assets/Note.svg';
	import PlaceIcon from '$lib/assets/Place.svg';
	import phoneImage from '$lib/assets/IMG_1362-portrait.png';
	import phoneImage2 from '$lib/assets/IMG_1360-portrait.png';
	import googlePlayBadge from '$lib/assets/googleplay.svg';
	import appStoreBadge from '$lib/assets/appstore.svg';

	let bgLoaded = $state(false);
	let phone1Loaded = $state(false);
	let phone2Loaded = $state(false);

	// Preload background image
	$effect(() => {
		const img = new Image();
		img.onload = () => bgLoaded = true;
		img.src = rangerstation;
	});
</script>

<div class="container">
	<div class="panel panel-left" style="background-image: url({rangerstation})">
		{#if !bgLoaded}
			<div class="skeleton skeleton-bg"></div>
		{/if}
		<a href="/" class="logo-link">
			<img src={NoteLogo} alt="Note" class="logo" />
		</a>
		<div class="bottom-row">
			<p class="tagline">Never forget a <br>great place again.</p>
			<div class="location">
                <img src={PlaceIcon} alt="Location" class="place-icon" />
				<div class="location-text">
					<span class="location-name">Ranger Station</span>
					<span class="location-city">Atlanta, GA</span>
				</div>
			</div>
		</div>
	</div>
	<div class="panel panel-top-right">
		{#if !phone1Loaded}
			<div class="skeleton skeleton-green"></div>
		{/if}
		<div class="panel-top-right-content">
			<h2 class="panel-title">Save places <br /> you want to try</h2>
			<p class="panel-description">
				Discover new places and save them to try later. <br /> Keep them private or share with the world.
				<br />
				<br />
				Track where you've been and <br /> where you're dreaming of going next.
			</p>
		</div>
		<div class="phone-image-container">
			<img src={phoneImage} alt="Note app on phone" class="phone-image" onload={() => phone1Loaded = true} />
		</div>
	</div>
	<div class="panel panel-bottom-right">
		{#if !phone2Loaded}
			<div class="skeleton skeleton-light"></div>
		{/if}
		<div class="phone-image-container-bottom">
			<img src={phoneImage2} alt="Note app on phone" class="phone-image-bottom" onload={() => phone2Loaded = true} />
		</div>
		<div class="panel-bottom-right-content">
			<h2 class="panel-title-dark">Curate your <br /> go-to list</h2>
			<p class="panel-description-dark">
				Organize your places into collections that make sense to you. Share your curated lists and become the go-to source for the best spots.
			</p>
            <span style="flex: 1;"></span>
			<div class="app-store-badges">
				<a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" class="store-badge-link">
					<img src={googlePlayBadge} alt="Get it on Google Play" class="store-badge" />
				</a>
				<a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" class="store-badge-link">
					<img src={appStoreBadge} alt="Download on the App Store" class="store-badge" />
				</a>
			</div>
			<div class="footer-text">
				<p class="footer-links">
					<a href="/privacy-policy">Privacy Policy</a> - <a href="/terms-conditions">Terms & Conditions</a> - <a href="/support">Support</a>
				</p>
				<p class="footer-copyright">Treadway Designs LLC. © 2026</p>
			</div>
		</div>
	</div>
</div>

<footer class="page-footer">
	<div class="page-footer-badges">
		<a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" class="store-badge-link">
			<img src={googlePlayBadge} alt="Get it on Google Play" class="store-badge" />
		</a>
		<a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" class="store-badge-link">
			<img src={appStoreBadge} alt="Download on the App Store" class="store-badge" />
		</a>
	</div>
	<div class="page-footer-text">
		<p class="footer-links">
			<a href="/privacy-policy">Privacy Policy</a> - <a href="/terms-conditions">Terms & Conditions</a> - <a href="/support">Support</a>
		</p>
		<p class="footer-copyright">Treadway Designs LLC. © 2026</p>
	</div>
</footer>

<style>
	/* Skeleton loading animation */
	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	.skeleton {
		position: absolute;
		inset: 0;
		border-radius: 12px;
		z-index: 10;
		background-size: 200% 100%;
		animation: shimmer 1.5s ease-in-out infinite;
	}

	.skeleton-bg {
		background: linear-gradient(
			90deg,
			#3a3a3a 0%,
			#4a4a4a 50%,
			#3a3a3a 100%
		);
	}

	.skeleton-green {
		background: linear-gradient(
			90deg,
			#245438 0%,
			#2c6947 50%,
			#245438 100%
		);
	}

	.skeleton-light {
		background: linear-gradient(
			90deg,
			#b8d4c4 0%,
			#cfe4d8 50%,
			#b8d4c4 100%
		);
	}

	.container {
		display: grid;
		grid-template-columns: 0.9fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 12px;
		padding: 12px;
		height: 100%;
		box-sizing: border-box;
	}

	.panel {
		border-radius: 12px;
		position: relative;
	}

	.panel-left {
		grid-row: 1 / 3;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.bottom-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.tagline {
		font-family: 'Jost', sans-serif;
		font-size: clamp(1.5rem, 3.5vw, 2.7rem);
		color: #ffffff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}

	.location {
		display: flex;
		align-items: center;
		gap: 8px;
        margin-right: 12px;
        margin-bottom: 5px;
	}

	.location-text {
		display: flex;
		flex-direction: column;
	}

	.location-name {
		font-family: 'Jost', sans-serif;
		font-size: clamp(1rem, 2vw, 1.5rem);
		font-weight: 500;
		color: #ffffff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}

	.location-city {
		font-family: 'Jost', sans-serif;
		font-size: clamp(0.75rem, 1.3vw, 1rem);
		color: rgba(255, 255, 255, 0.85);
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}

	.place-icon {
		width: clamp(40px, 6vw, 64px);
		height: clamp(40px, 6vw, 64px);
	}

	.logo {
		height: 32px;
		width: auto;
	}

    .logo-link {
        width: fit-content;
    }

	.panel-top-right {
		background-color: #2c6947;
		padding-top: 5px;
        padding-right: 25px;
        padding-bottom: 20px;
        padding-left: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow: hidden;
		position: relative;
	}

	.panel-top-right-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 50%;
		min-width: 0;
		z-index: 1;
	}

	.phone-image-container {
		position: relative;
		display: flex;
		align-items: flex-start;
		margin-right: 20px;
		flex-shrink: 1;
		min-width: 0;
	}

	.phone-image {
		height: 200%;
		width: auto;
		object-fit: contain;
		transform: translateY(-48%);
	}

    .panel-top-right .panel-title {
		font-size: clamp(1.5rem, 3.5vw, 2.8rem);
    }

	.panel-title {
		font-family: 'Jost', sans-serif;
		font-size: clamp(1.2rem, 2.8vw, 2.2rem);
		font-weight: 500;
		color: #ffffff;
	}

	.panel-description {
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.85rem, 1.4vw, 1.1rem);
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.9);
	}

	.panel-bottom-right {
		background-color: #cfe4d8;
		position: relative;
        padding-top: 5px;
		padding-right: 30px;
        padding-bottom: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow: hidden;
	}

	.phone-image-container-bottom {
		position: relative;
		display: flex;
		align-items: flex-end;
		margin-left: 20px;
		flex-shrink: 1;
		min-width: 0;
	}

	.phone-image-bottom {
		height: 200%;
		width: auto;
		object-fit: contain;
		transform: translateY(50%);
	}

	.panel-bottom-right-content {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		text-align: right;
		gap: 12px;
		flex: 1;
		min-width: 0;
		z-index: 1;
	}

	.panel-title-dark {
		font-family: 'Jost', sans-serif;
		font-size: clamp(1.5rem, 3.5vw, 2.8rem);
		font-weight: 500;
		color: #2c2c2c;
	}

	.panel-description-dark {
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.85rem, 1.4vw, 1.1rem);
		line-height: 1.5;
		color: #2c2c2c;
		max-width: 400px;
	}

	.app-store-badges {
		display: flex;
		gap: 12px;
	}

	.store-badge-link {
		display: block;
		transition: opacity 0.2s ease;
	}

	.store-badge-link:hover {
		opacity: 0.8;
	}

	.store-badge {
		height: clamp(40px, 7vw, 60px);
		width: auto;
	}

	.footer-text {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;
		margin-top: 12px;
	}

	.footer-links {
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.7rem, 1.2vw, 0.9rem);
		color: #2c6947;
	}

	.footer-links a {
		color: #2c6947;
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.footer-links a:hover {
		opacity: 0.7;
	}

	.footer-copyright {
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.7rem, 1.2vw, 0.9rem);
		color: #2c2c2c;
	}

	.page-footer {
		display: none;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 24px 12px;
		background-color: #f5f5f5;
	}

	.page-footer-badges {
		display: flex;
		gap: 12px;
	}

	.page-footer-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.page-footer-text .footer-links,
	.page-footer-text .footer-copyright {
		text-align: center;
	}

	@media (max-width: 1700px) {
		.phone-image {
			height: 180%;
		}

		.phone-image-container {
			padding-right: 0;
		}

		.phone-image-bottom {
			height: 180%;
		}
	}

	@media (max-width: 1600px) {
		.panel-bottom-right {
			flex-direction: column;
			padding-left: 20px;
		}

		.phone-image-container-bottom {
			position: absolute;
			bottom: 0;
			left: 20px;
			margin-left: 0;
			height: 100%;
			width: auto;
			z-index: 0;
		}

		.phone-image-bottom {
			height: 125%;
			width: auto;
			transform: translateY(35%);
		}

		.panel-bottom-right .app-store-badges {
			position: absolute;
			top: 0;
			left: 20px;
			margin-top: 15px;
			z-index: 1;
		}

		.panel-bottom-right-content {
			align-items: flex-end;
			text-align: right;
			width: 100%;
			z-index: 1;
		}

		.panel-bottom-right .footer-text {
			align-self: flex-end;
		}
	}

	@media (max-width: 1350px) {
		.phone-image {
			height: 170%;
		}

		.panel-bottom-right-content  .panel-description-dark {
			max-width: 300px;
		}
	}

	@media (max-width: 1200px) {
		.container {
			grid-template-columns: 1fr;
			grid-template-rows: minmax(400px, 1fr) minmax(250px, auto) minmax(250px, auto);
		}

		.panel-left {
			grid-row: auto;
		}

		.phone-image-container {
			position: absolute;
			right: 20px;
			top: 0;
			height: 100%;
		}

		.phone-image {
			height: 180%;
			transform: translateY(-45%);
		}

		.phone-image-bottom {
			height: 145%;
		}

		.panel-bottom-right .app-store-badges,
		.panel-bottom-right .footer-text {
			display: none;
		}

		.page-footer {
			display: flex;
		}
	}

	@media (max-width: 550px) {
		.phone-image {
			height: 150%;
		}

		.panel-description-dark {
			width: 240px;
		}

		.phone-image-bottom {
			height: 140%;
		}
	}

	@media (max-width: 475px) {
		/* Green panel - phone centered (cut off at top), text below */
		.panel-top-right {
			flex-direction: column;
			align-items: center;
			padding: 20px;
			padding-top: 0;
		}

		.panel-top-right-content {
			width: 100%;
			text-align: center;
			order: 2;
			z-index: 1;
		}

		.phone-image-container {
			position: relative;
			right: auto;
			top: 0;
			height: auto;
			margin: 0;
			margin-bottom: -35%;
			order: 1;
			justify-content: center;
			overflow: visible;
		}

		.phone-image {
			height: 100%;
			max-width: 300px;
			transform: translateY(-40%);
		}

		.panel-description {
			width: 100%;
		}

		/* Curate panel - text above, phone centered (cut off at bottom) */
		.panel-bottom-right {
			flex-direction: column;
			align-items: center;
			padding: 20px;
			padding-bottom: 0;
		}

		.panel-bottom-right-content {
			width: 100%;
			text-align: center;
			align-items: center;
			order: 1;
			z-index: 1;
		}

		.phone-image-container-bottom {
			position: relative;
			left: auto;
			bottom: auto;
			height: auto;
			margin: 0;
			margin-top: -35%;
			order: 2;
			justify-content: center;
			overflow: visible;
		}

		.phone-image-bottom {
			height: 100%;
			max-width: 300px;
			transform: translateY(40%);
		}

		.panel-top-right .panel-title {
			margin-top: -80px;
			font-size: 1.8rem;
		}

		.panel-description {
			font-size: 1rem;
		}

		.panel-title-dark {
			font-size: 1.8rem;
		}

		.panel-description-dark {
			width: 100%;
			max-width: 100%;
			font-size: 1rem;
		}

	}
</style>
