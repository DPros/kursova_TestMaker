import React from 'react';
import { render } from 'react-dom';
import TestMaker from './components/maker/TestMaker';
import TestTaker from './components/taker/TestTaker';

let saveCallback = e => {
    render(<TestTaker testItem={e.toTest()} />, document.getElementById('taker'));
};

render(<TestMaker saveCallback={saveCallback} />, document.getElementById('maker'));
