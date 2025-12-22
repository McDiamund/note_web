<script lang="ts">
	import { onMount } from 'svelte';
	import { configureAmplify, getAppSyncClient, GET_FLAGS, UPDATE_FLAG_STATUS, GET_BLOCKED_USERS } from '$lib/appsync';
	import { fetchAuthSession, signIn, signOut } from 'aws-amplify/auth';
	import type { GraphQLResult } from '@aws-amplify/api';

	// Configure Amplify on mount
	onMount(() => {
		configureAmplify();
		checkAuth();
	});

	// State
	let loading = $state(true);
	let authenticated = $state(false);
	let currentUser = $state<any>(null);
	let activeTab = $state<'flags' | 'blocked'>('flags');

	// Flags state
	let flags = $state<any[]>([]);
	let flagsLoading = $state(false);
	let flagStatusFilter = $state<string>('pending');
	let contentTypeFilter = $state<string>('');

	// Blocked users state
	let blockedUsers = $state<any[]>([]);
	let blockedUsersLoading = $state(false);

	// Flag update state
	let updatingFlag = $state<string | null>(null);
	let reviewNotes = $state<Record<string, string>>({});
	let showReviewModal = $state(false);
	let selectedFlag = $state<any>(null);

	// Auth state
	let email = $state('');
	let password = $state('');
	let showLogin = $state(false);
	let loginError = $state('');

	async function checkAuth() {
		try {
			const session = await fetchAuthSession();
			if (session.tokens) {
				authenticated = true;
				await loadCurrentUser();
				await loadData();
			} else {
				showLogin = true;
			}
		} catch (error) {
			console.error('Auth check error:', error);
			showLogin = true;
		} finally {
			loading = false;
		}
	}

	async function handleLogin() {
		loginError = '';
		try {
			const { isSignedIn } = await signIn({ username: email, password });
			if (isSignedIn) {
				authenticated = true;
				showLogin = false;
				await loadCurrentUser();
				await loadData();
			}
		} catch (error: any) {
			loginError = error.message || 'Login failed';
		}
	}

	async function handleLogout() {
		try {
			await signOut();
			authenticated = false;
			showLogin = true;
			currentUser = null;
			flags = [];
			blockedUsers = [];
		} catch (error) {
			console.error('Logout error:', error);
		}
	}

	async function loadCurrentUser() {
		try {
			const session = await fetchAuthSession();
			const client = getAppSyncClient();
			const userId = session.userSub;
			
			const result = await client.graphql({
				query: `
					query GetUser($id: ID) {
						getUser(id: $id) {
							id
							username
							email
							isAdmin
							type
						}
					}
				`,
				variables: { id: userId }
			}) as GraphQLResult<any>;

			if (result.data?.getUser) {
				currentUser = result.data.getUser;
				if (!currentUser.isAdmin && currentUser.type !== 'admin') {
					loginError = 'Access denied: Admin privileges required';
					await handleLogout();
				}
			}
		} catch (error: any) {
			console.error('Error loading user:', error);
			loginError = error.message || 'Failed to load user';
		}
	}

	async function loadData() {
		if (activeTab === 'flags') {
			await loadFlags();
		} else {
			await loadBlockedUsers();
		}
	}

	async function loadFlags() {
		flagsLoading = true;
		try {
			const client = getAppSyncClient();
			const variables: any = {};
			
			if (flagStatusFilter) {
				variables.status = flagStatusFilter;
			}
			if (contentTypeFilter) {
				variables.contentType = contentTypeFilter;
			}

			const result = await client.graphql({
				query: GET_FLAGS,
				variables
			}) as GraphQLResult<any>;

			if (result.data?.getFlags) {
				flags = result.data.getFlags;
			} else if (result.errors) {
				console.error('Error loading flags:', result.errors);
			}
		} catch (error: any) {
			console.error('Error loading flags:', error);
		} finally {
			flagsLoading = false;
		}
	}

	async function loadBlockedUsers() {
		blockedUsersLoading = true;
		try {
			const client = getAppSyncClient();
			const result = await client.graphql({
				query: GET_BLOCKED_USERS
			}) as GraphQLResult<any>;

			if (result.data?.getBlockedUsers) {
				blockedUsers = result.data.getBlockedUsers.blockedUsers || [];
			} else if (result.errors) {
				console.error('Error loading blocked users:', result.errors);
			}
		} catch (error: any) {
			console.error('Error loading blocked users:', error);
		} finally {
			blockedUsersLoading = false;
		}
	}

	async function updateFlagStatus(flagId: string, status: string) {
		updatingFlag = flagId;
		try {
			const client = getAppSyncClient();
			const notes = reviewNotes[flagId] || '';

			const result = await client.graphql({
				query: UPDATE_FLAG_STATUS,
				variables: {
					inputData: {
						id: flagId,
						status: status,
						reviewNotes: notes || undefined
					}
				}
			}) as GraphQLResult<any>;

			if (result.data?.updateFlagStatus) {
				// Reload flags
				await loadFlags();
				// Clear review notes
				delete reviewNotes[flagId];
				showReviewModal = false;
				selectedFlag = null;
			} else if (result.errors) {
				console.error('Error updating flag:', result.errors);
				alert('Failed to update flag status');
			}
		} catch (error: any) {
			console.error('Error updating flag:', error);
			alert(error.message || 'Failed to update flag status');
		} finally {
			updatingFlag = null;
		}
	}

	function openReviewModal(flag: any) {
		selectedFlag = flag;
		reviewNotes[flag.id] = flag.reviewNotes || '';
		showReviewModal = true;
	}

	function closeReviewModal() {
		showReviewModal = false;
		selectedFlag = null;
	}

	function formatDate(dateString: string) {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleString();
	}

	function getStatusColor(status: string) {
		switch (status?.toLowerCase()) {
			case 'pending':
				return '#f59e0b';
			case 'reviewed':
				return '#3b82f6';
			case 'resolved':
				return '#10b981';
			case 'dismissed':
				return '#6b7280';
			default:
				return '#6b7280';
		}
	}

	function getReasonLabel(reason: string) {
		return reason?.charAt(0).toUpperCase() + reason?.slice(1).toLowerCase() || 'Unknown';
	}

	$effect(() => {
		if (authenticated && activeTab) {
			loadData();
		}
	});
</script>

{#if loading}
	<div class="loading-container">
		<p>Loading...</p>
	</div>
{:else if showLogin}
	<div class="login-container">
		<div class="login-card">
			<h1>Admin Login</h1>
			{#if loginError}
				<div class="error-message">{loginError}</div>
			{/if}
			<form onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
				<div class="form-group">
					<label for="email">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
						placeholder="admin@example.com"
					/>
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						required
						placeholder="Enter your password"
					/>
				</div>
				<button type="submit" class="login-button">Sign In</button>
			</form>
		</div>
	</div>
{:else}
	<div class="admin-container">
		<header class="admin-header">
			<h1>Admin Dashboard</h1>
			<div class="user-info">
				<span>Welcome, {currentUser?.username || currentUser?.email || 'Admin'}</span>
				<button class="logout-button" onclick={handleLogout}>Logout</button>
			</div>
		</header>

		<div class="tabs">
			<button
				class="tab-button"
				class:active={activeTab === 'flags'}
				onclick={() => activeTab = 'flags'}
			>
				Flagged Posts
			</button>
			<button
				class="tab-button"
				class:active={activeTab === 'blocked'}
				onclick={() => activeTab = 'blocked'}
			>
				Blocked Users
			</button>
		</div>

		{#if activeTab === 'flags'}
			<div class="flags-section">
				<div class="filters">
					<div class="filter-group">
						<label for="status-filter">Status:</label>
						<select id="status-filter" bind:value={flagStatusFilter} onchange={loadFlags}>
							<option value="">All</option>
							<option value="pending">Pending</option>
							<option value="reviewed">Reviewed</option>
							<option value="resolved">Resolved</option>
							<option value="dismissed">Dismissed</option>
						</select>
					</div>
					<div class="filter-group">
						<label for="content-type-filter">Content Type:</label>
						<select id="content-type-filter" bind:value={contentTypeFilter} onchange={loadFlags}>
							<option value="">All</option>
							<option value="note">Note</option>
							<option value="collection">Collection</option>
						</select>
					</div>
					<button class="refresh-button" onclick={loadFlags} disabled={flagsLoading}>
						{flagsLoading ? 'Loading...' : 'Refresh'}
					</button>
				</div>

				{#if flagsLoading}
					<div class="loading">Loading flags...</div>
				{:else if flags.length === 0}
					<div class="empty-state">No flagged posts found</div>
				{:else}
					<div class="flags-list">
						{#each flags as flag (flag.id)}
							<div class="flag-card">
								<div class="flag-header">
									<div class="flag-meta">
										<span class="content-type">{flag.contentType}</span>
										<span class="flag-status" style="background-color: {getStatusColor(flag.status)}">
											{flag.status}
										</span>
									</div>
									<div class="flag-date">{formatDate(flag.created)}</div>
								</div>
								
								<div class="flag-content">
									<div class="flag-info">
										<p><strong>Content ID:</strong> {flag.contentID}</p>
										<p><strong>Reason:</strong> {getReasonLabel(flag.reason)}</p>
										{#if flag.description}
											<p><strong>Description:</strong> {flag.description}</p>
										{/if}
										{#if flag.content}
											<div class="content-preview">
												<p><strong>Content:</strong></p>
												<p>{flag.content.title || flag.content.name || 'N/A'}</p>
												{#if flag.content.description}
													<p class="content-description">{flag.content.description}</p>
												{/if}
											</div>
										{/if}
									</div>
									
									<div class="reporter-info">
										<p><strong>Reported by:</strong> {flag.reporter?.username || flag.reporter?.email || 'Unknown'}</p>
										<p><strong>Reporter ID:</strong> {flag.reporterID}</p>
									</div>

									{#if flag.reviewNotes}
										<div class="review-notes">
											<p><strong>Review Notes:</strong> {flag.reviewNotes}</p>
										</div>
									{/if}
								</div>

								<div class="flag-actions">
									{#if flag.status.toLowerCase() !== 'resolved'}
										<button
											class="action-button resolve"
											onclick={() => updateFlagStatus(flag.id, 'resolved')}
											disabled={updatingFlag === flag.id}
										>
											{updatingFlag === flag.id ? 'Updating...' : 'Resolve'}
										</button>
									{/if}
									{#if flag.status.toLowerCase() !== 'dismissed'}
										<button
											class="action-button dismiss"
											onclick={() => updateFlagStatus(flag.id, 'dismissed')}
											disabled={updatingFlag === flag.id}
										>
											{updatingFlag === flag.id ? 'Updating...' : 'Dismiss'}
										</button>
									{/if}
									<button
										class="action-button review"
										onclick={() => openReviewModal(flag)}
									>
										Review
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{:else if activeTab === 'blocked'}
			<div class="blocked-section">
				{#if blockedUsersLoading}
					<div class="loading">Loading blocked users...</div>
				{:else if blockedUsers.length === 0}
					<div class="empty-state">No blocked users found</div>
				{:else}
					<div class="blocked-users-list">
						{#each blockedUsers as user (user.id)}
							<div class="user-card">
								<div class="user-info">
									<h3>{user.username || user.email || 'Unknown User'}</h3>
									<p><strong>Email:</strong> {user.email || 'N/A'}</p>
									<p><strong>User ID:</strong> {user.id}</p>
									<div class="user-badges">
										{#if user.isAdmin}
											<span class="badge admin">Admin</span>
										{/if}
										<span class="badge" class:inactive={!user.active}>
											{user.active ? 'Active' : 'Inactive'}
										</span>
										<span class="badge">{user.type || 'user'}</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}

{#if showReviewModal && selectedFlag}
	<div class="modal-overlay" onclick={closeReviewModal}>
		<div class="modal-content" onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2>Review Flag</h2>
				<button class="close-button" onclick={closeReviewModal}>×</button>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label for="review-notes">Review Notes (optional):</label>
					<textarea
						id="review-notes"
						bind:value={reviewNotes[selectedFlag.id]}
						placeholder="Add notes about your review..."
						rows="4"
					></textarea>
				</div>
				<div class="modal-actions">
					<button
						class="action-button resolve"
						onclick={() => updateFlagStatus(selectedFlag.id, 'resolved')}
						disabled={updatingFlag === selectedFlag.id}
					>
						{updatingFlag === selectedFlag.id ? 'Updating...' : 'Resolve'}
					</button>
					<button
						class="action-button dismiss"
						onclick={() => updateFlagStatus(selectedFlag.id, 'dismissed')}
						disabled={updatingFlag === selectedFlag.id}
					>
						{updatingFlag === selectedFlag.id ? 'Updating...' : 'Dismiss'}
					</button>
					<button class="action-button cancel" onclick={closeReviewModal}>Cancel</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.loading-container,
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 20px;
	}

	.login-card {
		background: white;
		padding: 40px;
		border-radius: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 400px;
	}

	.login-card h1 {
		margin-bottom: 24px;
		font-family: 'Jost', sans-serif;
		color: #2c6947;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-group label {
		display: block;
		margin-bottom: 8px;
		font-family: 'Inter', sans-serif;
		font-weight: 500;
		color: #2c2c2c;
	}

	.form-group input,
	.form-group textarea,
	.form-group select {
		width: 100%;
		padding: 12px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		box-sizing: border-box;
	}

	.form-group textarea {
		resize: vertical;
	}

	.error-message {
		background: #fee;
		color: #c33;
		padding: 12px;
		border-radius: 6px;
		margin-bottom: 20px;
		font-family: 'Inter', sans-serif;
	}

	.login-button {
		width: 100%;
		padding: 12px;
		background: #2c6947;
		color: white;
		border: none;
		border-radius: 6px;
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	.login-button:hover {
		background: #245438;
	}

	.admin-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 20px;
	}

	.admin-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
		padding-bottom: 20px;
		border-bottom: 2px solid #e5e5e5;
	}

	.admin-header h1 {
		font-family: 'Jost', sans-serif;
		color: #2c6947;
		margin: 0;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 16px;
		font-family: 'Inter', sans-serif;
	}

	.logout-button {
		padding: 8px 16px;
		background: #dc2626;
		color: white;
		border: none;
		border-radius: 6px;
		font-family: 'Inter', sans-serif;
		cursor: pointer;
		transition: background 0.2s;
	}

	.logout-button:hover {
		background: #b91c1c;
	}

	.tabs {
		display: flex;
		gap: 12px;
		margin-bottom: 30px;
		border-bottom: 2px solid #e5e5e5;
	}

	.tab-button {
		padding: 12px 24px;
		background: none;
		border: none;
		border-bottom: 3px solid transparent;
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 500;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s;
	}

	.tab-button:hover {
		color: #2c6947;
	}

	.tab-button.active {
		color: #2c6947;
		border-bottom-color: #2c6947;
	}

	.filters {
		display: flex;
		gap: 16px;
		align-items: flex-end;
		margin-bottom: 24px;
		flex-wrap: wrap;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.filter-group label {
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		font-weight: 500;
		color: #2c2c2c;
	}

	.refresh-button {
		padding: 12px 24px;
		background: #2c6947;
		color: white;
		border: none;
		border-radius: 6px;
		font-family: 'Inter', sans-serif;
		cursor: pointer;
		transition: background 0.2s;
	}

	.refresh-button:hover:not(:disabled) {
		background: #245438;
	}

	.refresh-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.loading,
	.empty-state {
		text-align: center;
		padding: 40px;
		font-family: 'Inter', sans-serif;
		color: #6b7280;
	}

	.flags-list,
	.blocked-users-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.flag-card,
	.user-card {
		background: white;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.flag-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e5e5;
	}

	.flag-meta {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.content-type {
		padding: 4px 12px;
		background: #e5e7eb;
		border-radius: 4px;
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		font-weight: 500;
		text-transform: uppercase;
	}

	.flag-status {
		padding: 4px 12px;
		border-radius: 4px;
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		font-weight: 500;
		color: white;
		text-transform: capitalize;
	}

	.flag-date {
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		color: #6b7280;
	}

	.flag-content {
		margin-bottom: 16px;
	}

	.flag-info,
	.reporter-info,
	.review-notes {
		margin-bottom: 12px;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		line-height: 1.6;
	}

	.flag-info p,
	.reporter-info p {
		margin: 4px 0;
	}

	.content-preview {
		margin-top: 12px;
		padding: 12px;
		background: #f9fafb;
		border-radius: 6px;
	}

	.content-description {
		margin-top: 8px;
		color: #6b7280;
		font-size: 13px;
	}

	.flag-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.action-button {
		padding: 8px 16px;
		border: none;
		border-radius: 6px;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.action-button.resolve {
		background: #10b981;
		color: white;
	}

	.action-button.resolve:hover:not(:disabled) {
		background: #059669;
	}

	.action-button.dismiss {
		background: #6b7280;
		color: white;
	}

	.action-button.dismiss:hover:not(:disabled) {
		background: #4b5563;
	}

	.action-button.review {
		background: #3b82f6;
		color: white;
	}

	.action-button.review:hover:not(:disabled) {
		background: #2563eb;
	}

	.action-button.cancel {
		background: #e5e7eb;
		color: #2c2c2c;
	}

	.action-button.cancel:hover {
		background: #d1d5db;
	}

	.action-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.user-card h3 {
		margin: 0 0 12px 0;
		font-family: 'Jost', sans-serif;
		color: #2c2c2c;
	}

	.user-info p {
		margin: 4px 0;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
	}

	.user-badges {
		display: flex;
		gap: 8px;
		margin-top: 12px;
	}

	.badge {
		padding: 4px 12px;
		background: #e5e7eb;
		border-radius: 4px;
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		font-weight: 500;
		text-transform: capitalize;
	}

	.badge.admin {
		background: #fef3c7;
		color: #92400e;
	}

	.badge.inactive {
		background: #fee2e2;
		color: #991b1b;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		padding: 20px;
	}

	.modal-content {
		background: white;
		border-radius: 12px;
		width: 100%;
		max-width: 600px;
		max-height: 90vh;
		overflow-y: auto;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		border-bottom: 1px solid #e5e5e5;
	}

	.modal-header h2 {
		margin: 0;
		font-family: 'Jost', sans-serif;
		color: #2c6947;
	}

	.close-button {
		background: none;
		border: none;
		font-size: 32px;
		color: #6b7280;
		cursor: pointer;
		line-height: 1;
		padding: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-button:hover {
		color: #2c2c2c;
	}

	.modal-body {
		padding: 20px;
	}

	.modal-actions {
		display: flex;
		gap: 12px;
		margin-top: 20px;
		justify-content: flex-end;
	}

	@media (max-width: 768px) {
		.admin-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.filters {
			flex-direction: column;
			align-items: stretch;
		}

		.filter-group {
			width: 100%;
		}

		.refresh-button {
			width: 100%;
		}

		.flag-actions {
			flex-direction: column;
		}

		.action-button {
			width: 100%;
		}

		.modal-actions {
			flex-direction: column;
		}
	}
</style>

