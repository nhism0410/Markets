import React from "react";
import DopeShop from './contracts/DopeShop.json';
import Web3 from 'web3';
import Navbar from './components/Navbar/SiteNavbar';
import Main from './components/Main';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer'
import { Container } from "react-bootstrap";
import 'remixicon/fonts/remixicon.css';
import ProductList from "./components/Product/ProductList";

// Pinata API credentials
const pinataApiKey = '40ffc3c7ee899d261b01';
const pinataSecretApiKey = 'a0d52736a7c05b7791a50c35de39f25a49655a002c8deb250de8605cb329da25';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      dopeShop: null,
      products: [],
      orders: [],
      sales: [],
      myProducts: [],
      loading: true,
      show: 'home', 
      file: null
    };
    this.handleNav = this.handleNav.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.switchAccount = this.switchAccount.bind(this);
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    const savedView = localStorage.getItem('currentView');
    if (savedView) {
      this.setState({ show: savedView });
    }

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
    }
  }

  componentWillUnmount() {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged.bind(this));
    }
  }

  async handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== this.state.account) {
      this.setState({ account: accounts[0] });
      await this.loadBlockchainData();
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = DopeShop.networks[networkId];
    if (networkData) {
        const dopeshop = new web3.eth.Contract(DopeShop.abi, networkData.address);
        this.setState({ dopeshop });

        const productCount = await dopeshop.methods.productCount().call();
        let products = [];
        for (let i = productCount; i > 0; i--) {
            const product = await dopeshop.methods.products(i).call();
            products.push(product);
        }

        const ordersCount = await dopeshop.methods.ordersCount().call();
        let orders = [];
        let sales = [];
        for (let i = ordersCount; i > 0; i--) {
            let order = await dopeshop.methods.orders(i).call();
            const product = await dopeshop.methods.products(order.productId).call();
            order = { ...order, imgHash: product.imgHash, name: product.name, price: product.price };
            if (order.seller === this.state.account) {
                sales.push(order);
            } else if (order.buyer === this.state.account) {
                orders.push(order);
            }
        }

        this.setState({ products, orders, sales, loading: false });
    } else {
        window.alert('DopeShop contract not deployed to detected network.');
    }
  }

  handleNav(show) {
    this.setState({ show });
    localStorage.setItem('currentView', show);
  }

  captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({ file });
  }

  async addProduct(name, price, description) {
    try {
      this.setState({ loading: true });
      const { file } = this.state;
  
      if (!file) {
        console.error("No file selected");
        this.setState({ loading: false });
        return;
      }
  
      // Create FormData and append file and metadata
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pinataMetadata', JSON.stringify({ name, description })); // Include description
  
      // Send file to IPFS via Pinata
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
        body: formData,
      });
  
      const result = await response.json();
      const ipfsHash = result.IpfsHash;
  
      // Send product data to smart contract
      const receipt = await this.state.dopeshop.methods.addProduct(name, ipfsHash, price, description).send({ from: this.state.account });
  
      // Prepare new product data
      const newProduct = {
        id: receipt.events.ProductAdded.returnValues.id,
        name,
        imgHash: receipt.events.ProductAdded.returnValues.imgHash,
        price,
        description, // Include description
        seller: this.state.account,
      };
  
      // Update state
      this.setState(prevState => ({
        products: [...prevState.products, newProduct],
        loading: false,
      }));
  
    } catch (error) {
      console.error('Error adding product:', error);
      this.setState({ loading: false });
    }
  }
  
  createOrder(productId, price) {
    this.setState({ loading: true });
    this.state.dopeshop.methods.createOrder(productId).send({
      from: this.state.account,
      value: Web3.utils.toWei(price.toString(), 'Ether')
    })
    .on('transactionHash', (hash) => {
      console.log('Transaction Hash:', hash);
    })
    .on('receipt', (receipt) => {
      console.log('Receipt:', receipt);
      this.setState({ loading: false });
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log('Confirmation Number:', confirmationNumber);
      console.log('Receipt:', receipt);
    })
    .on('error', (error) => {
      console.error('Error:', error);
      this.setState({ loading: false });
    });
  }

  async switchAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.setState({ account: accounts[0] });
      await this.loadBlockchainData();
    }
  }

  render() {
    return (
      <div id="App">
        <Navbar account={this.state.account} handleNav={this.handleNav} switchAccount={this.switchAccount} />
        <div className="main">
          {this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            : <Container>
                {this.state.show === 'home'
                  ? <Home />
                  : <Main
                      show={this.state.show}
                      products={this.state.products.map(product => ({
                        ...product,
                        imgUrl: `https://gateway.pinata.cloud/ipfs/${product.imgHash}`
                      }))}
                      myProducts={this.state.myProducts}
                      orders={this.state.orders}
                      sales={this.state.sales}
                      footer={this.state.footer}
                      captureFile={this.captureFile}
                      addProduct={this.addProduct}
                      createOrder={this.createOrder}
                      account={this.state.account}
                    />
                      
                }
             
                
              </Container>
          }
         
        </div>
        <Footer />
        
      </div>
    );
  }
}

export default App;
