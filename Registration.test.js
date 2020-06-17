import React from 'react' ;
import { mount ,shallow} from 'enzyme';
import Registration from './Registration';
import TextField from '@material-ui/core/TextField';


describe('<Registration />', () => {
    // jest.mock('@material-ui/core/TextField', () => () => null)
    const testValues = {
        firstName: 'Leo',
        lastName: 'Master',
        phoneNumber: '9186869897',
        emailAddress: 'leo.master@gmail.com',
        userID: 'LeoMaster',
        memberID: '123456',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        secQs1: 'Security Question 1',
        secQs2: 'Security Question 2',
        secQs3: 'Security Question 3',
        answer1: 'Answer 1',
        answer2: 'Answer 2',
        answer3: 'Answer 3',
        
    };
    

    it('should open modal dialog', () => {
       
        const onSubmitSpy = jest.fn();
        const component = mount(
            <Registration/>
        );
        expect(component.find('.custom-dialog').at(0).prop('open')).toBe(false)
         expect(component.find('#submitButton').exists()).toEqual(true)
         component.find('#submitButton').at(0).simulate('click');
         component.update()
         expect(component.find('.custom-dialog').at(0).prop('open')).toBe(true)
       
    });

    it('should call submit', () => {
        const fallbackIO = jest.fn()
        const component = mount(
            <Registration/>,{fallbackIO}
        );
        component.find('#standard-firstname').last().simulate('change', {target: {value: 'Leo'}})
        const lastName = component.find('#standard-lastname').last()
        lastName.getDOMNode().value = testValues.lastName
        lastName.simulate('change')
        expect(component.find('#standard-firstname').last().prop('value')).toBe('Leo')
        component.find('#submitButton').last().simulate('click');
         console.log(fallbackIO.mock.calls[0])
        // expect(fallbackIO).toBeCalledTimes(3)

    });
})
