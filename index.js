var characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];
let symbolsArr = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"]
let pass1El = document.getElementById('pass1')
let pass2El = document.getElementById('pass2')
let passButton = document.querySelector('button')
let copyModal = document.getElementById('copy-modal');
let slideRange = document.getElementById('slide-range')
let sliderText = document.getElementById('slide-value-display')
let currentCharacters = []
let selectedLength = slideRange.value

// Filtering the password symbols according to user selection of 'numbers' and 'symbols' checkboxes

// function characterFilter(arr) {

//     newArr = []

//     let numbersChecked = document.getElementById('numbers').checked
//     let symbolsChecked = document.getElementById('symbols').checked


//     if (numbersChecked && symbolsChecked) {

//         console.log('numbers and symbols are checked')

//         currentCharacters = characters

//         console.log(currentCharacters)

//     } else if (symbolsChecked) {

//         console.log('symbols are checked, numbers are not')

//         // create new filtered array without numbers

//         for (let i = 0; i < arr.length; i++) {

//             if (Number.isNaN(parseInt(arr[i]))) {
//                 newArr.push(arr[i])
//             }   

//         }

//         currentCharacters = newArr

//         console.log(currentCharacters)

//     } else if (numbersChecked && !symbolsChecked) {

//         console.log('numbers are checked, symbols are not')

//         newArr = characters.filter(item => !symbolsArr.includes(item))

//         currentCharacters = newArr

//         console.log(currentCharacters)

//     } else {
        
//         console.log('neither numbers or symbols are checked')

//             let newArr = []

//             for (let i = 0; i < arr.length; i++) {

//                if (Number.isNaN(parseInt(arr[i]))) {
//                     newArr.push(arr[i])
//                 }   

//             }

//             newArr = newArr.filter(item => !symbolsArr.includes(item))

//             currentCharacters = newArr

//             console.log(currentCharacters)

//     }



// }

function characterFilter(arr) {

    newArr = []

    let numbersChecked = document.getElementById('numbers').checked
    let symbolsChecked = document.getElementById('symbols').checked

    function removeNumbers(arr) {

        for (let i = 0; i < arr.length; i++) {

            if (Number.isNaN(parseInt(arr[i]))) {
                newArr.push(arr[i])
            }   

        }

        currentCharacters = newArr 

        console.log(currentCharacters)

    }

    function removeSymbols() {

        newArr = currentCharacters.filter(item => !symbolsArr.includes(item))

        currentCharacters = newArr

        console.log(currentCharacters)

    }


    if (numbersChecked && symbolsChecked) {

        console.log('numbers and symbols are checked')

        currentCharacters = characters

        console.log(currentCharacters)

    } else if (symbolsChecked && !numbersChecked) {

        console.log('symbols are checked, numbers are not')

        removeNumbers(currentCharacters)

    } else if (numbersChecked && !symbolsChecked) {

        console.log('numbers are checked, symbols are not')

        removeSymbols(currentCharacters)


    } else {
        
        console.log('neither numbers or symbols are checked')

        removeNumbers(currentCharacters)
        removeSymbols(currentCharacters)

    }



}


// Set an event listener here for the checkboxes which runs a function whenever they change state

// var checkbox = document.querySelectorAll('input[type=checkbox]')

// checkbox.addEventListener('change', function() {
//     characterFilter(characters)
// })

for (const checkbox of document.querySelectorAll('input[type=checkbox]')) {

    checkbox.addEventListener('change', function() {
    
    characterFilter(currentCharacters)
    
    if (pass1El.textContent != "") {
        AssignPass(selectedLength)
    }
    
    })

}

characterFilter(currentCharacters)

// Setting default slider value and writing to slider display text

function setSliderDefault() {
    slideRange.value = 10
    sliderText.textContent = slideRange.value
}

setSliderDefault()

// Setting password length by slider

slideRange.oninput = function() {
    console.log(slideRange.value)
    selectedLength = slideRange.value
    sliderText.textContent = slideRange.value
    if (pass1El.textContent != "") {
        AssignPass(selectedLength)
    }
}
// Getting random strings for the password to show on the page

function randomNum() {
    return Math.floor(Math.random() * currentCharacters.length)
}

function generatePass(length) {
    let password = ""
    for (let i = 0; i < length; i ++) {
        password += (currentCharacters[randomNum()])
    }
    
    return password
    
}

function AssignPass(length) {
    pass1El.textContent = generatePass(length)
    pass2El.textContent = generatePass(length)
}

passButton.addEventListener('click', function() {
    AssignPass(selectedLength)
})



document.addEventListener('click', function(event) {

   
// MAKE THIS SHIT PINK GOD DAMMIT 


    if ((event.target.classList.contains('passfield') || event.target.parentNode.classList.contains('passfield')) && event.target.textContent != "") {


        if (copyModal.classList.contains('get-animated')) {
            
            copyModal.classList.remove('get-animated');
            copyModal.classList.add('get-animated'); 
            console.log("slow down")
        } else {
            copyModal.classList.add('get-animated'); 
        }

        // send clicked password string to copying function
        console.log(event.target.textContent);
        let clickedPass = event.target.textContent;
        copyToClipboard(clickedPass);
        

    }
    
})


// copy the clicked text to the clipboard
function copyToClipboard(PassText) {
    navigator.clipboard.writeText(PassText);
}


copyModal.addEventListener('animationend', function() {
    console.log('Animation end detected')
    copyModal.classList.remove('get-animated')
})

