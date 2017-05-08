import React from "react";
import PropTypes from "prop-types";
import Question from "./Question";
import Answer from "./Answer";

import "../../assets/stylesheets/base.scss";


class TestTaker extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        testItem: PropTypes.object.isRequired,
    };

    handleAnswerChange = newAnswer => {
        this.setState({answer: newAnswer});
    };

    handleNext = () => {
        console.log(this.state.answer);
    };

    render() {
        return (<div className="test-taker">
            <Question question={this.props.testItem.question}/>
            <Answer item={this.props.testItem} onChange={this.handleAnswerChange}/>
            <button onClick={this.handleNext}>Next</button>
        </div>);
    }
}

export default TestTaker;
