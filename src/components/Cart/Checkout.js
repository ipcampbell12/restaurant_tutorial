import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


//useRef - don't get values with every key stroke, only get values once form is submitted
//use refs to read whatever user entered when form is submitted

//validation = check that all values are not empty and that postal code is 5 digits long
//helper functions for validation
const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });


    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        //current prop gives access to value stored in ref
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        //validate entered data
        const enteredNameisValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = !isNotFiveChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameisValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid
        })

        const formIsValid =
            enteredCityIsValid &&
            enteredNameisValid &&
            enteredPostalIsValid &&
            enteredStreetIsValid

        if (!formIsValid) {
            return;
        }

        props.onConfirm()

    };

    const controlClasses = (field) => `${classes.control} ${formInputsValidity[`${field}`] ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={controlClasses('name')}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p> Please enter a valid name</p>}
            </div>
            <div className={controlClasses('street')}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p> Please enter a valid street</p>}
            </div>
            <div className={controlClasses('postal')}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputsValidity.postal && <p> Please enter a valid postal code (5 digits)</p>}
            </div>
            <div className={controlClasses('city')}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p> Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;