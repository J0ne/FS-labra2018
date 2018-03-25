import React from 'react'
import PropTypes from 'prop-types'
import { Container, Button } from 'semantic-ui-react'
class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        return (
            <Container>
                <div style={hideWhenVisible}>
                    <Button onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
                </div>
                <div style={showWhenVisible}>
                    {this.props.children}
                    <Button onClick={this.toggleVisibility}>Sulje</Button>
                </div>
            </Container>
        )
    }
}
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
export default Togglable