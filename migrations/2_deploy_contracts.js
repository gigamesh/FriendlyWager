const FriendlyWager = artifacts.require("FriendlyWager");

module.exports = function(deployer) {
  deployer.deploy(FriendlyWager);
};
