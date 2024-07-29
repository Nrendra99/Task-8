document.addEventListener('DOMContentLoaded', function() {
    const calculator = document.getElementById('calculator');

    const screen = document.createElement('input');
    screen.type = 'text';
    screen.className = 'form-control screen';
    screen.id = 'screen';
    screen.disabled = true;
    calculator.appendChild(screen);

    let memory = [];
    let currentInput = '';

    const buttonValues = [
        ["C", "<i class='bi bi-arrow-left'></i>", ".", "x"],
        ["7", "8", "9", "/"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", "00", "=", "M"]
    ];

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
            col.appendChild(button);

            button.addEventListener('click', () => handleButtonClick(value));
        });
    });

    document.addEventListener('keydown', handleKeyPress);

    function handleButtonClick(value) {
        if (!isNaN(value) || value === "." || value === "00") {
            screen.value += value;
            currentInput += value;
        } else {
            switch (value) {
                case "C":
                    handleClearButton();
                    break;
                case "<i class='bi bi-arrow-left'></i>":
                    screen.value = screen.value.slice(0, -1);
                    currentInput = currentInput.slice(0, -1);
                    break;
                case "M":
                    handleMemoryButton();
                    break;
                case "=":
                    handleEqualsButton();
                    break;
                default:
                    handleOperatorButton(value);
                    break;
            }
        }
    }
    
    
    function handleClearButton() {
        if (screen.value === "") {
            sessionStorage.clear();
            memory = [];
        } else {
            screen.value = "";
            currentInput = "";
        }
    }

    function handleMemoryButton() {
        if (screen.value !== "") {
            memory.push(screen.value);
            sessionStorage.setItem('memory', JSON.stringify(memory));
        }
        alert("Memory: " + memory.join(", "));
    }

    function handleEqualsButton() {
        try {
            const result = eval(currentInput.replace("x", "*"));
            screen.value = result;
            currentInput = result.toString();
        } catch (error) {
            alert("Invalid Expression");
            screen.value = "";
            currentInput = "";
        }
    }

    function handleOperatorButton(value) {
        if (screen.value !== "") {
            try {
                const result = eval(currentInput.replace("x", "*"));
                screen.value = result;
                currentInput = result.toString();
            } catch (error) {
                alert("Invalid Expression");
                screen.value = "";
                currentInput = "";
                return;
            }
        }
        currentInput += value.replace('x', '*');
        screen.value = "";
    }

    function handleKeyPress(event) {
        const key = event.key;
        if (!isNaN(key) || key === "." || key === "Enter" || key === "+" || key === "-" || key === "*" || key === "/") {
            if (key === "Enter") {
                handleEqualsButton();
            } else if (!isNaN(key) || key === ".") {
                screen.value += key;
                currentInput += key;
            } else {
                handleOperatorButton(key);
            }
        } else if (key === "Backspace") {
            screen.value = screen.value.slice(0, -1);
            currentInput = currentInput.slice(0, -1);
        } else if (key.toUpperCase() === "C") {
            handleClearButton();
        } else if (key.toUpperCase() === "M") {
            handleMemoryButton();
        } else if (key === "Shift") {
            // Do nothing on Shift press
        } else {
            alert("Only numbers, operations, backspace, C, M, and Enter are allowed");
        }
    }
    // Load memory from session storage on page load
    if (sessionStorage.getItem('memory')) {
        memory = JSON.parse(sessionStorage.getItem('memory'));
    }
});