import React, { Component } from 'react'
import "./button.css";

export default class Button extends Component {

    constructor(props){
        super(props);
    }



    render() {
        return (
            <button
                onClick={ e => this.props.click && this.props.click(this.props.label)} 
                className={`
                    button
                    ${this.props.operation ? 'operation': ''}
                    ${this.props.double ? 'double': ''}
                    ${this.props.triple ? 'triple': ''}
                `}
            >
                {this.props.label}
            </button>
        )
    }
}
