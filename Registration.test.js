import React from 'react' ;
import { shallow } from 'enzyme';
import Registration from './Registration';

describe('<Registration />', () => {
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
        submitRegistrationForm: jest.fn()
    };
    

    it('Submit works', () => {
        let scrollIntoViewMock = jest.fn();
        const component = shallow(
            <Registration {...testValues} />
        );
        component.find('#submitButton').simulate('click');
        expect(scrollIntoViewMock).toBeCalled();
        expect(testValues.submitRegistrationForm).toHaveBeenCalledTimes(1);
        expect(testValues.submitRegistrationForm).toBeCalledWith({firstName: testValues.firstName,
            lastName: testValues.lastName,
            phoneNumber: testValues.phoneNumber,
            emailAddress: testValues.emailAddress,
            userID: testValues.userID,
            memberID: testValues.memberID,
            secQs1: testValues.secQs1,
            secQs2: testValues.secQs2,
            secQs3: testValues.secQs3,
            answer1: testValues.answer1,
            answer2: testValues.answer2,
            answer3: testValues.answer3
            });
    });
})

