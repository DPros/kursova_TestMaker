import React from "react";
import PropTypes from "prop-types";
import TestItem from "./TestItem";
import QuestionTypeSelector from "./QuestionTypeSelector";

import "../assets/stylesheets/base.scss";


class TestMaker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            testItem: this.props.testItem || this.getEmptyTestItem()
        };
    };

    static propTypes = {
        testItem: React.PropTypes.object,
        questionTypes: React.PropTypes.array,
        mode: React.PropTypes.string,
        saveCallback: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        questionTypes: ["Regular Test", "Reorder", "Input Field"],
        mode: "test"
    };

    render() {
        return (<div className="test-maker">
            {this.props.mode !== "test" && <div><QuestionTypeSelector
                selected={this.state.testItem.question.type}
                types={this.props.questionTypes}
                onChange={this.handleQuestionTypeChange}
            /></div>}
            <div style={{display: "inline-block", width: "48%"}}>
                <TestItem mode="edit" onChange={this.handleChange} item={this.state.testItem}/>
            </div>
            <div style={{display: "inline-block", width: "48%"}}>
                <TestItem style={{display: "inline-block", width: "40%"}} mode="test" onChange={this.handleChange}
                          item={this.state.testItem}/>
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
        this.props.saveCallback([this.state.testItem.question, this.state.testItem.answer])
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
