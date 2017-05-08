import React from "react";

import "../../assets/stylesheets/base.scss";

class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        question: React.PropTypes.object.isRequired,
    };

    render() {
        return (<div style={{margin: 20}} className="question">
            {this.props.question.img && <img src={this.props.question.img}/>}
            {this.props.question.text.split("\n").map(function (r) {
                <div>{r}</div>
            })}
        </div>);
    }
}

export default Question;
