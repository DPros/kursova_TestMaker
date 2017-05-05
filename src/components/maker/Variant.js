import React from "react";

import "../../assets/stylesheets/base.scss";

class Variant extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        value: React.PropTypes.object,
        checked: React.PropTypes.bool,
        mode: React.PropTypes.string.isRequired
    };

    static defaultProps = {
        checked: false,
        value: {}
    };

    handleTextChange = e => {
        this.props.onTextChange(this.props.value.id, e.target.value);
    };

    handleAnswerChange = e => {
        this.props.onAnswerChange(this.props.value.id, e.target.checked);
        // this.update();
    };

    handleRemove = () => {
        this.props.onRemove(this.props.value.id)
    };

    render() {
        return (<div className="variant">
            <input type={this.props.trigger} name={this.props.mode} onChange={this.handleAnswerChange}
                   checked={this.props.checked}/>
            {this.props.mode === "edit" && <span>
            <input type="text" value={this.props.value.text} onChange={this.handleTextChange}
                   autoFocus={this.props.value.text}/>
            {this.props.value.text && <button onClick={this.handleRemove} type="button">Remove</button>}</span>}
            {this.props.mode === "test" && <span>{this.props.value.text}</span>}
        </div>);
    }
}

export default Variant;
