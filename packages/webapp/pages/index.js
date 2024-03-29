import { useState, useEffect } from "react";
import Footer from "../components/footer";
import config from "../configuration";

let Web3 = require("web3");

export default function Index(props) {
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [balance, setBalance] = useState(0);
  const [notification, setNotification] = useState(null);

  const [URIField, setURIField] = useState("");
  const [priceField, setPriceField] = useState(0);

  let eventListenersSet = false;
  let price = "0"; // 2 MATIC on prod
  let free = true;

  // Function to quickly draw a crypto pizza in a canvas to negate antialiasing
  function canvasDraw(imgId, canvasId, size = 480) {
    let canvas = document.getElementById(canvasId),
      context = canvas.getContext("2d");

    let base_image = document.createElement("img");
    base_image.src = "images/" + imgId + ".png";
    base_image.onload = function () {
      context.drawImage(base_image, 0, 0, size, size);
    };
  }

  // Function to get current MetaMask account and setup web3
  function getAccount() {
    window.ethereum
      ? ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setAddress(accounts[0]);
            let w3 = new Web3(ethereum);
            setWeb3(w3);
            let c = new w3.eth.Contract(config.abi, config.contractAddress);
            setContract(c);
            let n = ethereum.chainId;
            setNetwork(n);
            let supply = 0;

            if (n === config.contractNetwork) {
              c.methods
                .totalSupply()
                .call()
                .then((_supply) => {
                  supply = _supply;
                  setTotalSupply(_supply);
                })
                .catch((err) => console.log(err));
              c.methods
                .balanceOf(accounts[0])
                .call()
                .then((_balance) => {
                  setBalance(_balance);
                  console.log(_balance);
                })
                .catch((err) => console.log(err));
            } else {
              console.log("You're on the wrong network");
            }

            if (!eventListenersSet) {
              ethereum.on("accountsChanged", function () {
                getAccount();
              });

              ethereum.on("chainChanged", function () {
                getAccount();
              });
              eventListenersSet = true;
            }
          })
          .catch((err) => console.log(err))
      : console.log("Please install MetaMask");
  }

  function fetchBalance() {
    contract.methods
      .balanceOf(address)
      .call()
      .then((_balance) => {
        setBalance(_balance);
        console.log(_balance);
      })
      .catch((err) => console.log(err));
  }

  function mint(_amount) {
    fetchBalance();
    let _price = web3.utils.toWei(price + "");
    let encoded = contract.methods.safeMint(_amount).encodeABI();

    let tx = {
      from: address,
      to: config.contractAddress,
      data: encoded,
      nonce: "0x00",
      value: web3.utils.numberToHex(_price * _amount),
    };

    let txHash = ethereum
      .request({
        method: "eth_sendTransaction",
        params: [tx],
      })
      .then((hash) => {
        notify(
          <span>
            You can view your transaction on&nbsp;
            <a
              className={"underline"}
              target={"_blank"}
              href={"https://polygonscan.com/tx/" + hash}
            >
              PolygonScan
            </a>
          </span>
        );
      })
      .catch((err) => console.log(err));
  }

  function releaseFunds() {
    let encoded = contract.methods.release(address).encodeABI();
    let tx = {
      from: address,
      to: config.contractAddress,
      data: encoded,
      nonce: "0x00",
    };

    let txHash = ethereum
      .request({
        method: "eth_sendTransaction",
        params: [tx],
      })
      .then((hash) => {
        notify(
          <span>
            You can view your transaction on&nbsp;
            <a
              className={"underline"}
              target={"_blank"}
              href={"https://polygonscan.com/tx/" + hash}
            >
              PolygonScan
            </a>
          </span>
        );
      })
      .catch((err) => console.log(err));
  }

  function setBaseURI(_URI) {
    let encoded = contract.methods.setBaseURI(_URI).encodeABI();
    let tx = {
      from: address,
      to: config.contractAddress,
      data: encoded,
      nonce: "0x00",
    };

    let txHash = ethereum
      .request({
        method: "eth_sendTransaction",
        params: [tx],
      })
      .then((hash) => {
        notify(
          <span>
            You can view your transaction on&nbsp;
            <a
              className={"underline"}
              target={"_blank"}
              href={"https://polygonscan.com/tx/" + hash}
            >
              PolygonScan
            </a>
          </span>
        );
      })
      .catch((err) => console.log(err));
  }

  function setPrice(_price) {
    let encoded = contract.methods.setPrice(_price).encodeABI();
    let tx = {
      from: address,
      to: config.contractAddress,
      data: encoded,
      nonce: "0x00",
    };

    let txHash = ethereum
      .request({
        method: "eth_sendTransaction",
        params: [tx],
      })
      .then((hash) => {
        notify(
          <span>
            You can view your transaction on&nbsp;
            <a
              className={"underline"}
              target={"_blank"}
              href={"https://polygonscan.com/tx/" + hash}
            >
              PolygonScan
            </a>
          </span>
        );
      })
      .catch((err) => console.log(err));
  }

  function reserveTokens(_amount) {
    let encoded = contract.methods.reserveTokens(_amount).encodeABI();
    let tx = {
      from: address,
      to: config.contractAddress,
      data: encoded,
      nonce: "0x00",
    };

    let txHash = ethereum
      .request({
        method: "eth_sendTransaction",
        params: [tx],
      })
      .then((hash) => {
        notify(
          <span>
            You can view your transaction on&nbsp;
            <a
              className={"underline"}
              target={"_blank"}
              href={"https://polygonscan.com/tx/" + hash}
            >
              PolygonScan
            </a>
          </span>
        );
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    // Show images
    canvasDraw(4, 1);
    canvasDraw(40, 2);
    canvasDraw(47, 3);
    canvasDraw(233, 4, 120);
    canvasDraw(213, 5, 120);

    // Create canvas#2's slideshow
    let counter = 0;
    let canvasArray = [4, 11, 50, 66, 133];
    let interval = setInterval(() => {
      // Draw image on canvas
      canvasDraw(canvasArray[counter], 2);
      // Update counter
      counter === canvasArray.length - 1 ? (counter = 0) : counter++;
    }, 1450);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // notification bar
  function notificationBar(
    message,
    bgClass = "bg-red-700",
    textClass = "text-white"
  ) {
    return (
      <div className={"p-4 " + bgClass}>
        <div className={"flex flex-row justify-center items-center"}>
          <span className={"font-bold " + textClass}>{message}</span>
        </div>
      </div>
    );
  }

  // Dev tools
  function developerTools() {
    return (
      <div className={"p-4"}>
        <div className={"flex flex-row justify-center items-center"}>
          <button className={"btn-blue"} onClick={() => releaseFunds()}>
            Withdraw
          </button>
          <button className={"btn-blue"} onClick={() => reserveTokens(1)}>
            Reserve 1
          </button>
          <button className={"btn-blue"} onClick={() => reserveTokens(2)}>
            Reserve 2
          </button>
          <button className={"btn-blue"} onClick={() => reserveTokens(5)}>
            Reserve 5
          </button>
          <button className={"btn-blue"} onClick={() => reserveTokens(20)}>
            Reserve 20
          </button>
          <br />
        </div>
        <div className={"flex flex-row justify-center items-center"}>
          <input
            className={"border-2 p-1"}
            type="text"
            value={URIField}
            onChange={(e) => setURIField(e.target.value)}
          />
          <button className={"btn-blue"} onClick={() => setBaseURI(URIField)}>
            Set Base URI
          </button>
        </div>
        <div className={"flex flex-row justify-center items-center"}>
          <input
            className={"border-2 p-1"}
            type="number"
            value={priceField}
            onChange={(e) => setPriceField(e.target.value)}
          />
          <button className={"btn-blue"} onClick={() => setPrice(priceField)}>
            Set Price
          </button>
        </div>
      </div>
    );
  }

  // Notification
  function notify(_content) {
    setNotification(
      <div
        className={
          "fixed md:right-4 text-xl bottom-4 inline-block rounded-xl bg-indigo-800 text-white p-4 shadow-xl"
        }
      >
        {_content}
      </div>
    );

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  return (
    <>
      {/* Notification bar */}
      {
        notificationBar("The PixelPizza smart contract has been compromised. Do not mint.")
      }
      {free
        ? notificationBar(
            "Now open-source",
            "bg-green-500",
            "text-black"
          )
        : null}
      
      {network === null
        ? notificationBar(
            "You need to connect your wallet to mint your own tokens",
            "bg-indigo-800"
          )
        : null}
      {network !== "0x89" && network !== null
        ? notificationBar("You're not logged in on the Polygon Mainnet")
        : null}

      {/* Dev tools */}
      {address === config.ownerAddress.toLowerCase() ||
      address === config.owner2Address.toLowerCase()
        ? developerTools()
        : null}

      {notification}

      {/* Intro */}
      <div className={"p-8 bg-yellow-800"}>
        <div className={"container xl:px-48 mx-auto"}>
          {/* Header */}
          <div
            className={
              "flex flex-grow flex-col lg:flex-row items-center justify-between"
            }
          >
            <span
              className={
                "text-2xl md:text-3xl font-bold text-white text-center lg:text-left"
              }
            >
              Pixel Pizzas
            </span>
          </div>

          {/* Jumbotron */}
          <div
            className={
              "flex flex-grow items-center flex-col lg:flex-row justify-between pt-8 lg:pt-32 pb-16 lg:pb-24"
            }
          >
            <div className={"pb-8 lg:pr-24"}>
              <h1
                className={
                  "text-4xl md:text-6xl font-bold text-white mb-4 text-center lg:text-left"
                }
              >
                Pixel Pizzas
              </h1>
              <h2
                className={
                  "text-xl md:text-2xl font-bold text-white text-center lg:text-left"
                }
              >
                294 tasty NFTs with unique properties safely stored on Polygon
                and IPFS.
              </h2>
            </div>
            <div className={"flex flex-shrink-0 items-center justify-center"}>
              <canvas id={"1"} height={480} width={480} className={"pizza"} />
            </div>
          </div>
        </div>
      </div>

      {/* What is a Pixel Pizza */}
      <div className={"p-8 bg-white"}>
        <div className={"container xl:px-48 mx-auto"}>
          <div
            className={
              "flex flex-col lg:flex-row justify-around items-center py-16 md:py-32"
            }
          >
            <div
              className={
                "flex items-center justify-center lg:pr-24 pb-16 lg:pb-0"
              }
            >
              <canvas id={"2"} height={480} width={480} className={"pizza"} />
            </div>
            <div className={"flex-1"}>
              <h2
                className={
                  "text-2xl md:text-4xl font-bold mb-2 text-center lg:text-left"
                }
              >
                What is a Pixel Pizza?
              </h2>
              <h5 className={"text-xl md:text-2xl text-center lg:text-left"}>
                A Pixel Pizza is a randomly generated NFT with unique
                properties. Every single pizza is one of a kind. All tokens are
                safely stored on the Polygon blockchain and their properties on
                IPFS. You can mint your own pizza for{" "}
                <s style={{ textDecorationThickness: "4px" }}>
                  just <strong>2&nbsp;MATIC</strong>
                </s>
                &nbsp;<strong>FREE</strong> while supplies last, or check the
                minted ones out on OpenSea.
                <br />
                <a
                  className={"text-center lg:text-left"}
                  target={"_blank"}
                  href={"https://opensea.io/collection/pixel-pizzas"}
                >
                  <button className={"btn-blue rounded-full mt-6"}>
                    Buy on OpenSea
                  </button>
                </a>
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* How to mint a token */}
      <div className={"p-8 bg-yellow-800"}>
        <div className={"container xl:px-48 mx-auto"}>
          <div
            className={
              "flex flex-col lg:flex-row justify-between items-center py-16"
            }
          >
            <div className={"flex-1 pb-16 lg:pb-0 lg:pr-24"}>
              <h2 className={"text-2xl md:text-4xl font-bold text-white mb-2"}>
                How to mint your own random pizza
              </h2>
              <h5 className={"text-xl md:text-2xl font-bold text-white mb-2"}>
                {totalSupply ? totalSupply : "???"} / 294 minted
              </h5>
              <ol
                className={
                  "text-xl md:text-2xl text-white list-decimal px-4 md:px-0"
                }
              >
                <li className={"mb-2"}>
                  Connect your{" "}
                  <a
                    className={"underline"}
                    target={"_blank"}
                    href={"https://metamask.io/"}
                  >
                    MetaMask
                  </a>{" "}
                  wallet by clicking the button at the top of this page. <br />
                </li>
                <li className={"mb-2"}>
                  Make sure you're connected to the{" "}
                  <a
                    target={"_blank"}
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                    href={
                      "https://docs.matic.network/docs/develop/metamask/config-polygon-on-metamask/"
                    }
                  >
                    Polygon mainnet
                  </a>
                  .
                </li>
                <li className={"mb-2"}>
                  Mint your own random token(s) by clicking the button below.
                  Max 5 tokens.
                  <br />
                </li>
                <li className={"mb-2"}>
                  Accept the{" "}
                  <s style={{ textDecorationThickness: "4px" }}>
                    payment&nbsp;&amp;
                  </s>
                  &nbsp;gasfees and wait for the blockchain to confirm the
                  transaction. <br />
                </li>
                <li className={"mb-2"}>
                  You can now view your NFT on OpenSea and PolygonScan!
                </li>
              </ol>
              <div className={"flex mt-6 justify-center lg:justify-start"}>
                <button
                  disabled={
                    balance > 4 ||
                    !(
                      network === config.contractNetwork &&
                      totalSupply <= 294 - 1
                    )
                  }
                  className={"btn-white rounded-full border-r-2 w-full"}
                  onClick={() => mint(1)}
                >
                  Mint 1
                </button>
              </div>
            </div>
            <div className={"flex-0"}>
              <canvas id={"3"} height={480} width={480} className={"pizza"} />
            </div>
          </div>
        </div>
      </div>

      {/* About me */}
      <div className={"p-8 bg-white"}>
        <div className={"container xl:px-48 mx-auto"}>
          <div
            className={
              "flex flex-row justify-center items-center py-16 md:py-32"
            }
          >
            <div className={""}>
              <h2
                className={
                  "text-2xl md:text-4xl font-bold sm:mb-2 text-center sm:text-left mb-4"
                }
              >
                About the developers
              </h2>
              <div
                className={
                  "flex flex-col sm:flex-row items-center mb-8 sm:mb-0"
                }
              >
                <canvas
                  id={"4"}
                  height={120}
                  width={120}
                  className={"rounded-2xl"}
                />
                <div className={"m-2 sm:m-8 text-center sm:text-left"}>
                  <span className={"text-2xl"}>mbvissers.eth</span>
                  <br />
                  <span className={"text-lg"}>
                    A developer that likes everything <br />
                    from coding to cooking good food.
                    <br />
                  </span>
                  <span className={"text-lg"}>
                    Find me on&nbsp;
                    <a
                      target={"_blank"}
                      className={"text-yellow-700 hover:text-yellow-900"}
                      href={"https://mbvissers.medium.com/"}
                    >
                      Medium
                    </a>{" "}
                    and&nbsp;
                    <a
                      target={"_blank"}
                      className={"text-yellow-700 hover:text-yellow-900"}
                      href={"https://twitter.com/0xmbvissers"}
                    >
                      Twitter
                    </a>
                    .
                  </span>
                </div>
              </div>
              <div className={"flex flex-col sm:flex-row items-center"}>
                <canvas
                  id={"5"}
                  height={120}
                  width={120}
                  className={"rounded-2xl"}
                />
                <div className={"m-2 sm:m-8 text-center sm:text-left"}>
                  <span className={"text-2xl"}>Anon</span>
                  <br />
                  <span className={"text-lg"}>
                    Pentester and occasional pixel artist.
                    <br />
                    Prefers to stay anonymous for now.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer bgClass={"bg-yellow-800"} colorClass={"text-white"} />
    </>
  );
}
