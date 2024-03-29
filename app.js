let logo = document.getElementById('Logo');
logo.onclick = () =>{
    window.open('./');
}
// Preloder 
let loader = document.querySelector('.preloader');
window.addEventListener('load',()=>{
    loader.style.display = 'none';
})
// Dictionary COde Started
let input = document.getElementById('input');
let searchBtn = document.getElementById('searchbtn');
let errorBox = document.querySelector('.not_found');
let info = document.querySelector('.defination');
let aud = document.querySelector('.audio');
let key = '1ff4b961-c465-4668-8478-89666eb7efff';
let load = document.querySelector('.loading');
let copy = document.querySelectorAll('.suggestion');

searchBtn.addEventListener('click',function(e){
    e.preventDefault();

    // Clear Previous Data
    aud.innerHTML = '';
    info.innerText = '';
    errorBox.innerText = '';
    let word = input.value;
    load.style.display = 'inline-block';
    
    if(word === ''){
        load.style.display = 'none';
        errorBox.style.display = 'inline-block';
        errorBox.textContent = "Please! Enter any Word";
    }else 
    {
        errorBox.style.display = 'none';
        errorBox.textContent = "";}

    getWord(word)
});

async  function getWord(word){

   let url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${key}`;

   const response = await fetch(url);
   const data = await response.json();
   console.log(data);


     // Some Validations
     if(!data.length){
         load.style.display = '';
         info.style.display = "inline-block";
         info.textContent = "Result Didn't Found!"
         return;
     }else if(typeof data[0] === 'string'){
        load.style.display = '';
         info.style.display = "inline-block";
         info.textContent = "Did You Mean!"
         data.forEach(elem=>{
             errorBox.classList.add('sugBox');
             errorBox.style.display = "flex";
            let span = document.createElement('span');
            span.classList.add('suggestion');
            span.innerText = elem;
            errorBox.appendChild(span)
         })
         return;
     }

     // Upper validations passed means We Found Word
     let defi = data[0].shortdef[0];
     info.textContent = defi;
     info.style.display = 'inline-block';
  
    // Audio Rendering
    let soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
        load.style.display = '';
    }
}
function renderSound(soundName){
    
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${key}`;

    let audio = document.createElement('audio');
    audio.src = soundSrc;
    audio.controls ='true';
   aud.appendChild(audio);
   aud.style.display = 'inline-block';
   
   
   return;
}

copy.onclick = function (event){
       console.log('clicked');
}