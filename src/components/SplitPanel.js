import React from 'react'

export default class SplitPanel extends React.Component {

    static propTypes = {
        children: React.PropTypes.arrayOf(React.PropTypes.element),
        collapsable: React.PropTypes.string,
        leftDefaultSize: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        rightDefaultSize: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        collapsed: React.PropTypes.string,
        minLeftWidth: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        minRightWidth: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
    }

    static defaultProps = {
        collapsed: 'none',
        leftDefaultSize: '50%',
        collapsable: 'both',
        minLeftWidth: '10%',
        minRightWidth: '10%'
    }

    componentDidMount() {
        const {leftDefaultSize, rightDefaultSize, minLeftWidth, minRightWidth, collapsed} = this.props
        this.setState({
            size: rightDefaultSize ? this.container.getBoundingClientRect().width - this.calculateWidth(rightDefaultSize) - 15 : this.calculateWidth(leftDefaultSize) - 15,
            collapsed,
            resizing: false,
            resizerActive: false,
            minLeftWidth: this.calculateWidth(minLeftWidth),
            minRightWidth: this.calculateWidth(minRightWidth),
            totalWidth: this.container.getBoundingClientRect().width
        })
        window.addEventListener('mousemove', this.handleMouseMove)
        window.addEventListener('mouseup', this.handleMouseUp)
        window.addEventListener('resize', this.handleWindowResize)
    }

    componentWillUnmount() {
        console.log("unmounting")
        window.removeEventListener('mousemove', this.handleMouseMove)
        window.removeEventListener('mouseup', this.handleMouseUp)
        window.removeEventListener('resize', this.handleWindowResize)
    }

    handleWindowResize = () => {
        const prevWidth = this.state.totalWidth
        const newWidth = this.container.getBoundingClientRect().width
        if (prevWidth !== newWidth) {
            const {minLeftWidth, minRightWidth} = this.props
            this.setState(this.validateWidths({
                totalWidth: newWidth,
                minLeftWidth: this.calculateWidth(minLeftWidth),
                minRightWidth: this.calculateWidth(minRightWidth),
                size: (this.calculateWidth(this.state.size * 100 / prevWidth + '%'))
            }))
        }
    }

    handleResizerMouseDown = () => {
        this.setState({resizerActive: true})
    }

    handleMouseMove = e => {
        if (this.state.resizerActive) {
            const {minLeftWidth, minRightWidth} = this.state
            const collapsable = this.props.collapsable
            let state = {resizing: true, collapsed: 'none'}
            if (e.x - this.container.getBoundingClientRect().left < minLeftWidth) {
                if ((collapsable === 'left' || collapsable === 'both') && e.x - this.container.getBoundingClientRect().left < 100) {
                    state.collapsed = 'left'
                } else {
                    state.size = minLeftWidth
                }
            } else if (this.container.getBoundingClientRect().right - e.x < minRightWidth) {
                if ((collapsable === 'right' || collapsable === 'both') && this.container.getBoundingClientRect().right - e.x < 100) {
                    state.collapsed = 'right'
                } else {
                    state.size = this.container.getBoundingClientRect().width - minRightWidth - 15
                }
            } else state.size = e.x - this.container.getBoundingClientRect().left
            this.setState(state)
        }
    }

    handleMouseUp = e => {
        if (this.state.resizerActive) {
            const {resizing, collapsed} = this.state
            let state = {resizing: false, resizerActive: false}
            const collapsable = this.props.collapsable
            if (!resizing && collapsable !== 'none') {
                state.collapsed = collapsed === 'none' ? collapsable === 'both' ? e.x < this.container.getBoundingClientRect().width / 2 ? 'left' : 'right' : collapsable : 'none'
            }
            this.setState(state)
        }
    }

    calculateWidth = width => {
        if (typeof width === 'number') {
            return width
        }
        if (width.endsWith('%')) {
            return this.container.getBoundingClientRect().width * parseInt(width) / 100
        }
        if (width.endsWith('px')) {
            return parseInt(width)
        }
    }

    validateWidths = widths => {
        if (widths.size + 15 + widths.minRightWidth > widths.totalWidth) {
            widths.size = widths.totalWidth - widths.minRightWidth - 15
        }
        return widths
    }

    render() {
        const {size, collapsed, resizerActive, minLeftWidth, minRightWidth} = this.state || {}
        return (<div ref={container => {
            this.container = container
        }}>
            {this.state && <div style={{
                display: 'flex',
                alignItems: 'stretch',
                userSelect: resizerActive ? 'none' : 'text',
                minWidth: minLeftWidth
            }}>
                <div style={{
                    flex: `0 0 ${collapsed === 'right' ? '100%' : size + 'px'}`,
                    display: collapsed === 'left' ? 'none' : 'block'
                }}>
                    {this.props.children[0]}
                </div>
                <div style={{
                    backgroundColor: 'transparent',
                    flex: '0 0 15px',
                    cursor: 'e-resize'
                }} onMouseDown={() => this.handleResizerMouseDown()}>
                    <div style={{backgroundColor: 'black', opacity: '0.2', width: 5, margin: 'auto', height: '100%'}}/>
                </div>
                <div style={{display: collapsed === 'right' ? 'none' : 'block', flex: 'auto', minWidth: minRightWidth}}>
                    {this.props.children[1]}
                </div>
            </div>}
        </div>)
    }

    componentDidUpdate() {
        this.handleWindowResize()
    }
}