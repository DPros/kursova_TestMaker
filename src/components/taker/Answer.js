import React from "react";
import DragSortableList from "react-drag-sortable";

import "../../assets/stylesheets/base.scss";

class Answer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            answer: this.props.item.answer
        };
    }

    static propTypes = {
        item: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
    };

    shouldComponentUpdate = () => {
        return this.props.item.type != "Reorder";
    };

    handleAnswerChange = e => {
        switch (this.props.item.type){
            case "Regular Test":
                if(!this.props.item.props.answerQuantity){
                    this.state.answer.clear();
                    this.state.answer.add(parseInt(e.target.id));
                }
                if(e.target.checked){
                    this.state.answer.add(parseInt(e.target.id));
                }else {
                    this.state.answer.delete(parseInt(e.target.id));

                }
                break;
            case "Reorder":
                this.state.answer = e.map(function (i) {
                    return parseInt(i.content.props.id);
                });
                break;
            case "Input Field":
                this.state.answer = e.target.value;
        }
        this.props.onChange(this.state.answer);
    };

    render() {
        let that = this;
        switch (this.props.item.type) {
            case "Regular Test":
                return (<div>
                    {this.props.item.variants.map(function (i) {
                        return (<div key={i.id}>
                            <input type={that.props.item.props.answerQuantity ? "checkbox" : "radio"} name="answer"
                                   onChange={that.handleAnswerChange}
                                   checked={that.state.answer.has(i.id)} id={i.id}/>
                            {i.text && <span>{i.text}</span>}
                        </div>);
                    })}
                </div>);
            case "Reorder":
                let list = this.props.item.variants.map(function (v) {
                    return {
                        content: <div id={v.id}>{v.text}</div>
                    };
                });
                return <DragSortableList onSort={this.handleAnswerChange} items={list}/>;
            case "Input Field":
                return (<input type="text" onChange={this.handleAnswerChange}/>);
        }
    }
}

export default Answer;
