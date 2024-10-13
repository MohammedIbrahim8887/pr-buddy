#!/usr/bin/env bun

import chalk from "chalk";
import { Command } from "commander";
import figlet from "figlet";
import inquirer from "inquirer";
import createPr from "./cmd/create-pr";
import setup from "./cmd/setup";
import { execa, execaCommandSync } from "execa";

const program = new Command();

program
  .name("Pr-Buddy")
  .description("An AI tool to help you write better pull requests")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize the project")
  .action(() => {
    figlet("PR - BUDDY", { font: "3-D" }, (err, data) => {
      console.log(chalk.green(data));
      if (err) {
        console.log("Sorry, something went wrong");
        console.dir(err);
        return;
      }

      try {
        execaCommandSync("ollama --version");
        console.log(chalk.green("Ollama is installed. Starting the server..."));
        execa("ollama", ["serve"], {
          detached: true,
          stdio: "ignore",
        }).catch((err) => {
          console.log(chalk.red("Failed to start Ollama server:"), err);
        });
      } catch (err) {}

      console.log(
        chalk.green(
          "Welcome to PR-Buddy, An AI tool to help you write better pull requests",
        ),
      );

      inquirer
        .prompt([
          {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["Setup", "Create a PR"],
          },
        ])
        .then((answers) => {
          if (answers.action === "Setup") {
            setup();
          } else if (answers.action === "Create a PR") {
            createPr();
          }
        });
    });
  });

program.parse();
