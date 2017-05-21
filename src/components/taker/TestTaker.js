import React from "react";
import PropTypes from "prop-types";
import Question from "./Question";
import {Line} from "react-progressbar.js"

import "../../assets/stylesheets/base.scss";


export default class TestTaker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0, scores: Object.assign(...props.test.traits.map(trait => {
                return {[trait.id]: 0}
            }))
        }
    }

    static propTypes = {
        currentQuestion: PropTypes.number,
        test: PropTypes.object.isRequired,
        onFinish: PropTypes.func.isRequired
    };

    static defaultProps = {
        currentQuestion: 0
    };

    findDescriptions(trait, score) {
        let d = "";
        Object.keys(trait.evals).map(key => {
            if (key < score) {
                d = trait.evals[key].description
            }
        })
        return d;
    }

    handleAnswer = answer => {
        let {scores, currentQuestion} = this.state;
        const that = this;
        for (let key in answer.traits) {
            scores[key] += answer.traits[key];
        }
        ++currentQuestion;
        if (currentQuestion < this.props.test.questions.length) {
            this.setState({currentQuestion});
        } else {
            let res = [];
            this.props.test.traits.map(trait => {
                res.push({
                    trait: trait.name,
                    score: scores[trait.id],
                    description: that.findDescriptions(trait, scores[trait.id])
                });
            });
            this.props.onFinish(res);
        }
    };

    render() {
        const {state: {currentQuestion}, props: {test: {questions, name}}, handleAnswer} = this;
        return (<div className="test-taker">
            <h1>{name}</h1>
            <Line progress={currentQuestion / questions.length}/>
            <Question question={questions[currentQuestion]} onAnswer={handleAnswer}/>
        </div>);
    }
}
