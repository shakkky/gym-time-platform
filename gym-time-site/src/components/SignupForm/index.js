import React from 'react';
import '../../styles/SignupForm.scss';
import { Form, Col, Button, Modal, Alert } from 'react-bootstrap';
import { signup } from '../../services';
import { generateId } from '../../utils';

function SignupForm() {

  const [ form, setForm ] = React.useState({});
  const [ errors, setErrors ] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  function isValidEmail(str) {
    // eslint-disable-next-line
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(str)){
      return false;
    } else {
      return true;
    }
  }

  const findFormErrors = () => {
    const { fullName, emailAddress, password1, password2 } = form;
    const newErrors = {}
    
    if (!fullName || fullName === '') {
      newErrors.fullName = 'Please provide your full name.';
    } else if (fullName.length > 30) {
      newErrors.fullName = 'name is too long!';
    }

    if (!emailAddress || emailAddress === '') {
      newErrors.emailAddress = 'Please provide your email address.';
    } else if (!isValidEmail(emailAddress)) {
      newErrors.emailAddress = 'Email format is incorrect';
    }

    if (!password1 || password1 === '') {
      newErrors.password1 = 'Password cannot be blank.';
    }

    if (!password2 || password2 === '') {
      newErrors.password2 = 'Password cannot be blank.';
    }

    if (password1 !== password2) {
      newErrors.password2 = 'Passwords do not match';
    }
    return newErrors;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        const accountId = generateId();
        await signup({
          'accountId': accountId,
          'name': form.fullName,
          'email': form.emailAddress,
          'password': form.password1
        });
        setShowModal(true);
      } catch (err) {
        setAlertMessage(err.message);
        setShowAlert(true);
      }
    }
  }

  return (
    <div className="form-container">
      <Form noValidate onSubmit={handleFormSubmit}>
        <Form.Group as={Col} sm={true} controlId="formName">
          <Form.Label><b>Full Name</b></Form.Label>
          <Form.Control type="name" onChange={(e) => setField('fullName', e.target.value)} isInvalid={!!errors.fullName}/>
          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} sm={true} controlId="formEmail">
          <Form.Label><b>Email Address</b></Form.Label>
          <Form.Control type="email" onChange={(e) => setField('emailAddress', e.target.value)} isInvalid={!!errors.emailAddress}/>
          <Form.Control.Feedback type="invalid">{errors.emailAddress}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} sm={true} controlId="formPassword">
          <Form.Label><b>Password</b></Form.Label>
          <Form.Control type="text" onChange={(e) => setField('password1', e.target.value)} isInvalid={!!errors.password1}/>
          <Form.Control.Feedback type="invalid">{errors.password1}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} sm={true} controlId="formPasswordMatch">
          <Form.Label><b>Confirm Password</b></Form.Label>
          <Form.Control type="text" onChange={(e) => setField('password2', e.target.value)} isInvalid={!!errors.password2}/>
          <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback>
        </Form.Group>

        <div className='form-submit-button'>
          <Button variant="primary" type="submit" size="lrg" block>
            Create account
          </Button>
        </div>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you, your account is on it's way.</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please allow a few minutes to receive an email containing an activation link has been sent to your designated email address.</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <div className="alert-container">
        <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Oops! We've run into issues!</Alert.Heading>
          <p>{alertMessage}</p>
        </Alert>
      </div>
    </div>
  );
}

export default SignupForm;