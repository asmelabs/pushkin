import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Interpreter } from "./interpreter";
import { Lexer } from "./lexer";
import { Parser } from "./parser";

function main(): void {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error("Usage: pushkin <file.push>");
		process.exit(1);
	}

	const filePath = resolve(args[0] as string);

	if (!filePath.endsWith(".push")) {
		console.error("Error: File must have a .push extension");
		process.exit(1);
	}

	let source: string;

	try {
		source = readFileSync(filePath, "utf-8");
	} catch {
		console.error(`Error: Could not read file '${filePath}'`);
		process.exit(1);
	}

	try {
		const tokens = new Lexer(source).tokenize();
		const ast = new Parser(tokens).parse();
		new Interpreter().run(ast);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error: ${error.message}`);
		}
		process.exit(1);
	}
}

main();
