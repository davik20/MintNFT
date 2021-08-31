pragma solidity ^0.8.0;




interface INFT{


    struct TokenDetail {
        uint tokenId;
        string tokenURI;
    }

   function addCollectible(string memory tokenURI_, address owner_) external returns(uint);


   function getCollectible(uint tokenId_) external view returns  (string memory);


  function  getAllUserCollectibles(address owner_) external view returns(TokenDetail[] memory);


}