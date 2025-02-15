// ipfsUpload.js
const { create } = require("ipfs-http-client");

// Initialize IPFS client
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

async function uploadToIPFS(fileBuffer) {
  const added = await ipfs.add(fileBuffer);
  return `https://ipfs.infura.io/ipfs/${added.path}`;
}

module.exports = { uploadToIPFS };
