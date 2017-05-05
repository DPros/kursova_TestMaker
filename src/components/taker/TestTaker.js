import React from "react";
import PropTypes from "prop-types";
import TestItem from "../maker/Constructor";
import QuestionTypeSelector from "../maker/QuestionTypeSelector";

import "../../assets/stylesheets/base.scss";


class TestMaker extends React.Component {

    static propTypes = {
        testItem: React.PropTypes.object.isRequired,
        next: React.PropTypes.func.isRequired
    };

    render() {
        return (<div className="test-taker">
            <div style={{display: "inline-block", width: "48%"}}>
                <TestItem
            </div>
            <div>
                <button onClick={this.handleSave}>Save and Keep Inputs</button>
                <button onClick={this.handleSaveAndClear}>Save and Clear Inputs</button>
            </div>
        </div>);

    }

    getEmptyTestItem() {
        return {
            question: {type: this.props.questionTypes[0], variants: [], question: {text: ''}},
            answer: new Set()
        }
    }

    handleSave = () => {
        this.props.saveCallback([this.state.testItem.question, this.state.testItem.value])
    };

    handleSaveAndClear = () => {
        this.handleSave();
        this.setState(Object.assign(this.state, {testItem: this.getEmptyTestItem()}))
    };

    handleChange = newValue => {
        this.setState(Object.assign(this.state, {testItem: newValue}));
    };

    handleQuestionTypeChange = newValue => {
        let state = this.state;
        state.testItem.question.type = newValue;
        this.setState(state);
    }
}

const QuestionNumber = ({number}) => {
    return <span className="question-number">{number}</span>;
};
QuestionNumber.propTypes = {number: PropTypes.number.isRequired};

export default TestMaker;
