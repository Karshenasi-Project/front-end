import {React, useState} from 'react'
import styles from './Wallet.module.css';
import axios from 'axios';
var bigInt = require("big-integer");

const NumberToPublicKey = (props) => {

	const [transferHash, setTransferHash] = useState();


	const getPublicKeyHandler = async (e) => {
		e.preventDefault();
		let phone_number = e.target.phone_number.value;

		axios.get('http://localhost:4000/api/get_pub_key/'+phone_number)
		.then(function (response) {
			setTransferHash("PublicKey: " + response.data.data.pub_key);
		}).catch(function (error) {
			setTransferHash("PublicKey: " + error.response.data.errors.detail);
		});

	}

	return (
			<div className={styles.interactionsCard}>
				<form onSubmit={getPublicKeyHandler}>
					<h3> Get Public Key </h3>
						<p> Phone Number </p>
						<input type='text' id='phone_number' className={styles.addressInput}/>
						<button type='submit' className={styles.button6}>Send</button>
						<div>
							{transferHash}
						</div>
				</form>
			</div>
		)
	
}

export default NumberToPublicKey;