import React from "react";
import PropTypes from "prop-types";
import TestItem from "./TestItem";

import "../assets/stylesheets/base.scss";

class QuestionTypeSelector extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        types: React.PropTypes.array.isRequired,
        selected: React.PropTypes.string.isRequired,
    };

    handleChange = (e) => {
        this.props.onChange(e.target.value);
    };

    render() {
        return (<select onChange={this.handleChange}>
            {this.props.types.map(function (option, i) {
                return <option key={i}>{option}</option>;
            })}
        </select>);
    }
}

export default QuestionTypeSelector;
