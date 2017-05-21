import React from "react";

import "../../assets/stylesheets/base.scss";

class Variant extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        value: React.PropTypes.object,
        checked: React.PropTypes.bool,
    };

    static defaultProps = {
        checked: false,
    };

    handleTextChange = e => {
        this.props.onChange(Object.assign(this.props.value, {text: e.target.value}));
    };

    handleAnswerChange = e => {
        this.props.onChange(Object.assign(this.props.value, {isCorrect: e.target.checked}));
    };

    render() {
        let {trigger, checked, value: {text}={text: ''}} = this.props;
        return (<div className="variant">
            <input type={trigger} name="answer" onChange={this.handleAnswerChange}
                   checked={checked}/>
            <input type="text" value={text} onChange={this.handleTextChange}
                   autoFocus={text}/>
            {text && <button onClick={this.handleRemove} tabIndex="-1" type="button">Remove</button>}
        </div>);
    }
}

export default Variant;
