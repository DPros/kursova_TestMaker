import React from "react";

import "../assets/stylesheets/base.scss";

class Answer extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        answer: React.PropTypes.object,
        checked: React.PropTypes.bool,
        mode: React.PropTypes.string.isRequired
    };

    static defaultProps = {
        checked: false,
        answer: {}
    };

    handleTextChange = e => {
        this.props.onTextChange(this.props.answer.id, e.target.value);
    };

    handleAnswerChange = e => {
        this.props.onAnswerChange(this.props.answer.id, e.target.checked);
        // this.update();
    };

    handleRemove = () => {
        this.props.onRemove(this.props.answer.id)
    };

    render() {
        return (<div className="variant">
            <input type={this.props.trigger} name={this.props.mode} onChange={this.handleAnswerChange}
                   checked={this.props.checked}/>
            {this.props.mode === "edit" && <span>
            <input type="text" value={this.props.answer.text} onChange={this.handleTextChange}
                autoFocus={this.props.answer.text}/>
            {this.props.answer.text && <button onClick={this.handleRemove} type="button">Remove</button>}</span>}
            {this.props.mode === "test" && <span>{this.props.answer.text}</span>}
        </div>);
    }
}

export default Answer;
