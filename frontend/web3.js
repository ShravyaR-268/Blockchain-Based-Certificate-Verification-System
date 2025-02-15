const Web3 = require("web3");
const contractABI = require("./CertificateNFTABI.json"); // ABI from Truffle
const contractAddress = "your address"; // Deployed contract address

// Initialize Web3 provider (MetaMask)
const web3 = new Web3(window.ethereum);

// Request access to MetaMask
await window.ethereum.enable();

// Create contract instance
const certificateNFT = new web3.eth.Contract(contractABI, contractAddress);

// Handle Upload Certificate Button
document
  .getElementById("uploadCertificateButton")
  .addEventListener("click", async () => {
    const certificateFile = document.getElementById("certificateFile").files[0];
    const walletAddress = document.getElementById("walletAddress").value;

    if (!certificateFile || !walletAddress) {
      alert("Please choose a certificate file and enter a wallet address.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const certificateData = reader.result;
      const certificateHash = web3.utils.sha3(certificateData); // Hash the certificate

      // Call the smart contract function to upload certificate and mint NFT
      const accounts = await web3.eth.getAccounts();

      try {
        await certificateNFT.methods
          .mintCertificate(walletAddress, certificateHash)
          .send({ from: accounts[0] });
        alert("Certificate uploaded and NFT minted!");
      } catch (error) {
        console.error("Error uploading certificate:", error);
        alert("Error uploading certificate.");
      }
    };

    reader.readAsArrayBuffer(certificateFile);
  });

// Handle Verify Hash Button
document
  .getElementById("verifyHashButton")
  .addEventListener("click", async () => {
    const enteredHash = document
      .getElementById("certificateHashToVerify")
      .value.trim();

    if (!enteredHash) {
      alert("Please enter a certificate hash to verify.");
      return;
    }

    try {
      // Call the smart contract method to verify the hash
      const verified = await certificateNFT.methods
        .verifyCertificate(enteredHash)
        .call();

      if (verified) {
        alert("Certificate hash verified successfully!");
      } else {
        alert("Certificate hash verification failed.");
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      alert("Error verifying certificate.");
    }
  });
// web.js

// Add event listener to connect button
document.getElementById("connectButton").addEventListener("click", async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);

    try {
      // Request access to MetaMask
      await window.ethereum.enable();
      console.log("MetaMask connected");

      // Now you can interact with the contract
      // For example: call smart contract functions here
    } catch (error) {
      alert("User denied MetaMask access.");
      console.error("Error enabling MetaMask:", error);
    }
  } else {
    alert("MetaMask is not installed.");
  }
});
