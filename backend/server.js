// server.js
const express = require("express");
const { uploadToIPFS } = require("./ipfsUpload");
const { mintNFT } = require("./nftMint");
const app = express();

app.use(express.json());

app.post("/mint", async (req, res) => {
  const { studentAddress, certificateFile } = req.body;

  // Upload certificate to IPFS
  const ipfsUrl = await uploadToIPFS(certificateFile);

  // Get certificate hash
  const certificateHash = web3.utils.sha3(certificateFile);

  // Mint NFT
  await mintNFT(studentAddress, ipfsUrl, certificateHash);

  res.send({ message: "NFT Minted Successfully!" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
