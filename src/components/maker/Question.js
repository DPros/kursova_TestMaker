import React from "react";
import PropTypes from "prop-types";

import "../../assets/stylesheets/base.scss";
import ButtonGenerator from "./ButtonGenerator";

export default class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question: props.item.question,
            answers: props.item.answers,
            error: false
        };
    }

    static propTypes = {
        maxScore: PropTypes.number.isRequired,
        item: PropTypes.object,
        traits: PropTypes.array,
        keepAnswersOnSave: PropTypes.bool,
        keepQuestionOnSave: PropTypes.bool,
        onSave: PropTypes.func
    };

    static defaultProps = {
        item: {answers: [], question: ""},
        traits: [],
        keepAnswersOnSave: false
    };

    handleQuestionChange = e => {
        this.setState({question: e.target.value});
    };

    handleAnswerChange = e => {
        const id = e.target.id;
        let {answers} = this.state;
        if (id) {
            answers.find(a => {
                return a.id == id
            }).text = e.target.value;
        } else {
            answers.push({
                id: answers.length ? answers[answers.length - 1].id + 1 : 1,
                text: e.target.value,
                traits: {}
            })
        }
        this.setState(this.state);
    };

    componentWillReceiveProps(props) {
        if (props.item.id !== this.props.item.id) {
            let {answers, question} = props.item;
            if (this.props.keepAnswersOnSave && !props.item.id) {
                answers = this.state.answers;
            }
            if (this.props.keepQuestionOnSave && !props.item.id) {
                question = this.state.question;
            }
            this.setState({answers, question, error: false});
        }
    }

    handleAnswerScoreChange = ({answer:{id:answerId}, trait:{id:traitId}}, newScore) => {
        const answer = this.state.answers.find(a => a.id === answerId);
        const score = parseInt(newScore);
        if (answer.traits[traitId] === score) {
            delete answer.traits[traitId];
        } else {
            answer.traits[traitId] = score;
        }
        this.forceUpdate();
    };

    render() {
        const {props:{traits}, state: {question, answers, error}, handleSave, handleAnswerChange, handleRemoveAnswer, handleAnswerScoreChange} = this;
        const scores = [...this];
        return (<div>
            <textarea onChange={this.handleQuestionChange} value={question} style={{width: '100%'}} rows="5"/>
            Варіанти відповідей:
            <table width="100%">
                <thead>
                <tr>
                    <th style={{width: 73}}/>
                    <th/>
                    {traits.map(function (trait) {
                        return <th key={trait.id}>{trait.name}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {answers.map(function (answer) {
                    return (<tr key={answer.id}>
                        <td width={73}>
                            <button id={answer.id} onClick={handleRemoveAnswer}>Видалити</button>
                        </td>
                        <td style={{minWidth: '20vw'}}>
                            <textarea type="text" value={answer.text} id={answer.id} style={{width: '100%', resize: "none"}}
                                   onChange={handleAnswerChange} autoFocus={true}/>
                        </td>
                        {traits.map(trait => {
                            return <td style={{flex: 'auto'}}
                                       key={trait.id}>
                                <ButtonGenerator id={{answer, trait}} values={scores}
                                                 onClick={handleAnswerScoreChange}/>
                            </td>
                        })}
                    </tr>)
                })}
                <tr >
                    <td style={{width: 73}}></td>
                    <td style={{minWidth: '20vw'}}><textarea style={{width: "100%", resize: "none"}} type="text" value="" onChange={handleAnswerChange}/></td>
                    {traits.map(trait => {return })}
                </tr>
                </tbody>
            </table>
            {error && <div style={{color: 'red'}}>Відсутній текст питання або немає жодної відповіді</div>}
            <button type="button" onClick={handleSave}>Зберегти</button>
        </div>);
    }

    handleRemoveAnswer = e => {
        this.setState({
            answers: this.state.answers.filter(a => {
                return a.id != e.target.id
            })
        });
    };

    handleSave = () => {
        const {question, answers} = this.state;
        if(!question || !answers.length){
            this.setState({error: true})
            return;
        }
        this.props.onSave(Object.assign(this.props.item, {question, answers}));
        const {keepQuestionOnSave, keepAnswersOnSave} = this.props;
        this.setState({
            answers: this.props.keepAnswersOnSave ? answers : [],
            question: this.props.keepQuestionOnSave ? question : "",
            error: false
        });
    };

    [Symbol.iterator] = () => {
        let current = 1;
        let {maxScore} = this.props;
        return {
            next() {
                if (current > maxScore) {
                    return {
                        done: true
                    }
                } else return {
                    done: false,
                    value: current++
                }
            }
        }
    }
}