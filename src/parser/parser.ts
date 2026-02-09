import { type Token, TokenType } from "../lexer";
import type {
	Assignment,
	Expression,
	PrintStatement,
	Program,
	Statement,
	VariableDeclaration,
} from "./ast";

export class Parser {
	private tokens: Token[];
	private pos = 0;

	constructor(tokens: Token[]) {
		this.tokens = tokens;
	}

	parse(): Program {
		const body: Statement[] = [];

		while (!this.isEnd()) {
			body.push(this.parseStatement());
		}

		return { type: "Program", body };
	}

	private parseStatement(): Statement {
		const token = this.current();

		if (token.type === TokenType.New) {
			return this.parseVariableDeclaration();
		}

		if (token.type === TokenType.Print) {
			return this.parsePrintStatement();
		}

		if (token.type === TokenType.Identifier) {
			return this.parseAssignment();
		}

		throw new Error(
			`Unexpected token '${token.value}' at line ${token.line}, column ${token.column}`,
		);
	}

	private parseVariableDeclaration(): VariableDeclaration {
		this.expect(TokenType.New);
		const name = this.expect(TokenType.Identifier).value;
		this.expect(TokenType.Equals);
		const value = this.parseExpression();
		this.expect(TokenType.Semicolon);

		return { type: "VariableDeclaration", name, value };
	}

	private parseAssignment(): Assignment {
		const name = this.expect(TokenType.Identifier).value;
		this.expect(TokenType.Equals);
		const value = this.parseExpression();
		this.expect(TokenType.Semicolon);

		return { type: "Assignment", name, value };
	}

	private parsePrintStatement(): PrintStatement {
		this.expect(TokenType.Print);
		this.expect(TokenType.LParen);
		const value = this.parseExpression();
		this.expect(TokenType.RParen);
		this.expect(TokenType.Semicolon);

		return { type: "PrintStatement", value };
	}

	private parseExpression(): Expression {
		let left = this.parsePrimary();

		while (
			this.current().type === TokenType.Plus ||
			this.current().type === TokenType.Minus
		) {
			const operator = this.advance().value as "+" | "-";
			const right = this.parsePrimary();
			left = { type: "BinaryExpression", operator, left, right };
		}

		return left;
	}

	private parsePrimary(): Expression {
		const token = this.current();

		if (token.type === TokenType.Number) {
			this.advance();
			return { type: "NumberLiteral", value: Number(token.value) };
		}

		if (token.type === TokenType.Identifier) {
			this.advance();
			return { type: "Identifier", name: token.value };
		}

		throw new Error(
			`Unexpected token '${token.value}' at line ${token.line}, column ${token.column}`,
		);
	}

	private current(): Token {
		return this.tokens[this.pos] as Token;
	}

	private advance(): Token {
		const token = this.current();
		this.pos++;
		return token;
	}

	private expect(type: TokenType): Token {
		const token = this.current();

		if (token.type !== type) {
			throw new Error(
				`Expected ${type} but got '${token.value}' at line ${token.line}, column ${token.column}`,
			);
		}

		return this.advance();
	}

	private isEnd(): boolean {
		return this.current().type === TokenType.EOF;
	}
}
