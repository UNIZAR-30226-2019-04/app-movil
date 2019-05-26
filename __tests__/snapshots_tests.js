import React from 'react';

import Conversaciones from '../screens/Conversaciones';
import Chat from '../screens/Chat';
import DashboardScreen from '../screens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ProductDetails from '../screens/ProductDetails';
import WelcomeScreen from '../screens/WelcomeScreen';

import renderer from 'react-test-renderer';

test('Conversaciones renders correctly', () => {
  const tree = renderer.create(<Conversaciones />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Chat renders correctly', () => {
  const tree = renderer.create(<Chat />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('DashboardScreen renders correctly', () => {
  const tree = renderer.create(<DashboardScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('HomeScreen renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('LinksScreen renders correctly', () => {
  const tree = renderer.create(<LinksScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('ProductDetails renders correctly', () => {
  const tree = renderer.create(<ProductDetails />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('WelcomeScreen renders correctly', () => {
  const tree = renderer.create(<WelcomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
