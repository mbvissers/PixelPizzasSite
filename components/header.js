import  {useState, useEffect} from 'react';
import config from '../configuration';

let Web3 = require('web3');
import Image from 'next/image'

export default function Header(props) {

    return (
        <div className={'p-8 ' + props.bgClass}>
            <div className={"flex flex-grow flex-row items-center justify-between container xl:px-48 mx-auto"}>
                <span className={"text-3xl font-bold text-black text-left"}>Pixel Pizzas</span>
                <button
                    className={"btn-white rounded-full mt-4 hidden md:inline"}
                    onClick={() => {
                        //getAccount()
                    }}>
                    {
                        //address === null ? "Connect MetaMask" : address.substring(0, 13) + "..."
                    }
                    Connect MetaMask
                </button>
                <button
                    className={"flex justify-center align-center rounded-md bg-white p-2 inline md:hidden"}>
                        <Image src="/icons/wallet.svg" width={32} height={32} />
                </button>
            </div>
        </div>
    )
}