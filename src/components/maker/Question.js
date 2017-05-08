import React from "react";

import "../../assets/stylesheets/base.scss";

class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        question: React.PropTypes.object.isRequired,
    };

    handleTextChange = e => {
        this.props.onChange(Object.assign(this.props.question, {text: e.target.value}));
    };

    handleImgChange = e => {
        this.props.onChange(Object.assign(this.props.question, {img: e.target.value}));
    };

    render() {
        return (<div className="question">
            <textarea value={this.props.question.text} onChange={this.handleTextChange}></textarea>
            <input type="text" placeholder="link to image" onChange={this.handleImgChange}/><br/>
        </div>)
    }
}

export default Question;
