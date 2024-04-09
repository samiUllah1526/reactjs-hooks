import React, { useState } from 'react'
import './App.css'
import { useClickAway, useClickOutSide } from './hooks'


type ClickPadProps = {
  isClickedOutside: boolean
}

const ClickPad = React.forwardRef(({ isClickedOutside }: ClickPadProps, ref) => {
  const divRef = ref as React.RefObject<HTMLDivElement>;
  return (
    <div ref={divRef} style={{ height: "200px", background: "white", display: "grid", placeItems: "center" }}>
      { isClickedOutside ? "Clicked outside": "Clicked inside"}
    </div>
  );
});

function App() {
  // const [ref, isClickedOutside] = useClickOutSide()
  const [isClickedOutside, setIsClickedOutside] =  useState(false)
  const ref = useClickAway(() => setIsClickedOutside(true))

  return (
    <>
      <div>
        <ClickPad ref={ref} isClickedOutside={isClickedOutside} />
      </div>
    </>
  )
}

export default App
