import {React, useState} from 'react'
import styles from './Wallet.module.css';
import axios from 'axios';
var bigInt = require("big-integer");

const AddToBalance = (props) => {

	const [transferHash, setTransferHash] = useState();


	const addToBalance = async (e) => {
		e.preventDefault();
		let phone_number = e.target.phone_number.value;
		let amount = e.target.mintAmount.value;
		
		let data = {
			user:{
				phone_number: phone_number,
				balance: amount
			}
		};
		
		let decimals = await props.contract.decimals();
		console.log(decimals);
		
		let target = amount;

		axios.post('http://localhost:4000/api/sign_up/', data)
		.then(response => {
			
			if (response.status == 200 && response.data.data.pub_key != "") {
				let transferAmount = bigInt(target).add(response.data.data.balance).multiply(bigInt(10).pow(decimals));
				let recieverAddress = response.data.data.pub_key;
				
				let txt2 = props.contract.mint(recieverAddress, transferAmount.toString())
				.then(function(txt) {
					setTransferHash("Transfer confirmation hash: " + txt.hash);
				}, function(error) {
					setTransferHash(error.data.message);
				});
			
			}else if(response.status == 200){
				setTransferHash('add to balance success!');
			}else{
				setTransferHash('There was an error!');
			}

		})
		.catch(error => {
			setTransferHash('There was an error!');
		});

	}

	return (
			<div className={styles.interactionsCard}>
				<form onSubmit={addToBalance}>
					<h3> Add token to balance </h3>
						<p> Phone Number </p>
						<input type='text' id='phone_number' className={styles.addressInput}/>
						<p> Send Amount </p>
						<input type='number' id='mintAmount' min='0' step='1'/>
						<button type='submit' className={styles.button6}>Send</button>
						<div>
							{transferHash}
						</div>
				</form>
			</div>
		)
	
}

export default AddToBalance;