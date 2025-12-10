<script lang="ts">
	import favicon from '$lib/assets/N.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Note. | Save & Share Places</title>
	<style>
		@font-face {
			font-family: 'Jost';
			src: url('/fonts/Jost-Regular.ttf') format('truetype');
			font-weight: normal;
			font-style: normal;
			font-display: swap;
		}
		@font-face {
			font-family: 'Inter';
			src: url('/fonts/Inter_28pt-Regular.ttf') format('truetype');
			font-weight: normal;
			font-style: normal;
			font-display: swap;
		}
	</style>
</svelte:head>

{@render children()}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html, body) {
		height: 100%;
		width: 100%;
		overflow: hidden;
		background-color: #ececec;
	}

	:global(body > div) {
		height: 100%;
	}
</style>
