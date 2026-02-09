import { KEYWORDS, type Token, TokenType } from "./tokens";

export class Lexer {
	private source: string;
	private pos = 0;
	private line = 1;
	private column = 1;
	private tokens: Token[] = [];

	constructor(source: string) {
		this.source = source;
	}

	tokenize(): Token[] {
		while (this.pos < this.source.length) {
			const char = this.source[this.pos];

			// skip whitespace
			if (char === " " || char === "\t" || char === "\r") {
				this.advance();
			}

			// Newlines
			if (char === "\n") {
				this.line++;
				this.column = 1;
				this.pos++;
			}

			// Single-line comments
			if (char === "/" && this.source[this.pos + 1] === "/") {
				this.skipComment();
			}

			// Numbers
			if (this.isDigit(this.charAt(this.pos))) {
				this.readNumber();
			}

			// Identifiers and keywords
			if (this.isAlpha(this.charAt(this.pos))) {
				this.readIdentifier();
			}

			// Single character tokens
			switch (char) {
				case "+":
					this.addToken(TokenType.Plus, "+");
					break;
				case "-":
					this.addToken(TokenType.Minus, "-");
					break;
				case "=":
					this.addToken(TokenType.Equals, "=");
					break;
				case ";":
					this.addToken(TokenType.Semicolon, ";");
					break;
				case "(":
					this.addToken(TokenType.LParen, "(");
					break;
				case ")":
					this.addToken(TokenType.RParen, ")");
					break;
				default:
					throw new Error(
						`Unexpected character '${char}' at line ${this.line}, column ${this.column}`,
					);
			}

			this.advance();
		}

		this.tokens.push({
			type: TokenType.EOF,
			value: "",
			line: this.line,
			column: this.column,
		});

		return this.tokens;
	}

	private charAt(pos: number): string {
		return this.source[pos] ?? "\0";
	}

	private advance(): void {
		this.pos++;
		this.column++;
	}

	private skipComment(): void {
		while (this.pos < this.source.length && this.source[this.pos] !== "\n") {
			this.pos++;
		}
	}

	private addToken(type: TokenType, value: string): void {
		this.tokens.push({
			type,
			value,
			line: this.line,
			column: this.column,
		});
	}

	private readNumber(): void {
		const start = this.pos;
		const startColumn = this.column;

		while (
			this.pos < this.source.length &&
			this.isDigit(this.charAt(this.pos))
		) {
			this.advance();
		}

		this.tokens.push({
			type: TokenType.Number,
			value: this.source.slice(start, this.pos),
			line: this.line,
			column: startColumn,
		});
	}

	private readIdentifier(): void {
		const start = this.pos;
		const startColumn = this.column;

		while (
			this.pos < this.source.length &&
			this.isAlphaNumeric(this.charAt(this.pos))
		) {
			this.advance();
		}

		const value = this.source.slice(start, this.pos);
		const type = KEYWORDS[value] ?? TokenType.Identifier;

		this.tokens.push({
			type,
			value,
			line: this.line,
			column: startColumn,
		});
	}

	// data type helpers
	private isDigit(char: string): boolean {
		return char >= "0" && char <= "9";
	}

	private isAlpha(char: string): boolean {
		return (
			(char >= "a" && char <= "z") ||
			(char >= "A" && char <= "Z") ||
			char === "_"
		);
	}

	private isAlphaNumeric(char: string): boolean {
		return this.isDigit(char) || this.isAlpha(char);
	}
}
