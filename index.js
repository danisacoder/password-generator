var characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];
let numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
let symbolsArr = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"]
let upppercaseArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let lowercaseArr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
let pass1El = document.getElementById('pass1')
let pass2El = document.getElementById('pass2')
let passButton = document.querySelector('button')
let copyModal = document.getElementById('copy-modal');
let slideRange = document.getElementById('slide-range')
let sliderText = document.getElementById('slide-value-display')
let currentCharacters = characters
let selectedLength = slideRange.value
let checkedBoxesArr = []
let uncheckedBoxesArr = []

// updateCharacters()

function getCheckedBoxes() {

    let checkedBoxesArr = []
    
    let checkedBoxesNodeList = document.querySelectorAll('input[type=checkbox]:checked')

    for (let i = 0; i < checkedBoxesNodeList.length; i++) {
        checkedBoxesArr.push(checkedBoxesNodeList[i].id)
    } 

    return checkedBoxesArr

}

function getUncheckedBoxes() {

    uncheckedBoxesArr = []

    let boxesNodeList = document.querySelectorAll('input[type=checkbox]')

    for (let i = 0; i < boxesNodeList.length; i++) {
        if (boxesNodeList[i].checked === false) 
            uncheckedBoxesArr.push(boxesNodeList[i].id)
    }

    return uncheckedBoxesArr 

}

// Set an event listener here for the checkboxes which runs a function whenever they change state

for (const checkbox of document.querySelectorAll('input[type=checkbox]')) {

    checkbox.addEventListener('change', function() {
    
        if (pass1El.textContent != "") {
            AssignPass(selectedLength)
        }

        getCheckedBoxes()
        getUncheckedBoxes()
        updateCharacters()

    })

}

function updateCharacters() {
    // Tell me the array that I need to take out of the options. Then I can filter it out.'

    currentCharacters = characters

    if (uncheckedBoxesArr.length === 0) {

        console.log('nothing unchecked')
        console.log(currentCharacters)

    }

    if (uncheckedBoxesArr.includes('numbers')) {

        let res = currentCharacters.filter(entry => !numbersArr.includes(entry))

        currentCharacters = res

        console.log(currentCharacters)

    }

    if (uncheckedBoxesArr.includes('symbols')) {

        let res = currentCharacters.filter(entry => !symbolsArr.includes(entry))

        currentCharacters = res

        console.log(currentCharacters)

    }

    if (uncheckedBoxesArr.includes('uppercase')) {
                
        let res = currentCharacters.filter(entry => !upppercaseArr.includes(entry))

        currentCharacters = res

        console.log(currentCharacters)

    }

    if (uncheckedBoxesArr.includes('lowercase')) {

        let res = currentCharacters.filter(entry => !lowercaseArr.includes(entry))

        currentCharacters = res

        console.log(currentCharacters)

    }

    AssignPass(selectedLength)

}

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

    if (uncheckedBoxesArr.length === 4) {
        console.log('No characters selected!')
        pass1El.textContent = ""
        pass2El.textContent = ""
    } else {
        pass1El.textContent = generatePass(length)
        pass2El.textContent = generatePass(length)
    }

}

passButton.addEventListener('click', function() {
    AssignPass(selectedLength)
})

// "Copy" modal function

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

