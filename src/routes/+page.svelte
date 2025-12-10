<script lang="ts">
	import rangerstation from '$lib/assets/rangerstation.webp';
	import NoteLogo from '$lib/assets/Note.svg';
	import PlaceIcon from '$lib/assets/Place.svg';
	import phoneImage from '$lib/assets/IMG_1362-portrait.png';
	import phoneImage2 from '$lib/assets/IMG_1360-portrait.png';
	import googlePlayBadge from '$lib/assets/googleplay.svg';
	import appStoreBadge from '$lib/assets/appstore.svg';
</script>

<div class="container">
	<div class="panel panel-left" style="background-image: url({rangerstation})">
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
			<img src={phoneImage} alt="Note app on phone" class="phone-image" />
		</div>
	</div>
	<div class="panel panel-bottom-right">
		<div class="phone-image-container-bottom">
			<img src={phoneImage2} alt="Note app on phone" class="phone-image-bottom" />
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
					<a href="/privacy-policy">Privacy Policy</a> - <a href="/terms-conditions">Terms & Conditions</a>
				</p>
				<p class="footer-copyright">Treadway Designs LLC. © 2026</p>
			</div>
		</div>
	</div>
</div>

<style>
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
		font-size: 2.7rem;
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
		font-size: 1.5rem;
		font-weight: 500;
		color: #ffffff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}

	.location-city {
		font-family: 'Jost', sans-serif;
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.85);
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}

	.place-icon {
		width: 64px;
		height: 64px;
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
		flex: 1;
		z-index: 1;
	}

	.phone-image-container {
		position: relative;
		display: flex;
		align-items: flex-start;
		margin-right: 20px;
	}

	.phone-image {
		height: 200%;
		width: auto;
		object-fit: contain;
		transform: translateY(-48%);
	}

    .panel-top-right .panel-title {
		font-size: 2.8rem;
    }

	.panel-title {
		font-family: 'Jost', sans-serif;
		font-size: 2.2rem;
		font-weight: 500;
		color: #ffffff;
	}

	.panel-description {
		font-family: 'Inter', sans-serif;
		font-size: 1.1rem;
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
		z-index: 1;
	}

	.panel-title-dark {
		font-family: 'Jost', sans-serif;
		font-size: 2.8rem;
		font-weight: 500;
		color: #2c2c2c;
	}

	.panel-description-dark {
		font-family: 'Inter', sans-serif;
		font-size: 1.1rem;
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
		height: 60px;
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
		font-size: 0.9rem;
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
		font-size: 0.9rem;
		color: #2c2c2c;
	}

	/* Tablet breakpoint */
	@media (max-width: 900px) {
		.container {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* Mobile breakpoint */
	@media (max-width: 600px) {
		.container {
			grid-template-columns: 1fr;
			grid-template-rows: 2fr 1fr 1fr;
		}

		.panel-left {
			grid-row: auto;
		}
	}
</style>
