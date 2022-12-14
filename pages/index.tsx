import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect } from 'react'
import Guess from '../components/Guess'
import Querty from '../components/Qwerty'
import PuzzleStore from '../stores/PuzzleStore'



export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore)
  useEffect(() => {
    store.init()
    window.addEventListener('keyup', store.handleKeyup)

    return () => {
      window.removeEventListener('keyup', store.handleKeyup)
    }
  }, [])
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-wordle">
      <h1 className="bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text text-6xl font-bold uppercase text-transparent mb-10">
        Wordle
      </h1>
      {store.guesses.map((_, i) => (
        <Guess
          key={i}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
      ))}
      {store.won ? <h1 className='text-green-400'>You won!</h1> : ""}
      {store.lost ? <h1 className="text-red-800 font-bold mb-1">You lost!</h1> : ""}
      {(store.won || store.lost) && (
        <button onClick={store.init} className="bg-blue-500 p-2 rounded-lg font-bold">Play Again</button>
      )}
      <Querty store={store} />
    </div>
  )
})