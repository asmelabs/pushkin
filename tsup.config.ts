import { defineConfig } from "tsup";

export default defineConfig([
	{
		entry: ["src/index.ts"],
		format: ["esm", "cjs"],
		dts: true,
		clean: true,
		target: "esnext",
	},
	{
		entry: ["src/cli.ts"],
		format: ["esm", "cjs"],
		clean: false,
		target: "esnext",
		banner: {
			js: "#!/usr/bin/env node",
		},
	},
]);
