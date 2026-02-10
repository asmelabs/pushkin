import { describe, expect, spyOn, test } from "bun:test";
import { Interpreter } from "../src/interpreter";
import { Lexer } from "../src/lexer";
import { Parser } from "../src/parser";

let output: string[];
let logSpy: ReturnType<typeof spyOn>;

function run(source: string): string[] {
	output = [];
	logSpy = spyOn(console, "log").mockImplementation((...args: unknown[]) => {
		output.push(args.map(String).join(" "));
	});

	const tokens = new Lexer(source).tokenize();
	const ast = new Parser(tokens).parse();
	new Interpreter().run(ast);

	logSpy.mockRestore();
	return output;
}

describe("Interpreter", () => {
	test("declares and prints a variable", () => {
		const result = run("new x = 42;\nprint(x);");
		expect(result).toEqual(["42"]);
	});

	test("prints a number literal", () => {
		const result = run("print(10);");
		expect(result).toEqual(["10"]);
	});

	test("evaluates addition", () => {
		const result = run("new a = 10;\nnew b = 20;\nprint(a + b);");
		expect(result).toEqual(["30"]);
	});

	test("evaluates subtraction", () => {
		const result = run("new a = 50;\nnew b = 8;\nprint(a - b);");
		expect(result).toEqual(["42"]);
	});

	test("evaluates chained operations", () => {
		const result = run("print(10 + 20 - 5);");
		expect(result).toEqual(["25"]);
	});

	test("reassigns variables", () => {
		const result = run("new x = 1;\nx = 99;\nprint(x);");
		expect(result).toEqual(["99"]);
	});

	test("reassigns with expression", () => {
		const result = run("new x = 10;\nx = x + 5;\nprint(x);");
		expect(result).toEqual(["15"]);
	});

	test("handles multiple prints", () => {
		const result = run(
			"new a = 1;\nnew b = 2;\nnew c = 3;\nprint(a);\nprint(b);\nprint(c);",
		);
		expect(result).toEqual(["1", "2", "3"]);
	});

	test("throws on duplicate declaration", () => {
		expect(() => run("new x = 1;\nnew x = 2;")).toThrow(
			"Variable 'x' is already declared",
		);
	});

	test("throws on undeclared variable in print", () => {
		expect(() => run("print(x);")).toThrow("Variable 'x' is not declared");
	});

	test("throws on assignment to undeclared variable", () => {
		expect(() => run("x = 10;")).toThrow("Variable 'x' is not declared");
	});

	test("throws on undeclared variable in expression", () => {
		expect(() => run("new x = 1;\nprint(x + y);")).toThrow(
			"Variable 'y' is not declared",
		);
	});

	test("full program", () => {
		const result = run(`
			new a = 10;
			new b = 20;
			new c = a + b;
			print(c);
			a = 5;
			print(a - b);
		`);
		expect(result).toEqual(["30", "-15"]);
	});
});
