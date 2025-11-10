# Usage Guide

## Installation Methods

### Method 1: Clone Template (Recommended)

```bash
# Clone the template
git clone https://github.com/templ-project/rust.git my-project
cd my-project

# Remove git history
rm -rf .git

# Initialize new git repository
git init
git add .
git commit -m "Initial commit from template"

# Build and test
cargo build
cargo test
```

### Method 2: Bootstrap Script (TODO)

```bash
# TODO: Create bootstrap script similar to JavaScript template
# This will be added in future versions
```

## Development Workflow

### Running the Application

```bash
# Using cargo
cargo run

# Using Taskfile
task run

# Run release build
cargo run --release
# Or: task run:release
```

### Testing

```bash
# Run all tests (unit + integration)
cargo test
# Or: task test

# Run only unit tests
cargo test --lib
# Or: task test:unit

# Run only integration tests
cargo test --test '*'
# Or: task test:integration

# Run with verbose output
cargo test -- --nocapture

# Run specific test
cargo test test_name

# Generate coverage report (requires cargo-tarpaulin)
task test:coverage
```

Coverage reports are generated in `coverage/` directory.

### Code Quality

```bash
# Format code
cargo fmt
# Or: task format

# Check formatting without modifying
cargo fmt --check
# Or: task format:check

# Lint with clippy
cargo clippy
# Or: task lint:check

# Lint with auto-fix (when possible)
cargo clippy --fix
# Or: task lint

# Check for duplicate code
task duplicate-check

# Run all checks
task validate
```

### Building

```bash
# Debug build (faster compilation, includes debug symbols)
cargo build
# Or: task build:debug

# Release build (optimized, slower compilation)
cargo build --release
# Or: task build

# Check compilation without building
cargo check
# Or: task check

# Clean build artifacts
cargo clean
# Or: task clean
```

Build outputs:

- `target/debug/` - Debug builds with symbols
- `target/release/` - Optimized release builds

### Documentation

```bash
# Generate and open documentation
cargo doc --open
# Or: task docs

# Generate documentation without opening
cargo doc
# Or: task docs:build

# Test documentation examples
cargo test --doc
```

## Using as a Library

### In Other Rust Projects

Add to your `Cargo.toml`:

```toml
[dependencies]
rust-template = "1.0.0"
# Or from git:
rust-template = { git = "https://github.com/templ-project/rust.git" }
```

Use in your code:

```rust
use rust_template::{hello, Greeter};

fn main() {
    // Using convenience function
    let message = hello("World").unwrap();
    println!("{}", message);

    // Using struct API
    let greeter = Greeter::new();
    let message = greeter.hello("Rust").unwrap();
    println!("{}", message);
}
```

### Error Handling

```rust
use rust_template::{hello, GreeterError};

fn main() {
    match hello("") {
        Ok(msg) => println!("{}", msg),
        Err(GreeterError::EmptyName) => {
            eprintln!("Error: Name cannot be empty");
        }
        Err(e) => eprintln!("Error: {}", e),
    }
}
```

## Additional Tools

### cargo-watch - Auto-rebuild on Changes

```bash
# Install
cargo install cargo-watch
# Or: mise use cargo:cargo-watch@latest

# Watch and run tests
cargo watch -x test
# Or: task watch

# Watch and run application
cargo watch -x run
# Or: task watch:run
```

### cargo-tarpaulin - Code Coverage

```bash
# Install
cargo install cargo-tarpaulin
# Or: mise use cargo:cargo-tarpaulin@latest

# Run coverage
task test:coverage
```

### cargo-audit - Security Auditing

```bash
# Install
cargo install cargo-audit
# Or: mise use cargo:cargo-audit@latest

# Audit dependencies
cargo audit
# Or: task audit
```

### cargo-outdated - Check Dependencies

```bash
# Install
cargo install cargo-outdated
# Or: mise use cargo:cargo-outdated@latest

# Check for updates
cargo outdated
# Or: task outdated
```

### cargo-bloat - Binary Size Analysis

```bash
# Install
cargo install cargo-bloat
# Or: mise use cargo:cargo-bloat@latest

# Analyze binary size
task bloat
```

## Mise Integration

### Setup

Create `.mise.toml` in your project:

```toml
[tools]
rust = "1.75.0"
"cargo:cargo-watch" = "latest"
"cargo:cargo-tarpaulin" = "latest"
"cargo:cargo-audit" = "latest"

[tasks]
dev = "cargo watch -x run"
```

### Usage

```bash
# Install mise: https://mise.jdx.dev/
curl https://mise.run | sh

# Install tools from .mise.toml
mise install

# Use tools
mise exec -- cargo watch -x test

# Activate in shell
eval "$(mise activate bash)"  # or zsh, fish, etc.
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Rust CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: dtolnay/rust-toolchain@stable

      - name: Cache cargo registry
        uses: actions/cache@v3
        with:
          path: ~/.cargo/registry
          key: ${{ runner.os }}-cargo-registry-${{ hashFiles('**/Cargo.lock') }}

      - name: Cache cargo build
        uses: actions/cache@v3
        with:
          path: target
          key: ${{ runner.os }}-cargo-build-${{ hashFiles('**/Cargo.lock') }}

      - name: Format check
        run: cargo fmt --check

      - name: Clippy
        run: cargo clippy -- -D warnings

      - name: Test
        run: cargo test --all-features

      - name: Build
        run: cargo build --release
```

## Benchmarking

```bash
# Add benchmark to Cargo.toml:
# [[bench]]
# name = "my_benchmark"
# harness = false

# Run benchmarks (requires nightly)
cargo +nightly bench
# Or: task bench
```

## Profiling

```bash
# Install flamegraph
cargo install flamegraph

# Generate flamegraph
cargo flamegraph

# Or use perf directly (Linux)
cargo build --release
perf record --call-graph=dwarf ./target/release/rust-template
perf report
```

## Release Process

```bash
# 1. Update version in Cargo.toml
# 2. Update CHANGELOG.md
# 3. Commit changes

# 4. Run full validation
task validate

# 5. Create release build
task release

# 6. Tag release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# 7. Publish to crates.io (if public)
cargo publish
```

## Troubleshooting

### Build Fails

```bash
# Clean and rebuild
cargo clean
cargo build
```

### Tests Fail

```bash
# Run tests with output
cargo test -- --nocapture

# Run specific test
cargo test test_name -- --nocapture
```

### Clippy Warnings

```bash
# Fix automatically (when possible)
cargo clippy --fix --allow-dirty
```

### Format Issues

```bash
# Auto-format all files
cargo fmt
```

## Best Practices

1. **Run tests frequently**: Use `cargo watch -x test` during development
2. **Check before committing**: Run `task validate` before pushing
3. **Write doc comments**: Include examples in `///` comments
4. **Handle errors explicitly**: Use `Result<T, E>` instead of panicking
5. **Use clippy**: It catches many common mistakes
6. **Keep dependencies minimal**: Only add what you need
7. **Update regularly**: Run `cargo outdated` and `cargo audit` periodically

## Next Steps

- Read [ARCHITECTURE.md](ARCHITECTURE.md) for design decisions
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Explore the [Rust Book](https://doc.rust-lang.org/book/) for language details
