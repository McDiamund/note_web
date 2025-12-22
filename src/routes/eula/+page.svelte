<script lang="ts">
	import NoteLogo from "$lib/assets/Note.svg";
</script>

<div class="container">
	<div class="panel panel-left">
		<a href="/" class="logo-link">
			<img src={NoteLogo} alt="Note" class="logo" />
		</a>
		<div class="bottom-row">
			<h1 class="page-title">End User License Agreement</h1>
		</div>
	</div>
	<div class="panel panel-right">
		<div class="content">
			<strong>End User License Agreement</strong><br />
			<p>
				This End User License Agreement (hereby referred to as "EULA") applies to the Note. app (hereby
				referred to as "Application") for mobile devices that was
				created by Treadway Designs LLC. (hereby referred to as "Service
				Provider") as a Freemium service.
			</p>
			<br />
			<p>
				By downloading, installing, accessing, or using the Application, you agree to be bound by the terms of this EULA. If you do not agree to the terms of this EULA, do not use the Application.
			</p>
			<br />
			<strong>License Grant</strong>
			<p>
				Subject to your compliance with this EULA, the Service Provider grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Application for your personal, non-commercial use.
			</p>
			<br />
			<strong>Acceptable Use Policy</strong>
			<p>
				You agree to use the Application only for lawful purposes and in accordance with this EULA. You agree NOT to:
			</p>
			<ul>
				<li>
					Use the Application to post, transmit, or otherwise make available any content that is harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable
				</li>
				<li>
					Engage in hate speech, discrimination, or harassment based on race, religion, gender, sexual orientation, disability, or any other protected characteristic
				</li>
				<li>
					Post, transmit, or otherwise make available any content that promotes violence, illegal activities, or violates any applicable laws or regulations
				</li>
				<li>
					Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with any person or entity
				</li>
				<li>
					Interfere with or disrupt the Application or servers or networks connected to the Application
				</li>
				<li>
					Attempt to gain unauthorized access to any portion of the Application or any other accounts, computer systems, or networks connected to the Application
				</li>
				<li>
					Use any robot, spider, or other automatic device, process, or means to access the Application for any purpose
				</li>
				<li>
					Copy, modify, distribute, sell, or lease any part of the Application or reverse engineer or attempt to extract the source code of the Application
				</li>
			</ul>
			<br />
			<strong>Prohibited Content and Behavior</strong>
			<p>
				The Service Provider strictly prohibits the use of the Application to create, share, or store content that:
			</p>
			<ul>
				<li>
					Contains hate speech, discriminatory language, or promotes violence against individuals or groups
				</li>
				<li>
					Is sexually explicit, pornographic, or contains nudity
				</li>
				<li>
					Violates intellectual property rights, including copyrights, trademarks, or patents
				</li>
				<li>
					Contains malware, viruses, or other harmful code
				</li>
				<li>
					Is used for spam, phishing, or other fraudulent activities
				</li>
				<li>
					Violates any applicable local, state, national, or international law or regulation
				</li>
			</ul>
			<br />
			<strong>Content Moderation</strong>
			<p>
				The Service Provider reserves the right, but is not obligated, to monitor, review, and remove any content that violates this EULA. The Service Provider may, at its sole discretion, suspend or terminate your access to the Application if you violate any provision of this EULA.
			</p>
			<br />
			<strong>User Content</strong>
			<p>
				You retain ownership of any content you create, upload, or share through the Application. However, by using the Application, you grant the Service Provider a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content solely for the purpose of providing and improving the Application.
			</p>
			<br />
			<strong>Intellectual Property</strong>
			<p>
				The Application, including its original content, features, and functionality, is owned by the Service Provider and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. Unauthorized copying, modification, or distribution of the Application or any part thereof is strictly prohibited.
			</p>
			<br />
			<strong>Termination</strong>
			<p>
				This license is effective until terminated. Your rights under this license will terminate automatically without notice if you fail to comply with any term of this EULA. Upon termination, you must cease all use of the Application and delete all copies of the Application from your devices.
			</p>
			<br />
			<strong>Disclaimer of Warranties</strong>
			<p>
				The Application is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. The Service Provider disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
			</p>
			<br />
			<strong>Limitation of Liability</strong>
			<p>
				To the maximum extent permitted by applicable law, the Service Provider shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Application.
			</p>
			<br />
			<strong>Changes to This EULA</strong>
			<p>
				The Service Provider may periodically update this EULA. Therefore, you are advised to review this page regularly for any changes. The Service Provider will notify you of any changes by posting the new EULA on this page. Your continued use of the Application after any changes constitutes your acceptance of the new EULA.
			</p>
			<br />
			<p>This EULA is effective as of 2025-12-10</p>
			<br />
			<strong>Contact Us</strong>
			<p>
				If you have any questions or suggestions about this EULA, please do not hesitate to contact the Service Provider at support@usenote.co.
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

