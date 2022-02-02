import React, { Component } from "react";
import '../style.css';

export default class FirstTask extends Component {

    state = {
        currentClientID: 1,
        clients: [],
        newClientInput: "",
        currentProductID: 1,
        products: [],
        newProductNameInput: "",
        newProductPriceInput: "",
    };

    changeClientInput = e => this.setState({newClientInput: e.target.value});
    changeProductInput = e => this.setState({newProductNameInput: e.target.value});
    changeProductPriceInput = e => this.setState({newProductPriceInput: e.target.value});

    calculateChecks() {
        let { clients, products } = this.state;
        
        clients.forEach(client => {
            let check = 0;
            products.forEach(product => {
                if(product.clients.includes(client.id)) {
                    check += product.price / product.clients.length;
                }
            });

            if(client.payTenPercent)
                check = check * 1.1;

            client.check = check;
        });

        this.setState({
            clients: clients,
        })
    }

    toggle10PercentOption(clientID) {
        let { clients } = this.state;
        
        clients[clientID].payTenPercent = !clients[clientID].payTenPercent;
        this.setState({
            clients: clients,
        })

        this.calculateChecks()
    }

    toggleClientFromProduct(clientID, productIndex) {
        let { products } = this.state;
        if(products[productIndex].clients.includes(clientID))
            products[productIndex].clients = products[productIndex].clients.filter(function filter(value) { return value != clientID});
        else
            products[productIndex].clients.push(clientID);
    
        this.setState({
            products: products,
        });

        this.calculateChecks()
    }

    addClient() {
        let { newClientInput, currentClientID, clients } = this.state;

        if(newClientInput != "") {
            clients.push({
                id: currentClientID,
                name: newClientInput,
                check: 0,
                payTenPercent: false,
            });
    
            this.setState({
                clients: clients,
                currentClientID: currentClientID+1,
                newClientInput: "",
            });
        }
    }

    addProduct() {
        let { newProductNameInput, newProductPriceInput, currentProductID, products } = this.state;

        if(newProductNameInput!="" && newProductPriceInput!="") {
            products.push({
                id: currentProductID,
                name: newProductNameInput,
                price: newProductPriceInput,
                clients: [],
            });
    
            this.setState({
                products: products,
                currentProductID: currentProductID+1,
                newProductNameInput: "",
                newProductPriceInput: "",
            });
        }
    }

    render() {

        const { taskNumber } = this.props;
        const { clients, products, newClientInput, newProductNameInput, newProductPriceInput } = this.state;

        return (
            <>
            <h1>Tarefa {taskNumber}</h1>
            <div>
                <span>Clientes | </span>
                <input type="text" placeholder="Nome..." value={newClientInput} onChange={e => this.changeClientInput(e)}/>
                <button value={newClientInput} onClick={() => this.addClient()}>Adicionar cliente</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Total a pagar</th>
                        <th>Paga 10%</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, clientIndex) => (<tr key={client.id}>
                        <td>{client.name}</td>
                        {/* <td>R${client.check}</td> */}
                        <td>{(client.check).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                        <td><input type="checkbox" checked={client.payTenPercent} onChange={() => this.toggle10PercentOption(clientIndex)}/></td>
                    </tr>))}
                </tbody>
            </table>
            <br />
            <div>
                <span>Produtos | </span>
                <input type="text" placeholder="Nome..." value={newProductNameInput} onChange={e => this.changeProductInput(e)}/>
                <input type="number" placeholder="R$" value={newProductPriceInput} onChange={e => this.changeProductPriceInput(e)}/>
                <button onClick={() => this.addProduct()}>Adicionar produto</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Clientes</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        {clients.map(client => (<th>{client.name}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (<tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{(product.price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                        {clients.map(client => (<td><input type="checkbox" checked={product.clients.includes(client.id) ? true : false} onChange={() => this.toggleClientFromProduct(client.id, index)}/></td>))}
                    </tr>))}
                </tbody>
            </table>
            </>
        );
    }
}