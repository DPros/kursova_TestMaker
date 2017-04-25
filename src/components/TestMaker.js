import React from 'react';
import PropTypes from 'prop-types';

import '../assets/stylesheets/base.scss';


class TestMaker extends React.Component {

    answersList;

    constructor(props) {
        super(props);
        this.state = {
            testItem: this.props.testItem || {question: {type: this.props.questionTypes[0]}}
        }
    };

    static propTypes = {
        testItem: React.PropTypes.object,
        questionTypes: React.PropTypes.array,
    };

    static defaultProps = {
        questionTypes: ["Regular", "Reorder"]
    };

    render() {
        return (<div>
            <QuestionTypeSelector value={this.state.testItem.question.type}
                                  onChange={this.handleQuestionTypeChange}/>
        </div>)

    }

    handleAnswerQuantityChange = newValue => {
        let state = this.state;
        state.testItem.question.answerType = newValue;
        this.setState(state);
    }

    handleQuestionTypeChange = newValue => {
        let state = this.state;
        state.testItem.question.type = newValue;
        this.setState(state);
    }
}

class TestItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            testItem: this.props.item
        }
    }

    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render(){
        switch (this.state.testItem.question.type) {
            case "Regular":
                return (<div>
                    <AnswerQuantitySelector value={this.state.testItem.question.answerType}
                                            onChange={this.handleAnswerQuantityChange}/>
                    <AnswersList testItem={this.state.testItem} dataref={a => this.answersList = a}/>
                </div>);
            case "Reorder":
                return <div>REORDER</div>
        }
    }
}

class QuestionTypeSelector extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        types: PropTypes.array.isRequired,
        selected: PropTypes.string.isRequired,
    };

    handleChange = (e) => {
        this.props.onChange(e.target.value)
    };

    render() {
        return <select onChange={this.handleChange}>
            {this.props.types.map(function (option) {
                return <option>{option}</option>
            })}
        </select>
    }
}

class AnswerQuantitySelector extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        value: 'single'
    };

    handleChange(e) {
        this.props.onChange(e.target.value)
    }

    render() {
        return (<div className="answer-quantity-selector">
            <p>Answer: <span><input type="radio" name="answer" value="single" checked={this.props.value === "single"}
                                    onChange={this.handleChange}/>Single</span>
                <span><input type="radio" name="answer" value="multiple" checked={this.props.value === "multiple"}
                             onChange={this.handleChange}/>Multiple</span></p>
        </div>)
    }
}

class AnswersList extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.answers) {
            this.props.answers.map(function (a, i) {
                this.state.answers[i] = a;
            });
            this.state.nextKey = this.props.answers.length;
        } else {
            this.state.nextKey = 0;
        }
    }

    static propTypes = {
        answers: PropTypes.object.isRequired,
    };

    handleKeyUp = e => {

    };

    render() {
        var that = this;
        return (<div className="answers-list">
            {Object.keys(this.props.answers).map(function (answer) {
                return <p className="answer-container">
                    <input type="text" value={answer.value} onKeyUp={that.handleKeyUp}/></p>
            })}
            <p className="answer-container"><input type="text" onKeyUp={this.handleKeyUp}/>
            </p>
        </div>)
    }
}

// const AnswerList = React.createClass({})

const QuestionNumber = ({number}) => {
    return <span className="question-number">{number}</span>;
};
QuestionNumber.propTypes = {number: PropTypes.number.isRequired};

export default TestMaker;