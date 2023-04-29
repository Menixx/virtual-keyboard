const symbols = [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y','u','i','o','p','[',']','\\','delete',
    'caps','a','s','d','f','g','h','j','k','l',';',"'",'enter',
    'shift','z','x','c','v','b','n','m',',','.','/','up','r-shift',
    'ctrl','win','alt','space','alt','right-ctrl','left','down','right', 'lang'
    ];

const entry = document.createElement('p')
entry.id = 'entry'
document.body.appendChild(entry)

const keyBoard = document.createElement('div')
keyBoard.id = 'key-board'
document.body.appendChild(keyBoard)

function createKey(symb) {
    const button = document.createElement('button');
    button.innerText = symb;
    button.id = symb;
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
    if (e.key == 'Tab' || e.key == 'Alt' || e.key == 'CapsLock') {
        e.preventDefault()
    } 

    let k = document.getElementById(getRightId(e.key))
    //alert(e.key)
    k.classList.add('pressed')
    
})

document.addEventListener('keyup', (e) => {
    let k = document.getElementById(getRightId(e.key))
    k.classList.remove('pressed')
})