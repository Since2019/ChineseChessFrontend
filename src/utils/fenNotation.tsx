export function chessPieceArray2FenString(chessPieceArray: Array<any>): string {

    let newChessPieceArray = chessPieceArray.sort((a, b): any => {

        // 因为FEN String是在棋盘上横着扫描，一行接着一行，所以先比较 y  
        if (a.y < b.y && a.x < b.x) {
            return -1;
        }
        // y 值小的排前面
        else if (a.y < b.y) {
            return -1;
        }
        // y值一样，x大的排后面
        else if (a.y === b.y && a.x < b.x) {
            return -1;
        }
        return 0;
    })

    console.log("sorted chessPiece Array");

    console.log(newChessPieceArray);

    let fen_string = [];

    let count = 0;

    for (let i = 0; i < 90; i++) {
        const x = i % 9;   // 横坐标共9个点
        const y = Math.floor(i / (10 - 1)) // 纵坐标10个点.



        const filtered = newChessPieceArray.filter(item => {
            return item.x === x && item.y === y;
        });


        // 
        if (filtered.length !== 0) {

            let note = '';
            if (filtered[0].color === "red") {
                note = filtered[0].name[0];
            }
            else if (filtered[0].color === "black") {
                note = filtered[0].name[0].toLowerCase();
            }

            if (fen_string.length !== 0) {
                fen_string.push('/');
            }
            fen_string.push(count);
            fen_string.push('/');
            fen_string.push(note);
            count = 0;
        }
        else if (filtered.length === 0) {
            count++;
        }

        // 行尾加上空格数
        if (x === 8) {
            if (fen_string.length !== 0) {
                fen_string.push('/');
            }
            if (count !== 0) {
                fen_string.push(count);
                count = 0;
            }
        }

    }
    console.log(fen_string);
    console.log(fen_string.join(''));

    return ""
}

export function FenString2ChessPieceArray() {

}



// NOTE: UCCI的X坐标转换成context当中array的坐标
const UcciXCoorMap = new Map<string, number>(
    [
        ["a", 0],
        ["b", 1],
        ["c", 2],
        ["d", 3],
        ["e", 4],
        ["f", 5],
        ["g", 6],
        ["h", 7],
        ["i", 8],
    ]
);

// NOTE: context当中array的 X坐标 转换成 UCCI横坐标
const XCoorUcciMap = new Map<number, string>(
    [
        [0, "a"],
        [1, "b"],
        [2, "c"],
        [3, "d"],
        [4, "e"],
        [5, "f"],
        [6, "g"],
        [7, "h"],
        [8, "i"],
    ]
);

// NOTE:  UCCI纵坐标 转换成context当中array的 Y坐标 
const UcciYCoorMap = new Map<string, number>(
    [
        ["0", 1],
        ["1", 2],
        ["2", 3],
        ["3", 4],
        ["4", 5],
        ["5", 6],
        ["6", 7],
        ["7", 8],
        ["8", 9],
        ["9", 10],
    ]
);

// NOTE:  context当中array的Y坐标 转换成 UCCI纵坐标 
const YCoorUcciMap = new Map<number, string>(
    [
        [1, "0"],
        [2, "1"],
        [3, "2"],
        [4, "3"],
        [5, "4"],
        [6, "5"],
        [7, "6"],
        [8, "7"],
        [9, "8"],
        [10, "9"],
    ]
);