import React, {Component } from "react";
import Button from "../components/button/button";
import "./calculadora.css";
import Display from "../components/display/display";


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null, 
    values: [0,0],
    current: 0
}

export default class Calculadora extends Component {

    state = {...initialState}
    constructor(props) {
        super(props);
    }
    
    limparMemoria = () =>  {
            this.setState({...initialState});
    }

    setarOperacao = (operation) =>  {
        if(this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true})
        }else{
            const equals = operation === '=';
            const currentOperation = this.state.operation;
            const values = {... this.state.values};
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            }
            catch(e){
                values[0] = values[0];
            }
            
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equals? null: operation,
                current: equals? 0: 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    adicionarDigito = (digito) =>  {
        if(digito === '.' && this.state.displayValue.includes('.'))
            return;
        
        const clearDisplay = this.state.displayValue === '0'
                || this.state.clearDisplay
        const currentValue = clearDisplay ? "" : this.state.displayValue;
        const displayValue = currentValue + digito;

        this.setState({ displayValue, clearDisplay: false})

        if(digito !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = {...this.state.values};
            values[i] = newValue;
            this.setState({ values });
        }
    }

    render() {
        return (
            <div className="calculadora">
                <Display value={this.state.displayValue } />
                <Button label="AC" click={ this.limparMemoria } triple />
                <Button label="/" click={ this.setarOperacao } operation/>
                <Button label="7" click={ this.adicionarDigito } />
                <Button label="8" click={ this.adicionarDigito } />
                <Button label="9" click={ this.adicionarDigito } />
                <Button label="*" click={ this.setarOperacao } operation />
                <Button label="4" click={ this.adicionarDigito } />
                <Button label="5" click={ this.adicionarDigito } />
                <Button label="6" click={ this.adicionarDigito } />
                <Button label="-" click={ this.setarOperacao } operation />
                <Button label="1" click={ this.adicionarDigito } />
                <Button label="2" click={ this.adicionarDigito } />
                <Button label="3" click={ this.adicionarDigito } />
                <Button label="+" click={ this.setarOperacao }  operation/>
                <Button label="0" click={ this.adicionarDigito } double />
                <Button label="." click={ this.adicionarDigito } />
                <Button label="=" click={ this.setarOperacao } operation/>
            </div>
        )
    }
}