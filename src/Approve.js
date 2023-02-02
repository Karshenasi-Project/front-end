import {React, useState} from 'react'
import styles from './Wallet.module.css';
var bigInt = require("big-integer");

const Approve = (props) => {

	const [transferHash, setTransferHash] = useState();


	const approveHandler = async (e) => {
		e.preventDefault();
		let decimals = await props.contract.decimals();
		console.log(decimals);

		let target = e.target.mintAmount.value;
		if(isNaN(target) == false){
			let transferAmount = bigInt(target).multiply(bigInt(10).pow(decimals));
			// let transferAmount = target;
			let recieverAddress = e.target.recieverAddress.value;
			
			let txt2 = props.contract.approve(recieverAddress, transferAmount.toString())
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
				<form onSubmit={approveHandler}>
					<h3> Approve Coins </h3>
						<p> Approve Address </p>
						<input type='text' id='recieverAddress' className={styles.addressInput}/>

						<p> Approve Amount </p>
						<input type='number' id='mintAmount' min='0' step='1'/>

						<button type='submit' className={styles.button6}>Send</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default Approve;