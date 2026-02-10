import { describe, expect, test } from "bun:test";
import { Lexer } from "../src/lexer";
import type { Program } from "../src/parser";
import { Parser } from "../src/parser";

function parse(source: string): Program {
	const tokens = new Lexer(source).tokenize();
	return new Parser(tokens).parse();
}

describe("Parser", () => {
	test("parses variable declaration", () => {
		const ast = parse("new x = 10;");
		expect(ast.body).toHaveLength(1);
		expect(ast.body[0]).toMatchObject({
			type: "VariableDeclaration",
			name: "x",
			value: { type: "NumberLiteral", value: 10 },
		});
	});

	test("parses assignment", () => {
		const ast = parse("new x = 1;\nx = 5;");
		expect(ast.body[1]).toMatchObject({
			type: "Assignment",
			name: "x",
			value: { type: "NumberLiteral", value: 5 },
		});
	});

	test("parses print statement", () => {
		const ast = parse("print(42);");
		expect(ast.body[0]).toMatchObject({
			type: "PrintStatement",
			value: { type: "NumberLiteral", value: 42 },
		});
	});

	test("parses binary expression with addition", () => {
		const ast = parse("new x = 1 + 2;");
		expect(ast.body[0]).toMatchObject({
			type: "VariableDeclaration",
			name: "x",
			value: {
				type: "BinaryExpression",
				operator: "+",
				left: { type: "NumberLiteral", value: 1 },
				right: { type: "NumberLiteral", value: 2 },
			},
		});
	});

	test("parses binary expression with subtraction", () => {
		const ast = parse("new x = 10 - 3;");
		expect(ast.body[0]).toMatchObject({
			type: "VariableDeclaration",
			name: "x",
			value: {
				type: "BinaryExpression",
				operator: "-",
				left: { type: "NumberLiteral", value: 10 },
				right: { type: "NumberLiteral", value: 3 },
			},
		});
	});

	test("parses chained binary expressions left-to-right", () => {
		const ast = parse("new x = 1 + 2 - 3;");
		// Should be ((1 + 2) - 3)
		expect(ast.body[0]).toMatchObject({
			type: "VariableDeclaration",
			name: "x",
			value: {
				type: "BinaryExpression",
				operator: "-",
				left: {
					type: "BinaryExpression",
					operator: "+",
					left: { type: "NumberLiteral", value: 1 },
					right: { type: "NumberLiteral", value: 2 },
				},
				right: { type: "NumberLiteral", value: 3 },
			},
		});
	});

	test("parses identifier in expression", () => {
		const ast = parse("new x = 1;\nnew y = x + 2;");
		expect(ast.body[1]).toMatchObject({
			type: "VariableDeclaration",
			name: "y",
			value: {
				type: "BinaryExpression",
				operator: "+",
				left: { type: "Identifier", name: "x" },
				right: { type: "NumberLiteral", value: 2 },
			},
		});
	});

	test("parses print with expression", () => {
		const ast = parse("print(1 + 2);");
		expect(ast.body[0]).toMatchObject({
			type: "PrintStatement",
			value: {
				type: "BinaryExpression",
				operator: "+",
				left: { type: "NumberLiteral", value: 1 },
				right: { type: "NumberLiteral", value: 2 },
			},
		});
	});

	test("parses multiple statements", () => {
		const ast = parse("new a = 1;\nnew b = 2;\nprint(a + b);");
		expect(ast.body).toHaveLength(3);
		expect(ast.body[0]?.type).toBe("VariableDeclaration");
		expect(ast.body[1]?.type).toBe("VariableDeclaration");
		expect(ast.body[2]?.type).toBe("PrintStatement");
	});

	test("throws on missing semicolon", () => {
		expect(() => parse("new x = 10")).toThrow("Expected Semicolon");
	});

	test("throws on missing equals in declaration", () => {
		expect(() => parse("new x 10;")).toThrow("Expected Equals");
	});

	test("throws on unexpected token", () => {
		expect(() => parse("= 10;")).toThrow("Unexpected token");
	});
});
