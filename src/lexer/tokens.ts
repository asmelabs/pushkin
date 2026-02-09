export enum TokenType {
	// Literals
	Number = "Number",
	Identifier = "Identifier",

	// Keywords
	New = "New",
	Print = "Print",

	// Operators
	Equals = "Equals",
	Plus = "Plus",
	Minus = "Minus",

	// Delimiters
	Semicolon = "Semicolon",
	LParen = "LParen",
	RParen = "RParen",

	// End of file
	EOF = "EOF",
}

export interface Token {
	type: TokenType;
	value: string;
	line: number;
	column: number;
}

export const KEYWORDS: Record<string, TokenType> = {
	new: TokenType.New,
	print: TokenType.Print,
};
