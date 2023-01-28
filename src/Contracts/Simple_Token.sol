// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts@4.8.1/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@4.8.1/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC20/extensions/draft-ERC20Permit.sol";

/// @custom:security-contact samirghasemi@outlook.com
contract Ofogh is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor() ERC20("Ofogh", "OKG") ERC20Permit("Ofogh") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
