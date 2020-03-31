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
		// event.preventDefault();
		console.log('click');
    const folderName = this.state;
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
				// console.log(data);
				this.updateFolderName(data);
			});
			
  }

	updateFolderName = (event) => {
		console.log(event)
		this.setState({
			name: event.name.value
		})
	}


	render() {
		const { folderName } = this.state
		return (
			<form onSubmit={this.handleNewFolderSubmit}>
				<div>
					<label>Folder Name:</label>
					<input
						type="text"
						value={ folderName }
						
					
					/>
				</div>
				<button type="submit" value='Submit'>Submit</button>
			</form>
		)
	}
}

export default NewFolder;