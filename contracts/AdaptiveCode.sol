// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AdaptiveCode is ERC20 {

     constructor() ERC20("AdaptiveCode", "ADC"){
        _mint(msg.sender, 10000);
     }
  

    function mintToken(uint _value) public returns (bool) {
        _mint(msg.sender, _value);
        return true;
    }

    function burnToken(uint _value) public returns (bool) {
        _burn(msg.sender, _value);
        return true;
    }

    function balance() public view returns (uint) {
       return balanceOf(msg.sender);
    }
    

  
}

