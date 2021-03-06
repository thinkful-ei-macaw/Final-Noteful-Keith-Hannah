import React, { Component } from 'react';
import './FolderNav.css';
import { NavLink } from 'react-router-dom';
import NoteContext from '../../NoteContext';


class FolderNav extends Component {
  static contextType = NoteContext;
  render() {
    const { folders } = this.context;
    return (
      <nav className="Sidebar">
        <ul>
          {folders.map(folder => {
            return (
              <li key={folder.id}>
              
                <NavLink
                  to={`/note-list/${folder.id}`}
                  activeClassName="Sidebar__selected"
                >
                  {folder.name}
                </NavLink>
                
              
              </li>
              
            );
          })}
          <li>
          <button
            className="Sidebar__new"
            onClick={() => this.props.history.push('/NewFolder')}
          >
            Add Folder
          </button>
          </li>
        </ul>
      </nav>
    );
  }
}
export default FolderNav;
