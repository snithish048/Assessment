import { useState } from 'react'
import styles from '../styles/App.module.css'
import Modal from './modal'



export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className={styles.root}>
        <button 
          className={styles.button}
          onClick={()=>setIsOpen(true)}>
          Save Segment
        </button>
      </div>
        {isOpen&&<Modal 
        setIsOpen = {setIsOpen}
        />}
    </>
  )
}

