import React from "react";
import PropTypes from "prop-types";
import Constructor from "./Constructor";
import Question from "./Question";
import QuestionTypeSelector from "./QuestionTypeSelector";
import TestItem from "../TestItem";

import "../../assets/stylesheets/base.scss";


class TestMaker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            testItem: this.props.testItem || new TestItem(this.props.questionTypes[0])
        };
    };

    static propTypes = {
        testItem: PropTypes.object,
        questionTypes: PropTypes.array,
        saveCallback: PropTypes.func.isRequired
    };

    static defaultProps = {
        questionTypes: ["Regular Test", "Reorder", "Input Field"],
    };

    render() {
        return (<div>
            <QuestionTypeSelector
                selected={this.state.testItem.type}
                types={this.props.questionTypes}
                onChange={this.handleQuestionTypeChange}/>
            <Question question={this.state.testItem.question} onChange={this.handleQuestionChange}/>
            <Constructor onChange={this.handleChange} item={this.state.testItem}/>
            <div style={{display: 'flex', justifyContent: "space-around"}}>
                <button onClick={this.handleSave}>Save and Keep Inputs</button>
                <button onClick={this.handleSaveAndClear}>Save and Clear Inputs</button>
            </div>
        </div>);

    }

    handleQuestionChange = updatedQuestion => {
        this.state.testItem.question = updatedQuestion;
        this.forceUpdate();
    };

    handleSave = () => {
        if (this.state.testItem.type === "Reorder") {

        }
        this.props.saveCallback(this.state.testItem);
    };

    handleSaveAndClear = () => {
        this.handleSave();
        this.setState({testItem: new TestItem(this.state.testItem.type)});
    };

    handleChange = newValue => {
        this.setState(Object.assign(this.state, {testItem: newValue}));
    };

    handleQuestionTypeChange = newValue => {
        let state = this.state;
        state.testItem.type = newValue;
        this.setState(state);
    };
}

const QuestionNumber = ({number}) => {
    return <span className="question-number">{number}</span>;
};
QuestionNumber.propTypes = {number: PropTypes.number.isRequired};

export default TestMaker;
