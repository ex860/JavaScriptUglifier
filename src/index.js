import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import converter from './jsUglifier'

const Main = () => {
  const [value, setValue] = useState('')
  const [uglyValue, setUglyValue] = useState('')
  const [showCpExe, setShowCpExe] = useState(false)

  useEffect(() => {
    document.getElementById('ugly-input').addEventListener('keydown', function (e) {
      const start = this.selectionStart;
      const end = this.selectionEnd;
      switch (e.key) {
        case 'Tab':
          e.preventDefault()
          // set textarea value to: text before caret + tab + text after caret
          this.value = this.value.substring(0, start) + '\t' + this.value.substring(end)

          // put caret at right position again
          this.selectionStart = this.selectionEnd = end + 1
          break
        case '{':
          e.preventDefault()
          this.value = this.value.substring(0, start) + '{' + this.value.substring(start, end) + '}' + this.value.substring(end)
          this.selectionStart = start + 1
          this.selectionEnd = end + 1
          break
        case '[':
          e.preventDefault()
          this.value = this.value.substring(0, start) + '[' + this.value.substring(start, end) + ']' + this.value.substring(end)
          this.selectionStart = start + 1
          this.selectionEnd = end + 1
          break
        case '(':
          e.preventDefault()
          this.value = this.value.substring(0, start) + '(' + this.value.substring(start, end) + ')' + this.value.substring(end)
          this.selectionStart = start + 1
          this.selectionEnd = end + 1
          break
        case '"':
          e.preventDefault()
          this.value = this.value.substring(0, start) + '"' + this.value.substring(start, end) + '"' + this.value.substring(end)
          this.selectionStart = start + 1
          this.selectionEnd = end + 1
          break
        case '\'':
          e.preventDefault()
          this.value = this.value.substring(0, start) + '\'' + this.value.substring(start, end) + '\'' + this.value.substring(end)
          this.selectionStart = start + 1
          this.selectionEnd = end + 1
          break
        default:
          break
      }
    });
  }, [])


  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const uglifiy = () => {
    if (value) {
      setUglyValue(converter(value))
      setShowCpExe(true)
    }
  }

  const copyUglyValue = () => {
    document.querySelector('#ugly-output').select()
    document.execCommand("copy");
    document.querySelector('#ugly-output').blur()
  }

  const execute = () => {
    try {
      (() => { eval(uglyValue) })()
    } catch (err) { console.error(err) }
  }
  return (
    <>
      <h1 className="title">
        <span className="javascript">JavaScript</span>
        <span className="uglifier">Uglifier</span>
      </h1>
      <div className="textarea-div">
        <textarea id="ugly-input" value={value} onChange={handleChange} placeholder="Enter your JavaScript code here..." />
      </div>
      <div className="uglifiy-btn-div">
        <button type="button" onClick={uglifiy}>Uglify</button>
      </div>
      {showCpExe && (
        <div>
          <div className="textarea-div">
            <textarea id="ugly-output" value={uglyValue} readOnly />
          </div>
          <div className="uglifiy-btn-div">
            <button type="button" onClick={copyUglyValue}>Copy</button>
            <button type="button" onClick={execute}>Execute</button>
          </div>
        </div>
      )}
    </>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
