const numberMapping = {
    0: '+[]',
    1: '+!![]',

    // 1+1
    2: '+!![]+ +!![]',

    // 1+1+1
    3: '+!![]+ +!![]+ +!![]',

    // 1<<2
    4: '+!![]<<+!![]+ +!![]',

    // 4+1
    5: '(+!![]<<+!![]+ +!![])+ +!![]',

    // 3<<1
    6: '+!![]+ +!![]+ +!![]<<+!![]',

    // 6+1
    7: '(+!![]+ +!![]+ +!![]<<+!![])+ +!![]',

    // 1<<3
    8: '+!![]<<+!![]+ +!![]+ +!![]',

    // 8+1
    9: '(+!![]<<+!![]+ +!![]+ +!![])+ +!![]',
}

const basis = {
    'true': '!![]',
    'false': '![]',
    'undefined': '{}[""]',
    '"[object Object]"': '""+{}',
    'NaN': '""/""+""',
    'Infinity': '+(+!![]+(![]+"")[+!![]<<+!![]+ +!![]]+ +!![]+""+ +[]+ +[]+ +[])', // 1e1000
    '"constructor"': '(""+{})[(+!![]<<+!![]+ +!![])+ +!![]]+(""+{})[+!![]]+({}[""]+"")[+!![]]+(![]+"")[+!![]+ +!![]+ +!![]]+(!![]+"")[+[]]+(!![]+"")[+!![]]+({}[""]+"")[+[]]+(""+{})[(+!![]<<+!![]+ +!![])+ +!![]]+(!![]+"")[+[]]+(""+{})[+!![]]+(!![]+"")[+!![]]',
    '"toString"': '(!![]+"")[+[]]+(""+{})[+!![]]+(""[(""+{})[(+!![]<<+!![]+ +!![])+ +!![]]+(""+{})[+!![]]+({}[""]+"")[+!![]]+(![]+"")[+!![]+ +!![]+ +!![]]+(!![]+"")[+[]]+(!![]+"")[+!![]]+({}[""]+"")[+[]]+(""+{})[(+!![]<<+!![]+ +!![])+ +!![]]+(!![]+"")[+[]]+(""+{})[+!![]]+(!![]+"")[+!![]]]+"")[(+!![]<<+!![]+ +!![]+ +!![])+ +!![]]+(!![]+"")[+[]]+(!![]+"")[+!![]]+({}[""]+"")[(+!![]<<+!![]+ +!![])+ +!![]]+({}[""]+"")[+!![]]+(""[(""+{})[(+!![]<<+!![]+ +!![])+ +!![]]+(""+{})[+!![]]+({}[""]+"")[+!![]]+(![]+"")[+!![]+ +!![]+ +!![]]+(!![]+"")[+[]]+(!![]+"")[+!![]]+({}[""]+"")[+[]]+(""+{})[(+!![]<<+!![]+ +!![])+ +!![]]+(!![]+"")[+[]]+(""+{})[+!![]]+(!![]+"")[+!![]]]+"")[(+!![])+""+(+!![]<<+!![]+ +!![])]',
}

const alphabetMapping = {
    a: '(false+"")[1]',
    b: '("[object Object]")[2]',
    c: '("[object Object]")[5]',
    d: '(undefined+"")[2]',
    e: '(false+"")[4]',
    f: '(false+"")[0]',
    g: '(""["constructor"]+"")[14]',
    h: '(+(17))["toString"](36)',
    i: '(undefined+"")[5]',
    j: '("[object Object]")[3]',
    k: '(+(20))["toString"](36)',
    l: '(false+"")[2]',
    m: '((+[])["constructor"]+"")[11]',
    n: '(undefined+"")[1]',
    o: '("[object Object]")[1]',
    p: '(/./["constructor"]+"")[14]',
    q: '(+(26))["toString"](36)',
    r: '(true+"")[1]',
    s: '(false+"")[3]',
    t: '(true+"")[0]',
    u: '(undefined+"")[0]',
    v: '(""["constructor"]+"")[25]',
    w: '(+(32))["toString"](36)',
    x: '(/./["constructor"]+"")[13]',
    y: '(Infinity+"")[7]',
    z: '(+(35))["toString"](36)',
    A: '([]["constructor"]+"")[9]',
    B: '((![])["constructor"]+"")[9]',
    E: '(/./["constructor"]+"")[12]',
    F: '((()=>{})["constructor"]+"")[9]',
    I: '(Infinity+"")[0]',
    N: '(NaN+"")[0]',
    O: '("[object Object]")[8]',
    R: '(/./["constructor"]+"")[9]',
    S: '(""["constructor"]+"")[9]',
}

const bufferRelatedAlphabetMapping = {
    C: 'Buffer(",,")["toString"]("base"+64)[1]',
    D: 'Buffer(",=")["toString"]("base"+64)[1]',
    G: 'Buffer(",a")["toString"]("base"+64)[1]',
    H: 'Buffer(",x")["toString"]("base"+64)[1]',
    J: 'Buffer("$")["toString"]("base"+64)[0]',
    K: 'Buffer("(")["toString"]("base"+64)[0]',
    L: 'Buffer(",")["toString"]("base"+64)[0]',
    M: 'Buffer("0")["toString"]("base"+64)[0]',
    P: 'Buffer("<")["toString"]("base"+64)[0]',
    Q: 'Buffer("1")["toString"]("base"+64)[1]',
    T: 'Buffer("10")["toString"]("base"+64)[1]',
    U: 'Buffer("15")["toString"]("base"+64)[2]',
    V: 'Buffer("euA")["toString"]("base"+64)[2]',
    W: 'Buffer("aa")["toString"]("base"+64)[1]',
    X: 'Buffer("_")["toString"]("base"+64)[0]',
    Y: 'Buffer("16")["toString"]("base"+64)[2]',
    Z: 'Buffer("d")["toString"]("base"+64)[0]',
}

const btoaRelatedAlphabetMapping = {
    C: 'btoa(",,")[1]',
    D: 'btoa(",=")[1]',
    G: 'btoa(",a")[1]',
    H: 'btoa(",x")[1]',
    J: 'btoa("$")[0]',
    K: 'btoa("(")[0]',
    L: 'btoa(",")[0]',
    M: 'btoa("0")[0]',
    P: 'btoa("<")[0]',
    Q: 'btoa("1")[1]',
    T: 'btoa("10")[1]',
    U: 'btoa("15")[2]',
    V: 'btoa("euA")[2]',
    W: 'btoa("aa")[1]',
    X: 'btoa("_")[0]',
    Y: 'btoa("16")[2]',
    Z: 'btoa("d")[0]',
}

const NODEJS = 0
const BROWSER = 1

// const PRINT_CHECKING = true
const PRINT_CHECKING = false

let env = null
try {
    if (this === window) {
        env = BROWSER
        console.log('Environment: Web Browser')
    }
} catch {
    env = NODEJS
    console.log('Environment: Node.js')
}

const replaceNumber = (inputStr) => {
    return inputStr.replace(/[0-9]+/g, (match) => {
        if (Number(match) >= 10) {
            return match.split('').map(m => `(${numberMapping[m]})`).join('+""+')
        }
        return numberMapping[match]
    })
}

const replaceBasis = (inputStr) => {
    for (const basisKey in basis) {
        inputStr = inputStr.replace(basisKey, () => {
            return basis[basisKey]
        })
    }
    return inputStr
}

const uglify = (inputStr) => {
    return inputStr.split('').map(char => alphabetMapping[char]).join('+');
}

const printCheckingResult = (key, result) => {
    if (!PRINT_CHECKING) {
        return
    }
    try {
        if (eval(result) === key) {
            if (env === NODEJS) {
                console.log(`${key}: \x1b[1;32m%s\x1b[0m`, 'Correct!')
            } else {
                console.log(`${key}: %cCorrect!`, 'background-color:green;color:white;')
            }
        } else {
            if (env === NODEJS) {
                console.log(`${key}: \x1b[1;31m%s\x1b[0m`, 'Wrong!')
            } else {
                console.log(`${key}: %Wrong!`, 'background-color:red;color:white;')
            }
        }
    } catch {
        if (env === NODEJS) {
            console.log(`${key}: \x1b[1;31m%s\x1b[0m`, 'Wrong!')
        } else {
            console.log(`${key}: %Wrong!`, 'background-color:red;color:white;')
        }
    }
}

const convertReturnNeededCharacter = (string, alphabetMapping) => {
    const convertedCharArray = []
    for (const char of string) {
        let charVal = null
        if (alphabetMapping[char]) {
            charVal = alphabetMapping[char]
        } else if (numberMapping[char]) {
            charVal = `(${numberMapping[char]})`
        } else {
            if (char === '"') {
                charVal = '\'"\''
            } else {
                charVal = `"${char}"`
            }
        }
        convertedCharArray.push(charVal)
    }
    return `(()=>{})[${basis['"constructor"']}](${uglify('return')}+" "+${convertedCharArray.join('+')})()`
}

const handleEndLine = (inputStr) => {
    // Remove comment line
    inputStr = inputStr.replace(/\/\/.*\n/g, '\n')
    // Remove end line after curly brackets and comma
    inputStr = inputStr.replace(/(\{|,)[\n ]+/g, '$1')
    inputStr = inputStr.replace(/[\n ]+\}/g, () => '}')
    // Replace end line with semicolon
    inputStr = inputStr.replace(/\n/g, () => ';')
    return inputStr
}

for (const num in numberMapping) {
    printCheckingResult(Number(num), numberMapping[num])
}

for (const letter in alphabetMapping) {
    alphabetMapping[letter] = replaceNumber(alphabetMapping[letter])
    alphabetMapping[letter] = replaceBasis(alphabetMapping[letter])
    printCheckingResult(letter, alphabetMapping[letter])
}

let base64AlphabetMapping = {}
if (env === NODEJS) {
    base64AlphabetMapping = bufferRelatedAlphabetMapping
} else {
    base64AlphabetMapping = btoaRelatedAlphabetMapping
}



for (const letter in base64AlphabetMapping) {
    const result = convertReturnNeededCharacter(base64AlphabetMapping[letter], alphabetMapping)
    base64AlphabetMapping[letter] = result
    printCheckingResult(letter, result)
}

const characterMapping = { ...alphabetMapping, ...base64AlphabetMapping }

// const inputStr = 'console.log("\t")'
// backtick 不需要跳脫，範例如下
// const b = 'let a = 1;console.log(`${a}`)'
// let inputStr = `${b}`

const converter = (inputStr) => {
    inputStr = handleEndLine(inputStr)
    const inputArr = []
    // Replace all the alphabet and numbers
    for (const char of inputStr) {
        let charVal = null
        if (characterMapping[char]) {
            charVal = characterMapping[char]
        } else if (numberMapping[char]) {
            charVal = `(${numberMapping[char]})`
        } else {
            const charCode = char.charCodeAt()
            if (char === '"') {
                charVal = '\'"\''
            } else if (char === '\\') {
                charVal = '"\\\\"'
            } else if (charCode >= 256) {
                charVal = convertReturnNeededCharacter(`String["fromCharCode"](${charCode})`, characterMapping)
            } else {
                charVal = `"${char}"`
            }
        }
        inputArr.push(charVal)
    }
    const uglifiedInputArr = inputArr.join('+')
    // console.log(uglifiedInputArr)
    // console.log(eval(`(()=>{})[${basis['"constructor"']}](${uglifiedInputArr})()`), '\n')
    return `(()=>{})[${basis['"constructor"']}](${uglifiedInputArr})()`
}

export default converter