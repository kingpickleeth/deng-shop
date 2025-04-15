'use client'
import { useAccount, useReadContract } from 'wagmi'
import { useState, useEffect } from 'react'
import { abi as ERC721_ABI } from '@/abi/dengs'

const DENG_CONTRACT = '0x2cf92fe634909a9cf5e41291f54e5784d234cf8d'

export default function DengInventory() {
  const { address } = useAccount()
  const [tokenIds, setTokenIds] = useState<number[]>([])

  const { data: balance } = useReadContract({
    abi: ERC721_ABI,
    address: DENG_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
  })

  useEffect(() => {
    const fetchTokens = async () => {
      if (!balance || !address) return

      const promises = []
      for (let i = 0; i < Number(balance); i++) {
        promises.push(
          window.ethereum.request({
            method: 'eth_call',
            params: [
              {
                to: DENG_CONTRACT,
                data:
                  '0x2f745c59' + // selector for tokenOfOwnerByIndex
                  address.slice(2).padStart(64, '0') +
                  i.toString(16).padStart(64, '0'),
              },
              'latest',
            ],
          })
        )
      }

      const results = await Promise.all(promises)
      const parsed = results.map((r) => parseInt(r, 16))
      setTokenIds(parsed)
    }

    fetchTokens()
  }, [balance, address])

  return (
    <div className="mt-12 text-center">
      <h2 className="text-xl font-semibold mb-4">Your Dengs</h2>
      {tokenIds.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {tokenIds.map((id) => (
            <div
              key={id}
              className="border rounded-xl p-4 bg-white shadow text-black"
            >
              🧬 DENG #{id}
            </div>
          ))}
        </div>
      ) : (
        <p>No Dengs found 😢</p>
      )}
    </div>
  )
}
