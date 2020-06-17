import React from 'react' ;
import { mount } from 'enzyme';
import Registration from './Registration';


describe('<Registration />', () => {
    
    it('should open modal dialog', () => {
        const component = mount(
            <Registration/>
        );
        expect(component.find('#submitButton').exists()).toEqual(true)
        component.find('#submitButton').at(0).simulate('click');
        component.update();
        expect(component.find('.custom-dialog').at(0).prop('open')).toBe(false)

       
    });

    it('should call submit', () => {
        const fallbackIO = jest.fn()
        const component = mount(
            <Registration/>,{fallbackIO}
        );
        component.find('#standard-firstname').last().simulate('change', {target: {value: 'Leo'}});
        component.find('#standard-lastname').last().simulate('change', {target: {value: 'Martin'}});
        component.find('#date-picker-dob').last().simulate('change', {target: {value: '05/01/2020'}});
        component.find('#standard-phone').last().simulate('change', {target: {value: '9196969330'}});
        component.find('#standard-email').last().simulate('change', {target: {value: 'leomartin@gmail.com'}});
        component.find('#standard-username').last().simulate('change', {target: {value: 'LeoMartin'}});
        component.find('#standard-memberid').last().simulate('change', {target: {value: '123456'}});
        component.find('#standard-sq1').last().simulate('change', {target: {value: 'Security Question 1?'}});
        component.find('#standard-sq2').last().simulate('change', {target: {value: 'Security Question 2?'}});
        component.find('#standard-sq3').last().simulate('change', {target: {value: 'Security Question 3?'}});
        component.find('#standard-ans1').last().simulate('change', {target: {value: 'Security Answer 1'}});
        component.find('#standard-ans2').last().simulate('change', {target: {value: 'Security Answer 2'}});
        component.find('#standard-ans3').last().simulate('change', {target: {value: 'Security Answer 3'}});
        expect(component.find('#standard-firstname').last().prop('value')).toBe('Leo');
        expect(component.find('#standard-lastname').last().prop('value')).toBe('Martin');
        expect(component.find('#date-picker-dob').last().prop('value')).toBe('05/01/2020');
        component.find('#submitButton').last().simulate('click');
        component.update();
        expect(component.find('.custom-dialog').at(0).prop('open')).toBe(false)

    });
})
