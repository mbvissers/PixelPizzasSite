import React, {useState, useEffect} from 'react';

let Web3 = require('web3');

export default function Index(props) {
    const [address, setAddress] = useState(null)
    const [network, setNetwork] = useState(null)
    const [web3, setWeb3] = useState(null)
    const [contract, setContract] = useState(null)
    const [totalSupply, setTotalSupply] = useState(0)
    const [notification, setNotification] = useState(null)

    const [URIField, setURIField] = useState("")

    let abi = [
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "_payees",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_shares",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "shares",
                    "type": "uint256"
                }
            ],
            "name": "PayeeAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "PaymentReceived",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "PaymentReleased",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "MAX_TOKENS",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "MAX_TOKENS_PER_SALE",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "flipSaleStatus",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isSaleActive",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "payee",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "release",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "released",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "reserveTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "safeMint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_newBaseURI",
                    "type": "string"
                }
            ],
            "name": "setBaseURI",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "setPrice",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "shares",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "tokenByIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "tokenOfOwnerByIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalReleased",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalShares",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]
    let contractAddress = "0xfd825CF48B155908A497E59864F7CD2D705D4669"
    let ownerAddress = "0xDCE99c8475Fd38a3b8646DC39d582c7c2dce2DCA"
    let owner2Address = "0xb279Eb50111dd34ee33106248c50C2FCd21284Cd"
    let contractNetwork = "0x89" // Polygon is 0x89, Mumbai is 0x13881
    let eventListenersSet = false
    let price = "2" // 2 MATIC on prod

    // Function to quickly draw a crypto pizza in a canvas to negate antialiasing
    function canvasDraw(imgId, canvasId, size = 480) {
        let canvas = document.getElementById(canvasId),
            context = canvas.getContext('2d');

        let base_image = document.createElement("img")
        base_image.src = "images/" + imgId + ".png"
        base_image.onload = function () {
            context.drawImage(base_image, 0, 0, size, size);
        }
    }

    // Function to get current MetaMask account and setup web3
    function getAccount() {
        window.ethereum ?
            ethereum.request({method: "eth_requestAccounts"}).then((accounts) => {
                setAddress(accounts[0])
                let w3 = new Web3(ethereum)
                setWeb3(w3)
                let c = new w3.eth.Contract(abi, contractAddress)
                setContract(c)
                let n = ethereum.chainId
                setNetwork(n)
                let supply = 0;

                n === contractNetwork ?
                    c.methods.totalSupply().call().then((_supply) => {
                        supply = _supply
                        setTotalSupply(_supply)
                    }).catch((err) => console.log(err))
                    : console.log("You're on the wrong network")

                if (!eventListenersSet) {
                    ethereum.on('accountsChanged', function () {
                        getAccount()
                    })

                    ethereum.on('chainChanged', function () {
                        getAccount()
                    })
                    eventListenersSet = true
                }
            }).catch((err) => console.log(err))
            : console.log("Please install MetaMask")
    }

    function mint(_amount) {
        let _price = web3.utils.toWei(price + "");
        let encoded = contract.methods.safeMint(_amount).encodeABI()

        let tx = {
            from: address,
            to: contractAddress,
            data: encoded,
            nonce: "0x00",
            value: web3.utils.numberToHex(_price * _amount)
        }

        let txHash = ethereum.request({
            method: 'eth_sendTransaction',
            params: [tx],
        }).then((hash) => {
            notify((<span>You can view your transaction on&nbsp;<a className={"underline"} target={"_blank"}
                                                                   href={"https://polygonscan.com/tx/" + hash}>PolygonScan</a></span>))
        }).catch((err) => console.log(err))
    }

    function releaseFunds() {
        let encoded = contract.methods.release(address).encodeABI()
        let tx = {
            from: address,
            to: contractAddress,
            data: encoded,
            nonce: "0x00"
        }

        let txHash = ethereum.request({
            method: 'eth_sendTransaction',
            params: [tx],
        }).then((hash) => {
            notify((<span>You can view your transaction on&nbsp;<a className={"underline"} target={"_blank"}
                                                                   href={"https://polygonscan.com/tx/" + hash}>PolygonScan</a></span>))
        }).catch((err) => console.log(err))
    }

    function setBaseURI(_URI) {
        let encoded = contract.methods.setBaseURI(_URI).encodeABI()
        let tx = {
            from: address,
            to: contractAddress,
            data: encoded,
            nonce: "0x00"
        }

        let txHash = ethereum.request({
            method: 'eth_sendTransaction',
            params: [tx],
        }).then((hash) => {
            notify((<span>You can view your transaction on&nbsp;<a className={"underline"} target={"_blank"}
                                                                   href={"https://polygonscan.com/tx/" + hash}>PolygonScan</a></span>))
        }).catch((err) => console.log(err))
    }

    function reserveTokens(_amount) {
        let encoded = contract.methods.reserveTokens(_amount).encodeABI()
        let tx = {
            from: address,
            to: contractAddress,
            data: encoded,
            nonce: "0x00"
        }

        let txHash = ethereum.request({
            method: 'eth_sendTransaction',
            params: [tx],
        }).then((hash) => {

            notify(
                (
                    <span>You can view your transaction on&nbsp;
                        <a className={"underline"} target={"_blank"} href={"https://polygonscan.com/tx/" + hash}>
                            PolygonScan
                        </a>
                    </span>
                )
            )
        }).catch((err) => console.log(err))
    }


    useEffect(() => {
        getAccount()

        // Show images
        canvasDraw(4, 1)
        canvasDraw(40, 2)
        canvasDraw(47, 3)
        canvasDraw(233, 4, 120)
        canvasDraw(213, 5, 120)

        // Create canvas#2's slideshow
        let counter = 0;
        let canvasArray = [4, 11, 50, 66, 133]
        let interval = setInterval(() => {
            // Draw image on canvas
            canvasDraw(canvasArray[counter], 2)
            // Update counter
            counter === canvasArray.length - 1 ? counter = 0 : counter++
        }, 1450)
    }, [])
    // notification bar
    function notificationBar(message, bgClass = "bg-red-700") {
        return (
            <div className={"p-4 " + bgClass}>
                <div className={"flex flex-row justify-center items-center"}>
                <span className={"font-bold text-white"}>
                    {message}
                </span>
                </div>
            </div>
        )
    }

    // Dev tools
    function developerTools() {
        return (
            <div className={"p-4"}>
                <div className={"flex flex-row justify-center items-center"}>
                    <button className={"btn-blue"} onClick={() => releaseFunds()}>Withdraw</button>
                    <button className={"btn-blue"} onClick={() => reserveTokens(1)}>Reserve 1</button>
                    <button className={"btn-blue"} onClick={() => reserveTokens(2)}>Reserve 2</button>
                    <button className={"btn-blue"} onClick={() => reserveTokens(5)}>Reserve 5</button>
                    <button className={"btn-blue"} onClick={() => reserveTokens(20)}>Reserve 20</button>
                    <br/>
                </div>
                <div className={"flex flex-row justify-center items-center"}>
                    <input className={"border-2 p-1"} type="text" value={URIField} onChange={(e) => setURIField(e.target.value)}/>
                    <button className={"btn-blue"} onClick={() => setBaseURI(URIField)}>Set Base URI</button>
                </div>
            </div>
        )
    }

    // Notification
    function notify(_content) {
        setNotification(
            <div
                className={"fixed md:right-4 text-xl bottom-4 inline-block rounded-xl bg-indigo-800 text-white p-4 shadow-xl"}>
                {_content}
            </div>
        )

        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    return (
        <>
            {/* Notification bar */}
            {address === ownerAddress.toLowerCase() ? notificationBar("Logged in as owner") : null}
            {network === null ? notificationBar("You need to install MetaMask to mint your own tokens", "bg-indigo-800") : null}
            {network !== "0x89" && network !== null ? notificationBar("You're not logged in on the Polygon Mainnet") : null}

            {/* Dev tools */}
            {address === ownerAddress.toLowerCase() || address === owner2Address.toLowerCase() ? developerTools() : null}

            {notification}

            {/* Intro */}
            <div className={"p-8 bg-yellow-800"}>
                <div className={"container xl:px-48 mx-auto"}>

                    {/* Header */}
                    <div className={"flex flex-grow flex-col lg:flex-row items-center justify-between"}>
                        <span className={"text-2xl md:text-3xl font-bold text-white text-center lg:text-left"}>Pixel Pizzas</span>
                        <button
                            className={"btn-white rounded-full mt-4 lg:m-0"}
                            onClick={() => {
                                getAccount()
                            }}>
                            {
                                address === null ? "Connect MetaMask" : address.substring(0, 13) + "..."
                            }
                        </button>
                    </div>

                    {/* Jumbotron */}
                    <div
                        className={"flex flex-grow items-center flex-col lg:flex-row justify-between pt-8 lg:pt-32 pb-16 lg:pb-24"}>
                        <div className={"pb-8 lg:pr-24"}>
                            <h1 className={"text-4xl md:text-6xl font-bold text-white mb-4 text-center lg:text-left"}>Pixel
                                Pizzas</h1>
                            <h2 className={"text-xl md:text-2xl font-bold text-white text-center lg:text-left"}>294
                                tasty NFTs with unique properties safely stored on Polygon and IPFS.</h2>
                        </div>
                        <div className={"flex flex-shrink-0 items-center justify-center"}>
                            <canvas id={"1"} height={480} width={480} className={"pizza"}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* What is a Pixel Pizza */}
            <div className={"p-8 bg-white"}>
                <div className={"container xl:px-48 mx-auto"}>
                    <div className={"flex flex-col lg:flex-row justify-around items-center py-16 md:py-32"}>
                        <div className={"flex items-center justify-center lg:pr-24 pb-16 lg:pb-0"}>
                            <canvas id={"2"} height={480} width={480} className={"pizza"}/>
                        </div>
                        <div className={"flex-1"}>
                            <h2 className={"text-2xl md:text-4xl font-bold mb-2 text-center lg:text-left"}>What is a
                                Pixel Pizza?</h2>
                            <h5 className={"text-xl md:text-2xl text-center lg:text-left"}>
                                A Pixel Pizza is a randomly generated NFT with unique properties.
                                Every single pizza is one of a kind. All tokens are safely stored on the Polygon
                                blockchain and their properties on IPFS.
                                You can mint your own pizza for just <strong>{price}&nbsp;MATIC</strong> while supplies
                                last, or check the already minted ones out on OpenSea.
                                <br/>
                                <a className={"text-center lg:text-left"} target={"_blank"}
                                   href={"https://opensea.io/collection/pixel-pizzas"}>
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
                    <div className={"flex flex-col lg:flex-row justify-between items-center py-16"}>
                        <div className={"flex-1 pb-16 lg:pb-0 lg:pr-24"}>
                            <h2 className={"text-2xl md:text-4xl font-bold text-white mb-2"}>How to mint your own random
                                token</h2>
                            <h5 className={"text-xl md:text-2xl font-bold text-white mb-2"}>{totalSupply ? totalSupply : "???"} /
                                294 minted</h5>
                            <ol className={"text-xl md:text-2xl text-white list-decimal px-4 md:px-0"}>
                                <li className={"mb-2"}>Connect your <a className={"underline"} target={"_blank"}
                                                                       href={"https://metamask.io/"}>MetaMask</a> wallet
                                    by clicking the button at the top of this page. <br/></li>
                                <li className={"mb-2"}>Make sure you're connected to the <a target={"_blank"}
                                                                                            href={"https://docs.matic.network/docs/develop/metamask/config-polygon-on-metamask/"}>Polygon
                                    mainnet</a>.
                                </li>
                                <li className={"mb-2"}>Mint your own random token(s) by clicking a button below. <br/>
                                </li>
                                <li className={"mb-2"}>Accept the payment&nbsp;&amp;&nbsp;gasfees and wait for the
                                    blockchain to confirm the transaction. <br/></li>
                                <li className={"mb-2"}>You can now view your NFT on OpenSea and PolygonScan!</li>
                            </ol>
                            <div className={"flex mt-6 justify-center lg:justify-start"}>
                                <button
                                    disabled={!(network === contractNetwork && totalSupply <= 294 - 1)}
                                    className={"btn-white rounded-l-full border-r-2"}
                                    onClick={() => mint(1)}>Mint 1
                                </button>
                                <button
                                    disabled={!(network === contractNetwork && totalSupply <= 294 - 2)}
                                    className={"btn-white border-r-2"}
                                    onClick={() => mint(2)}>Mint 2
                                </button>
                                <button
                                    disabled={!(network === contractNetwork && totalSupply <= 294 - 5)}
                                    className={"btn-white rounded-r-full"}
                                    onClick={() => mint(5)}>Mint 5
                                </button>
                            </div>
                        </div>
                        <div className={"flex-0"}>
                            <canvas id={"3"} height={480} width={480} className={"pizza"}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* About me */}
            <div className={"p-8 bg-white"}>
                <div className={"container xl:px-48 mx-auto"}>
                    <div className={"flex flex-row justify-center items-center py-16 md:py-32"}>
                        <div className={""}>
                            <h2 className={"text-2xl md:text-4xl font-bold sm:mb-2 text-center sm:text-left mb-4"}>About
                                the developers</h2>
                            <div className={"flex flex-col sm:flex-row items-center mb-8 sm:mb-0"}>
                                <canvas id={"4"} height={120} width={120} className={"rounded-2xl"}/>
                                <div className={"m-2 sm:m-8 text-center sm:text-left"}>
                                    <span className={"text-2xl"}>mbvissers</span><br/>
                                    <span className={"text-lg"}>
                                    A student that likes everything from <br/>coding to cooking good food.<br/>
                                </span>
                                    <span className={"text-lg"}>
                                    Find me on&nbsp;
                                        <a target={"_blank"} className={"text-yellow-700 hover:text-yellow-900"}
                                           href={"https://mbvissers.medium.com/"}>Medium</a> and&nbsp;
                                        <a target={"_blank"} className={"text-yellow-700 hover:text-yellow-900"}
                                           href={"https://twitter.com/0xmbvissers"}>Twitter</a>
                                </span>
                                </div>
                            </div>
                            <div className={"flex flex-col sm:flex-row items-center"}>
                                <canvas id={"5"} height={120} width={120} className={"rounded-2xl"}/>
                                <div className={"m-2 sm:m-8 text-center sm:text-left"}>
                                    <span className={"text-2xl"}>Anon</span><br/>
                                    <span className={"text-lg"}>
                                    Pentester and occasional pixel artist.<br/>
                                        Prefers to stay anonymous for now.
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className={"bg-yellow-800"}>
                <div className={"container xl:px-48 mx-auto"}>
                    <div className={"flex flex-col sm:flex-row justify-around items-center py-8 sm:py-16"}>
                        {/* TODO: Set link to correct collection */}
                        <a target={"_blank"} href={"https://opensea.io/collection/pixel-pizzas"}
                           className={"text-2xl text-white font-bold pb-4 sm:pb-0"}>OpenSea</a>
                        <a target={"_blank"} href={"https://polygonscan.com/token/" + contractAddress}
                           className={"text-2xl text-white font-bold"}>PolygonScan</a>
                    </div>
                </div>
            </div>
        </>

    );
}
