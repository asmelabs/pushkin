export type Node =
	| Program
	| VariableDeclaration
	| Assignment
	| PrintStatement
	| BinaryExpression
	| NumberLiteral
	| Identifier;

export interface Program {
	type: "Program";
	body: Statement[];
}

export type Statement = VariableDeclaration | Assignment | PrintStatement;
export type Expression = BinaryExpression | NumberLiteral | Identifier;

export interface VariableDeclaration {
	type: "VariableDeclaration";
	name: string;
	value: Expression;
}

export interface Assignment {
	type: "Assignment";
	name: string;
	value: Expression;
}

export interface PrintStatement {
	type: "PrintStatement";
	value: Expression;
}

export interface BinaryExpression {
	type: "BinaryExpression";
	operator: "+" | "-";
	left: Expression;
	right: Expression;
}

export interface NumberLiteral {
	type: "NumberLiteral";
	value: number;
}

export interface Identifier {
	type: "Identifier";
	name: string;
}
