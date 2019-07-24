export const FRIENDLY_WAGER_ADDRESS =
  "0xE9DcE310c9153EdE2a20444d8e5A485FBCD9b0D4";

export const FRIENDLY_WAGER_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "participants",
    outputs: [
      {
        name: "prediction",
        type: "uint256"
      },
      {
        name: "hasApproved",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "maxBet",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "endDateTime",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "proposal",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "refundDate",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "_creator",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        name: "prediction",
        type: "uint256"
      }
    ],
    name: "Wager",
    type: "event"
  },
  {
    constant: false,
    inputs: [
      {
        name: "prediction",
        type: "uint256"
      }
    ],
    name: "wager",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  }
];
