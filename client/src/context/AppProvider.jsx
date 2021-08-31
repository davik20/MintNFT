import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import NFMintAbi from "../contracts/NFMint.json";
import config from "../config";

export const AppContext = createContext();

export const AppContextUpdate = createContext();

function AppProvider({ children }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [chainError, setChainError] = useState(false);
  const [account, setAccount] = useState("");
  const [NFMintContract, setNFMintContract] = useState(null);

  const [NFTs, setNFTs] = useState([
    {
      name: "Cool NFT",
      imgLink: `${process.env.PUBLIC_URL}/img/profile.png`,
      features: {
        height: "4meters",
        color: "red",
        rare: "true",
      },
    },
    {
      name: "Cool Punk",
      imgLink: `${process.env.PUBLIC_URL}/img/nftmintlogo.jpeg`,
      features: {
        height: "7 meters",
        color: "green",
        rare: "false",
      },
    },
  ]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId) => {
        if (config.mode === "production") {
          if (chainId == 4) {
            console.log("davik");
            setChainError(false);
          } else {
            setChainError(true);
            console.log("davik al");
          }
        }
      });
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (NFMintContract && account) {
      NFMintContract.methods
        .getAllUserCollectibles(account)
        .call()
        .then((result) => {
          console.log(result);
        });
    }
  }, [NFMintContract]);

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleShowCreateModal = () => {
    console.log("davik");
    console.log("victor");
    if (!account) {
      alert("You are not connected, please connect");
      return;
    }
    if (chainError) {
      alert("Please Select the rinkeby chain");
      return;
    }
    setShowCreateModal(true);
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setWeb3(web3);
        setAccount(accounts[0]);

        const id = await web3.eth.net.getId();

        if (config.mode === "development") {
          const id = await web3.eth.net.getId();
          //   console.log(NFMintAbi.);
          console.log(id);

          const contract = new web3.eth.Contract(
            NFMintAbi.abi,
            "0xE2aEe0BC83Ee1e1978136C9eD6993D351897954d"
          );

          setNFMintContract(contract);
        }

        if (config.mode === "production") {
          if (id != 4) {
            setChainError(true);
          } else {
            setChainError(false);
          }
        }
      }
      if (!window.ethereum) {
        const walletConnectProvider = await new WalletConnectProvider({
          infuraId: "3ee5b26be9d9451b96c018232c629555",
        });
        await walletConnectProvider.enable();
        const web3 = new Web3(walletConnectProvider);

        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setWeb3(web3);
        setAccount(accounts[0]);
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        NFTs: NFTs,
        showCreateModal,
        web3,
        chainError,
        account,
        NFMintContract,
      }}
    >
      <AppContextUpdate.Provider
        value={{
          handleCloseCreateModal,
          handleShowCreateModal,
          connectWallet,
          NFMintContract,
        }}
      >
        {children}
      </AppContextUpdate.Provider>
    </AppContext.Provider>
  );
}

export default AppProvider;
