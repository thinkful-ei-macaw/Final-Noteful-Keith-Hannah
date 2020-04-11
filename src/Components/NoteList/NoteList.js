import React, { Component } from 'react';
import './NoteList.css';
import { Link } from 'react-router-dom';
import NoteContext from '../../NoteContext';

class NoteList extends Component {
  formatDate(date) {
    return new Date(date).toLocaleString();
  }
  static contextType = NoteContext;

  getNotes() {
    // console.log(this.context.notes)
    if (this.props.match.params.id) {
      return this.context.notes.filter(
        note => note.folderId === this.props.match.params.id,
      );
    } else {
      return this.context.notes;
    }
  }

  render() {
    // console.log(this.context.notes)
    const notes = this.getNotes();
    const deleteNote = this.context.deleteNote;
    return (
      <div className='noteList'>
        <button onClick={() => this.props.history.push('/AddNote')}>
          Add Note
        </button>
      <div>
        <ul className="Main note_list">

            {notes.map(note => {
              const date = this.formatDate(note.modified);
          return (
    
            <li key={note.id}>
              <h2>
    
                <Link to={`/note-details/${note.id}`}>{note.name}</Link>
      
              </h2>
              <p>{date}</p>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </li>
          );
          })}
          </ul>
        </div>
      </div>

      

    
    );
  }
}
export default NoteList;
