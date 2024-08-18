// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TestToken.sol";

contract Reward {
    TestToken private token;
    address[] public winners;
    mapping(address => bool) private hasWon;

    constructor(address tokenAddress) {
        token = TestToken(tokenAddress);
    }

    function rewardUsers(address[] memory users, uint256 amount) public {
        for (uint256 i = 0; i < users.length; i++) {
            token.mint(users[i], amount);
            addWinner(users[i]);
        }
    }

    function addWinner(address user) internal {
        if (!hasWon[user]) {
            winners.push(user);
            hasWon[user] = true;
        }
    }

    function getWinners() public view returns (address[] memory) {
        return winners;
    }
}
