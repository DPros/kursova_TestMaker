import React from "react";
import PropTypes from "prop-types";

import "../assets/stylesheets/base.scss";


class TestMaker extends React.Component {

    answersList;

    constructor(props) {
        super(props);
        this.state = {
            testItem: this.props.testItem || {question: {type: this.props.questionTypes[0], answers: []}}
        };
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
            <QuestionTypeSelector
                selected={this.state.testItem.question.type}
                types={this.props.questionTypes}
                onChange={this.handleQuestionTypeChange}
            />
            <TestItem onChange={this.handleChange} item={this.state.testItem}/>
        </div>);

    }

    handleChange = newValue => {
        this.setState(Object.assign(this.state, {testItem: newValue}));
    };

    handleQuestionTypeChange = newValue => {
        let state = this.state;
        state.testItem.question.type = newValue;
        this.setState(state);
    }
}

class TestItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testItem: this.props.item,
            nextKey: this.props.item.question.answers.length
        };
    }

    static propTypes = {
        item: PropTypes.object.isRequired
    };

    handleAnswerTextChange = (key, value) => {
        if (key !== this.state.nextKey) {
            this.state.question.answers.find(answer => answer.id === key).text = value;
        } else {
            let state = this.state;
            state.question.answers.push({id: this.state.nextKey++, text: value});
            this.setState(state);
        }
    };

    handleAnswerQuantity = newValue => {

    };

    render() {
        let that = this;
        switch (this.state.testItem.question.type) {
            case "Regular":
                return (<div>
                    <AnswerQuantitySelector
                        value={this.state.testItem.question.answerQuantity}
                        onChange={this.handleAnswerQuantityChange}
                    />
                    {this.state.testItem.question.answers.map(function (i) {
                        return <Answer key={i.id} answer={i} onChange={that.handleAnswerTextChange}/>;
                    })}
                    <Answer key={this.state.nextKey} answer={{}} onChange={that.handleAnswerTextChange}/>
                </div>);
            case "Reorder":
                return <div>REORDER</div>;
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
        this.props.onChange(e.target.value);
    };

    render() {
        return (<select onChange={this.handleChange}>
            {this.props.types.map(function (option) {
                return <option>{option}</option>;
            })}
        </select>);
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

    handleChange = e => {
        this.props.onChange(e.target.value);
    };

    render() {
        return (<div className="answer-quantity-selector">
            <p>Answer: <span><input
                type="radio" name="answer" checked={!this.props.value}
                onChange={this.handleChange}
            />Single</span>
                <span><input
                    type="radio" name="answer" value="multiple" checked={this.props.value}
                    onChange={this.handleChange}
                />Multiple</span>
                {this.props.value && <input type="number" onChange={this.handleChange}/>}
            </p>
        </div>);
    }
}

class Answer extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        answer: PropTypes.object.isRequired,
        key: PropTypes.number.isRequired
    };

    handleKeyUp = e => {
        this.props.onChange(this.props.key, e.target.value);
    };

    render() {
        return (<div>
            <input type="text" value={this.props.answer.text} onKeyUp={this.handleKeyUp}/>
        </div>);
    }
}

const QuestionNumber = ({number}) => {
    return <span className="question-number">{number}</span>;
};
QuestionNumber.propTypes = {number: PropTypes.number.isRequired};

export default TestMaker;
