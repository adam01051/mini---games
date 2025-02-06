let body = document.getElementById('body')
let container = document.getElementById('container')
let container2 = document.getElementById('conatiner2')
let span  = document.getElementById('span')
let button = document.getElementById('btn')
let nextStep = '<i id="x" class=\'bx bx-x\'></i>'
const divs = document.querySelectorAll('.arry')
console.log(divs)
let isFinished = false


let setGameStatus = message => {
    

    span.innerText = message
}
const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const checkWin = ()=>{
    const win = winLines.find(winLine => {
        const first = divs[winLine[0]].innerHTML;
        const second = divs[winLine[1]].innerHTML;
        const third = divs[winLine[2]].innerHTML;
        let t = third === ''
        return first === second && second === third && t===false
        
    })
    const winner =  nextStep === '<i id="x" class=\'bx bx-x\'></i>'?'Stop Game 0 ':'Stop Game X '
    setGameStatus(winner)
    if(win){
        container.style.opacity = '-1'
        container.style.zIndex = '-1'
        container2.style.display = 'block'
    }
    if(!win){
        return false;
    }
    console.log(win);
    isFinished = true
    
}
let count = 0
  const handleClick = div=>{
    if(div.innerHTML === '' ){
    div.innerHTML = nextStep ==='<i id="x" class=\'bx bx-x\'></i>'?'<i id="x" class=\'bx bx-x\'></i>':'<i id="o" class=\'bx bx-radio-circle\'>';
    nextStep = nextStep ==='<i id="x" class=\'bx bx-x\'></i>'?'<i id="o" class=\'bx bx-radio-circle\'>':'<i id="x" class=\'bx bx-x\'></i>';
    count++;
    checkWin();
}else{
    alert('This block already has a value')  
}
}
divs.forEach((div)=>{
    div.addEventListener('click',()=>handleClick(div))
})

divs.forEach((div)=>{
    div.addEventListener('mouseover', ()=>{
        if(count === 0){
            div.classList.add('arry1');
        }else if(count === 1 && div.innerHTML ===''){
            div.classList.add('arry2');
        }else if(count === 2 && div.innerHTML === ''){
            div.classList.add('arry1');
        }else if(count === 3 && div.innerHTML ===''){
            div.classList.add('arry2');
        }else if(count === 4 && div.innerHTML === ''){
            div.classList.add('arry1');
        }else if(count === 5 && div.innerHTML ===''){
            div.classList.add('arry2');
        }else if(count === 6 && div.innerHTML === ''){
            div.classList.add('arry1');
        }else if(count === 7 && div.innerHTML ===''){
            div.classList.add('arry2');
        }else if(count === 8 && div.innerHTML === ''){
            div.classList.add('arry1');
            
        }else if(count === 9 && div.innerHTML ===''){
            
            div.classList.add('arry2');
           
        }
        
    div.addEventListener('mouseout', ()=>{
        div.classList.remove('arry1');
        div.classList.remove('arry2');
    })
})})
