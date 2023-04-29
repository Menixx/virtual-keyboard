const symbols = [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y','u','i','o','p','[',']','\\','del',
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

