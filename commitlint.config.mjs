/** @type {import('@commitlint/types').UserConfig} */
const config = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"feat", // Features
				"fix", // Bug fix
				"refactor", // Code refactoring
				"chore", // Maintenance tasks
				"docs", // Documentation changes
				"style", // Code style changes (formatting, etc.)
				"wip", // Work in progress
				"test", // Tests
				"ci", // Continuous integration
				"perf", // Performance improvements
				"build", // Build system changes
				"revert", // Revert changes
			],
		],

		"type-case": [2, "always", "lower-case"],
		"subject-case": [2, "always", "lower-case"],

		"subject-full-stop": [2, "never", "."],
	},
};

export default config;
