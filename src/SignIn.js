import {React, useState} from 'react'
import styles from './Wallet.module.css';
import axios from 'axios';
var bigInt = require("big-integer");

const SignIn = (props) => {

	const [transferHash, setTransferHash] = useState();


	const addWalletAddress = async (e) => {
		e.preventDefault();
		let phone_number = e.target.phone_number.value;
		let wallet_address = props.account;
		let code = e.target.code.value;

		// console.log(phone_number,wallet_address,code);
		// axios.get('http://localhost:4000/api/send_sms/'+phone_number)
		// .then(function (response) {
		// 	setTransferHash("SMS has been sent!");
		// }).catch(function (error) {
		// 	setTransferHash("Error!");s
		// });

		let data = {
			user:{
				phone_number: phone_number,
				pub_key: wallet_address,
				code: code
			}
		};

		axios.post('http://localhost:4000/api/sign_in/', data)
		.then(response => {
			setTransferHash('your wallet has beer registered successfully.  ' + 'wallet address: ' + wallet_address);

		})
		.catch(error => {
			console.log(error);
			setTransferHash('There was an error!' + 'your code is not correct');
		});

	}

	return (
			<div className={styles.interactionsCard}>
				<form onSubmit={addWalletAddress}>
					<h3> Add your Wallet Address </h3>
						<p> Phone Number </p>
						<input type='text' id='phone_number' className={styles.addressInput}/>
						<p> Code </p>
						<input type='text' id='code' className={styles.addressInput}/>
						<br></br>
						<button type='submit' className={styles.button6}>Send</button>
						<div>
							{transferHash}
						</div>
				</form>
			</div>
		)
	
}

export default SignIn;