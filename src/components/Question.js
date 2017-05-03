import React from "react";

import "../assets/stylesheets/base.scss";

class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        question: React.PropTypes.object,
        mode: React.PropTypes.string
    };

    static defaultProps = {
        question: {},
        mode: "test"
    };

    handleTextChange = e => {
        this.props.onChange(Object.assign(this.props.question, {text: e.target.value}));
    };

    handleImgChange = e => {
        this.props.onChange(Object.assign(this.props.question, {img: e.target.value}));
    };

    render() {
        return (<div className="question">
            {this.props.mode === "edit" && <div>
                <input type="text" placeholder="link to image" onChange={this.handleImgChange}/>
                <textarea value={this.props.question.text} onChange={this.handleTextChange}></textarea>
            </div>}
            {this.props.mode === "test" && <div>
                {this.props.question.img && <img style={{maxWidth: "50%"}} src={this.props.question.img}/>}
                {this.props.question.text.split('\n').map(function (row) {
                    return <div>{row}</div>
                })}
            </div>}

        </div>)
    }
}

export default Question;
