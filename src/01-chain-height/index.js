import React, { useEffect, useState } from 'react'
import useLotusClient from '../lib/use-lotus-client'

export default function ChainHead ({ appState }) {
  const { selectedNode } = appState
  const client = useLotusClient(selectedNode, 'node')
  const [height, setHeight] = useState()

  useEffect(() => {
    let state = { canceled: false }
    if (!client) return
    setHeight('Loading...')
    async function run() {
      if (state.canceled) return
      const result = await client.chainHead()
      if (state.canceled) return
      setHeight(result.Height)
      setTimeout(run, 1000)
    }
    run()
    return () => {
      state.canceled = true
    }
  }, [client])

  return (
    <div>
      <h2>Height</h2>
      <h1>{height}</h1>
      (using Node #{selectedNode})
    </div>
  )
}
