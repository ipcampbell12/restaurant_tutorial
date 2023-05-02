import React from 'react';
import classes from './Checkout.module.css'

function Checkout(props) {
    return (
        <form>

            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" />
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" />
            </div>
            <div className={classes.control}>
                <label htmlFor="zipcode">Zip code</label>
                <input type="text" id="zipcode" />
            </div>
            <div className={classes.control}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" />
            </div>
            <button>Confirm</button>
        </form>
    );
}

export default Checkout;