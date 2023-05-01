const symbols = [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y','u','i','o','p','[',']','\\','delete',
    'caps','a','s','d','f','g','h','j','k','l',';',"'",'enter',
    'shift','z','x','c','v','b','n','m',',','.','/','up','r-shift',
    'ctrl','win','alt','space','r-alt','r-ctrl','left','down','right', 'lang'
    ];
const letters = {
    en: [
        '`','q','w','e','r','t','y','u','i','o','p','[',']',
        'a','s','d','f','g','h','j','k','l',';',"'",
        'z','x','c','v','b','n','m',',','.'
    ],
    ua: [
        "'",'й','ц','у','к','е','н','г','ш','щ','з','х','ї',
        'ф','і','в','а','п','р','о','л','д','ж',"є",
        'я','ч','с','м','и','т','ь','б','ю'
    ]
}
let capsActive = false;

const entry = document.createElement('p')
entry.id = 'entry'
document.body.appendChild(entry)

const keyBoard = document.createElement('div')
keyBoard.id = 'key-board'
document.body.appendChild(keyBoard)

function switchLetter(letter) {
    if (letters.en.includes(letter)) {
        let i = letters.en.indexOf(letter)
        return letters.ua[i]
    } else {
        return letter
    }
}

function createKey(symb) {
    const button = document.createElement('button');
    button.textContent = localStorage.getItem('currentLayout') ? switchLetter(symb) : symb;
    button.id = symb;
    if (symb == 'caps') {
        const light = document.createElement('div');
        light.id = 'light'
        button.textContent = 'CapsLock'
        button.appendChild(light);
    } else if (symb === 'tab') {
        button.textContent = 'Tab'
    } else if (symb === 'shift' || symb === 'r-shift') {
        button.textContent = 'Shift'
    } else if (symb === 'ctrl' || symb === 'r-ctrl') {
        button.textContent = 'Ctrl'
    } else if (symb === 'alt' || symb === 'r-alt') {
        button.textContent = 'Alt'
    } else if (symb === 'delete') {
        button.textContent = 'Delete'
    } else if (symb === 'enter') {
        button.textContent = 'Enter'
    } else if (symb === 'space') {
        button.textContent = '.'
    } else if (symb === 'up') {
        button.textContent = '↑'
    } else if (symb === 'down') {
        button.textContent = '↓'
    } else if (symb === 'left') {
        button.textContent = '←'
    } else if (symb === 'right') {
        button.textContent = '→'
    } else if (symb === 'backspace') {
        button.textContent = '⇐ Backspace'
    } else if (symb === 'lang') {
        button.textContent = localStorage.getItem('currentLayout') ? 'UA' : 'EN';
    } else if (symb === 'win') {
        button.textContent = 'Win';
    } else {
        button.className = 'printable'
    }
    keyBoard.appendChild(button); 

    button.addEventListener('click', () => {
        if (button.className === 'printable') {
            entry.textContent += button.textContent
        } else if (button.id === 'space') {
            entry.textContent += ' '
        } else if (button.id === 'backspace') {
            entry.textContent = entry.textContent.slice(0, -1)
        } else if (button.id === 'delete') {
            entry.textContent = ''
        }
    })
}

for (let el of symbols) {
    createKey(el);
}

//functional: virtual keysrokes light up by pressing physical ones

function getRightId(value) {
    if (value == 'Tab' || value == 'Shift' || value == 'Alt' || value == 'Backspace' || value == 'Enter' || value == 'Delete') {
        return value[0].toLowerCase() + value.slice(1)
    } else if (value == 'Control') {
        return 'ctrl'
    } else if (value == 'Meta') {
        return 'win'
    } else if (value == ' ') {
        return 'space'
    } else if (value == 'ArrowUp') {
        return 'up'
    } else if (value == 'ArrowDown') {
        return 'down'
    } else if (value == 'ArrowRight') {
        return 'right'
    } else if (value == 'ArrowLeft') {
        return 'left'
    }
    return value
}

document.addEventListener('keydown', (e) => {
    if (e.key == 'Tab' || e.key == 'Alt' || e.code == 'Space' || e.code == 'Enter') {
        e.preventDefault()
    } 

    if (e.code === 'CapsLock') {
        capsActive = !capsActive;
        document.getElementById('light').classList.toggle('active', capsActive);
    }

    if (e.code === 'ShiftRight') {
        let k = document.getElementById('r-shift')
        k.classList.add('pressed')
    } else if (e.code === 'ControlRight') {
        let k = document.getElementById('r-ctrl')
        k.classList.add('pressed')
    } else if (e.code === 'AltRight') {
        let k = document.getElementById('r-alt')
        k.classList.add('pressed')
    } else {
        let k = document.getElementById(getRightId(e.key))
        k.classList.add('pressed')
    }  
})

document.addEventListener('keyup', (e) => {
    if (e.code === 'ShiftRight') {
        let k = document.getElementById('r-shift')
        k.classList.remove('pressed')
    } else if (e.code === 'ControlRight') {
        let k = document.getElementById('r-ctrl')
        k.classList.remove('pressed')
    } else if (e.code === 'AltRight') {
        let k = document.getElementById('r-alt')
        k.classList.remove('pressed')
    } else {
        let k = document.getElementById(getRightId(e.key))
        k.classList.remove('pressed')
    }
})

//functional: switching keyboard layouts

let langButton = document.getElementById('lang')
langButton.addEventListener('click', () => {
    if (!localStorage.getItem('currentLayout')) {
        for (let letter of letters.en) {
            let key = document.getElementById(letter)
            key.textContent = letters.ua[letters.en.indexOf(letter)]
        }
        localStorage.setItem('currentLayout', 'ua')
        langButton.textContent = 'UA'
    } else {
        for (let letter of letters.en) {
            let key = document.getElementById(letter)
            key.textContent = letter
        }
        localStorage.removeItem('currentLayout')
        langButton.textContent = 'EN'
    }
})

