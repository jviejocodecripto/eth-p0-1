// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Contador {
    uint256 public contador;

    event Received(address, uint);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    constructor() {
        contador = 100;
    }

    function inc() payable public {
        contador = contador + 1;
    }

    function dec() public payable {
        contador = contador - 1;
    }

    function getContador() public view returns (uint256 retorno) {
        retorno = contador;
    }
}
