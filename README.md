# JavaSwift

JavaSwift is a subset/superset of JavaScript designed to be faster and more efficient. It compiles to JavaScript and is optimized for performance.

## Features
- Cleaner syntax
- Faster execution
- Compiles to JavaScript

## Getting Started
1. Clone the repository.
2. Install dependencies.
3. Run `.jsw` files using the interpreter.

## Documentation
- [Syntax](syntax.md)
- [Examples](examples.md)
- [Usage](usage.md)

## Project Structure

```
javaswift-project
├── src
│   ├── compiler
│   │   ├── index.ts        # Main compiler class for compiling Javaswift code
│   │   └── utils.ts        # Utility functions for code transformation and minification
│   ├── interpreter
│   │   ├── index.ts        # Main interpreter class for executing compiled JavaScript
│   │   └── runtime.ts      # Runtime functions for code execution and error handling
│   ├── language
│   │   ├── grammar.ts      # Grammar rules for Javaswift
│   │   └── syntax.ts       # Syntax validation and transformation methods
│   └── types
│       └── index.ts        # Interfaces for compiler and interpreter options
├── package.json             # npm configuration file
├── tsconfig.json            # TypeScript configuration file
├── README.md                # Project documentation
└── .gitignore               # Git ignore file
```

## Installation

To get started with Javaswift, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd javaswift-project
npm install
```

## Usage

To compile Javaswift code to JavaScript, use the compiler:

```typescript
import { JavaSwiftCompiler } from './src/compiler/index';

const compiler = new JavaSwiftCompiler();
const jsCode = compiler.compile(javaswiftCode);
```

To run the compiled JavaScript code, use the interpreter:

```typescript
import { JavaSwiftInterpreter } from './src/interpreter/index';

const interpreter = new JavaSwiftInterpreter();
interpreter.run(jsCode);
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.