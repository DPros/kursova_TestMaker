import React from "react";
import PropTypes from "prop-types";

import "../../assets/stylesheets/base.scss";


export default class ButtonGenerator extends React.Component {

    static propTypes = {
        id: PropTypes.any.isRequired,
        values: PropTypes.array.isRequired,
        onClick: PropTypes.func
    };

    handleClick = (e) => {
        const {id, onClick} = this.props;
        onClick(id, e.target.value)
    };

    render() {
        const {handleClick, props:{values, id}} = this;
        return (<div style={{display: 'flex', flexWrap: 'wrap'}}>
            {values.map(v => {
                return <button style={{opacity: id.answer.traits[id.trait.id] === v ? 1 : .5, flex: 'auto'}} key={v}
                               onClick={handleClick} value={v}>{v}</button>
            })}
        </div>);
    }
}