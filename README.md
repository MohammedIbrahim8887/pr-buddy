# Pr Buddy

`pr-buddy` is a command-line tool designed to help automate the creation of Pull Request (PR) documentation. It reads your latest Git commit and generates a PR description in markdown format based on a customizable template.

## Features

- Generate a PR description based on your latest Git commit.
- Use a markdown template to customize your PR documentation.
- Easily install and set up AI assistance if needed.

## Installation

You can install `pr-buddy` globally using either Bun or npm.

You need to have bun installed since core modules depend on bun

To install bun via npm 

```bash
npm install -g bun
```

### Using Bun

```bash
bun add -g pr-buddy-ai
```

### Using npm

```bash
npm i -g pr-buddy-ai
```

## Usage

Once installed, you can initialize the tool using the following command:

```bash
pr-buddy init
```

This will start the interactive CLI.

### Create a Pull Request

To create a PR document based on your latest Git commit, run:

```bash
pr-buddy init
```

Then choose the `Create PR` option. `pr-buddy` will read the latest commit and generate a Pull Request description in markdown format, which you can use as your PR documentation.

You have the ability to use either gemini or a locally installed ollama AI.

### Using a Custom Template

`pr-buddy` allows you to customize the generated PR document using a markdown template. Simply provide a `template.md` file in your root directory of your project that follows the structure you need for your PRs. An example of the template format can be found in the [GitHub repository](#).

## Example

```bash
pr-buddy init
# Choose 'Create PR'
# A PR markdown file will be generated based on the latest Git commit.
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.