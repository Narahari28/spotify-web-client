import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/components/App';

describe('App (Snapshot)', () => {
  it('App renders properly', () => {
    const component = renderer.create(<App />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});