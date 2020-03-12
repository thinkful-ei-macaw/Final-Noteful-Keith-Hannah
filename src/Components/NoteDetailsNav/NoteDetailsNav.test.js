import React from 'react';
import ReactDOM from 'react-dom';
import NoteDetailsNav from './NoteDetailsNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NoteDetailsNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});
