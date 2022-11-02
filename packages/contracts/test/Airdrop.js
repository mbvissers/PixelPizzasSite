const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

describe("Airdrop #1 contract", function () {
    async function deployTokenFixture () {
        const [owner, alice, bob] = await ethers.getSigners();

        const PixelPizzas = await ethers.getContractFactory("PixelPizzaToken");
        const Airdrop = await ethers.getContractFactory("PixelPizzaAirdrop");
    
        const pixelPizzas = await PixelPizzas.deploy([await owner.getAddress()], [100]);
        const airdrop = await Airdrop.deploy(pixelPizzas.address);

        return {owner, alice, bob, pixelPizzas, airdrop}
    }

    it("Deployment should succeed", async function () {
        const fixture = await loadFixture(deployTokenFixture);

        expect(await fixture.airdrop.pixelPizzasContract()).to.equal(await fixture.pixelPizzas.address);
    }); 

    it("Airdropping should work", async function () {
        const fixture = await loadFixture(deployTokenFixture);
        const aliceAddress = await fixture.alice.getAddress()
        
        await fixture.pixelPizzas.connect(fixture.alice).safeMint(1, {value: ethers.utils.parseEther("2")})
        await fixture.airdrop.airdrop(0, aliceAddress)
        
        expect(await fixture.airdrop.balanceOf(aliceAddress)).to.equal(1)
    });

    it("Claiming should work", async function () {
        const fixture = await loadFixture(deployTokenFixture);
        const aliceAddress = await fixture.alice.getAddress()
        
        await fixture.pixelPizzas.connect(fixture.alice).safeMint(1, {value: ethers.utils.parseEther("2")})
        await fixture.airdrop.connect(fixture.alice).claim(0)
        
        expect(await fixture.airdrop.balanceOf(aliceAddress)).to.equal(1)
    });
});