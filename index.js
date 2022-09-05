const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let pass1El = document.getElementById('pass1')
let pass2El = document.getElementById('pass2')
let passButton = document.querySelector('button')

function randomNum() {
    return Math.floor(Math.random() * characters.length)
}

function generatePass() {
    let password = ""
    for (let i = 0; i < 16; i ++) {
        password += (characters[randomNum()])
    }
    
    return password
    
}

function AssignPass() {
    pass1El.textContent = generatePass()
    pass2El.textContent = generatePass()
}

passButton.addEventListener('click', function() {
    AssignPass()
})

document.addEventListener('click', function(event) {

    if (event.target.classList.contains("passfield")) {
        // var copyText = event.target
        console.log(event.target.textContent);
        let clickedItem = event.target.textContent;
        copyTimes(clickedItem);
        // copyText.textContent.select;
        // navigator.clipboard.writeText(copyText.value);
        // alert("Copied the text: " + copyText.value);
        // var copyText = event.target 
    }
    
})

function copyTimes(wow) {
    // console.log(wow)
    navigator.clipboard.writeText(wow);
    // navigator.clipboard.writeText(event.target.textContent.value)
}

