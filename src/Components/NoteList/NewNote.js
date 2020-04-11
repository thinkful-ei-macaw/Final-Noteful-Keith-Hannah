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
    folderId: ''
  }
}

handleNewNoteSubmit = (event) => {
  event.preventDefault();

  const noteName = this.state.name;
  const noteContent = this.state.content;
  const noteFolder = this.state.folderId;
  let current_datetime = new Date();
  const note = {
    name: noteName,
    id: cuid(),
    content: noteContent,
    folderId: noteFolder,
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

    this.props.history.push('/');

    console.log(note);
    console.log(noteFolder);
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

updateFolder = (event) => {
  console.log(event.target.value);
  this.setState({
    folderId: event.target.value
  })
}

  


  render(){
    let folders = this.context.folders;
    const { noteName } = this.state.name;
    const { noteContent } = this.state.content;
    return (
      <div className='new note-form'>
      <h1>New Note</h1>
      <form className='new-note' onSubmit = {this.handleNewNoteSubmit} >
        <label>Name:</label>
        <input 
        required
        type='text'
        value = { noteName }
        onChange = {this.updateNoteName}></input>
        <label>Content:</label>
        <textarea 
        required
        value={ noteContent }
        onChange = {this.updateNoteContent}></textarea>

        <label htmlFor="folder-choice">Select Folder </label>
        <select name="folder-choice" onChange={this.updateFolder}>
          <option disabled >Select Folder</option>
          {folders.map(item =>{
            return(
                <option key={item.id} value={item.id}>{item.name}</option>
            
            )
          })}
          </select>
       <button >Submit</button>
      </form>

      </div>
    )
  }
}

export default NewNote;