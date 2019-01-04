import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
global.Buffer = require('buffer').Buffer;

import TouchID from 'react-native-touch-id';
// import keccak from 'keccak';
// import secp256k1 from 'secp256k1';

var SHA256 = require("crypto-js/sha256");
// var ethUtils = require('ethereumjs-util');

const elliptic = require('elliptic');
const secp256k1 = new (elliptic.ec)('secp256k1');
const keccak256 = require('js-sha3').keccak256;

import Web3 from '../../services/web3/web3';

// hacky FIX ASAP
let currHash = null;
let currBalance = null;

/**
  * Sign Up
  */
export function signUp(formData) {
  const {
    password,
    password2,
    userName,
  } = formData;
  currHash = null;

  if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
  currHash = hashStepOne(password, userName);


  return dispatch => new Promise(async (resolve, reject) => {
    resolve();
    // Validation checks
    // if (!password) return reject({ message: ErrorMessages.missingPassword });
    // if (!password2) return reject({ message: ErrorMessages.missingPassword });
    // if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
  });
}

function hashStepOne(password, userName) {
  currHash = null;
  const hashedPassword = SHA256(password);
  const hashedUserName = SHA256(userName);
  return SHA256(hashedPassword + hashedUserName);
}

export function signUpAdditional(formData) {
  let balance = null;
  const {
    color,
    passcode,
    word,
  } = formData;
  const hashedColor = SHA256(color);
  const hashedPasscode = SHA256(passcode);
  const hashedWord = SHA256(word);
  const hashedMaster = SHA256(hashedColor + hashedPasscode + hashedWord);
  currHash = SHA256(currHash + hashedMaster);
  const address = createEverything(currHash.toString());
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/3c211cd0c1f940df8bc4c61155232b94')
  );
  const currentAccount = web3.eth.accounts.privateKeyToAccount(
    '0x' + currHash.toString()
  );

  web3.eth.getBalance(address, function (error, result) {
    if (!error) {
      balance = web3.utils.fromWei(result, 'ether');
      currBalance = balance;
    }
    else {
      console.log('We have a problem: ', error);
    }
  });

  return dispatch => new Promise(async (resolve, reject) => {
    // Send Login data to Redux
    const userData = {
      address: address,
      currentBalance: balance ? balance : 0,
      currentAccount: currentAccount,
      web3: null,
    };
    return resolve(dispatch({
      type: 'USER_DETAILS_UPDATE',
      data: userData,
    }));
  });

}

/**
  * Get this User's Details
  */
function getUserData(dispatch) {
  console.log('get user data');
  // const userData = {firstName: 'fra', uid:0, email: 'fra@fra.com', emailVerified:true, lastName: 'fra', role: '', signedUp: true};
  const userData = {};
  return dispatch({
    type: 'USER_DETAILS_UPDATE',
    data: userData,
  });

}

export function refreshBalance() {
  return dispatch => new Promise(async (resolve, reject) => {
    const userData = {
      currentBalance: currBalance ? currBalance : 0,
    };
    return resolve(dispatch({
      type: 'USER_DETAILS_UPDATE',
      data: userData,
    }));
  });
}

/**
  * Create new wallet for user
  */
function createEverything(hash) {
  // TODO: break this up into seperate functions
  const privKey = new Buffer(hash, 'hex');
  const pubKey = (new Buffer(secp256k1.keyFromPrivate(privKey).getPublic(false, 'hex'), 'hex')).slice(1);
  return '0x' + keccak256.update(pubKey).toString().slice(24);
}

export function sendMoney(formData, props) {
  const {
    amount,
    currency,
    gas,
    toAddress
  } = formData;
  if (currency === 'ETH') {
    sendEth(amount, gas, toAddress, props.member.currentAccount);
  } else {
    // no other currencies supported ATM
    return;
  }
  return dispatch => new Promise(async (resolve, reject) => {
    resolve();
    // Validation checks
  });

}

function sendEth(etherAmt, gas, to, fromAccount) {
  // TODO: only supports 1 address ATM
  const ether = 'ether';
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/3c211cd0c1f940df8bc4c61155232b94')
  );
  const wei = web3.utils.toWei(gas, 'gwei');
  const currentAccount = web3.eth.accounts.privateKeyToAccount(fromAccount.privateKey);
  currentAccount.signTransaction({
    to,
    value: web3.utils.toWei(etherAmt, ether),
    gas: wei
  }).then(signed => {
      const currentTransaction = web3.eth.sendSignedTransaction(
        signed.rawTransaction
      );
      currentTransaction.on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation: ' + confirmationNumber);
      });
      currentTransaction.on('transactionHash', hash => {
        console.log('hash');
        console.log(hash);
      });
      currentTransaction.on('receipt', receipt => {
        console.log('reciept');
        console.log(receipt);
      });
      currentTransaction.on('error', error => {
          console.log(error.toString());
      });

    });
}

// function touchAndFaceIdAuthentication() {
//   // TODO: break this up into seperate functions
//   TouchID.authenticate('to demo this rn component')
//   .then(success => {
//     console.log('Authenticated Successfully');
//   })
//   .catch(error => {
//     console.error('Authentication Failed');
//   });
// }

export function getMemberData() {
  return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    return resolve(getUserData(dispatch));
  });
}

/**
  * Login
  */
export function login(formData) {
  const {
    userName,
    password,
  } = formData;
  currHash = null;
  currHash = hashStepOne(password, userName);
  return dispatch => new Promise(async (resolve, reject) => {
    resolve();
    // Validation checks
  });
}

export function loginAdditional(formData) {
  const {
    color,
    passcode,
    word,
  } = formData;
  const hashedColor = SHA256(color);
  const hashedPasscode = SHA256(passcode);
  const hashedWord = SHA256(word);
  const hashedMaster = SHA256(hashedColor + hashedPasscode + hashedWord);
  currHash = SHA256(currHash + hashedMaster);
  const address = createEverything(currHash.toString());
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/3c211cd0c1f940df8bc4c61155232b94')
  );
  const currentAccount = web3.eth.accounts.privateKeyToAccount(
    '0x' + currHash.toString()
  );

  return dispatch => new Promise(async (resolve, reject) => {
    // Send Login data to Redux
    const userData = {
      address: address,
      currentBalance: currBalance ? currBalance : 0,
      currentAccount: currentAccount,
      web3: null,
    };
    return resolve(dispatch({
      type: 'USER_DETAILS_UPDATE',
      data: userData,
    }));
  });

}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    resolve();
    // Validation checks
  });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    resolve();
    // Validation checks
  });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise(async (resolve, reject) => {
    return resolve(dispatch({
      type: 'USER_RESET',
    }));
  });
}
