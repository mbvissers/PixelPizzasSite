import 'tailwindcss/tailwind.css'
import '../style.css'
import Head from 'next/head'

function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Pixel Pizzas | A Tasty NFT Project</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Component {...pageProps} />
        </>

    )
}

export default App