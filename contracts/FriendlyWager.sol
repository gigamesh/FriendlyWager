pragma solidity ^0.5.0;

contract FriendlyWager {
  // max bet = 0.1 Ether (1e17 Wei)
  uint public maxBet;

  // creator of the contract
  address public _creator;

  // date that the wager is being made about
  uint public endDateTime;

  // the event/condition being bet on
  string public proposal;

  // refund date (6.048e8 is a week in milliseconds)
  uint public refundDate = endDateTime + 6.048e8;

  struct Participant {
    uint prediction;
    bool hasApproved;
  }

  // participants in the wager
  mapping(address => Participant) public participants;

  modifier isCreator() {
    require(msg.sender == _creator, "Must be contract creator");
    _;
  }

  constructor() public {
    _creator = msg.sender;
    endDateTime = 1577865600000;     // Wednesday, January 1, 2020 12:00:00 AM, PST
    proposal = "Price of BTC in USD on Coinbase";
    maxBet = 1e17;
  }

  event Wager(address from, uint prediction);

  // registers participant with respective bid
  function wager(uint prediction) external payable {
    require(prediction > 0, "Prediction must be a positive number");
    require(msg.value >= maxBet, "Must wager 0.1 ETH");

    // check if the sender has already placed a bet
    require(participants[msg.sender].prediction > 0, "You've already placed a bet");

    // create Partipant and save in participants
    participants[msg.sender] = Participant({prediction: prediction, hasApproved: false});

    // refund any excess over MAX_BET
    uint refund = msg.value - maxBet;
    msg.sender.transfer(refund);

    // emit event
    emit Wager(msg.sender, prediction);
  }

  // permissioned function to set the final result
  // function setResult()

  // registers approval signatures and pays out the appropriate amounts if 2/3rds of signatures have been submitted


}