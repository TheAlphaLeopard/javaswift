#### 2. **`examples.md`**
```markdown
# JavaSwift Examples

Here are some examples to help you get started with JavaSwift:

## Example 1: Hello World
```javaswift
fn main() {
    print("Hello, World!");
}
```

## Example 2: Calculator
```javaswift
fn calculate(a, b, op) {
    if op == "+" {
        return a + b;
    } else if op == "-" {
        return a - b;
    } else if op == "*" {
        return a * b;
    } else if op == "/" {
        if b == 0 {
            return "Error: Division by zero";
        }
        return a / b;
    } else {
        return "Error: Unknown operation";
    }
}
```

## Example 3: Animal Class
```javaswift
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        print(this.name + " makes a sound.");
    }
}

let dog = new Animal("Dog");
dog.speak(); // Output: Dog makes a sound.
```