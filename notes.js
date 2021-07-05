const fs = require('fs')
const chalk = require('chalk')

// add a note
const addNote = function(title,description){
    const notes = loadNotes()
    const duplicatenotes = notes.find((note) => note.title === title )

    if (!duplicatenotes){
        notes.push({
            title: title,
            description: description
        })
        savenotes(notes)
        console.log(chalk.black.bgGreen('Note added'))
    } else{
        console.log(chalk.black.bgRed('Note with the title already exist!'))
    }
    
}

// reomve a note
const removeNote = function(title){
    const notes = loadNotes()
    if (notes.length===0){
        console.log(chalk.black.bgRed('There are no notes available!'))
    } else{
        const notestokeep = notes.filter((note) => note.title != title)
        savenotes(notestokeep)
        if(notestokeep.length === notes.length){
            console.log(chalk.black.bgRed('Note with the title was not found!'))
        }
        else{
            console.log(chalk.black.bgGreen('Note with the title ' + title + ' was removed'))
        }
    }
}

// listing all notes
const listNotes= function(){
    const notes= loadNotes()
    console.log(chalk.black.bgWhite('Notes'))
    notes.forEach((note)=>{
        console.log(chalk.black.bgGreen(note.title)+' : '+chalk.black.bgMagenta(note.description)+'.' )
    })
}

// read a note
const readNote = function(title){
    const notes = loadNotes()
    try{
        const note = notes.find((note) => note.title === title )
        console.log(chalk.black.bgGreen(note.title)+' : '+chalk.black.bgMagenta(note.description)+'.' )
    } catch{
        console.log(chalk.black.bgRed('Note with the title ' +title + ' doesnot exist!'))
    }
  
}

// common functions
const savenotes= (notes) => {
    const datajson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', datajson)
}

const loadNotes = function(){
    try{
        const dataBuffer  = fs.readFileSync('notes.json')
        const datajson = dataBuffer.toString()
        return JSON.parse(datajson)
    } catch(e){
        return []
    }
    
}


// exports
module.exports = {
    readNote: readNote,
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,

}