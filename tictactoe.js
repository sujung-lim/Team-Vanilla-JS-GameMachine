// O, X 선택
let suePlayer = '';
let sueComputer = '';

window.onload = function () {
    let oButton = document.querySelector('.sue-main-o');
    let xButton = document.querySelector('.sue-main-x');

    let sueHomeScreen = document.querySelector('#sue-home-screen');
    let sueGameScreen = document.querySelector('#sue-game-screen');

    oButton.addEventListener('click', function() {
        suePlayer = 'O';
        sueComputer = 'X';

        sueHomeScreen.style.display = 'none';
        sueGameScreen.style.display = 'block';

        sueStartGame();
    })

    xButton.addEventListener('click', function() {
        suePlayer = 'X';
        sueComputer = 'O';

        sueHomeScreen.style.display = 'none';
        sueGameScreen.style.display = 'block';

        sueStartGame();
    })
}

// 게임 화면
const sueCells = document.querySelectorAll('.sue-cell');
let sueStartCells = ["", "", "", "", "", "", "", "", ""];
let sueCurrentPlayer = "O"; // O를 선택하면 항상 게임 먼저 시작하기 
let sueRunning = false;
let sueGameEnded = false;

function sueStartGame() {
    sueStartCells = ["", "", "", "", "", "", "", "", ""];
    sueCurrentPlayer = "O";
    sueRunning = true;
    sueGameEnded = false;
    console.log("Current player: " + sueCurrentPlayer);

    sueCells.forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    });
}

// 셀 선택시 
function cellClickHandler() {
    if (!sueRunning || sueGameEnded) return;

    const cell = this;
    const index = parseInt(cell.dataset.cellIndex);

    if (sueStartCells[index] === "") {
        sueStartCells[index] = sueCurrentPlayer;
        cell.textContent = sueCurrentPlayer;

        const winner = sueGameWin();
        if (winner) {
          sueEndGame(winner);
          return;
        }

        sueCurrentPlayer = sueCurrentPlayer === "O" ? "X" : "O";
    }
}

// 이긴 사람 확인하기
const sueGameWin = () => {
    const sueWinConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 가로
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 세로
        [0, 4, 8], [2, 4, 6] // 대각선
    ];

    // 게임에서 이겼을 경우
    for (const condition of sueWinConditions) {
        const [a, b, c] = condition;
        if (
            sueStartCells[a] !== "" &&
            sueStartCells[a] === sueStartCells[b] &&
            sueStartCells[a] === sueStartCells[c]
        ) {
            return sueStartCells[a]; // 이긴 플레이어 반환
        }
    }
    return ""; // 아무도 게임에서 이기지 않았을 경우
}

//게임 종료 후 처리
function sueEndGame(winner) {
    sueGameEnded = true;
    sueCells.forEach(cell => {
      cell.removeEventListener('click', cellClickHandler);
    });
  
    if (winner === suePlayer) {
      sueShowModal("Congrats, You won!");
    } else if (winner === sueComputer) {
      sueShowModal("The computer wins.");
    } else {
      sueShowModal("It's a tie!");
    }
  }
  

// 게임 결과 메시지 모달 창
const sueModal = document.getElementById('sueModal');
    // 승부 결과 메시지와 함께 모달 창 띄우기
function sueShowModal(message) {
    const modalText = document.getElementById('sueModalText');

    modalText.textContent = message;
    sueModal.style.display = 'block';
}

    // 모달창 숨기기
function hideModal() {
    sueModal.style.display = 'none';
}

    // 게임 끝난 후 이 상태로 쭉 진행할 것인지, 처음부터 다시 시작할 것인지 선택하기
const sueContinueBtn = document.getElementById('sueContinueBtn');
const sueResetBtn = document.getElementById('sueResetBtn');

sueContinueBtn.addEventListener('click', function() {
    hideModal();

    // 게임 셀 비우기
    sueCells.forEach(cell => {
        cell.textContent = "";
    })

    //새로운 게임 시작
    sueStartGame();
})

sueResetBtn.addEventListener('click', function() {
    hideModal();

    // 게임 셀 비우기
    sueCells.forEach(cell => {
        cell.textContent = "";
    })

    //새로운 게임 시작
    sueStartGame();
})

