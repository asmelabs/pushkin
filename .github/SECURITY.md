# Security Policy

## Supported Versions

| Version     | Supported |
| ----------- | --------- |
| 0.x.x-alpha | ✅        |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public issue.

Instead, email **security@asmelabs.com** with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact

You should receive a response within 48 hours. We will work with you to understand and address the issue before any public disclosure.

```

---

**`examples/hello.push`**
```

// Hello world in Pushkin
new a = 10;
new b = 20;
new result = a + b;
print(result);

```

**`examples/math.push`**
```

// Basic arithmetic
new x = 100;
new y = 42;

new sum = x + y;
new diff = x - y;

print(sum);
print(diff);

// Chained operations
new result = 10 + 20 - 5 + 3 - 1;
print(result);

```

**`examples/variables.push`**
```

// Variable declaration and reassignment
new counter = 0;
print(counter);

counter = 10;
print(counter);

counter = counter + 5;
print(counter);

counter = counter - 3;
print(counter);
