// nftMint.js
const Web3 = require("web3");
const contractABI = require("./CertificateNFTABI.json"); // ABI file from Truffle deployment
const contractAddress = ""; // Deployed contract address

const web3 = new Web3("https://rinkeby.infura.io/v3/your id");
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function mintNFT(studentAddress, ipfsUrl, certificateHash) {
  const metadata = JSON.stringify({ ipfsUrl, certificateHash });
  const accounts = await web3.eth.getAccounts();
  await contract.methods
    .mint(studentAddress, metadata)
    .send({ from: accounts[0] });
}

module.exports = { mintNFT };
