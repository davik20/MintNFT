pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./interfaces/INFT.sol";

contract NFT is ERC721URIStorage, INFT  {
     
    uint tokenCounter = 0;

  

     constructor(string memory name_, string memory symbol_ ) ERC721(name_, symbol_){

     }

    function addCollectible(string memory tokenURI_, address owner_) public override returns(uint){
            uint newTokenId = tokenCounter;
            _safeMint(owner_, newTokenId);
            _setTokenURI(newTokenId, tokenURI_);
            
            tokenCounter = tokenCounter+1;
            return (newTokenId);
             
    }

    function getCollectible(uint tokenId_) public view  override returns  (string memory){
       string memory URI =  tokenURI(tokenId_);
       return URI;
    }


    function getAllUserCollectibles(address owner_) public view override returns(TokenDetail[] memory){
        uint userBalance = balanceOf(owner_);
        TokenDetail[] memory AllUserCollectibles = new TokenDetail[](userBalance); 
         

         for(uint i; i< tokenCounter; i++){
            TokenDetail memory tokenDetail;
            if(ownerOf(i) == owner_){
                tokenDetail.tokenId = i;
                tokenDetail.tokenURI = tokenURI(i);

                AllUserCollectibles[i] = tokenDetail;

                
            }

         }

         return AllUserCollectibles;
    }

}

