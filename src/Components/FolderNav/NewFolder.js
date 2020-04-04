import React, { Component } from 'react';
import cuid from 'cuid';
import NoteContext from '../../NoteContext';


class NewFolder extends React.Component {

	static contextType = NoteContext;

    constructor(props) {
		super(props)

		this.state = {
			name: '',
		}
	}

	handleNewFolderSubmit = (event) => {
		event.preventDefault();
	
    const folderName = this.state.name;
    const folder = {
			name: folderName,
			id: cuid()
    };
    fetch('http://localhost:9090/folders/', {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
				this.context.addFolder(folder)
			});
			
  }

	updateFolderName = (event) => {
		this.setState({
			name: event.target.value 
		})
		
	}

	render() {
		const { folderName } = this.state.name
		return (
			<form onSubmit={this.handleNewFolderSubmit}>
				<div>
					<label>Folder Name:</label>
					<input
						type="text"
						value={ folderName }
						onChange={this.updateFolderName}
						
					
					/>
					
				</div>
				<input type="submit" value='Submit'/>
			</form>
		)
	}
}

export default NewFolder;