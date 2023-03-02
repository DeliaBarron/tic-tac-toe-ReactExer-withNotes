# Tic-Tac-Toe React APP (w/HOOKS)
####Understand the flow click by click, function by function, line by line...
###### This are the notes, which, as I write down, help me to get a grasp of what is going on at every click, or function call.

___
#### Line :one::two: Board.jsx 
``` js
 if(currentSquares[i] || calculateWinner(currentSquares)){
      return;
    }
```
###### Returning early 
Returning early is done by checking for a *true* value and, if so, end the function (the *falsy* value).By returning early we can reduce nested statements (**conditional** statements and make it easier to read).  
In this case, we are checking if the square index (in the board state's array) has already been clicked or better said, **is not null anymore**. At the same time we are calling calculateWinner with the squares state's value (set at the time of the click), every time we call upon it and it doesn't return a value, the funcition won't return early and will keep on going with the next statements.



#### Line :one::six: Board.jsx 
###### Immutability
Arrays and objects in javaScript are mutable by default — their properties and elements can be changed without reassigning a new value.
By taking naturally mutable values and turning them to immutable we get several beneficts such as:
- Improving performance (as for the project's future changes)
- Reducing memory use.
- Thread-safety (multiple threads can reference the same object without interfering with one other)
- **Lower developer mental burden (the object's state won't change and its behavior is always consistent)**

Immutability helps, therefore, to avoid original data to change so that it can be easier to scale up in the future and have acces to data as it comes for further reassignments.

``` js
const nextSquares=currentSquares.slice()
```

Setting immutability to original array of currentSquares (coming from Game's) :
> const currentSquares = history[currentMove]

So that we get copies of the newer Board's state and keep track on them later.

**More info about *history* and *currentMove* later on this README.md**

#### Line :six::four: Board.jsx 
###### calculateWinner(currentSquares)
```js
function calculateWinner(currentSquares){
  const lines=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ] 
  for(let i=0; i<lines.length; i++){
    const [a,b,c]=lines[i]
    if(currentSquares[a] && currentSquares[a]=== currentSquares[b] && currentSquares[a]=== currentSquares[c]){
      //console.log('a, b, c current squares @ calculateWinner: ',currentSquares[a], currentSquares[b], currentSquares[c])
      return currentSquares[a]
    }else if(currentSquares.every((square)=>square!== null)){
      return `CAT'S GAME`
    }
    
  }
}
```
***function calculateWinner(currentSquares)*** recieves the currentSquares array whichs comes from locating at the currentMove index, index that initializes at history's **state**. 
- This state tells what <Square/ > values (from the actual Board state) to calculate on.
- a,b c are extracting the indexes from each lines array element and on each iteration setting the currentSquare index on if's condition to this **a, b, c** values.

`History state is modified (later on) by every CLICK on a SQUARE with value nextSquares.`
`See handleSquareClick(i) section`


#### Line :one::two: Board.jsx
###### handleSquareClick(i)
```js
function handleSquareClick(i){
    //RETURNING EARLY SECTION
    if(currentSquares[i] || calculateWinner(currentSquares)){
      return;
    }
    const nextSquares=currentSquares.slice()
    if(xIsNext){
      nextSquares[i]='X'
    }else {
      nextSquares[i]= 'O'
    }onPlay(nextSquares)
  }
```
handleSquareClick( **i** ) will:
- **Returning Early:** check if square[ i ] was already clicked or if there's a winner already.
- Make a copy of the squares array:
```js
const nextSquares=currentSquares.slice()
```
 coming from: 
```js
//at <Game/>
const currentSquares = history[currentMove]
```
 and calling it **nextSquares**.
- DEPENDING ON WHETHER **xIsNext** is set to a *truthy* or *falsy* state:
 ```js
 
0 % 2 =0 true xIsNext
1 % 2 =1 false !xIsNext
2 % 2 =0 true xIsNext 

/*More of xIsNext state next */
  ```
 &nbsp;&nbsp;&nbsp;&nbsp; **handleSquareClick( i )** will set the Squares component value to **'X'** or **'O'** via the [ i ] from the nextSquares array's element that was clicked.
  &nbsp;&nbsp;&nbsp;&nbsp;**i** comes through as param from the clicked <Square/ > calling *handleSquareClick( ) function*.
- Call **onPlay** function passing nextSquares array (copy of the currentSquares plus the new 'x' or 'o' values).

#### Line :one::six: Game.jsx
```js
function handlePlay(nextSquares){
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
      setHistory(nextHistory)
      setCurrentMove(nextHistory.length -1) 
    }
```
###### handlePlay(nextSquares) will:

- Be actionated by the same Square click calling handleSquareClick( i )
- Set history state the new values incoming as **nextSquares** from *handleSquareClick( i )* as a whole new array, meaning **history** will now have the original array (initiated null) **plus the sliced array nextSquares** values pushed into it and so on with every click you do over a < Square /> component.
- Set a new const **currentHistory** which usage comes handy until the user wants to ***'GO BACK IN TIME'*** .  

## GO BACK IN TIME
Going back in time will allow us to re-render the Squares components inside the Board component according to the past moves done over the time during the game.
To do so, we'll have to:
- Iterate over the history array we already have state of.
- Get the play's index (from history array) to know the Squares values which shape THAT play we want to go back to - and render **this** play.
- Take this already done and re-rendered play and set it as the **currentMove**.
- Slicing history up to this move clicked and setting it as nextHistory so that it can be able to forget about it and start playing from then on if you want to.

###### Going back in time
```js
export default function Game(){
    const [history, setHistory]=useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove]= useState(0)
    const xIsNext= currentMove % 2 === 0
 
    // const currentSquares = history[history.length-1];
    const currentSquares = history[currentMove]
    console.log(currentSquares,'current squares')

    function handlePlay(nextSquares){
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
      setHistory(nextHistory)
      setCurrentMove(nextHistory.length -1) 
    }

    function jumpToMove(moveIndex){
      setCurrentMove(moveIndex)
      console.log(history)
      /*0 % 2 =0 true xIsNext
        1 % 2 =1 false !xIsNext
        2 % 2 =0 true xIsNext
      */
    } 

    return (
      <div className="game container-fluid text-center">
        <div className="game-board">
          <Board xIsNext={xIsNext} currentSquares={currentSquares} onPlay={handlePlay}></Board>
        </div>
        <div className="game-history">
            <History currentMove={currentMove} history={history} jumpToMove={jumpToMove} onClick></History>
        </div>
        
       
      </div>
    )
}
```
___




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
