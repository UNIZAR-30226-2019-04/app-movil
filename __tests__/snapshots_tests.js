import React from 'react';

import Conversaciones from '../screens/Conversaciones';
import Chat from '../screens/Chat';
import DashboardScreen from '../screens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ProductDetails from '../screens/ProductDetails';
import WelcomeScreen from '../screens/WelcomeScreen';
import CameraRollSelect from '../components/CameraRollSelect';
import CategoryPickerModal from '../components/CategoryPickerModal';
import ComprarModal from '../components/ComprarModal';
import Comprar from '../components/Comprar';
import CustomLeftDrawerComponent from '../components/CustomLeftDrawerComponent';
import DeleteAccount from '../components/DeleteAccount';
import MakeReview from '../components/MakeReview';
import Review from '../components/Review';
import ReviewModal from '../components/ReviewModal';
import SubastarModal from '../components/SubastarModal';
import TypePickerModal from '../components/TypePickerModal';
import UploadMultimedia from '../components/UploadMultimedia';

import renderer from 'react-test-renderer';


describe('Screens snapshot tests', () => {

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

});

describe('Components snapshot tests', () => {

  test('CameraRollSelect renders correctly', () => {
    const tree = renderer.create(<CameraRollSelect />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('CategoryPickerModal renders correctly', () => {
    const tree = renderer.create(<CategoryPickerModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Comprar renders correctly', () => {
    const tree = renderer.create(<Comprar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('ComprarModal renders correctly', () => {
    const tree = renderer.create(<ComprarModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('CustomLeftDrawerComponent renders correctly', () => {
    const tree = renderer.create(<CustomLeftDrawerComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('DeleteAccount renders correctly', () => {
    const tree = renderer.create(<DeleteAccount />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('MakeReview renders correctly', () => {
    const tree = renderer.create(<MakeReview />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Review renders correctly', () => {
    const tree = renderer.create(<Review />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('ReviewModal renders correctly', () => {
    const tree = renderer.create(<ReviewModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('SubastarModal renders correctly', () => {
    const tree = renderer.create(<SubastarModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TypePickerModal renders correctly', () => {
    const tree = renderer.create(<TypePickerModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('UploadMultimedia renders correctly', () => {
    const tree = renderer.create(<UploadMultimedia />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});








