import React from "react";
import AnswerQuantitySelector from "./AnswerQuantitySelector";
import Answer from "./Answer";
import Question from "./Question";
import DragSortableList from 'react-drag-sortable';

import "../assets/stylesheets/base.scss";

class TestItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextKey: this.props.item.question.variants.length
        };
    }

    static propTypes = {
        item: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        mode: React.PropTypes.string.isRequired
    };

    handleAnswerTextChange = (key, value) => {
        let item = this.props.item;
        if (key !== undefined) {
            item.question.variants.find(answer => answer.id === key).text = value;
        } else {
            item.question.variants.push({id: this.state.nextKey++, text: value});
        }
        this.props.onChange(item);
    };

    handleAnswerQuantityChange = newValue => {
        let item = this.props.item;
        item.question.answerQuantity = newValue;
        this.props.onChange(item);
    };

    handleAnswerChange = (answerId, checked) => {
        let item = this.props.item;
        if (item.question.answerQuantity) {
            if (checked) {
                item.answer.add(answerId)
            } else {
                item.answer.delete(answerId)
            }
        } else {
            item.answer.clear();
            item.answer.add(answerId);
        }
        this.props.onChange(item);
    };

    handleRemoveAnswer = answerId => {
        let item = this.props.item;
        item.question.variants = item.question.variants.filter(function (v) {
            return v.id !== answerId
        });
        item.answer.delete(answerId);
        this.props.onChange(item);
    };

    handleQuestionChange = updatedQuestion => {
        let item = this.props.item;
        item.question.question = updatedQuestion;
        this.props.onChange(item);
    };

    handleOpenAnswerChange = e => {
        // if()
    };

    render() {
        let that = this;
        switch (this.props.item.question.type) {
            case "Regular Test":
                return (<div>
                    <AnswerQuantitySelector
                        value={this.props.item.question.answerQuantity}
                        onChange={this.handleAnswerQuantityChange}
                        mode={this.props.mode}
                    />
                    <Question question={this.props.item.question.question} mode={this.props.mode}
                              onChange={this.handleQuestionChange}/>
                    {this.props.item.question.variants.map(function (i) {
                        return <Answer key={i.id} answer={i}
                                       checked={that.props.mode === 'edit' && that.props.item.answer.has(i.id)}
                                       trigger={that.props.item.question.answerQuantity ? 'checkbox' : 'radio'}
                                       onTextChange={that.handleAnswerTextChange} onRemove={that.handleRemoveAnswer}
                                       onAnswerChange={that.handleAnswerChange} mode={that.props.mode}/>;
                    })}
                    {this.props.mode === 'edit' &&
                    <Answer mode={this.props.mode} key={this.state.nextKey} onTextChange={that.handleAnswerTextChange}
                            trigger={this.props.item.question.answerQuantity ? 'checkbox' : 'radio'}/>}
                </div>);
            case "Reorder":
                let list = this.props.item.question.variants.map(function (v) {
                    return {
                        content: <Answer mode={that.props.mode} trigger="hidden" key={v.id} answer={v}
                                         onTextChange={that.handleAnswerTextChange}/>
                    }
                });
                if (this.props.mode === "edit") {
                    list.push({
                        content: <Answer trigger="hidden" mode="edit" onTextChange={that.handleAnswerTextChange}
                                         key={that.state.nextKey}/>
                    })
                }
                return (<div>
                    <Question question={this.props.item.question.question} mode={this.props.mode}
                              onChange={this.handleQuestionChange}/>
                    <DragSortableList items={list}/>
                </div>);
            case "Input Field":
                return (<div>
                    <Question question={this.props.item.question.question} mode={this.props.mode}
                              onChange={this.handleQuestionChange}/>
                    {this.props.mode === "edit" && this.props.item.answer.map(function (v, i) {
                        return (<div><input type="text" value={v} key={i} data-index={i}
                                            onChange={that.handleOpenAnswerChange}/>
                            <button type="button" data-index={i} onClick={that.handle}>Remove</button>
                        </div>)
                    })
                    }
                    <input type="text" onChange={this.props.mode === "edit" ? that.handleAnswerTextChange : undefined}/>
                </div>)
        }
    }
}

export default TestItem;
