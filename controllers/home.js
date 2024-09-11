const Web3 = require('web3');

const connectToMetaMask = async (req, res) => {
  try {
    // Instead of using Infura, check for the MetaMask provider (window.ethereum)
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);

      // Request access to MetaMask accounts
      await window.ethereum.enable();

      // Get accounts
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        return res.status(400).json({ error: 'Failed to connect to MetaMask' });
      }

      // Return the MetaMask account to the Flutter client
      res.status(200).json({ account });
    } else {
      return res.status(400).json({ error: 'MetaMask is not installed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while connecting to MetaMask' });
  }
};

module.exports = {
  connectToMetaMask,
};
