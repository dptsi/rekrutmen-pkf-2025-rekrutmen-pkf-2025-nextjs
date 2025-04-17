import { defineConfig } from 'cypress'

export default defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		charts: true,
		reportPageTitle: 'Frontend Test Results',
		embeddedScreenshots: true,
		inlineAssets: true,
		saveAllAttempts: false,
	},
	e2e: {
		setupNodeEvents(on, config) {
			require('cypress-mochawesome-reporter/plugin')(on)
		},
		baseUrl: 'http://localhost:3000',
		env: {
			APP_BACKEND_URL: 'http://localhost:3000/api'
		}
	}
}) 