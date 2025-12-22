import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { ResourcesConfig } from 'aws-amplify';

// AppSync configuration
// These should be set via environment variables or config
const APPSYNC_CONFIG: ResourcesConfig = {
	API: {
		GraphQL: {
			endpoint: import.meta.env.VITE_APPSYNC_ENDPOINT || '',
			region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
			defaultAuthMode: 'userPool' as const
		}
	},
	Auth: {
		Cognito: {
			userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
			userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID || ''
		}
	}
};

// Initialize Amplify
export function configureAmplify() {
	try {
		Amplify.configure(APPSYNC_CONFIG);
	} catch (error) {
		console.error('Error configuring Amplify:', error);
	}
}

// Get AppSync client
export function getAppSyncClient() {
	return generateClient();
}

// Get auth session
export async function getAuthSession() {
	try {
		const session = await fetchAuthSession();
		return session;
	} catch (error) {
		console.error('Error getting auth session:', error);
		return null;
	}
}

// GraphQL queries and mutations
export const GET_FLAGS = `
	query GetFlags($status: FlagStatus, $contentType: FlagContentType, $lastID: ID, $size: Int) {
		getFlags(status: $status, contentType: $contentType, lastID: $lastID, size: $size) {
			id
			contentType
			contentID
			reporterID
			reporter {
				id
				username
				email
			}
			reason
			description
			status
			reviewedBy
			reviewNotes
			content {
				id
				name
				title
				description
				type
			}
			created
			modified
		}
	}
`;

export const UPDATE_FLAG_STATUS = `
	mutation UpdateFlagStatus($inputData: UpdateFlagStatusInput!) {
		updateFlagStatus(inputData: $inputData) {
			id
			status
			reviewNotes
			reviewedBy
			modified
		}
	}
`;

export const GET_BLOCKED_USERS = `
	query GetBlockedUsers {
		getBlockedUsers {
			id
			blockedUsers {
				id
				username
				email
				active
				type
				isAdmin
			}
			blockedCount
			created
			modified
		}
	}
`;

export const GET_USER = `
	query GetUser($id: ID) {
		getUser(id: $id) {
			id
			username
			email
			isAdmin
			type
			active
		}
	}
`;

