<script lang="ts">
	import NoteLogo from "$lib/assets/Note.svg";
</script>

<div class="container">
	<div class="panel panel-left">
		<a href="/" class="logo-link">
			<img src={NoteLogo} alt="Note" class="logo" />
		</a>
		<div class="bottom-row">
			<h1 class="page-title">Support</h1>
		</div>
	</div>
	<div class="panel panel-right">
		<div class="content">
			<strong>Support</strong>
			<p>
				We're here to help you get the most out of Note. If you have any
				questions, concerns, or need assistance with the app, please
				don't hesitate to reach out.
			</p>
			<br />
			<strong>Contact Us</strong>
			<p>
				If you need support or have any concerns regarding the app,
				please email us at:
			</p>
			<br />
			<p>
				<a href="mailto:support@usenote.co" class="email-link">support@usenote.co</a>
			</p>
			<br />
			<p>
				We aim to respond to all inquiries within 48 hours. Please
				include as much detail as possible about your issue or question
				so we can assist you more effectively.
			</p>
			<br />
			<hr />
			<br />
			<strong>Account Deletion</strong>
			<p>
				If you would like to delete your account and all associated
				data, please send a request to:
			</p>
			<br />
			<p>
				<a href="mailto:support@usenote.co" class="email-link">support@usenote.co</a>
			</p>
			<br />
			<p>
				Please include "Account Deletion Request" in the subject line
				and provide the email address associated with your account. We
				will process your request and confirm once your account and data
				have been permanently deleted.
			</p>
			<br />
			<p>
				Please note that account deletion is permanent and cannot be
				undone. All your saved notes, places, collections, and preferences will
				be removed from our servers.
			</p>
		</div>
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 0.9fr 1fr;
		gap: 12px;
		padding: 12px;
		height: 100%;
		box-sizing: border-box;
	}

	.panel {
		border-radius: 12px;
	}

	.panel-left {
		background-color: #2c2c2c;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.panel-right {
		background-color: #e6f1eb;
		padding: 40px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.logo {
		height: 32px;
		width: auto;
	}

	.logo-link {
		width: fit-content;
	}

	.bottom-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.page-title {
		font-family: "Jost", sans-serif;
		font-size: clamp(1.75rem, 4vw, 3.5rem);
		font-weight: 500;
		color: #ffffff;
	}

	.content {
		flex: 1;
		overflow-y: auto;
		font-family: "Inter", sans-serif;
		font-size: 1rem;
		line-height: 1.6;
		color: #2c2c2c;
	}

	.email-link {
		color: #2c6947;
		font-weight: 500;
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.email-link:hover {
		opacity: 0.7;
		text-decoration: underline;
	}

	hr {
		border: none;
		border-top: 1px solid #2c2c2c;
		opacity: 0.2;
		margin: 0;
	}

	/* 1200px breakpoint - single column */
	@media (max-width: 1200px) {
		.container {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1fr;
		}

		.panel-left {
			min-height: 200px;
		}
	}
</style>

