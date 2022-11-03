const { expect } = require("chai");
const { loadFixture } = require("ethereum-waffle");

describe("PixelPizzas contract", function () {
  async function deployTokenFixture() {
    const [owner, alice, bob] = await ethers.getSigners();

    const PixelPizzas = await ethers.getContractFactory("PixelPizzaToken");

    const pixelPizzas = await PixelPizzas.deploy(
      [await owner.getAddress()],
      [100]
    );

    return { owner, alice, bob, pixelPizzas };
  }

  it("Deployment should succeed", async function () {
    const fixture = await loadFixture(deployTokenFixture);

    expect(await fixture.pixelPizzas.totalSupply()).to.equal(0);
  });

  it("Minting a single token should work if price is set to 0", async function () {
    const fixture = await loadFixture(deployTokenFixture);

    await fixture.pixelPizzas
      .connect(fixture.alice)
      .safeMint(1, { value: ethers.utils.parseEther("2") });

    expect(
      await fixture.pixelPizzas.balanceOf(fixture.alice.getAddress())
    ).to.equal(1);
  });

  it("Minting multiple tokens should work if price is set to 0", async function () {
    const fixture = await loadFixture(deployTokenFixture);

    await fixture.pixelPizzas
      .connect(fixture.bob)
      .safeMint(5, { value: ethers.utils.parseEther("10") });

    expect(
      await fixture.pixelPizzas.balanceOf(fixture.bob.getAddress())
    ).to.equal(5);
  });
});
