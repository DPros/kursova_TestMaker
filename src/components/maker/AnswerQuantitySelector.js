import React from "react";
import PropTypes from "prop-types";
import TestItem from "./Constructor";
import QuestionTypeSelector from "./QuestionTypeSelector";

import "../../assets/stylesheets/base.scss";

class AnswerQuantitySelector extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    };

    handleChange = e => {
        this.props.onChange(e.target.value);
    };

    render() {
        return (<div className="answer-quantity-selector">
            <p>Answer: <span><input
                type="radio" name={"value" + this.props.mode} value="" checked={!this.props.value}
                onChange={this.handleChange}
            />Single</span>
                <span><input
                    type="radio" name={"value" + this.props.mode} value="multiple" checked={this.props.value}
                    onChange={this.handleChange}
                />Multiple</span>
                {this.props.value && <input type="number" onChange={this.handleChange}/>}
            </p>
        </div>);
    }
}

export default AnswerQuantitySelector;
