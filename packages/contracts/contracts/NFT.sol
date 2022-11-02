// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract PixelPizzaToken is ERC721, ERC721Enumerable, Ownable, PaymentSplitter {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public constant MAX_TOKENS = 294;
    uint256 public constant MAX_TOKENS_PER_SALE = 5;
    string private baseURI;
    bool public isSaleActive = true;
    uint256 private price = 2 ether; // 2 MATIC

    constructor(address[] memory _payees, uint256[] memory _shares) ERC721("Pixel Pizza", "PP") PaymentSplitter(_payees, _shares) payable {}

    function flipSaleStatus() public onlyOwner() {
        isSaleActive = !isSaleActive;
    }

    function setPrice(uint256 _price) public onlyOwner() {
        price = _price;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner() {
        baseURI = _newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function safeMint(uint256 _amount) public payable {
        require(isSaleActive, "Sale is currently not active");
        require(MAX_TOKENS >= _amount + _tokenIdCounter.current(), "Not enough tokens left to buy.");
        require(_amount > 0 && _amount < MAX_TOKENS_PER_SALE + 1, "Amount of tokens exceeds amount of tokens you can purchase in a single purchase.");
        require(msg.value >= price * _amount, "Amount of ether sent not correct.");

        for(uint256 i = 0; i < _amount; i++){
            _safeMint(msg.sender, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }
    }

    function reserveTokens(uint256 _amount) public onlyOwner() {
        require(MAX_TOKENS >= _amount + _tokenIdCounter.current(), "Not enough tokens left to buy.");

        for (uint i = 0; i < _amount; i++) {
            _safeMint(msg.sender, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }
    }

    // The following functions are overrides required by Solidity for ERC721Enumerable.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}