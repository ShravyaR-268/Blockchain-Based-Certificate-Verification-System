// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721, Ownable {
    uint256 public nextTokenId; // To track the next token ID

    constructor() ERC721("CertificateNFT", "CNFT") Ownable(msg.sender) {
        // "CertificateNFT" is the token name, "CNFT" is the symbol
    }

    // Example function to mint a new certificate NFT
    function mintCertificate(address to) external onlyOwner {
        uint256 tokenId = nextTokenId;
        nextTokenId++;
        _safeMint(to, tokenId);
    }
}
