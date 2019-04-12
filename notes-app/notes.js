const fs = require('fs');
const chalk = require('chalk');

const getNotes  = () => {
    "Your notes...";
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const inNotes = notes.some(note => {
        return note.title === title;
    });

    if (!inNotes){
        notes.push({title, body});
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added!"));
    } else {
        console.log(chalk.red.inverse("Note title taken!"));
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
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
    removeNote,
    getNotes
};