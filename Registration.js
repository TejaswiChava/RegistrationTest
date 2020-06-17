import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import './Registration.scss';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as ErrorConstants from './RegistrationConstants';
import * as AppConstants from '../../../SharedModule/Utils/AppConstants';
import ErrorMessages from '../../../SharedModule/MessageHandlers/ErrorMessages';

export default function RegistrationForm(props) {
    // Dialogue Starts
    const styles = theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(2)
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    });

    const DialogTitle = withStyles(styles)(props => {
        const { children, classes, onClose } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root}>
                <Typography variant='h6'>{children}</Typography>
                {onClose
                    ? <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    : null}
            </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles(theme => ({
        root: {
            padding: theme.spacing(2)
        }
    }))(MuiDialogContent);

    const DialogActions = withStyles(theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(1)
        }
    }))(MuiDialogActions);

    // Dialogue Ends

    // Page Constants
    let errorMessagesArray = [];
    const [selectedDOBDate, setSelectedDOBDate] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [{
        firstNameError,
        lastNameError,
        dobError,
        phoneNumberError,
        emailAddressError,
        userIDError,
        memberIDError,
        securityQs1Error,
        securityQs2Error,
        securityQs3Error,
        answer1Error,
        answer2Error,
        answer3Error,
        dupSecurityQs1Error,
        dupSecurityQs2Error,
        dupSecurityQs3Error
    }, setShowError] = React.useState(false);

    const [{
        firstNameErrorText,
        lastNameErrorText,
        dobErrorText,
        phoneNumberErrorText,
        emailAddressErrorText,
        userIDErrorText,
        memberIDErrorText,
        securityQs1ErrorText,
        securityQs2ErrorText,
        securityQs3ErrorText,
        answer1ErrorText,
        answer2ErrorText,
        answer3ErrorText,
        dupSecurityQs1ErrorText,
        dupSecurityQs2ErrorText,
        dupSecurityQs3ErrorText
    }, setShowErrorText] = React.useState('');

    // Field bindings
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        userID: '',
        memberID: '',
        address: '',
        city: '',
        state: AppConstants.PLEASE_SELECT_ONE,
        postalCode: '',
        secQs1: AppConstants.SELECT_QUESTION,
        secQs2: AppConstants.SELECT_QUESTION,
        secQs3: AppConstants.SELECT_QUESTION,
        answer1: '',
        answer2: '',
        answer3: ''
    });

    // Method to set field values on change
    const handleChanges = name => event => {
        console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    // Method to handle Date field change
    const handleDateChange = date => {
        setSelectedDOBDate(date);
    };

    const validateRegisterForm = () => {
        console.log('validation entered')
        errorMessagesArray = [];
        setErrorMessages([]);
        var firstNameError; var lastNameError; var dobError; var phoneNumberError; var emailAddressError;
        var userIDError; var memberIDError; var securityQs1Error; var securityQs2Error; var securityQs3Error;
        var answer1Error; var answer2Error; var answer3Error; var dupSecurityQs1Error; var dupSecurityQs2Error;
        var dupSecurityQs3Error = false;

        var firstNameErrorText; var lastNameErrorText; var dobErrorText; var phoneNumberErrorText; var emailAddressErrorText;
        var userIDErrorText; var memberIDErrorText; var securityQs1ErrorText; var securityQs2ErrorText; var securityQs3ErrorText;
        var answer1ErrorText; var answer2ErrorText; var answer3ErrorText; var dupSecurityQs1ErrorText; var dupSecurityQs2ErrorText;
        var dupSecurityQs3ErrorText = '';

        if (values.firstName === '' || (values.firstName && values.firstName.trim() === '')) {
            firstNameError = true;
            firstNameErrorText = ErrorConstants.FIRST_NAME + ErrorConstants.REQUIRED;
            errorMessagesArray.push(firstNameErrorText);
        }
        if (values.lastName === '' || (values.lastName && values.lastName.trim() === '')) {
            lastNameError = true;
            lastNameErrorText = ErrorConstants.LAST_NAME + ErrorConstants.REQUIRED;
            errorMessagesArray.push(lastNameErrorText);
        }
        if (!selectedDOBDate) {
            dobError = true;
            dobErrorText = ErrorConstants.DOB + ErrorConstants.REQUIRED;
            errorMessagesArray.push(dobErrorText);
        }
        if (selectedDOBDate && selectedDOBDate.toString() === 'Invalid Date') {
            console.log('date', selectedDOBDate)
            dobError = true;
            dobErrorText = ErrorConstants.DOB + ErrorConstants.INVALID;
            errorMessagesArray.push(dobErrorText);
        }
        if (values.phoneNumber === '' || (values.phoneNumber && values.phoneNumber.trim() === '')) {
            phoneNumberError = true;
            phoneNumberErrorText = ErrorConstants.PHONE_NUMBER + ErrorConstants.REQUIRED;
            errorMessagesArray.push(phoneNumberErrorText);
        }
        if (!phoneNumberError && values.phoneNumber.length < 10) {
            phoneNumberError = true;
            phoneNumberErrorText = ErrorConstants.PHONE_NUMBER_FORMAT;
            errorMessagesArray.push(phoneNumberErrorText);
        }
        if (values.emailAddress === '' || (values.emailAddress && values.emailAddress.trim() === '')) {
            emailAddressError = true;
            emailAddressErrorText = ErrorConstants.EMAIL_ADDRESS + ErrorConstants.REQUIRED;
            errorMessagesArray.push(emailAddressErrorText);
        }
        if (!emailAddressError && !AppConstants.EMAIL_ADDRESS_REGEX.test(values.emailAddress)) {
            emailAddressError = true;
            emailAddressErrorText = ErrorConstants.EMAIL_ADDRESS + ErrorConstants.INVALID;
            errorMessagesArray.push(emailAddressErrorText);
        }
        if (values.userID === '' || (values.userID && values.userID.trim() === '')) {
            userIDError = true;
            userIDErrorText = ErrorConstants.USER_ID + ErrorConstants.REQUIRED;
            errorMessagesArray.push(userIDErrorText);
        }
        if (values.memberID === '' || (values.memberID && values.memberID.trim() === '')) {
            memberIDError = true;
            memberIDErrorText = ErrorConstants.MEMBER_ID + ErrorConstants.REQUIRED;
            errorMessagesArray.push(memberIDErrorText);
        }
        console.log(values.secQs1)
        if (values.secQs1 && values.secQs1 === AppConstants.SELECT_QUESTION) {
            securityQs1Error = true;
            securityQs1ErrorText = ErrorConstants.SECURITY_QUESTION_1 + ErrorConstants.REQUIRED;
            errorMessagesArray.push(securityQs1ErrorText);
        }
        if (values.secQs2 && values.secQs2 === AppConstants.SELECT_QUESTION) {
            securityQs2Error = true;
            securityQs2ErrorText = ErrorConstants.SECURITY_QUESTION_2 + ErrorConstants.REQUIRED;
            errorMessagesArray.push(securityQs2ErrorText);
        }
        if (values.secQs3 && values.secQs3 === AppConstants.SELECT_QUESTION) {
            securityQs3Error = true;
            securityQs3ErrorText = ErrorConstants.SECURITY_QUESTION_3 + ErrorConstants.REQUIRED;
            errorMessagesArray.push(securityQs3ErrorText);
        }
        if (!securityQs1Error && !securityQs2Error && (values.secQs1 === values.secQs2)) {
            // dupSecurityQs1Error = true;
            dupSecurityQs2Error = true;
            // dupSecurityQs1ErrorText = ErrorConstants.DUPLICATE_SECURITY_QUESTIONS;
            dupSecurityQs2ErrorText = ErrorConstants.DUPLICATE_SECURITY_QUESTIONS;
        }
        if (!securityQs2Error && !securityQs3Error && (values.secQs2 === values.secQs3)) {
            // dupSecurityQs2Error = true;
            dupSecurityQs3Error = true;
            // dupSecurityQs2ErrorText = ErrorConstants.DUPLICATE_SECURITY_QUESTIONS;
            dupSecurityQs3ErrorText = ErrorConstants.DUPLICATE_SECURITY_QUESTIONS;
        }
        if (!securityQs1Error && !securityQs3Error && (values.secQs1 === values.secQs3)) {
            // dupSecurityQs1Error = true;
            dupSecurityQs3Error = true;
            // dupSecurityQs1ErrorText = ErrorConstants.DUPLICATE_SECURITY_QUESTIONS;
            dupSecurityQs3ErrorText = ErrorConstants.DUPLICATE_SECURITY_QUESTIONS;
        }
        if (dupSecurityQs2Error || dupSecurityQs3Error) {
            errorMessagesArray.push(ErrorConstants.DUPLICATE_SECURITY_QUESTIONS);
        }
        if (values.answer1 === '' || (values.answer1 && values.answer1.trim() === '')) {
            answer1Error = true;
            answer1ErrorText = ErrorConstants.ANSWER + ErrorConstants.REQUIRED;
            errorMessagesArray.push(ErrorConstants.ANSWER + ' for Security Question 1' + ErrorConstants.REQUIRED);
        }
        if (values.answer2 === '' || (values.answer2 && values.answer1.trim() === '')) {
            answer2Error = true;
            answer2ErrorText = ErrorConstants.ANSWER + ErrorConstants.REQUIRED;
            errorMessagesArray.push(ErrorConstants.ANSWER + ' for Security Question 2' + ErrorConstants.REQUIRED);
        }
        if (values.answer3 === '' || (values.answer3 && values.answer1.trim() === '')) {
            answer3Error = true;
            answer3ErrorText = ErrorConstants.ANSWER + ErrorConstants.REQUIRED;
            errorMessagesArray.push(ErrorConstants.ANSWER + ' for Security Question 3' + ErrorConstants.REQUIRED);
        }

        setErrorMessages(errorMessagesArray);
        setShowError({
            firstNameError: firstNameError,
            lastNameError: lastNameError,
            dobError: dobError,
            phoneNumberError: phoneNumberError,
            emailAddressError: emailAddressError,
            userIDError: userIDError,
            memberIDError: memberIDError,
            securityQs1Error: securityQs1Error,
            securityQs2Error: securityQs2Error,
            securityQs3Error: securityQs3Error,
            answer1Error: answer1Error,
            answer2Error: answer2Error,
            answer3Error: answer3Error,
            dupSecurityQs1Error: dupSecurityQs1Error,
            dupSecurityQs2Error: dupSecurityQs2Error,
            dupSecurityQs3Error: dupSecurityQs3Error
        });

        setShowErrorText({
            firstNameErrorText: firstNameErrorText,
            lastNameErrorText: lastNameErrorText,
            dobErrorText: dobErrorText,
            phoneNumberErrorText: phoneNumberErrorText,
            emailAddressErrorText: emailAddressErrorText,
            userIDErrorText: userIDErrorText,
            memberIDErrorText: memberIDErrorText,
            securityQs1ErrorText: securityQs1ErrorText,
            securityQs2ErrorText: securityQs2ErrorText,
            securityQs3ErrorText: securityQs3ErrorText,
            answer1ErrorText: answer1ErrorText,
            answer2ErrorText: answer2ErrorText,
            answer3ErrorText: answer3ErrorText,
            dupSecurityQs1ErrorText: dupSecurityQs1ErrorText,
            dupSecurityQs2ErrorText: dupSecurityQs2ErrorText,
            dupSecurityQs3ErrorText: dupSecurityQs3ErrorText
        });

        if (errorMessagesArray && errorMessagesArray.length > 0) {
            var elmnt = document.getElementById("header");
            // elmnt.scrollIntoView();
            return true
        } else {
            console.log('errorlength 0')

            return false;
        }
    };

    // Method to submit Registration Form
    const submitRegistrationForm = () => {
console.log('entered');
        if (!validateRegisterForm()) {
        console.log('if enterd');

            setOpen(true);
        }
    };

    // Method to redirect to Success Page
    const redirectToSuccess = () => {
        setOpen(false);
        props.history.push({
            pathname: '/success'
            // state: { payloadData }
        });
    }

    return (
        <div className="tabs-container registration-container">
            <div className="tab-body">
                <div className="tab-header" id="header">
                    <div className="tab-heading float-left col-sm-12">Member Registration</div>
                </div>
                <div className="form-wrapper col-sm-12">
                    <ErrorMessages errorMessages={errorMessages} />
                </div>
                <div>
                    <form autoComplete="off">
                        <div className="form-wrapper row ml-3 mt-0 mb-0 pl-1">
                            <p className="text-danger p-1">A valid e-mail address is required to complete registration. If you do not have an e-mail address, please contact Member Services at (907) 644-6800 or toll-free in Alaska at (800) 770-5650.</p>
                        </div>
                        <div className="ml-3 mr-3 pl-2 pr-2">
                            <fieldset className="custom-fieldset pl-0">
                                <legend>Member Demographics:</legend>
                                <div className="form-wrapper col-sm-12 pl-2 pr-2">
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            id="standard-firstname"
                                            label="First Name"
                                            value={values.firstName}
                                            onChange={handleChanges('firstName')}
                                            inputProps={{ maxLength: 25 }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={firstNameError ? firstNameErrorText : null}
                                            helperText={firstNameError ? firstNameErrorText : null}
                                        />
                                    </div>
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            id="standard-lastname"
                                            label="Last Name"
                                            value={values.lastName}
                                            onChange={handleChanges('lastName')}
                                            inputProps={{ maxLength: 35 }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={lastNameError ? lastNameErrorText : null}
                                            helperText={lastNameError ? lastNameErrorText : null}
                                        />
                                    </div>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                            <KeyboardDatePicker
                                                fullWidth
                                                required
                                                id="date-picker-dob"
                                                name='date'
                                                maxDate={Date.parse('31 Dec 9999 00:00:00 GMT')}
                                                label="Date of Birth"
                                                value={selectedDOBDate}
                                                onChange={handleDateChange}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                placeholder="mm/dd/yyyy"
                                                format="MM/dd/yyyy"
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
                                                // error={dobError ? dobErrorText : null}
                                                helperText={dobError ? dobErrorText : null}
                                            />
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="form-wrapper col-sm-12 pl-2 pr-2">
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            id="standard-phone"
                                            label="Phone Number"
                                            value={values.phoneNumber}
                                            onChange={handleChanges('phoneNumber')}
                                            inputProps={{ maxLength: 10 }}
                                            // onInput={e => {
                                            //     e.target.value = e.target.value.replace(
                                            //         AppConstants.PHONE_NUMBER_ONLY_REGEX,
                                            //         ''
                                            //     );
                                            // }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={phoneNumberError ? phoneNumberErrorText : null}
                                            helperText={phoneNumberError ? phoneNumberErrorText : null}
                                        />
                                    </div>
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            id="standard-email"
                                            label="Email Address"
                                            value={values.emailAddress}
                                            onChange={handleChanges('emailAddress')}
                                            inputProps={{ maxLength: 60 }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={emailAddressError ? emailAddressErrorText : null}
                                            helperText={emailAddressError ? emailAddressErrorText : null}
                                        />
                                    </div>
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            id="standard-username"
                                            label="User ID"
                                            value={values.userID}
                                            onChange={handleChanges('userID')}
                                            inputProps={{ maxLength: 20 }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={userIDError ? userIDErrorText : null}
                                            helperText={userIDError ? userIDErrorText : null}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div className="ml-3 mr-3 pl-2 pr-2">
                            <fieldset className="custom-fieldset pl-0 mt-2">
                                <legend>Medicaid ID:</legend>
                                <div className="form-wrapper col-sm-12 pl-2 pr-2">
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            id="standard-memberid"
                                            label="Member ID"
                                            value={values.memberID}
                                            onChange={handleChanges('memberID')}
                                            inputProps={{ maxLength: 35 }}
                                            // onInput={e => {
                                            //     e.target.value = e.target.value.replace(
                                            //         AppConstants.NUMBER_ONLY_REGEX,
                                            //         ''
                                            //     );
                                            // }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={memberIDError ? memberIDErrorText : null}
                                            helperText={memberIDError ? memberIDErrorText : null}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="row ml-2 mr-2">
                            <div className="col">
                                <fieldset className="custom-fieldset vertical-wrapper pl-0 mt-2">
                                    <legend>Mailing Address Details:</legend>
                                    <div className="form-wrapper col-sm-12 pl-2 pr-2">
                                        <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                            <TextField
                                                id="standard-mailing-address"
                                                label="Address"
                                                value={values.address}
                                                onChange={handleChanges('address')}
                                                inputProps={{ maxLength: 100 }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                        </div>
                                        <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                            <TextField
                                                // required
                                                id="standard-city"
                                                label="City"
                                                value={values.city}
                                                onChange={handleChanges('city')}
                                                inputProps={{ maxLength: 30 }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                        </div>
                                        <div className="mui-custom-form col-sm-2 ml-0 mr-0 mt-0">
                                            <TextField
                                                select
                                                // required
                                                id="standard-state"
                                                label="State"
                                                value={values.state}
                                                onChange={handleChanges('state')}
                                                inputProps={{ maxLength: 15 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem selected key={AppConstants.PLEASE_SELECT_ONE} value={AppConstants.PLEASE_SELECT_ONE}>
                                                    {AppConstants.PLEASE_SELECT_ONE}
                                                </MenuItem>
                                                <MenuItem selected key="1" value="Security Question 1?">
                                                    AK
                                                </MenuItem>
                                                <MenuItem selected key="2" value="Security Question 2?">
                                                    AS
                                                </MenuItem>
                                                <MenuItem selected key="3" value="Security Question 3?">
                                                    AL
                                                </MenuItem>
                                            </TextField>
                                        </div>
                                        <div className="mui-custom-form col-sm-2 ml-0 mr-0 mt-0">
                                            <TextField
                                                // required
                                                id="standard-zip"
                                                label="Postal Code"
                                                value={values.postalCode}
                                                onChange={handleChanges('postalCode')}
                                                inputProps={{ maxLength: 5 }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="ml-3 mr-3 pl-2 pr-2">
                            <fieldset className="custom-fieldset pl-0 mt-3">
                                <legend>Security Questions:</legend>
                                <div className="form-wrapper col-sm-12 pl-2 pr-2">
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            select
                                            id="standard-sq1"
                                            label="Security Question 1?"
                                            value={values.secQs1}
                                            onChange={handleChanges('secQs1')}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={securityQs1Error ? securityQs1ErrorText : null}
                                            helperText={securityQs1Error ? securityQs1ErrorText : null}
                                        >
                                            <MenuItem  key={AppConstants.SELECT_QUESTION} value={AppConstants.SELECT_QUESTION}>
                                                {AppConstants.SELECT_QUESTION}
                                            </MenuItem>
                                            <MenuItem  key="1" value="Security Question 1?">
                                                Security Question 1?
                                            </MenuItem>
                                            <MenuItem  key="2" value="Security Question 2?">
                                                Security Question 2?
                                            </MenuItem>
                                            <MenuItem  key="3" value="Security Question 3?">
                                                Security Question 3?
                                            </MenuItem>
                                        </TextField>
                                    </div>
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            select
                                            id="standard-sq2"
                                            label="Security Question 2?"
                                            value={values.secQs2}
                                            onChange={handleChanges('secQs2')}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={securityQs2Error ? securityQs2ErrorText : (dupSecurityQs2Error ? dupSecurityQs2ErrorText : null)}
                                            helperText={securityQs2Error ? securityQs2ErrorText : (dupSecurityQs2Error ? dupSecurityQs2ErrorText : null)}
                                        >
                                            <MenuItem selected key={AppConstants.SELECT_QUESTION} value={AppConstants.SELECT_QUESTION}>
                                                {AppConstants.SELECT_QUESTION}
                                            </MenuItem>
                                            <MenuItem selected key="1" value="Security Question 1?">
                                                Security Question 1?
                                                    </MenuItem>
                                            <MenuItem selected key="2" value="Security Question 2?">
                                                Security Question 2?
                                                    </MenuItem>
                                            <MenuItem selected key="3" value="Security Question 3?">
                                                Security Question 3?
                                                    </MenuItem>
                                        </TextField>
                                    </div>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                            <TextField
                                                required
                                                select
                                                id="standard-sq3"
                                                label="Security Question 3?"
                                                value={values.secQs3}
                                                onChange={handleChanges('secQs3')}
                                                inputProps={{ maxLength: 15 }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                // error={securityQs3Error ? securityQs3ErrorText : (dupSecurityQs3Error ? dupSecurityQs3ErrorText : null)}
                                                helperText={securityQs3Error ? securityQs3ErrorText : (dupSecurityQs3Error ? dupSecurityQs3ErrorText : null)}
                                            >
                                                <MenuItem selected key={AppConstants.SELECT_QUESTION} value={AppConstants.SELECT_QUESTION}>
                                                    {AppConstants.SELECT_QUESTION}
                                                </MenuItem>
                                                <MenuItem selected key="1" value="Security Question 1?">
                                                    Security Question 1?
                                                    </MenuItem>
                                                <MenuItem selected key="2" value="Security Question 2?">
                                                    Security Question 2?
                                                    </MenuItem>
                                                <MenuItem selected key="3" value="Security Question 3?">
                                                    Security Question 3?
                                                    </MenuItem>
                                            </TextField>
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="form-wrapper col-sm-12 pl-2 pr-2">
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            id="standard-ans1"
                                            label="Answer"
                                            value={values.answer1}
                                            onChange={handleChanges('answer1')}
                                            inputProps={{ maxLength: 50 }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={answer1Error ? answer1ErrorText : null}
                                            helperText={answer1Error ? answer1ErrorText : null}
                                        />
                                    </div>
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            id="standard-ans2"
                                            label="Answer"
                                            value={values.answer2}
                                            onChange={handleChanges('answer2')}
                                            inputProps={{ maxLength: 50 }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={answer2Error ? answer2ErrorText : null}
                                            helperText={answer2Error ? answer2ErrorText : null}
                                        />
                                    </div>
                                    <div className="mui-custom-form col-sm-4 ml-0 mr-0 mt-0">
                                        <TextField
                                            required
                                            id="standard-ans3"
                                            label="Answer"
                                            value={values.answer3}
                                            onChange={handleChanges('answer3')}
                                            inputProps={{ maxLength: 50 }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            // error={answer3Error ? answer3ErrorText : null}
                                            helperText={answer3Error ? answer3ErrorText : null}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <hr></hr>
                        <div className="form-wrapper offset-sm-8 pl-5">
                            <Button id='submitButton' className='btn btn-primary m-2' onClick={() => submitRegistrationForm()}>
                                Submit </Button>
                            <Button className='btn btn-transparent bt-cancel m-2'>
                                Cancel </Button>
                        </div>
                    </form>
                </div>
                <div className="clearfix"></div>
                <Dialog className='custom-dialog dialog-520'
                    open={open}>
                    <DialogTitle id='customized-dialog-title' onClose={() => setOpen(false)}>
                        Email Verification
                      </DialogTitle>
                    <DialogContent dividers>
                        <p className="text-danger p-1  ml-3 mt-0 mb-3 pl-1">Please enter the Verification Code sent to your Email Address.</p>
                        <form autoComplete='off'>
                            <div className="form-wrapper col-sm-12 pl-2 pr-2">
                                <div className="mui-custom-form col-sm-6 ml-0 mr-0 mt-0">
                                    <TextField
                                        required
                                        id="standard-memberid"
                                        label="Verification Code"
                                        inputProps={{ maxlength: 5 }}
                                        onInput={e => {
                                            e.target.value = e.target.value.replace(
                                                AppConstants.NUMBER_ONLY_REGEX,
                                                ''
                                            );
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' color='primary' className='btn btn-success ml-1' onClick={() => redirectToSuccess()}>
                            Verify
                        </Button>
                        <Button variant='outlined' color='primary' className='btn btn-transparent bt-cancel m-2'>
                            Send New Code
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
