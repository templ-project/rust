# Rust Bootstrap Template# rust

Rust Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Rust CI](https://github.com/templ-project/rust/workflows/Rust%20CI/badge.svg)](https://github.com/templ-project/rust/actions)

> A modern Rust project template with testing, linting, formatting, and quality tools built-in.

## Quick Start

**Bootstrap a new project:**

Using uvx (recommended)

```bash
uvx --from git+https://github.com/templ-project/rust.git bootstrap my-project
cd my-project
task test
```

Or clone manually

```bash
git clone https://github.com/templ-project/rust.git my-project
cd my-project
# Remove template-specific files
rm -rf .git .uvx-install javascript/ cpp/
# Install dependencies (requires system packages: pkg-config, libssl-dev)
mise install
cargo build
```

That's it! You now have a fully configured Rust project.

## What's Included

- ✅ **Cargo** - Modern Rust package manager and build system
- ✅ **Unit & Integration Tests** - Comprehensive test coverage with `cargo test`
- ✅ **rustfmt** - Automatic code formatting
- ✅ **clippy** - Advanced linting for idiomatic Rust
- ✅ **Taskfile** - Task automation for common workflows
- ✅ **mise** - Toolchain version management
- ✅ **cargo-tarpaulin** - Code coverage reports
- ✅ **jscpd** - Duplicate code detection
- ✅ **Documentation** - Generated with `cargo doc`
- ✅ **CI/CD** - GitHub Actions workflows with multi-platform support
- ✅ **Auto-retry** - Automatic retry of failed CI jobs
- ✅ **uvx Bootstrap** - One-command project scaffolding

## Common Commands

```bash
# Using Taskfile (recommended)
task build              # Build in release mode
task test               # Run all tests
task test:coverage      # Run tests with coverage
task lint               # Run clippy and auto-fix
task format             # Format code with rustfmt
task docs               # Generate and open documentation
task validate           # Run all quality checks
task run                # Run the application

# Using cargo directly
cargo build             # Build in debug mode
cargo test              # Run tests
cargo clippy            # Lint code
cargo fmt               # Format code
cargo doc --open        # Generate and open docs
cargo run               # Run the application
```

## Project Structure

```text
src/
├── main.rs            # Main entry point (binary)
├── lib.rs             # Library entry point
└── greeter.rs         # Example module with documentation
tests/
└── greeter_tests.rs   # Integration tests
```

## Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Usage Guide](USAGE.md)** - Detailed usage instructions
- **[Architecture](ARCHITECTURE.md)** - Design decisions and architecture

## Requirements

- Rust (latest stable recommended)
- cargo (comes with Rust)
- Optional: [mise](https://mise.jdx.dev/) for toolchain management
- Optional: [Task](https://taskfile.dev/) for task automation

### System Dependencies (for coverage tools)

**Ubuntu/Debian:**
```bash
sudo apt install pkg-config libssl-dev
```

**Fedora/RHEL:**
```bash
sudo dnf install pkg-config openssl-devel
```

**macOS:**
```bash
brew install pkg-config openssl
```

**Then install coverage tool:**
```bash
cargo install cargo-tarpaulin
```

## Building

Build the project in different modes:

```bash
# Debug build (faster compilation, slower runtime)
cargo build

# Release build (optimized)
cargo build --release

# Using Taskfile
task build              # Release build
task build:debug        # Debug build
```

Outputs:
- `target/debug/` - Debug builds with symbols
- `target/release/` - Optimized release builds

## Configuration

Configuration files:

- **Cargo.toml**: Package metadata, dependencies, build profiles
- **rustfmt.toml**: Code formatting rules (Rust API Guidelines)
- **clippy.toml**: Linting configuration
- **.jscpd.json**: Code duplication detection
- **Taskfile.yml**: Task automation

## CI/CD

The template includes comprehensive GitHub Actions workflows:

- **CI Pipeline** - Runs on every push/PR to `main` or `develop`
  - Multi-platform builds (Linux, macOS, Windows)
  - Code formatting and linting checks
  - Test execution with coverage
  - Duplicate code detection
- **Auto-retry** - Automatically retries failed jobs (up to 3 attempts)
- **Version bumping** - Conventional commits-based versioning (optional)
- **Releases** - Automated GitHub releases with binaries (optional)

See [`.github/workflows/README.md`](.github/workflows/README.md) for details.

## Quality Checks

Run all quality checks before committing:

```bash
task validate
```

This runs:

- Code formatting check (`cargo fmt --check`)
- Linting with clippy (`cargo clippy -- -D warnings`)
- Code duplication detection (`jscpd`)
- All tests (`cargo test`)

## Testing

The template includes both unit tests and integration tests:

```bash
# Run all tests
task test

# Run only unit tests (in src/ files)
task test:unit

# Run only integration tests (in tests/ directory)
task test:integration

# Generate coverage report (requires cargo-tarpaulin)
task test:coverage
```

## Rust Class Alternative

Since Rust doesn't have classes, this template demonstrates the idiomatic alternative:

**Structs with `impl` blocks:**
```rust
pub struct Greeter;

impl Greeter {
    pub fn new() -> Self {
        Self
    }

    pub fn hello(&self, name: &str) -> Result<String, GreeterError> {
        // Implementation
    }
}
```

This provides similar functionality to classes with:
- Associated functions (like static methods)
- Instance methods (like class methods)
- Traits (like interfaces)
- Composition over inheritance

## Additional Tools

Install additional Rust tools via mise or cargo:

```bash
# Via mise (recommended - add to .mise.toml)
mise use cargo:cargo-watch@latest
mise use cargo:cargo-tarpaulin@latest

# Via cargo install
cargo install cargo-watch      # Auto-reload on changes
cargo install cargo-tarpaulin  # Code coverage
cargo install cargo-audit      # Security audit
cargo install cargo-outdated   # Dependency updates
cargo install cargo-bloat      # Binary size analysis
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Support

- Report bugs via [GitHub Issues](https://github.com/templ-project/rust/issues)
- Ask questions in [Discussions](https://github.com/templ-project/rust/discussions)
