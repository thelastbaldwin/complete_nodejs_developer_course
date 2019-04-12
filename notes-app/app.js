const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const {
    addNote,
    getNotes,
    removeNote
} = require('./notes');

// Customize application version
yargs.version("0.0.1");

// Create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        const {
            title, body
        } = argv;

        addNote(title, body);
    }
});

yargs.command({
    command: "remove",
    describe: "Removing a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler: argv => {
        removeNote(argv.title);
    }
});

yargs.command({
    command: "read",
    describe: "Reading a note",
    handler: () => {
        console.log("Reading a note!");
    }
});

yargs.command({
    command: "list",
    describe: "List all notes",
    handler: () => {
        console.log("Listing notes!");
    }
});

yargs.parse();