const board = [
    ['','',''],
    ['','',''],
    ['','','']
]

let turn = 1 // 0 es user, 1 es pc
const boardContainer = document.querySelector('#board')
const playerDiv = document.querySelector('#player')


startGame()

function startGame(){
    renderBoard()

    const turn = Math.round(Math.random()) + 1;
    console.log(turn)

    renderCurrentPlayer(turn)

    playerPlays(turn)

    
}

function checkIfWinner(){

///all posible positions to evaluate
///p = possibility, s = solution
    const p1 = board[0][0]
    const p2 = board[0][1]
    const p3 = board[0][2]
    const p4 = board[1][0]
    const p5 = board[1][1]
    const p6 = board[1][2]
    const p7 = board[2][0]
    const p8 = board[2][1]
    const p9 = board[2][2]

    const s1 = [p1 , p2, p3]
    const s2 = [p4 , p5, p6]
    const s3 = [p7 , p8, p9]
    const s4 = [p1 , p4, p7]
    const s5 = [p2 , p5, p8]
    const s6 = [p3 , p6, p9]
    const s7 = [p1 , p5, p9]
    const s8 = [p3 , p5, p7]

    const res = [s1,s2,s3,s4,s5,s6,s7,s8].filter((line) => {
        return line[0] + line[1] + line[2] === 'XXX' ||
        line[0] + line[1] + line[2] === 'OOO' 
    })

    if (res.length > 0){ ///hay un ganador...
        if(res[0] === 'XXX'){
            playerDiv.textContent = 'Player 2 won!'
        } else {
            playerDiv.textContent = 'Player 1 won!'
        }
    } else {
        let draw = true
        for (let i = 0; i<board.length; i++){ ///si hay espacio vacio no hay empate aun
            for (let j = 0; j<board.length; j++){
                if(board[i][j] == ''){
                    draw = false
                }
            }
        }
        return draw ? 'draw' : 'none'
    }

}

function playerPlays(turn){
    const cells = document.querySelectorAll('.cell')

    cells.forEach((cell,i) => { ///i se itera de 0 a inf en el foreach

        const column = i % 3
        const row = parseInt(i/3)

        if(board[row][column] === ''){
            cell.addEventListener('click', e=>{
                if(cell.textContent === ''){
                    if (turn === 1){
                        const won = checkIfWinner()
                        if(won === 'none'){
                            board[row][column] = 'O'
                            cell.textContent = board[row][column]
                            turn = 2
                            renderCurrentPlayer(turn)
                        }
                        
                    } else {   
                        const won = checkIfWinner()
                        if(won === 'none'){
                            board[row][column] = 'X'
                            cell.textContent = board[row][column]
                            turn = 1
                            renderCurrentPlayer(turn) 
                        }                   
                                              
                    }
                } else {
                    console.log('no available')
                }
                
            })
        }
    })
}

function renderCurrentPlayer(turn){
    if(turn === 1){
        playerDiv.textContent = 'Player 1'
    } else {
        playerDiv.textContent = 'Player 2'
    }

}

function renderBoard(){
    const html = board.map(row => {
        const cells = row.map(cell => {
            return `<button class="cell">${cell}</button>`
        })
        return `<div class="row">${cells.join("")}</div>`
    })
    
    boardContainer.innerHTML = html.join("")
}


