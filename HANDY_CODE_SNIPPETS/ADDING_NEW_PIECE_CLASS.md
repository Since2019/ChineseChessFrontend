# 将新棋子加入到棋盘上

1. Go to file `src\components\Board.tsx`
2. Import the class into `Board.tsx`
3. Add the piece into `chessPieceElementMap`

## Example:
In file `src\components\Board.tsx`

Import class
```ts
import Pawn from "./Pawn"
```


import Pawn into chessPieceElementMap
```ts
const chessPieceElementMap = new Map<string, any>([
  ...
  ["Pawn",Pawn]
]
```


