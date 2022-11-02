import  {useState, useEffect} from 'react';
import config from '../configuration';

let Web3 = require('web3');
import Image from 'next/image'

export default function Header(props) {
    const [address, setAddress] = useState(null)    
    const [network, setNetwork] = useState(null)
    let eventListenersSet = false

    function getAccount() {
        window.ethereum ? 
            ethereum.request({method: "eth_requestAccounts"}).then((accounts) => {
                setAddress(accounts[0])
                let n = ethereum.chainId
                setNetwork(n)
                
                if (!eventListenersSet) {
                    ethereum.on('accountsChanged', function () {
                        getAccount()
                    })

                    ethereum.on('chainChanged', function () {
                        getAccount()
                    })
                    eventListenersSet = true
                }
            }).catch(error => console.log(error))
        :
            console.log("Please install a Web3 Wallet")
    }

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

    return (
        <>
            {network !== "0x89" && network !== null ? notificationBar("You're not logged in on the Polygon Mainnet") : null}
            <div className={'p-8 ' + props.bgClass}>
                <div className={"flex flex-grow flex-row items-center justify-between container xl:px-48 mx-auto"}>
                    <span className={"text-3xl font-bold text-black text-left"}>Pixel Pizzas</span>
                    <button
                        className={"btn-white rounded-full mt-4 hidden md:inline"}
                        onClick={() => {
                            getAccount()
                        }}>
                        {
                            address === null ? "Connect MetaMask" : address.substring(0, 13) + "..."
                        }
                    </button>
                    <button
                        className={"flex justify-center align-center rounded-md bg-white p-2 inline md:hidden" + (address ? ' bg-green-400' : ' bg-white')}>
                            <Image src="/icons/wallet.svg" width={32} height={32} />
                    </button>
                </div>
            </div>
        </>
    )
}