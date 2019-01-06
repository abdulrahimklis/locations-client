import React, { Component } from 'react';
import MapContainer from './container-components/MapContainer';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';

class App extends Component {
  render() {
    return (
		<Provider store={store}>
			<MapContainer />
		</Provider>
    );
  }
}

export default App;
