import "regenerator-runtime/runtime"
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

const supportedChainIds = [1, 4]
const connectors = {
  injected: {}
}
function MyApp({ Component, pageProps }) {
  return (
  <ThirdwebWeb3Provider
    supportedChainIds={supportedChainIds}
    connectors= {connectors}
  >
    <Component {...pageProps} />
  </ThirdwebWeb3Provider>
  )
}

// function MyApp({ Component, pageProps }) {
//   return (
//     <Component {...pageProps} />
//   )
// }

export default MyApp
