import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import converter from './jsUglifier'

const Main = () => {
  const [value, setValue] = useState('')
  const [uglyValue, setUglyValue] = useState('')
  const [showCpExe, setShowCpExe] = useState(false)
  const examples = [
    `alert("Hello World!")`,

    `const array = [1, 2, 3, 4, 5]\n` +
    `const power = array.map(a => a * a)\n` +
    `alert(power)`,

    `const fib = (n) => {\n`+
    `  if (n <= 0) return 0\n`+
    `  else if (n === 1 || n === 2) return 1\n`+
    `  else return fib(n - 1) + fib(n - 2)\n`+
    `}\n`+
    `alert([1,2,3,4,5,6,7,8,9,10].map(n => fib(n)))`,
  ]

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

  const renderExamples = () => {
    return examples.map(example => {
      return <pre onClick={() => setValue(example)}>{example}</pre>
    })
  }
  return (
    <>
      <div className="title">
        <span className="javascript">JavaScript</span>
        <span className="uglifier">Uglifier</span>
      </div>
      <div className="example-div">
        {renderExamples()}
      </div>
      <div className="textarea-div">
        <textarea id="ugly-input" value={value} onChange={handleChange} placeholder="Enter your JavaScript code here... (Or click the examples above)" />
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
