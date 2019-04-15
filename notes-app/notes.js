const fs = require('fs');
const chalk = require('chalk');

const listNotes  = () => {
    const notes = loadNotes();

    console.log(chalk.blue.inverse("Your notes:"));
    notes.forEach(n => {
        console.log(chalk.blue.inverse(n.title));
    })
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const inNotes = notes.some(note => note.title === title);

    if (!inNotes){
        notes.push({title, body});
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added!"));
    } else {
        console.log(chalk.red.inverse("Note title taken!"));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const readNote = title => {
    const notes = loadNotes();

    const note = notes.find(n => n.title === title);

    if (!note){
        console.log(chalk.red.inverse("No note found!"))
    } else {
        console.log(chalk.blue(note.title));
        console.log(note.body);
    }
}

const removeNote = title => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title);

    if (filteredNotes.length === notes.length){
        console.log(chalk.red.inverse("No note found!"));
    } else {
        console.log(chalk.green.inverse("Note removed!"));
        saveNotes(filteredNotes);
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNote,
    readNote,
    removeNote,
    listNotes
};