import {React, useState} from 'react'
import styles from './Wallet.module.css';
var bigInt = require("big-integer");

const Burn = (props) => {

	const [transferHash, setTransferHash] = useState();


	const burnHandler = async (e) => {
		e.preventDefault();
		let decimals = await props.contract.decimals();
		let target = e.target.burnAmount.value;
		if(isNaN(target) == false){
			let transferAmount = bigInt(e.target.burnAmount.value).multiply(bigInt(10).pow(decimals));
			// let transferAmount = target;
			let recieverAddress = e.target.recieverAddress.value;
			
			let txt2 = props.contract.burnFrom(recieverAddress, transferAmount.toString())
			.then(function(txt) {
				setTransferHash("Transfer confirmation hash: " + txt.hash);
			}, function(error) {
				setTransferHash(error.data.message);
			});
			
		}else{
			setTransferHash("value is not valid");
		}
	}

	return (
			<div className={styles.interactionsCard}>
				<form onSubmit={burnHandler}>
					<h3> Burn Coins </h3>
						<p> Burn From Address </p>
						<input type='text' id='recieverAddress' className={styles.addressInput}/>

						<p> Burn Amount </p>
						<input type='number' id='burnAmount' min='0' step='1'/>

						<button type='submit' className={styles.button6}>Send</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default Burn;