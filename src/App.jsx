// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'
function App() {

  const [quake, setQuake] = useState([])
  const [count, setCount] = useState(3)
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(true)

  setInterval(function () {
    window.reload()
  }, 5 * 60 * 1000);

  function reloadWin() {
    setCount(count + 1)
    setCount(count - 1)
  }

  useEffect(() => {
    try {
      async function getEarthquakes() {
        const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake&orderby=time&limit=${count}`);
        const quakes = await response.json();
        setQuake(quakes.features)
        setLoading(false)

      }
      getEarthquakes()

    }
    catch (error) {
      setErrorMsg(error.message); setLoading(false)
    }


  }, [count])

  function increase() {
    setCount(count + 1)
  }
  function decrease() {
    if (count < 4) {
      setCount(count)
    }
    else { setCount(count - 1) }
  }
  function renderContents() {
    if (errorMsg) {
      return (<div>{errorMsg}</div>)
    }
    else if (loading) {
      return (<div>  <div>
        <span class="span"></span>
        <span class="span"></span>
        <span class="span"></span>
        <span class="span"></span>
        <span class="span"></span>
      </div><br></br><button style={{ borderRadius: "10px", backgroundColor: "gray", padding: "10px" }} onclick={reloadWin}>Click Here to Refresh the Page...</button></div>)
    }

    else {
      return (
        <div style={{ margin: "auto" }}>

          <table >
            <thead >
              <tr class="w3-light-grey">
                <th style={{ color: "plum" }}>Date</th>

                <th style={{ color: "yellowgreen" }}><span class="span">Magnitude</span>
                </th>

                <th><><button onClick={increase}>+</button> <span style={{ color: "whitesmoke" }}> Location </span><button onClick={decrease}>-</button> </>
                </th>
              </tr>
            </thead>





            <>
              {quake.map(earthshaking => {

                let time = (new Date(Number(earthshaking.properties.time)).getMonth() + 1) + "-" + (new Date(Number(earthshaking.properties.time)).getDate())
                console.log(time)
                return (

                  <tr>                    <td style={{ color: "plum" }}>{`${time}`}</td>

                    <td style={{ color: "yellowgreen" }}>{earthshaking.properties.mag.toFixed(2)}</td>
                    <td style={{ color: "whitesmoke" }}>{earthshaking.properties.place}</td>
                  </tr>
                )
              })}
            </>


          </table>



        </div>
      )
    }
  }

  return (
    <>{renderContents()}</>

  )



}
export default App

