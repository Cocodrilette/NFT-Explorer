// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./ERC721.sol";

contract MyNFT is ERC721 {
    uint256 private _tokenId;

    mapping(uint256 => string) private _tokenUriById;

    constructor() ERC721("My NFT", "My NFT") {}

    function safeMint(address to, string memory _tokenUri) public {
        uint256 id = _tokenId++;

        _safeMint(to, id);
        _tokenUriById[id] = _tokenUri;
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        return _tokenUriById[id];
    }
}
