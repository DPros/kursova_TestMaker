import React from "react";
import PropTypes from "prop-types";

import "../../assets/stylesheets/base.scss";


export default class TraitsEvaluations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            evals: this.props.trait.evals
        }
    }

    static propTypes = {
        trait: PropTypes.object.isRequired,
        totalQuestions: PropTypes.number,
        onSave: PropTypes.func
    };

    handleChange = (e) => {
        const {evals} = this.state;
        if (e.target.id) {
            evals[e.target.id][e.target.name] = e.target.name === "score" ? parseInt(e.target.value) : e.target.value;
        } else {
            if (parseInt(e.target.value) === NaN) {
                return;
            }
            const n = Object.keys(evals).length;
            const id = n ? evals[n].id + 1 : 1;
            evals[id] = {score: parseInt(e.target.value), id};
        }
        this.forceUpdate();
    };

    handleSave = () => {
        const {evals} = this.state;
        this.props.onSave(Object.assign(this.props.trait, {evals}));
    };

    handleRemove = e => {
        delete this.state.evals[e.target.id];
        this.forceUpdate();
    };

    render() {
        const {handleChange, handleSave, handleRemove, props:{trait:{name}}, state:{evals}} = this;
        return (<div style={{display: 'flex', flexWrap: 'wrap'}}>
            <table width="100%">
                <thead>
                <tr>
                    <td colSpan="2">Балів більше, ніж:</td>
                    <td>Опис:</td>
                </tr>
                </thead>
                <tbody>
                {Object.keys(evals).map(key => {
                    const score = evals[key];
                    return (<tr key={key}>
                        <td>
                            <button id={key} onClick={handleRemove}>Remove</button>
                        </td>
                        <td>
                            <input id={key} name="score" style={{width: 50}} type="number" value={score.score}
                                   onChange={handleChange} autoFocus={true}/>
                        </td>
                        <td>
                            <textarea id={key} name="description" value={score.description} onChange={handleChange}/>
                        </td>
                    </tr>)
                })}
                <tr>
                    <td style={{width: 73}}></td>
                    <td><input style={{width: 50}} type="number" value="" onChange={this.handleChange}/></td>
                    <td>
                        <button onClick={this.handleSave} style={{float: 'right'}}>Зберегти</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>);
    }
}