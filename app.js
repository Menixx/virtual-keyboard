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

// function correctText(el) {
//     if (el == 'caps') return 'Caps Lock'
//     return el
// }

function createKey(symb) {
    const button = document.createElement('button');
    button.textContent = symb;
    button.id = symb;
    if (symb == 'caps') {
        const light = document.createElement('div');
        light.id = 'light'
        button.appendChild(light);
        keyBoard.appendChild(button);
    } else
    keyBoard.appendChild(button); 
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
    for (let letter of letters.en) {
        let key = document.getElementById(letter)
        if (key.textContent === letter) {
            key.textContent = letters.ua[letters.en.indexOf(letter)]
        } else {
            key.textContent = letter
        }
    }
})

