import React from 'react';

import UploadProduct from '../components/UploadProduct';

import renderer from 'react-test-renderer';


test('test type "Subasta', () => {
    //const tree = renderer.create(<UploadProduct />).toJSON();
    const uProduct = renderer.create(<UploadProduct />).getInstance();
    uProduct.saveType("Subasta");
    //console.warn(uProduct);
    expect(uProduct.state.tipo).toEqual("subasta");
  });

  test('test type "Trueque', () => {
    //const tree = renderer.create(<UploadProduct />).toJSON();
    const uProduct = renderer.create(<UploadProduct />).getInstance();
    uProduct.saveType("Trueque");
    //console.warn(uProduct);
    expect(uProduct.state.tipo).toEqual("trueque");
  });

  test('test type "Normal', () => {
    //const tree = renderer.create(<UploadProduct />).toJSON();
    const uProduct = renderer.create(<UploadProduct />).getInstance();
    uProduct.saveType("Normal");
    //console.warn(uProduct);
    expect(uProduct.state.tipo).toEqual("normal");
  });