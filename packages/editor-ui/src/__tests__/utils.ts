import type { ISettingsState } from '@/Interface';
import { UserManagementAuthenticationMethod } from '@/Interface';
import { render } from '@testing-library/vue';
import { PiniaVuePlugin } from 'pinia';

export const retry = async (assertion: () => any, { interval = 20, timeout = 1000 } = {}) => {
	return new Promise((resolve, reject) => {
		const startTime = Date.now();

		const tryAgain = () => {
			setTimeout(() => {
				try {
					resolve(assertion());
				} catch (err) {
					Date.now() - startTime > timeout ? reject(err) : tryAgain();
				}
			}, interval);
		};

		tryAgain();
	});
};

type RenderParams = Parameters<typeof render>;
export const renderComponent = (Component: RenderParams[0], renderOptions: RenderParams[1] = {}) =>
	render(Component, renderOptions, (vue) => {
		vue.use(PiniaVuePlugin);
	});

export const waitAllPromises = async () => new Promise((resolve) => setTimeout(resolve));

export const SETTINGS_STORE_DEFAULT_STATE: ISettingsState = {
	settings: {
		allowedModules: {},
		communityNodesEnabled: false,
		defaultLocale: '',
		endpointWebhook: '',
		endpointWebhookTest: '',
		enterprise: {
			advancedExecutionFilters: true,
			sharing: true,
			ldap: true,
			saml: true,
			logStreaming: true,
			variables: true,
			versionControl: true,
			auditLogs: true,
		},
		executionMode: 'regular',
		executionTimeout: 0,
		hideUsagePage: false,
		hiringBannerEnabled: false,
		instanceId: '',
		isNpmAvailable: false,
		license: { environment: 'production' },
		logLevel: 'info',
		maxExecutionTimeout: 0,
		oauthCallbackUrls: { oauth1: '', oauth2: '' },
		onboardingCallPromptEnabled: false,
		personalizationSurveyEnabled: false,
		posthog: {
			apiHost: '',
			apiKey: '',
			autocapture: false,
			debug: false,
			disableSessionRecording: false,
			enabled: false,
		},
		publicApi: { enabled: false, latestVersion: 0, path: '', swaggerUi: { enabled: false } },
		pushBackend: 'sse',
		saveDataErrorExecution: 'all',
		saveDataSuccessExecution: 'all',
		saveManualExecutions: false,
		sso: {
			ldap: { loginEnabled: true, loginLabel: '' },
			saml: { loginEnabled: true, loginLabel: '' },
		},
		telemetry: { enabled: false },
		templates: { enabled: false, host: '' },
		timezone: '',
		urlBaseEditor: '',
		urlBaseWebhook: '',
		userManagement: {
			enabled: false,
			smtpSetup: false,
			authenticationMethod: UserManagementAuthenticationMethod.Email,
		},
		versionCli: '',
		versionNotifications: {
			enabled: false,
			endpoint: '',
			infoUrl: '',
		},
		workflowCallerPolicyDefaultOption: 'any',
		workflowTagsDisabled: false,
		deployment: {
			type: 'default',
		},
		variables: {
			limit: 100,
		},
	},
	promptsData: {
		message: '',
		title: '',
		showContactPrompt: false,
		showValueSurvey: false,
	},
	userManagement: {
		enabled: false,
		showSetupOnFirstLoad: false,
		smtpSetup: false,
		authenticationMethod: UserManagementAuthenticationMethod.Email,
	},
	templatesEndpointHealthy: false,
	api: {
		enabled: false,
		latestVersion: 0,
		path: '/',
		swaggerUi: {
			enabled: false,
		},
	},
	ldap: {
		loginLabel: '',
		loginEnabled: true,
	},
	saml: {
		loginLabel: '',
		loginEnabled: true,
	},
	onboardingCallPromptEnabled: false,
	saveDataErrorExecution: 'all',
	saveDataSuccessExecution: 'all',
	saveManualExecutions: false,
};
