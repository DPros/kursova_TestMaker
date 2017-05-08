import React from "react";
import AnswerQuantitySelector from "./AnswerQuantitySelector";
import DragSortableList from 'react-drag-sortable';
import Variant from "./Variant";

import "../../assets/stylesheets/base.scss";

class Constructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextKey: this.props.item.variants.length ? this.props.item.variants[this.props.item.variants].id + 1 : 1
        };
    }

    static propTypes = {
        item: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
    };

    handleVariantChange = newVariant => {
        let item = this.props.item;
        if (newVariant.id) {
            Object.assign(item.variants.find(variant => variant.id === newVariant.id), newVariant);
        } else {
            item.variants.push(Object.assign(newVariant, {id: this.state.nextKey++}));
        }
        this.props.onChange(item);
    };

    handleAnswerQuantityChange = newValue => {
        let item = this.props.item;
        item.props.answerQuantity = newValue;
        this.props.onChange(item);
    };

    handleRemoveVariant = id => {
        let item = this.props.item;
        item.variants = item.variants.filter(function (v) {
            return v.id !== id
        });
        this.props.onChange(item);
    };

    render() {
        let that = this;
        switch (this.props.item.type) {
            case "Regular Test":
                return (<div>
                    <AnswerQuantitySelector
                        value={this.props.item.question.answerQuantity}
                        onChange={this.handleAnswerQuantityChange}
                        mode={this.props.mode}
                    />
                    {this.props.item.variants.map(function (i) {
                        return <Variant key={i.id} value={i}
                                        checked={i.isCorrect}
                                        trigger={that.props.item.question.answerQuantity ? 'checkbox' : 'radio'}
                                        onChange={that.handleVariantChange} onRemove={that.handleRemoveVariant}/>;
                    })}
                    <Variant value={{}} key={this.state.nextKey} onChange={that.handleVariantChange}
                             trigger={this.props.item.question.answerQuantity ? 'checkbox' : 'radio'}/>
                </div>);
            case "Reorder":
                let list = this.props.item.variants.map(function (v) {
                    return {
                        content: <Variant mode={that.props.mode} trigger="hidden" key={v.id} value={v}
                                          onChange={that.handleVariantChange} onRemove={that.handleRemoveVariant}/>
                    }
                });
                list.push({
                    content: <Variant trigger="hidden" mode="edit" value={{}} onChange={that.handleVariantChange}
                                      key={that.state.nextKey} onRemove={that.handleRemoveVariant}/>
                });
                return <DragSortableList items={list}/>;
            case "Input Field":
                return (<div>
                    {this.props.mode === "edit" && this.props.item.value.map(function (v, i) {
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

export default Constructor;
