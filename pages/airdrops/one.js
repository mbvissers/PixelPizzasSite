import {useState, useEffect} from 'react';
import config from '../../configuration'

export default function AirdropOne() {

    // Function to quickly draw a crypto pizza in a canvas to negate antialiasing
    function canvasDraw(imgId, canvasId, size = 480) {
        let canvas = document.getElementById(canvasId),
            context = canvas.getContext('2d');

        let base_image = document.createElement("img")
        base_image.src = "../../images/airdrops/one/" + imgId + ".png"
        base_image.onload = function () {
            context.drawImage(base_image, 0, 0, size, size);
        }
    }

    useEffect(() => {

        // Create canvas#1's slideshow
        canvasDraw(0, "jumbotron")
        let counter = 0;
        let canvasArray = [1,2,3,4,0]
        let interval = setInterval(() => {
            // Draw image on canvas
            canvasDraw(canvasArray[counter], "jumbotron")
            // Update counter
            counter === canvasArray.length - 1 ? counter = 0 : counter++
        }, 1450)
    }, [])

    return (
        <div className={"flex flex-col justify-between"}>
            {/* Intro */}
            <div className={"p-8 pb-0 bg-yellow-300 h-screen"}>
                <div className={"container xl:px-48 mx-auto"}>

                    {/* Header */}
                    <div className={"flex flex-grow flex-col lg:flex-row items-center justify-between"}>
                        <span className={"text-2xl md:text-3xl font-bold text-black text-center lg:text-left"}>Pixel Pizzas</span>
                        <button
                            className={"btn-white rounded-full mt-4 lg:m-0"}
                            onClick={() => {
                                //getAccount()
                            }}>
                            {
                                //address === null ? "Connect MetaMask" : address.substring(0, 13) + "..."
                            }
                            Connect MetaMask
                        </button>
                    </div>

                    {/* Jumbotron */}
                    <div
                        className={"flex flex-grow items-center flex-col lg:flex-row justify-between pt-8 lg:pt-32 h-max"}>
                        <div className={"pb-8 lg:pr-24"}>
                            <h1 className={"text-4xl md:text-6xl font-bold text-black mb-4 text-center lg:text-left"}>Pixel
                                Pizzas</h1>
                            <h2 className={"text-xl md:text-4xl font-bold text-black text-center lg:text-left"}>
                                Airdrop #1
                            </h2>
                        </div>
                        <div className={"flex flex-shrink-0 items-center justify-center"}>
                            <canvas id={"jumbotron"} height={480} width={480} className={"pizza"}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className={"bg-blue-400"}>
                <div className={"container xl:px-48 mx-auto"}>
                    <div className={"flex flex-col sm:flex-row justify-around items-center py-8 sm:py-16"}>
                        {/* TODO: Set link to correct collection */}
                        <a target={"_blank"} href={"https://opensea.io/collection/pixel-pizzas"}
                           className={"text-2xl text-black font-bold pb-4 sm:pb-0"}>OpenSea</a>
                        <a target={"_blank"} href={"https://polygonscan.com/token/" + config.contractAddress}
                           className={"text-2xl text-black font-bold"}>PolygonScan</a>
                    </div>
                </div>
            </div>
        </div>
    )
}