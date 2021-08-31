
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./interfaces/INFT.sol";
import "./NFT.sol";

contract Minter {

        event NFTCreated (
            string name,
            string tokenURI,
            address contractAddress
        );
     
         
      function mintNFT(string memory name_,string memory symbol_, string memory tokenURI_) public  returns(address) {
           // mints a new nft contract
           INFT nft = new NFT(name_, symbol_);
           address nftAddress = address(nft);

            // adds a collectible to the newly minted nft  contract
           _addCollectibleToMintedNFT(tokenURI_, nftAddress, msg.sender);
         
           emit NFTCreated(name_ , tokenURI_, nftAddress);
      }


      function addCollectibleToMintedNFT(string memory tokenURI_, address  nftAddress_) public {
            
            _addCollectibleToMintedNFT(tokenURI_, nftAddress_, msg.sender);
      }


      function getCollectible(uint tokenId_, address nftAddress_) public view returns(string memory){

            INFT nft  = INFT(nftAddress_);
           string memory tokenURI =  nft.getCollectible(tokenId_);
           return tokenURI;
      }


      function _addCollectibleToMintedNFT(string memory tokenURI_, address  nftAddress_, address owner_) private {
             // initializes the contact instance
             INFT nft  = INFT(nftAddress_);
             // adds the collectible
              nft.addCollectible(tokenURI_, owner_);

            
           

      }



}