import React from "react";

import "../../assets/stylesheets/base.scss";

class Variant extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        value: React.PropTypes.object,
        checked: React.PropTypes.bool,
    };

    static defaultProps = {
        checked: false,
        value: {}
    };

    handleTextChange = e => {
        let item = this.props.value;
        item.text = e.target.value;
        this.props.onChange(item);
    };

    handleAnswerChange = e => {
        let item = this.props.value;
        item.isCorrect = e.target.checked;
        this.props.onChange(item);
    };

    handleRemove = () => {
        this.props.onRemove(this.props.value.id)
    };

    render() {
        return (<div className="variant">
            <input type={this.props.trigger} name={this.props.mode} onChange={this.handleAnswerChange}
                   checked={this.props.checked}/>
            <input type="text" value={this.props.value.text} onChange={this.handleTextChange}
                   autoFocus={this.props.value.text}/>
            {this.props.value.text && <button onClick={this.handleRemove} type="button">Remove</button>}
        </div>);
    }
}

export default Variant;
