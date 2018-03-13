import React, { Component } from 'react';
import {Provider} from 'react-redux'
import productService from './services/products'

class App extends Component {

  componentDidMount() {
    
    const all = productService.getAll().then(res => console.log(res));
    
  }
  render() {
    return (
      <div>
      <div className="App">
        <header className="App-header">
        Hello
        </header>
        {/* <ul>
        {products.getAll().map( p => <li key={p.id}>{p.name}</li>)}
        </ul> */}
        <p className="App-intro">
        </p>
      </div>
      </div>
    );
  }
}

export default App;
