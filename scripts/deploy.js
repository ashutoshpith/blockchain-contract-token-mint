async function main () {
    // We get the contract to deploy
    const AdaptiveCode = await ethers.getContractFactory('AdaptiveCode');
    console.log('Deploying AdaptiveCode...');
    const adaptiveCode = await AdaptiveCode.deploy();
    await adaptiveCode.deployed();
    console.log('AdaptiveCode deployed to:', adaptiveCode.address);
  }
  
main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });