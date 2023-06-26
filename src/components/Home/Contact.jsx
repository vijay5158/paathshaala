import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import React, { useState } from 'react';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Contact() {
    const initialDataContact = Object.freeze({
        name: '',
        email: '',
        mobile: '',
        concern: ''
    })
    const [formDataContact, setFormDataContact] = useState(initialDataContact);
    function handleChange(event) {
        setFormDataContact({
            ...formDataContact,
            [event.target.name]: event.target.value.trim(),
        })
    }
    function handleSubmit(event) {
        const contact = {
            name: formDataContact.name,
            email: formDataContact.email,
            mobile: formDataContact.mobile,
            concern: formDataContact.concern
        }

        axios.post(process.env.BACKEND_URL, contact)
            .then((res) => {
                setFormDataContact(initialDataContact);
                closeAlertError();
                showAlertSuccess();
            })
            .catch((err) => {
                console.log(err);
                closeAlertSuccess();
                showAlertError();
            })
    }
    const classes = useStyles();

    function closeAlertSuccess() {
        document.getElementById('successAlert').style.display = 'none';
    }
    function closeAlertError() {
        document.getElementById('errorAlert').style.display = 'none';
    }
    function showAlertError() {
        document.getElementById('errorAlert').style.display = 'block';

    }
    function showAlertSuccess() {
        document.getElementById('successAlert').style.display = 'block';

    }
    return (
        <div>
            <div className={classes.root} id='successAlert' style={{ display: 'none' }}>
                <Alert onClose={closeAlertSuccess} severity="success" color="success">
                    Your query received , Our team will contact you !
                </Alert>
            </div>
            <div className={classes.root} id='errorAlert' style={{ display: 'none' }}>
                <Alert onClose={closeAlertError} severity="error" color="error">
                    Wrong Data Provided !
                </Alert>
            </div>
            <section className="contact" id="contact">
                <h1 className="text-center text-big">Contact Us</h1>
                <div className="form">
                    <form action="" className='sm:w-[70vw] w-full'>
                        <input className="form-input" type="text" onChange={handleChange} name="name" id="name" placeholder="Enter Your name" />
                        <input className="form-input" type="text" onChange={handleChange} name="mobile" id="mobile"
                            placeholder="Enter Your Phone" />
                        <input className="form-input" type="email" name="email" id="email" onChange={handleChange}
                            placeholder="Enter Your email" />
                        <textarea className="form-input" name="concern" id="concern" onChange={handleChange} cols="30" rows="10"
                            placeholder="Ellaborate your concern" />
                        <button type="reset" className="btn bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)]" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>

            </section>

        </div>
    );
}

export default Contact;