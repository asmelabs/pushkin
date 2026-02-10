import { describe, expect, test } from "bun:test";
import { Lexer, TokenType } from "../src/lexer";

describe("Lexer", () => {
	test("tokenizes number", () => {
		const tokens = new Lexer("51").tokenize();
		expect(tokens[0]).toMatchObject({ type: TokenType.Number, value: "51" });
		expect(tokens[1]).toMatchObject({ type: TokenType.EOF });
	});

	test("tokenizes identifier", () => {
		const tokens = new Lexer("foo").tokenize();
		expect(tokens[0]).toMatchObject({
			type: TokenType.Identifier,
			value: "foo",
		});
	});

	test("tokenizes keywords", () => {
		const tokens = new Lexer("new print").tokenize();
		expect(tokens[0]).toMatchObject({ type: TokenType.New });
		expect(tokens[1]).toMatchObject({ type: TokenType.Print });
	});

	test("tokenizes operators and delimiters", () => {
		const tokens = new Lexer("= + - ; ( )").tokenize();
		expect(tokens.map((t) => t.type)).toEqual([
			TokenType.Equals,
			TokenType.Plus,
			TokenType.Minus,
			TokenType.Semicolon,
			TokenType.LParen,
			TokenType.RParen,
			TokenType.EOF,
		]);
	});

	test("tokenizes variable declaration", () => {
		const tokens = new Lexer("new x = 10;").tokenize();
		expect(tokens.map((t) => t.type)).toEqual([
			TokenType.New,
			TokenType.Identifier,
			TokenType.Equals,
			TokenType.Number,
			TokenType.Semicolon,
			TokenType.EOF,
		]);
	});

	test("skips single-line comments", () => {
		const tokens = new Lexer("// this is a comment\n42").tokenize();
		expect(tokens[0]).toMatchObject({ type: TokenType.Number, value: "42" });
	});

	test("skips inline comments", () => {
		const tokens = new Lexer("new x = 10; // my var").tokenize();
		expect(tokens).toHaveLength(6); // new, x, =, 10, ;, EOF
	});

	test("tracks line numbers", () => {
		const tokens = new Lexer("new x = 10;\nnew y = 20;").tokenize();
		const y = tokens.find((t) => t.value === "y");
		expect(y?.line).toBe(2);
	});

	test("tracks column numbers", () => {
		const tokens = new Lexer("new x = 10;").tokenize();
		expect(tokens[0]?.column).toBe(1); // new
		expect(tokens[1]?.column).toBe(5); // x
		expect(tokens[2]?.column).toBe(7); // =
		expect(tokens[3]?.column).toBe(9); // 10
	});

	test("handles identifiers with underscores", () => {
		const tokens = new Lexer("my_var _private").tokenize();
		expect(tokens[0]).toMatchObject({
			type: TokenType.Identifier,
			value: "my_var",
		});
		expect(tokens[1]).toMatchObject({
			type: TokenType.Identifier,
			value: "_private",
		});
	});

	test("handles identifiers with numbers", () => {
		const tokens = new Lexer("x1 var2name").tokenize();
		expect(tokens[0]).toMatchObject({
			type: TokenType.Identifier,
			value: "x1",
		});
		expect(tokens[1]).toMatchObject({
			type: TokenType.Identifier,
			value: "var2name",
		});
	});

	test("throws on unexpected character", () => {
		expect(() => new Lexer("@").tokenize()).toThrow("Unexpected character '@'");
	});

	test("handles empty input", () => {
		const tokens = new Lexer("").tokenize();
		expect(tokens).toHaveLength(1);
		expect(tokens[0]).toMatchObject({ type: TokenType.EOF });
	});

	test("handles whitespace only", () => {
		const tokens = new Lexer("   \t\n  \n").tokenize();
		expect(tokens).toHaveLength(1);
		expect(tokens[0]).toMatchObject({ type: TokenType.EOF });
	});
});
