import React from 'react';

import UploadProduct from '../components/UploadProduct';
import LoginScreen2 from '../screens/WelcomeScreen';
import Conversaciones from '../screens/Conversaciones';

import renderer from 'react-test-renderer';

describe('UploadProduct functions tests', () => {

    test('test type "Subasta', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        uProduct.saveType("Subasta");
        //console.warn(uProduct);
        expect(uProduct.state.tipo).toEqual("subasta");
    });

    test('test type "Trueque', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        uProduct.saveType("Trueque");
        //console.warn(uProduct);
        expect(uProduct.state.tipo).toEqual("trueque");
    });

    test('test type "Normal', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        uProduct.saveType("Normal");
        //console.warn(uProduct);
        expect(uProduct.state.tipo).toEqual("normal");
    });

    test('test none type', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        //console.warn(uProduct);
        expect(uProduct.state.tipo).toEqual("");
    });

    test('test type wrong type', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        uProduct.saveType("Wrong type");
        //console.warn(uProduct);
        expect(uProduct.state.tipo).toEqual("");
    });

    test('check fields are correct', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        uProduct.onTitleChanged("title");
        uProduct.saveCategory("Coches");
        uProduct.saveType("Normal");
        uProduct.onDescriptionChanged("description");
        uProduct.onPrecioChanged("11");
        uProduct.onRadioUbicacionChanged("100");
        expect(uProduct.uploadProduct()).toBe(false);
    });

    test('check fields are incorrect', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        //uProduct.onTitleChanged("title");
        uProduct.saveCategory("Coches");
        uProduct.saveType("Normal");
        uProduct.onDescriptionChanged("description");
        uProduct.onPrecioChanged("11");
        uProduct.onRadioUbicacionChanged("100");
        expect(uProduct.uploadProduct()).toBe(true);
    });

    test('check trueque fields are correct', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        uProduct.onTitleChanged("title");
        uProduct.saveCategory("Coches");
        uProduct.saveType("Normal");
        uProduct.onDescriptionChanged("description");
        uProduct.onPrecioChanged("11");
        uProduct.onRadioUbicacionChanged("100");
        uProduct.onPrecioTruequeChanged("50");
        expect(uProduct.uploadProduct()).toBe(false);
    });

    test('check trueque fields are incorrect', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        uProduct.onTitleChanged("title");
        uProduct.saveCategory("Coches");
        uProduct.saveType("Trueque");
        uProduct.onDescriptionChanged("description");
        uProduct.onPrecioChanged(200);
        uProduct.onRadioUbicacionChanged("100");
        uProduct.onPrecioTruequeChanged(10);
        expect(uProduct.uploadProduct()).toBe(true);
    });


    test('check subasta fields are correct', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        uProduct.onTitleChanged("title");
        uProduct.saveCategory("Coches");
        uProduct.saveType("Normal");
        uProduct.onDescriptionChanged("description");
        uProduct.onPrecioChanged("11");
        uProduct.onRadioUbicacionChanged("100");
        uProduct.setState({markedDate: "15/17/2019"});
        expect(uProduct.uploadProduct()).toBe(false);
    });

    test('check subasta fields are incorrect', () => {
        const uProduct = renderer.create(<UploadProduct />).getInstance();
        uProduct.onTitleChanged("title");
        uProduct.saveCategory("Coches");
        uProduct.saveType("Normal");
        uProduct.onDescriptionChanged("description");
        uProduct.onPrecioChanged("11");
        uProduct.onRadioUbicacionChanged("100");
        //uProduct.setState({markedDate: "15/17/2019"});
        expect(uProduct.uploadProduct()).toBe(false);
    });

});

describe('Conversaciones functions tests', () => {

    test('test check user', () => {
        const conver = renderer.create(<Conversaciones />).getInstance();
        let item = {
            vendedor: "vendedor",
            comprador: "comprador"
        }
        expect(conver._checkUser(item)).toEqual("vendedor");
    });

    test('test check user 2', () => {
        const conver = renderer.create(<Conversaciones />).getInstance();
        let item = {
            vendedor: "vendedor",
            comprador: "comprador"
        }
        conver.setState({user: item.vendedor});
        expect(conver._checkUser(item)).toEqual("comprador");
    });

    test('test check mail', () => {
        const conver = renderer.create(<Conversaciones />).getInstance();
        let item = {
            vendedor: "vendedor",
            comprador: "comprador",
            email_vendedor: "vendedor@mail",
            email_comprador: "comprador@mail"
        }
        expect(conver._checkUserEmail(item)).toEqual("vendedor@mail");
    });

    test('test check mail 2', () => {
        const conver = renderer.create(<Conversaciones />).getInstance();
        let item = {
            vendedor: "vendedor",
            comprador: "comprador",
            email_vendedor: "vendedor@mail",
            email_comprador: "comprador@mail"
        }
        conver.setState({user: item.vendedor});
        expect(conver._checkUserEmail(item)).toEqual("comprador@mail");
    });

    test('test check imagen', () => {
        const conver = renderer.create(<Conversaciones />).getInstance();
        let item = {
            vendedor: "vendedor",
            comprador: "comprador",
            imagen_vendedor: "vendedor@imagen",
            imagen_comprador: "comprador@imagen"
        }
        expect(conver._checkUserImage(item)).toEqual("vendedor@imagen");
    });

    test('test check imagen 2', () => {
        const conver = renderer.create(<Conversaciones />).getInstance();
        let item = {
            vendedor: "vendedor",
            comprador: "comprador",
            imagen_vendedor: "vendedor@imagen",
            imagen_comprador: "comprador@imagen"
        }
        conver.setState({user: item.vendedor});
        expect(conver._checkUserImage(item)).toEqual("comprador@imagen");
    });

});
