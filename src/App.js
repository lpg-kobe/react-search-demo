import React from 'react';
import { BrowserRouter as Router, Route, link } from 'react-router-dom';

// index
import Index from '@/views/index';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Index} />
      </Router>
    );
  }
}
export default App;
