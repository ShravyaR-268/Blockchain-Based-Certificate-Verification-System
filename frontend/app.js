const { uploadToIPFS } = require("../backend/ipfsUpload.js");
const { mintNFT } = require("../backend/nftMint.js");

async function uploadCertificate() {
  const file = document.getElementById("certificateFile").files[0];
  const studentAddress = document.getElementById("studentAddress").value;

  if (!file || !studentAddress) {
    alert("Please upload a certificate and enter a wallet address.");
    return;
  }

  // Upload to IPFS
  const fileBuffer = await file.arrayBuffer();
  const ipfsUrl = await uploadToIPFS(fileBuffer);

  // Get the certificate hash
  const certificateHash = web3.utils.sha3(fileBuffer);

  // Mint the NFT
  await mintNFT(studentAddress, ipfsUrl, certificateHash);

  document.getElementById("status").innerText = "NFT Minted Successfully!";
}
