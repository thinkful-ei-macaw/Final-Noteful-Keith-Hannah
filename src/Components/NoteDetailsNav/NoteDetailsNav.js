import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NoteDetailsNav.css';
import ErrorPage from '../../Error'

class NoteDetailsNav extends Component {
  render() {
    const { id, name } = this.props.folder;
    return (
      <>
        <nav className="Sidebar">
          <ErrorPage>
          <Link className="Sidebar__nav_back" to={`/note-list/${id}`}>
            Go Back
          </Link>
          </ErrorPage>
          <h2 className="Sidebar__nav_folder">{name}</h2>
        </nav>
      </>
    );
  }
}
export default NoteDetailsNav;
