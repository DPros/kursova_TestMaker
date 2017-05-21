import React from "react";

import "../../assets/stylesheets/base.scss";

class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        question: React.PropTypes.object.isRequired,
        onAnswer: React.PropTypes.func.isRequired
    };

    handleAnswer = e => {
        this.props.onAnswer(this.props.question.answers.find(a => a.id == e.target.id))
    };

    render() {
        const {question, answers} = this.props.question;
        const {handleAnswer} = this;
        return (<div style={{margin: 20}} className="question">
            <div style={{whiteSpace: 'pre-wrap'}}>{question}</div>
            {answers.map(a => {
                return <button style={{width: '100%'}} id={a.id} onClick={handleAnswer}>{a.text}</button>
            })}
        </div>);
    }
}

export default Question;
