import type { Expression, Program, Statement } from "../parser";

export class Interpreter {
	private variables: Map<string, number> = new Map();

	run(program: Program): void {
		for (const statement of program.body) {
			this.executeStatement(statement);
		}
	}

	private executeStatement(statement: Statement): void {
		switch (statement.type) {
			case "VariableDeclaration": {
				const value = this.evaluateExpression(statement.value);
				if (this.variables.has(statement.name)) {
					throw new Error(`Variable '${statement.name}' is already declared`);
				}
				this.variables.set(statement.name, value);
				break;
			}

			case "Assignment": {
				const value = this.evaluateExpression(statement.value);
				if (!this.variables.has(statement.name)) {
					throw new Error(`Variable '${statement.name}' is not declared`);
				}
				this.variables.set(statement.name, value);
				break;
			}

			case "PrintStatement": {
				const value = this.evaluateExpression(statement.value);
				console.log(value);
				break;
			}
		}
	}

	private evaluateExpression(expression: Expression): number {
		switch (expression.type) {
			case "NumberLiteral":
				return expression.value;

			case "Identifier": {
				const value = this.variables.get(expression.name);
				if (value === undefined) {
					throw new Error(`Variable '${expression.name}' is not declared`);
				}
				return value;
			}

			case "BinaryExpression": {
				const left = this.evaluateExpression(expression.left);
				const right = this.evaluateExpression(expression.right);

				switch (expression.operator) {
					case "+":
						return left + right;
					case "-":
						return left - right;
				}
			}
		}
	}
}
