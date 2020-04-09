import React, { Component } from 'react';
import cuid from 'cuid';
import NoteContext from '../../NoteContext';
import './NoteList.css';

class NewNote extends React.Component{

  static contextType = NoteContext;

  constructor(props) {
  super(props)

  this.state = {
    name: '',
    content: '',
    folder: ''
  }
}

handleNewNoteSubmit = (event) => {
  event.preventDefault();

  const noteName = this.state.name;
  const noteContent = this.state.content;
  const noteFolder = this.state.folder;
  let current_datetime = new Date();
  const note = {
    name: noteName,
    id: cuid(),
    content: noteContent,
    folder: noteFolder,
    modified: current_datetime.toString()
  };
  fetch('http://localhost:9090/notes/', {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      this.context.addNote(note)
    });
    console.log(note);
    console.log(this.state);
}

updateNoteName = (event) => {
  this.setState({
    name: event.target.value
  })
}

updateNoteContent = (event) => {
  this.setState({
    content: event.target.value
  })
}

updateNoteFolder = (event) => {
  this.setState({
    folder: event.target.value
  })

}
  


  render(){
    const { noteName } = this.state.name;
    const { noteContent } = this.state.content;
    const { noteFolder } = this.state.folder;
    return (
      <div className='new note-form'>
      <h1>New Note</h1>
      <form className='new-note' onSubmit = {this.handleNewNoteSubmit}>
        <label>Name:</label>
        <input 
        type='text'
        value = { noteName }
        onChange = {this.updateNoteName}></input>
        <label>Content:</label>
        <textarea 
        value={ noteContent }
        onChange = {this.updateNoteContent}></textarea>
        <label>Folder:</label>
        
        <input
        type='text'
        value= { noteFolder }
        onChange = {this.updateNoteFolder}></input>
       <button>Submit</button>
      </form>

      </div>

    )
  }
}

export default NewNote;