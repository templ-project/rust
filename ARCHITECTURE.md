# Architecture & Design Decisions

## Overview

This template is designed as a minimal but complete starting point for Rust projects, emphasizing modern tooling, best practices, and the Rust API Guidelines without overwhelming complexity.

## Design Principles

1. **Safety-First**: Leverages Rust's ownership system and type safety
2. **Zero-Cost Abstractions**: Performance without sacrificing ergonomics
3. **Explicit Error Handling**: Uses `Result<T, E>` instead of exceptions
4. **Documentation as Code**: Doc comments with runnable examples
5. **Quality-Focused**: Built-in testing, linting, and validation

## Technology Choices

### Why Rust?

- **Memory Safety**: No null pointers, no data races (enforced at compile-time)
- **Zero-Cost Abstractions**: High-level features without runtime overhead
- **Fearless Concurrency**: Thread safety guaranteed by the compiler
- **Rich Type System**: Expressive types that prevent bugs
- **Great Tooling**: cargo, rustfmt, clippy, and extensive ecosystem

### Why Cargo?

- **Integrated Build System**: Compilation, dependencies, testing in one tool
- **Convention Over Configuration**: Sensible defaults, minimal setup
- **Dependency Management**: Semantic versioning and lock files
- **Workspace Support**: Monorepo support built-in
- **Cross-Compilation**: Easy target platform switching

### Why rustfmt?

- **Consistent Formatting**: Eliminates style debates
- **Editor Integration**: Works with all major IDEs
- **Minimal Configuration**: Sensible defaults follow Rust conventions
- **Fast**: Formats entire projects in milliseconds
- **Community Standard**: Used by nearly all Rust projects

### Why Clippy?

- **Catches Common Mistakes**: Hundreds of lints for correctness
- **Idiomatic Code**: Suggests Rust best practices
- **Performance Hints**: Identifies inefficient patterns
- **Customizable**: Enable/disable specific lints
- **Integrated**: Works with cargo check workflow

### Why Taskfile over Make?

- **Cross-Platform**: Works on Windows, Linux, macOS without GNU Make
- **Modern Syntax**: YAML-based, easier to read than Makefiles
- **Built-in Features**: Variables, dependencies, includes without shell hacks
- **Go-based**: Single binary, no dependencies
- **Task Chaining**: Easy composition of commands

### Why mise?

- **Version Management**: Pin Rust and tool versions per project
- **Multi-Tool**: Manages Rust, cargo tools, and other languages
- **Fast**: Written in Rust, faster than alternatives
- **Compatible**: Works with existing .tool-versions files
- **Task Runner**: Can replace or complement Taskfile

### Why jscpd for Duplicate Detection?

Since Rust doesn't have a mature native duplicate detection tool:

- **Multi-Language**: Works with Rust out of the box
- **Configurable Thresholds**: Set acceptable duplication levels
- **Multiple Output Formats**: HTML, JSON, console
- **Established Tool**: Well-maintained and widely used

## Module Structure

### Binary vs Library

The template provides both a binary and library:

**Binary (`src/main.rs`)**:
- Executable entry point
- Thin wrapper around library
- Command-line interface
- Ideal for applications

**Library (`src/lib.rs`)**:
- Public API
- Reusable components
- Can be used as a dependency
- Ideal for sharing code

This dual structure allows:
- Testing the library independently
- Using the crate as a dependency
- Clear separation of concerns
- Documentation for both uses

### Module Organization

```text
src/
├── main.rs       # Binary entry point (thin)
├── lib.rs        # Library entry point (exports public API)
└── greeter.rs    # Feature module (implementation)
```

Each module follows Rust conventions:

- **Module-level docs** (`//!`): Describes the module
- **Item docs** (`///`): Describes functions, structs, etc.
- **Examples in docs**: Runnable with `cargo test --doc`
- **Unit tests**: In `#[cfg(test)]` modules
- **Private by default**: Only `pub` items are exported

## Error Handling Strategy

### Custom Error Types

```rust
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum GreeterError {
    EmptyName,
    InvalidName(String),
}
```

**Benefits**:
- Type-safe error handling
- Pattern matching for recovery
- Clear error semantics
- Easy to extend

### Result Return Types

```rust
pub fn hello(name: &str) -> Result<String, GreeterError>
```

**Benefits**:
- Forces explicit error handling
- Composable with `?` operator
- No hidden control flow
- Compiler-checked exhaustiveness

### No Panics in Library Code

- Panics reserved for unrecoverable errors
- Library code returns `Result` instead
- Applications can choose panic vs recovery
- Better testability

## Testing Strategy

### Three-Level Testing

1. **Unit Tests** (in `src/` modules):
   ```rust
   #[cfg(test)]
   mod tests {
       use super::*;

       #[test]
       fn test_feature() { }
   }
   ```
   - Test individual functions
   - Fast, focused tests
   - Run with `cargo test --lib`

2. **Integration Tests** (in `tests/` directory):
   ```rust
   use rust_template::Greeter;

   #[test]
   fn test_public_api() { }
   ```
   - Test public API surface
   - Simulate real usage
   - Run with `cargo test --test '*'`

3. **Documentation Tests** (in doc comments):
   ````rust
   /// # Examples
   /// ```
   /// let msg = hello("World")?;
   /// ```
   ````
   - Ensures examples stay correct
   - Provides usage documentation
   - Run with `cargo test --doc`

### Test Organization Principles

- **One assertion per test**: Clear failure messages
- **Descriptive names**: `test_hello_with_empty_string`
- **Edge cases covered**: Empty, whitespace, special chars
- **Error paths tested**: Not just happy paths

## Documentation Philosophy

### Doc Comments Are First-Class

All public items have documentation:

```rust
/// Brief one-line summary.
///
/// Longer explanation if needed.
///
/// # Examples
///
/// ```
/// use crate::function;
/// let result = function();
/// ```
///
/// # Errors
///
/// Returns `ErrorType` if condition occurs.
pub fn function() -> Result<T, E> { }
```

### Sections Used

- **Examples**: Runnable code demonstrating usage
- **Errors**: What can go wrong (for `Result`)
- **Panics**: When function might panic (if ever)
- **Safety**: Invariants for `unsafe` code
- **Arguments**: Parameter descriptions
- **Returns**: Return value description

### Generated Documentation

```bash
cargo doc --open
```

Produces browsable HTML documentation with:
- Syntax-highlighted code
- Searchable API
- Cross-referenced links
- Example code you can copy

## Performance Considerations

### Borrowing Over Owning

```rust
// Prefer &str over String in parameters
pub fn hello(name: &str) -> Result<String, GreeterError>
```

**Benefits**:
- No unnecessary allocations
- Works with `String`, `&str`, and string slices
- More flexible API

### Zero-Cost Abstractions

Rust's abstractions compile to the same code as hand-written low-level code:

- Iterators → Loop unrolling
- Generics → Monomorphization (no vtables)
- `Result<T, E>` → Enum (no overhead)

### When to Clone

- Avoid `.clone()` unless necessary
- Use references and borrowing first
- Clone only when ownership transfer is needed
- Consider `Cow<T>` for conditional cloning

## Code Quality Gates

### Pre-Commit Checks

```bash
task validate
```

Runs:
1. **Format check**: `cargo fmt --check`
2. **Linting**: `cargo clippy -- -D warnings`
3. **Duplication**: `jscpd src/`
4. **Tests**: `cargo test`

### CI/CD Pipeline

```yaml
- Format check (fails on unformatted code)
- Clippy (fails on warnings)
- Tests (all must pass)
- Build (release mode)
```

## Structs as Class Alternative

### Rust Doesn't Have Classes

Instead, Rust uses **structs + impl blocks + traits**:

```rust
// Struct (data)
pub struct Greeter;

// Implementation (methods)
impl Greeter {
    // Associated function (like static method)
    pub fn new() -> Self {
        Self
    }

    // Method (like instance method)
    pub fn hello(&self, name: &str) -> Result<String, Error> {
        // ...
    }
}

// Traits (like interfaces)
impl Default for Greeter {
    fn default() -> Self {
        Self::new()
    }
}
```

### Benefits Over Classes

- **Composition over inheritance**: Use traits and generics
- **No hidden vtables**: Zero-cost unless trait objects used
- **Explicit self**: Clear ownership (`self`, `&self`, `&mut self`)
- **Multiple trait impls**: More flexible than single inheritance

### Common Patterns

**Builder Pattern**:
```rust
Greeter::new()
    .with_prefix("Hello")
    .build()
```

**Newtype Pattern**:
```rust
pub struct Email(String);
```

**Type State Pattern**:
```rust
struct Pending;
struct Active;
struct Config<State> { state: PhantomData<State> }
```

## Dependency Philosophy

### Minimal Dependencies

- Start with the standard library
- Add dependencies only when needed
- Prefer well-maintained crates
- Check crate quality (downloads, updates, issues)

### Common Quality Crates

- **Error handling**: `thiserror`, `anyhow`
- **Serialization**: `serde`
- **CLI**: `clap`
- **Async**: `tokio`, `async-std`
- **HTTP**: `reqwest`, `hyper`
- **Testing**: `proptest`, `criterion`

## Future Extensions

### When to Add More

- **thiserror**: When custom errors need `#[derive(Error)]`
- **anyhow**: For application error handling convenience
- **serde**: When serialization/deserialization is needed
- **proptest**: For property-based testing
- **criterion**: For benchmarking

### Keeping It Minimal

This template intentionally stays minimal to:
- Reduce learning curve
- Minimize maintenance burden
- Let developers add what they need
- Avoid unused dependencies

## References

- [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/)
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Effective Rust](https://www.lurklurk.org/effective-rust/)
