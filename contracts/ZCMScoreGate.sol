// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ZCMScoreGate is ReentrancyGuard {
    event Minted(address indexed user, uint256 tokenId);

    uint256 public totalMinted;

    function mint() external nonReentrant {
        // Basic example placeholder
        totalMinted += 1;
        emit Minted(msg.sender, totalMinted);
    }
}
