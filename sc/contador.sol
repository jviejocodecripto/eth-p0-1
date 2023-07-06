// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.4.22 <0.9.0;

contract Contador {
    uint256 public contador;

    constructor() {
        contador = 100;
    }

    function inc() public  {
        contador = contador + 1;
    }

    function dec() public  {
        contador = contador - 1;
    }

}
