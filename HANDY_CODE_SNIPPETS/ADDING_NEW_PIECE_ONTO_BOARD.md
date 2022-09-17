# 将新棋子加入到棋盘上

1. Go to file `src\contexts\BoardContext.tsx`
2. Find line `const [chessPieceArray, setChessPieceArray] = useState([`
3. Add the piece object into the arry:
   ```ts
    ...
        {
            
        }
        ,
        {
            name : "Canon",
            color : "black",
            x : 1, 
            y : 2
        }
    ```