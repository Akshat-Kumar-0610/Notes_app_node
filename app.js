const yargs= require('yargs')
const fs = require('fs')
const notes = require('./notes.js')



// add a note
yargs.command({
    command: 'add',
    describe:'Add a new note',
    builder: {
        title:{
            describe: 'Title of the note',
            demandOption: true,
            type:'string'
        },
        description:{
            describe: 'Description of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.description)
    }
})
// remove a note
yargs.command({
    command: 'remove',
    describe:'Remove a new note',
    builder: {
        title:{
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})
// read a note
yargs.command({
    command: 'read',
    describe:'read a note',
    builder: {
        title:{
            describe:'Title of the note',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

// list notes
yargs.command({
    command: 'list',
    describe:'List notes',
    handler(){
        notes.listNotes()
    }
})

console.log(yargs.argv) 
