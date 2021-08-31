import IPFS from "ipfs-mini";

const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const data = `${process.env.PUBLIC_URL}/logo192.png`;
let imgLink;

const addImage = () => {
  let img;
};

const addStuff = () =>
  new Promise((resolve, reject) => {
    ipfs.add(data, (err, hash) => {
      if (!err) {
        const img = `https://ifps.infura.io/ipfs/${hash}`;
        resolve(img);
      } else {
        console.log(err);
        reject(err);
      }
    });
  });

export default addStuff;
