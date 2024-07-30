document.addEventListener('DOMContentLoaded', function() {
    const calculator = document.getElementById('calculator');
    
     // Create the screen/input element
    const screen = document.createElement('input');
    screen.type = 'text';
    screen.className = 'form-control screen';
    screen.id = 'result';
    screen.disabled = true;// Disable user input directly into the screen
    calculator.appendChild(screen);

    let currentInput = '';// Stores the current input string

    // Adjust font size based on input length
    function adjustFontSize() {
        const maxFontSize = 24; // maximum font size
        const minFontSize = 12; // minimum font size
        const maxLength = 17; // maximum number of digits before adjusting
        const length = screen.value.length;

        if (length > maxLength) {
            screen.style.fontSize = `${Math.max(minFontSize, maxFontSize - (length - maxLength))}px`;
        } else {
            screen.style.fontSize = `${maxFontSize}px`;
        }
    }
    // Array of button values to be displayed on the calculator
    const buttonValues = [
        ["C", "<i class='bi bi-arrow-left'></i>", ".", "x"],
        ["7", "8", "9", "/"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", "00", "=", "%"]
    ];
    // Loop through the button values to create buttons dynamically
    buttonValues.forEach(rowValues => {
        const row = document.createElement('div');
        row.className = 'row button-row';
        calculator.appendChild(row);

        rowValues.forEach(value => {
            const col = document.createElement('div');
            col.className = "col-3";
            row.appendChild(col);

            const button = document.createElement('button');
            button.className = `mt-2 btn w-100 btn-custom ${value === 'C' ? 'btn-clear' : ''}`;
            button.innerHTML = value;
            button.dataset.value = value;

            // Assign IDs to the specific buttons
            if (value === "C") button.id = "clear";
            if (value === "=") button.id = "equal";
            if (value === "+") button.id = "add";
            if (value === "-") button.id = "subtract";
            if (value === "%") button.id = "modulus";
            if (value === "1") button.id = "1";
            if (value === "2") button.id = "2";
            if (value === "3") button.id = "3";
            if (value === "4") button.id = "4";
            if (value === "5") button.id = "5";
            if (value === "6") button.id = "6";
            if (value === "7") button.id = "7";
            if (value === "8") button.id = "8";
            if (value === "9") button.id = "9";
            if (value === "0") button.id = "0";
            if (value === "00") button.id = "00";
            col.appendChild(button);

            // Add event listener to handle button clicks
            button.addEventListener('click', () => handleButtonClick(value));
        });
    });
    
    // Handle key press events for keyboard support
    document.addEventListener('keydown', handleKeyPress);

    // Handle button click events
    function handleButtonClick(value) {
        if (!isNaN(value) || value === "." || value === "00") {
            // If the button is a number or a decimal point, append it to the screen and current input
            screen.value += value;
            currentInput += value;
            adjustFontSize();
        } else {
            switch (value) {
                case "C":
                    handleClearButton();// Clear the screen
                    break;
                case "<i class='bi bi-arrow-left'></i>":// Handle backspace functionality
                    screen.value = screen.value.slice(0, -1);
                    currentInput = currentInput.slice(0, -1);
                    adjustFontSize();
                    break;
                case "=":
                    handleEqualsButton();// Calculate and display the result
                    break;
                case "%":
                    handleModulusButton();// Calculate and display the modulus
                    break;
                default:
                    handleOperatorButton(value);// Handle operators
                    break;
            }
        }
    }

    // Clear button functionality
    function handleClearButton() {
        screen.value = "";
        currentInput = "";
        adjustFontSize();
    }

    // Equals button functionality
    function handleEqualsButton() {
        try {
            const result = eval(currentInput.replace("x", "*"));// Evaluate the expression whilst replacing X with *
            screen.value = result;
            currentInput = result.toString();// Update the current input with the result
            adjustFontSize();
        } catch (error) {
            alert("Invalid Expression");// Show an error message if the expression is invalid
            screen.value = "";
            currentInput = "";
            adjustFontSize();
        }
    }

    // Function to handle the modulus button
    function handleModulusButton() {
        if (currentInput.includes("%")) {
            const operands = currentInput.split("%");
            if (operands.length === 2) {
                try {
                    const result = parseFloat(operands[0]) % parseFloat(operands[1]);
                    screen.value = result;
                    currentInput = result.toString();
                    adjustFontSize();
                } catch (error) {
                    alert("Invalid Expression");
                    screen.value = "";
                    currentInput = "";
                    adjustFontSize();
                }
            } 
        } else {
            currentInput += "%";
            screen.value = "";
        }
    }

    // Operator button functionality
    function handleOperatorButton(value) {
        if (screen.value !== "") {
            try {
                // Evaluate the current expression to update the screen with the result
                const result = eval(currentInput.replace("x", "*"));
                screen.value = result;
                currentInput = result.toString();// Update the current input with the result
                adjustFontSize();
            } catch (error) {
                alert("Invalid Expression");// Show an error message if the expression is invalid
                screen.value = "";
                currentInput = "";
                adjustFontSize();
            }
        }
        currentInput += value.replace('x', '*');// Append the operator to the current input
        screen.value = ""; // Clear the screen
        adjustFontSize();
    }

    // Handle keypress events
    function handleKeyPress(event) {
        const key = event.key;
        if (!isNaN(key) || key === "." || key === "Enter" || key === "+" || key === "-" || key === "*" || key === "/"|| key === "=" || key === "x") {
            if (key === "Enter" | key ==="=") { // Handle the Enter or = key for equals
                handleEqualsButton();
            } else if (!isNaN(key) || key === ".") {
                screen.value += key;// Append number or decimal point to the screen
                currentInput += key;// Append number or decimal point to the current input
                adjustFontSize();
            } else {
                handleOperatorButton(key);// Handle operator keys
            }
        } else if (key === "Backspace") { // Handle backspace functionality
            screen.value = screen.value.slice(0, -1);
            currentInput = currentInput.slice(0, -1);
            adjustFontSize();
        } else if (key.toUpperCase() === "C") {// Handle the clear key
            handleClearButton();
        } else if (key === "%") {// Handle the modulus key
            handleModulusButton();
        } else if (key === "Shift") {
            // Do nothing on Shift press
        } else {//error message
            alert("Only numbers, operations, backspace, C, X, and Enter are allowed");
        }
    }
});