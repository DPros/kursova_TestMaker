import React from "react";
import AnswerQuantitySelector from "./AnswerQuantitySelector";
import DragSortableList from "react-drag-sortable";
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
            if (item.props.answerQuantity) {
                Object.assign(item.variants.find(variant => variant.id === newVariant.id), newVariant);
            } else {
                item.variants.map(function (v) {
                    if (v.id === newVariant.id) {
                        Object.assign(v, newVariant);
                    } else {
                        v.isCorrect = null;
                    }
                });
            }
        } else {
            item.variants.push(Object.assign(newVariant, {id: this.state.nextKey++}));
        }
        this.props.onChange(item);
    };

    handleAnswerQuantityChange = newValue => {
        let item = this.props.item;
        if (!newValue) {
            item.variants.map(function (v) {
                v.isCorrect = null;
            });
        }
        item.props.answerQuantity = newValue;
        this.props.onChange(item);
    };

    handleRemoveVariant = id => {
        let item = this.props.item;
        item.variants = item.variants.filter(function (v) {
            return v.id !== id;
        });
        this.props.onChange(item);
    };

    handleReorder = newOrder => {
        let item = this.props.item;
        item.variants = newOrder.slice(0, -1).map(function (i) {
            return i.content.props.value;
        });
        this.props.onChange(item);
    };

    render() {
        let that = this;
        switch (this.props.item.type) {
            case "Regular Test":
                return (<div>
                    <AnswerQuantitySelector
                        value={this.props.item.props.answerQuantity}
                        onChange={this.handleAnswerQuantityChange}
                    />
                    {this.props.item.variants.map(function (i) {
                        return <Variant key={i.id} value={i}
                                        checked={i.isCorrect}
                                        trigger={that.props.item.props.answerQuantity ? 'checkbox' : 'radio'}
                                        onChange={that.handleVariantChange} onRemove={that.handleRemoveVariant}/>;
                    })}
                    <Variant visibility="hidden" value={{}} key={this.state.nextKey} onChange={that.handleVariantChange}
                             trigger={this.props.item.props.answerQuantity ? 'checkbox' : 'radio'}/>
                </div>);
            case "Reorder":
                let list = this.props.item.variants.map(function (v) {
                    return {
                        content: <Variant trigger="hidden" key={v.id} value={v}
                                          onChange={that.handleVariantChange} onRemove={that.handleRemoveVariant}/>
                    };
                });
                list.push({
                    content: <Variant trigger="hidden" value={{}} onChange={that.handleVariantChange}
                                      key={that.state.nextKey}/>
                });
                return <DragSortableList onSort={this.handleReorder} items={list}/>;
            case "Input Field":
                return (<div>
                    {this.props.item.variants.map(function (v) {
                        return <Variant trigger="hidden" key={v.id} value={v}
                                        onChange={that.handleVariantChange} onRemove={that.handleRemoveVariant}/>;
                    })
                    }
                    <Variant value={{}} key={this.state.nextKey} onChange={that.handleVariantChange}
                             trigger="hidden"/>
                </div>);
        }
    }
}

export default Constructor;
