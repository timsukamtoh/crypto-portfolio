import * as React from 'react'
import { useReadContract, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

export function SendTransaction() {
  const { data: hash, sendTransaction, isPending} = useSendTransaction()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const value = formData.get('value') as string
    sendTransaction({ to: '0x8d176E070D1EFA11CF0f00B2d271bC12a3Ef783e', value: parseEther(value) })
  }

  // return (
  //   <form onSubmit={submit} className="flex flex-col items-center justify-center space-y-4">
  //     <h1 className="text-2xl font-bold">Buy me a coffee!</h1>
  //     <input name="value" placeholder="0.05 ETH" required className="p-2 border border-gray-300 rounded" />
  //     <button type="submit" disabled={isPending} className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100">
  //       {isPending ? 'Confirming...' : 'Donate'}
  //     </button>
  //     {hash && <div className="text-gray-500">Transaction Hash: {hash}</div>}
  //   </form>
  // )

  const NFT_ABI = [
    {
      "inputs": [],
      "name": "buy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_trait",
          "type": "string"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ]
  const contractConfig = {
    address: '0x9d80C34CaA39929f3143ad28A87d771E3b3E8283' as `0x${string}`,
    abi:NFT_ABI
  }

  const{data:ownerOf} = useReadContract({
    ...contractConfig,
    functionName: 'ownerOf',
    args:['0']
  })
  return (
    <div>
      Owner of ID: {ownerOf?.toString()}
    </div>
  )

  // return (
  //   <form onSubmit={submit} className="flex flex-col items-center justify-center space-y-4">
  //     <h1 className="text-2xl font-bold">Mint an NFT!</h1>
  //     <input name="value" placeholder="0.05 ETH" required className="p-2 border border-gray-300 rounded" />
  //     <button type="submit" disabled={isPending} className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100">
  //       {isPending ? 'Confirming...' : 'Donate'}
  //     </button>
  //     {hash && <div className="text-gray-500">Transaction Hash: {hash}</div>}
  //   </form>
  // )
}