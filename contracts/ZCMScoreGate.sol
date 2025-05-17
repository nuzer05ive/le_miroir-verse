// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ZCMScoreGate is ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 8888;
    uint256 public totalMinted;
    mapping(address => bool) public hasMinted;

    event Mint(address indexed to, uint256 tokenId);

    function mint(uint256 zcmScore) external nonReentrant {
        require(zcmScore >= 15, "ZCM: score too low");
        require(totalMinted < MAX_SUPPLY, "ZCM: sold out");
        require(!hasMinted[msg.sender], "ZCM: already minted");
        totalMinted++;
        hasMinted[msg.sender] = true;
        emit Mint(msg.sender, totalMinted);
        // TODO: mint NFT logic (ERC721/1155)
    }
}