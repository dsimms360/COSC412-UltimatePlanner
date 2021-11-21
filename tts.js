    var txtInput = document.querySelector('#txtInput');
    var voiceList = document.querySelector('#voiceList');
    var btnSpeak = document.querySelector('#btnSpeak');

    const rate = document.querySelector('#rate');
    const rateValue = document.querySelector('#rate-value');
    const pitch = document.querySelector('#pitch');
    const pitchValue = document.querySelector('#pitch-value');

    var synth = window.speechSynthesis;
    var voices = [];

    PopulateVoices();
    if(speechSynthesis !== undefined){
        speechSynthesis.onvoiceschanged = PopulateVoices;
    }

    btnSpeak.addEventListener('click', ()=> {
        var toSpeak = new SpeechSynthesisUtterance(txtInput.value);
        var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
        voices.forEach((voice)=>{
            if(voice.name === selectedVoiceName){
                toSpeak.voice = voice;
            }
        });
        toSpeak.rate = rate.value;
        toSpeak.pitch = pitch.value;
        synth.speak(toSpeak);
    });

    function PopulateVoices(){
        voices = synth.getVoices();
        var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
        voiceList.innerHTML = '';
        voices.forEach((voice)=>{
            var listItem = document.createElement('option');
            listItem.textContent = voice.name;
            listItem.setAttribute('data-lang', voice.lang);
            listItem.setAttribute('data-name', voice.name);
            voiceList.appendChild(listItem);
        });
        voiceList.selectedIndex = selectedIndex;
    }
//Rate and pitch change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
