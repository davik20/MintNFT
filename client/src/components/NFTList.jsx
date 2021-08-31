import React, { useContext } from "react";
import styled from "styled-components";
import getLogo from "../functions/getLogo";
import AddIcon from "@material-ui/icons/Add";
import device from "../styles/responsive";
import { AppContext, AppContextUpdate } from "../context/AppProvider";

function NFTList() {
  const { NFTs, chainError, account } = useContext(AppContext);
  const { handleShowCreateModal } = useContext(AppContextUpdate);
  return (
    <>
      {NFTs.length === 0 && (
        <div>
          <p style={{ textAlign: "center", marginBottom: "2rem" }}>
            {" "}
            You have no NFTs, You should Mint one yeah? 😌
          </p>
          <List>
            <NFT
              onClick={() => {
                handleShowCreateModal();
              }}
            >
              <div
                style={{
                  height: "70%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <AddIcon style={{ fontSize: "10rem" }} color={"red"} />
              </div>
              <div className="details">
                <ContractName>NFTMint</ContractName>
                <NFTName>Create NFT</NFTName>
              </div>
            </NFT>
          </List>
        </div>
      )}
      {NFTs.length > 0 && (
        <List>
          <NFT onClick={() => handleShowCreateModal()}>
            <div
              style={{
                height: "70%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <AddIcon style={{ fontSize: "10rem" }} color={"red"} />
            </div>
            <div className="details">
              <ContractName>NFTMint</ContractName>
              <NFTName>Create NFT</NFTName>
            </div>
          </NFT>

          {NFTs.map(({ name, imgLink, features }) => (
            <NFT>
              <Logo>
                <img src={getLogo()} />
              </Logo>
              <img src={imgLink} />
              <div className="details">
                <ContractName>NFTMint</ContractName>
                <NFTName>{name}</NFTName>
              </div>
            </NFT>
          ))}

          {/* <NFT>
            <Logo>
              <img src={getLogo()} />
            </Logo>
            <img src={`${process.env.PUBLIC_URL}/img/profile.png`} />
            <div className="details">
              <ContractName>NFTMint</ContractName>
              <NFTName>NFT Name</NFTName>
            </div>
          </NFT> */}
        </List>
      )}
    </>
  );
}

export default NFTList;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const NFT = styled.div`
  position: relative;
  font-size: 1.2rem;
  height: 23rem;
  width: 17rem;
  background-color: #deeaee;
  transition: 0.2s all;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.1);
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
  }
  &:not(:last-child) {
    margin-right: 2rem;
    margin-bottom: 2rem;
  }

  > img {
    width: 90%;
    height: 70%;
    object-fit: fill;
  }
  > .details {
    padding: 1rem;
    background-color: white;
    width: 100%;
    height: 30%;
  }

  @media only screen and ${device.sm} {
    height: 25rem;
    width: 23rem;
  }
  @media only screen and ${device.smFinal} {
    height: 25rem;
    width: 16rem;
  }
  @media only screen and ${device.xs} {
    height: 25rem;
    width: 27rem;
  }
`;

const Logo = styled.div`
  position: absolute;

  top: 2px;
  right: 7px;
  width: 30px;
  height: 30px;

  > img {
    width: 30px;
    background-color: transparent;
    border-radius: 50%;
    height: 30px;
  }
`;
export const ContractName = styled.div`
  color: var(--color-light-brown);
  font-weight: bold;
`;
export const NFTName = styled.div`
  color: var(--color-light-brown);
  margin-top: 0.3rem;
`;
