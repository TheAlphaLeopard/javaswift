# Pronto Language

Pronto is a fast, simple, and powerful programming language designed for web development. It combines the best features of JavaScript with a cleaner syntax and performance optimizations, allowing developers to create efficient web applications with ease.

## Key Features

- **Simple, Readable Syntax**: Pronto's syntax is designed to be intuitive and easy to understand, making it accessible for beginners and experienced developers alike.
- **JavaScript Interoperability**: Pronto can seamlessly integrate with existing JavaScript code, allowing developers to leverage their existing knowledge and libraries.
- **Fast Execution**: The language is optimized for performance, ensuring that applications run quickly and efficiently.
- **Modern Programming Features**: Pronto includes support for modern programming paradigms, such as asynchronous programming and functional programming.
- **Built for Web Development**: Pronto is specifically designed for creating web applications, with built-in support for DOM manipulation and web APIs.

## Installation

To get started with Pronto, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/pronto-lang.git
cd pronto-lang
npm install
```

## Usage

You can run Pronto scripts using the command-line interface:

```bash
npm run pronto yourscript.pronto
```

Alternatively, you can use the provided HTML template to run Pronto code directly in the browser.

## Examples

### Simple Calculator

```pronto
fn calculate(a, b, operation) {
    if (operation == "add") {
        return a + b;
    } else if (operation == "subtract") {
        return a - b;
    } else if (operation == "multiply") {
        return a * b;
    } else if (operation == "divide") {
        if (b == 0) {
            return "Error: Division by zero";
        }
        return a / b;
    } else {
        return "Error: Unknown operation";
    }
}
```

### DOM Manipulation

```pronto
let button = createElement("button");
setText(button, "Click me!");
addClass(button, "btn");

let result = createElement("div");
addClass(result, "result");

let body = querySelector("body");
body.appendChild(button);
body.appendChild(result);

let count = 0;
on(button, "click", fn() {
    count++;
    setText(result, "Button clicked " + count + " times");
});
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.