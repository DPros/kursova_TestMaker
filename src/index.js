import React from 'react';
import { render } from 'react-dom';
import TestMaker from './components/maker/TestMaker';

let saveCallback = e => {
    console.log(e)
};

render(<TestMaker saveCallback={saveCallback} mode="edit"/>, document.getElementById('root'));
