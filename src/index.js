import React from 'react';
import { render } from 'react-dom';
import TestMaker from './components/maker/TestMaker';
import TestTaker from './components/taker/TestTaker';

let testCallback = e => {
    console.log(e);
    render(<div>
        {e.map(trait => {
            return (<div>
                {`${trait.trait} (${trait.score}): ${trait.description}`}
            </div>)
        })
        }
        </div>, document.getElementById('root'))
};

let saveCallback = e => {
    console.log(e);
    render(<TestTaker test={e} onFinish={testCallback}/>, document.getElementById('root'));
};

render(<TestMaker onFinishTest={saveCallback} />, document.getElementById('root'));