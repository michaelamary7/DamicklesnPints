// end to end test for the form input component
// this test will check if the form input component is rendered correctly


import React from 'react';
import { shallow } from 'enzyme';
import FormInput from '../components/FormInput';
 
describe('FormInput', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<FormInput debug />);
        expect(component).toMatchSnapshot();
    });
    });

    