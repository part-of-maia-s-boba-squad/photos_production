import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";

import Gallery from './components/Gallery.jsx';



ReactDOM.render(
  <BrowserRouter>
    <Route path='/:id' component={Gallery} />
  </BrowserRouter>,
  document.getElementById('photos'));
  