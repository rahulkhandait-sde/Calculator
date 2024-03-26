let input = document.getElementById('input-box');
let buttons = document.querySelectorAll('button');

let string = '';
let arr = Array.from(buttons);
let lastInputIsOperator = false;
let lastOperator = null;

arr.forEach((button) => {
	button.addEventListener('click', (e) => {
		const currentInput = e.target.innerHTML;

		if (currentInput === '=') {
			if (!lastInputIsOperator) {
				string = eval(string.replace('%', '/100'));
				input.value = string;
			}
		} else if (currentInput === 'AC') {
			string = '';
			input.value = string;
			lastInputIsOperator = false;
			lastOperator = null;
		} else if (currentInput === 'DEL') {
			string = string.substring(0, string.length - 1);
			input.value = string;
			lastInputIsOperator = isOperator(string[string.length - 1]);
			lastOperator = null;
		} else {
			if (lastInputIsOperator && isOperator(currentInput)) {
				// Do not add consecutive operators or start with an operator
				lastOperator = currentInput;
				if (string.length - 1 >= 0) {
					string = string.substring(0, string.length - 1) + currentInput;
				}
			} else if (string === '' && isOperator(currentInput)) {
				return;
			} else {
				string += currentInput;
				lastOperator = null;
			}

			input.value = string;
			lastInputIsOperator = isOperator(currentInput);
		}
	});
});

function isOperator(value) {
	// Define the list of operators
	const operators = ['+', '-', '*', '/', '%'];
	return operators.includes(value);
}
