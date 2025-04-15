export const abi = [
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        { name: '_owner', type: 'address' },
        { name: '_index', type: 'uint256' },
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [{ name: 'tokenId', type: 'uint256' }],
      type: 'function',
    },
  ]
  