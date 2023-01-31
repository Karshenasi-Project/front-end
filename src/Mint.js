import {React, useState} from 'react'
import styles from './Wallet.module.css';
var bigInt = require("big-integer");

const Mint = (props) => {

	const [transferHash, setTransferHash] = useState();


	const mintHandler = async (e) => {
		e.preventDefault();
		let decimals = await props.contract.decimals();
		let target = e.target.mintAmount.value;
		if(isNaN(target) == false){
			// let transferAmount = bigInt(e.target.sendAmount.value).multiply(bigInt(10).pow(decimals));
			let transferAmount = target;
			let recieverAddress = e.target.recieverAddress.value;
			
			let txt2 = props.contract.mint(recieverAddress, transferAmount.toString())
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
				<form onSubmit={mintHandler}>
					<h3> Mint Coins </h3>
						<p> Reciever Address </p>
						<input type='text' id='recieverAddress' className={styles.addressInput}/>

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

export default Mint;