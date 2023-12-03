import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('<App/>', () => {
  test('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


// -----------------------------------------------------

// import { render, screen } from '@testing-library/react';
// import App from '../App';

// test('renders the landing page', () => {
//   render(<App />);
//   // if (typeof window !== 'undefined'){
//   //   render(<App/>, document.getElementById("root"));
//   // }
// });