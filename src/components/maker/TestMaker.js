import React from "react";
import {render} from "react-dom";
import PropTypes from "prop-types";
import ReactDOM from "react-dom"
import Question from "./Question";
import SplitPanel from "../SplitPanel";
import Popup from "react-popup";
import TraitsEvaluations from "./TraitsEvaluations";

import "../../assets/stylesheets/base.scss";


export default class TestMaker extends React.Component {

    constructor(props) {
        super(props);
        let {
            traits,
            questions,
            currentQuestionId,
        } = this.props.test;
        this.state = {traits, questions, currentQuestionId, maxScore: 1};
    };

    static propTypes = {
        test: PropTypes.object,
        onFinishTest: PropTypes.func.isRequired
    };

    static defaultProps = {
        test: {
            traits: [],
            questions: []
        }
    };

    handleChangeTrait = e => {
        let {traits} = this.state;
        const id = e.target.id;
        if (id) {
            traits.find(function (trait) {
                return trait.id == id
            }).name = e.target.value
        } else {
            traits.push({id: traits.length ? traits[traits.length - 1].id + 1 : 1, name: e.target.value, evals:{}})
        }
        this.forceUpdate();
    };

    handleRemoveTrait = e => {
        let {traits, questions} = this.state;
        const traitId = parseInt(e.target.id);
        questions.map(q => {
            q.answers.map(a => {
                delete a[traitId]
            })
        });
        this.setState({
            traits: traits.filter(trait => trait.id !== traitId), questions
        });
    };

    handleInputChange = e => {
        switch (e.target.name) {
            case "maxScore":
                let v = parseInt(e.target.value);
                if (!v || v < 1) v = 1;
                this.setState({"maxScore": v});
                break;
            case "keepAnswers":
            case "keepQuestion":
                this.setState({[e.target.name]: e.target.checked});
                break;
            default:
                this.setState({[e.target.name]: e.target.value});
        }
    };

    handleQuestionChange = e => {
        const {questions} = this.state;
        if (e.id) {
            const q = questions.find(q => {
                return q.id === e.id
            });
            q.answers = e.answers;
            q.question = e.question;
        }
        else {
            questions.push(Object.assign({id: questions.length ? questions[questions.length - 1].id + 1 : 1}, e))
        }
        this.setState({questions, currentQuestionId: undefined});
    };

    handleEvaluationsChange = trait => {
        this.state.traits.find(t => t.id == trait.id).evals = trait.evals;
        window.removeEventListener('mousedown', this.preventClickOutsidePopup);
        Popup.close();
    };

    handleScaling = e => {
        const {preventClickOutsidePopup, handleEvaluationsChange} = this;
        const trait = this.state.traits.find(trait => {return trait.id == e.target.id});
        Popup.create({
            title: trait.name,
            content: <TraitsEvaluations trait={trait} onSave={handleEvaluationsChange}/>,
            closeBtn: false,
        }, true);
        window.addEventListener('mousedown', this.preventClickOutsidePopup);
    };

    preventClickOutsidePopup = e => {
        const area = ReactDOM.findDOMNode(this.popup);
        if (!area.contains(e.target)) {
            // Popup.close();
            e.preventDefault();
        }
    };

    handleFinishTest = () => {
        const {questions, traits} = this.state;
        this.props.onFinishTest({questions, traits});
    };

    handleSelectQuestion = e => {
        this.setState({currentQuestionId: e.target.id})
    };

    render() {
        const {questions, traits, currentQuestionId, maxScore, handleSelectQuestion, name, keepAnswers, keepQuestion} = this.state;
        const that = this;
        return (<SplitPanel collapsable="left" collapsed="left" minRightWidth="50%">
            <div>
                {questions.map(function (q) {
                    return <div key={q.id}
                                style={{
                                    fontWeight: currentQuestionId == q.id ? 'bold' : 'normal',
                                    cursor: 'pointer'
                                }}
                                id={q.id} onClick={that.handleSelectQuestion}>{q.question}</div>
                })}
            </div>
            <div>
                <div style={{display: 'flex'}}>
                    <div style={{flex: 'auto'}}>
                        <p>Характеристики:</p>
                        <Popup ref={popup => this.popup = popup} closeBtn={false} closeOnOutsideClick={false}/>
                        {traits.map(function (trait) {
                            return <div key={trait.id}>
                                <button type="button" id={trait.id} onClick={that.handleRemoveTrait} tabIndex="-1">
                                    Видалити
                                </button>
                                <input value={trait.name} id={trait.id} onChange={that.handleChangeTrait}
                                       autoFocus={true}/>
                                <button type="button" id={trait.id} onClick={that.handleScaling}>Оцінювання</button>
                            </div>
                        })}
                        <div>
                            <button style={{visibility: 'hidden'}} type="button">Видалити</button>
                            <input onChange={this.handleChangeTrait} value=''/>
                        </div>
                    </div>
                    <div style={{flex: 'auto'}}>
                        <table>
                            <tbody>
                            <tr>
                                <td>Назва:</td>
                                <td><input style={{width: '100%'}} name="name" value={name}
                                           onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td colSpan="2">Максимальна кількість балів за питання:
                                    <input style={{maxWidth: 50}} type="number" name="maxScore"
                                           onChange={this.handleInputChange}
                                           value={maxScore}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input type="checkbox" name="keepAnswers" onChange={this.handleInputChange}
                                           value={true} checked={keepAnswers}/>
                                    Не очищати варіанти відповідей:
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input type="checkbox" name="keepQuestion" onChange={this.handleInputChange}
                                           value={true} checked={keepQuestion}/>
                                    Не очищати питання:
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {questions.length ? questions.length + ' Питання' : ''}
                                </td>
                                <td>
                                    <button style={{width: '100%'}} onClick={this.handleFinishTest}>Завершити
                                        створення
                                        тесту
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>Питання:</p>
                <Question keepAnswersOnSave={keepAnswers} item={currentQuestionId ? questions.find(q => {
                        return q.id == currentQuestionId
                    }) : {answers: [], question: ""}} keepQuestionOnSave={keepQuestion}
                          traits={traits} onSave={this.handleQuestionChange} maxScore={maxScore}/>
            </div>
        </SplitPanel>);
    }
};
