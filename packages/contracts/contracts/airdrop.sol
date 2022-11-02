// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface PixelPizzas is IERC721, IERC721Enumerable {}

contract PixelPizzaAirdrop is ERC721, Ownable {
    mapping(uint256 => bool) public hasClaimed;
    PixelPizzas public pixelPizzasContract;
    string private baseURI;
    
    constructor(address _contract) ERC721("PixelPizza - Airdrop #1", "PPHB") {
        pixelPizzasContract = PixelPizzas(_contract);
    }

    function claim(uint256 _tokenId) public {
        require(hasClaimed[_tokenId] == false, "This token has already claimed a token.");
        _safeMint(msg.sender, _tokenId);
    }

    function airdrop(uint256 _tokenId, address _to) public onlyOwner {
        require(pixelPizzasContract.ownerOf(_tokenId) == _to, "User doesn't own this token");
        require(hasClaimed[_tokenId] == false, "This token has already received a token.");
        _safeMint(_to, _tokenId);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner() {
        baseURI = _newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}