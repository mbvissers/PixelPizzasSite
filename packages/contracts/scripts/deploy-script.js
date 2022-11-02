const hre = require("hardhat");

async function main() {
    const NFT = await hre.ethers.getContractFactory("PixelPizzaToken");
    const nft = await NFT.deploy(["0xDCE99c8475Fd38a3b8646DC39d582c7c2dce2DCA", "0xb279eb50111dd34ee33106248c50c2fcd21284cd"], [50, 50]);
    await nft.deployed();
    console.log("NFT deployed to:", nft.address);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});

// npx hardhat run scripts/deploy-script.js --network matic_testnet

// testPizzaToken
// https://mumbai.polygonscan.com/address/0xf6e0cE73f9E58db5540114E3559169aFf83DEe40

// PixelPizzaToken
// https://polygonscan.com/address/0xfd825CF48B155908A497E59864F7CD2D705D4669