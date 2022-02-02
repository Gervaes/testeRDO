import React, { Component } from "react";

export default class FirstTask extends Component {

    state = {
        number: "",
        result: "",
    };

    convertToRoman(e) {
        
        let number = e.target.value;
        let algarisms = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1};
        let keys = Object.keys(algarisms);
        let result = "";
        let i = 0;

        if(number >= 0) {
            while(i < keys.length) {
                let times = Math.floor(number / algarisms[keys[i]]);
                // console.log(`${number} has ${times} the ${keys[i]} so ${algarisms[keys[i]]}`)
                if(keys[i] == "M") {
                    result += keys[i].repeat(times);
                    number -= times * algarisms[keys[i]];
                } else {
                    if(times == 9) {
                        result = result + keys[i] + keys[i-2];
                        number = number - (times * algarisms[keys[i]]);
                    } else if(times == 4) {
                        result = result + keys[i] + keys[i-1];
                        number = number - (times * algarisms[keys[i]]);
                    } else if(times < 5) {
                        result += keys[i].repeat(times);
                        number -= times * algarisms[keys[i]];
                    } else {
                        // console.log(times)
                        result = result + keys[i-1] + keys[i].repeat(times-5);
                        number = number - (times * algarisms[keys[i]]);
                    }
                }
                i+=2;
            }
            
            this.setState({
                number: e.target.value,
                result: result,
            });
        } else {
            this.setState({
                number: e.target.value,
                result: "Número inválido!",
            });
        }
    }

    render() {
        const { taskNumber } = this.props;
        const { number, result } = this.state;

        return (
            <>
                <h1>Tarefa {taskNumber}</h1>
                <input type="number" placeholder="Número..." value={number} onChange={e => this.convertToRoman(e)}/>
                {number != 0 ? <h2>{number} em algarismos romanos: {result}</h2> : ""}
            </>
        );
    }
}