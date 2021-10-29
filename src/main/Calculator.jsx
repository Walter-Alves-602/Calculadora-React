import React, {Component} from "react";
import './Calculator.css'
import Button from'../components/Button'
import Display from'../components/Display'

const startState ={
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0,0],
    correntValue: 0
}

export default class Cauculator extends Component{

    state = {...startState}

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({...startState})
    }

    setOperation(operation){
        if (this.correntValue === 0){
            this.setState({operation, correntValue:1, clearDisplay:true})
        } else{
            const equals = operation === '='
            const atualOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${atualOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null: operation,
                correntValue: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }
//det
    addDigit(n){
        if( n==='.' && this.state.displayValue.includes('.')){
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const correntValue = clearDisplay?'':this.state.displayValue
        const displayValue = correntValue + n
        this.setState({displayValue, clearDisplay: false})

        if (n !== '.') {
            const i = this.state.correntValue //possivel bug (corrent, correntValue)
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
    }


    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="Clear" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} /> 
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />           
            </div>
        )   
}}