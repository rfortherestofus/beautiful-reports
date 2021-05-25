/*
 *  openMic - closed captioning for remark.js Slides
 *
 *  Ellis Hughes
 *
 *  Inspired by
 *  https://daverupert.com/2013/11/caption-everything/,
 *  Code cribbed heavily from the xaringanExtra package
 *  webcam addition.
 *
 *  Include after remarkjs slides are initialized.
 *
 */

/* global slideshow */

(function (window, document) {

  const ccOpts = {first: true}
  var recognizing = false;


  function setCCoptions() {
    if(!ccOpts.width){
      const opts = JSON.parse(
        document.getElementById('openMic-cc-options').textContent
      )
      ccOpts.loc = opts.loc || "bottom"
    }
  }


  function createCCelement () {
    setCCoptions()
    var cc = document.createElement("div");
    cc.id = 'openMic-cc-element'
    cc.setAttribute('style', ccOpts.loc + ': 1em; z-index:1000');
    var recognitiontext = document.createElement("span");
    recognitiontext.setAttribute('id', 'openMic-cc-text')
    cc.appendChild(recognitiontext)
    return cc
  }

  function alertNoMic () {
    let msg = 'Microphone is not available in this browser.'
    if (!/^https/.test(window.location.protocol)) {
      msg += '\n\nAre you using https for this site?'
    }
    window.alert(msg)
  }

  function findCCelement () {
    return document.getElementById('openMic-cc-element')
  }

  function startCC () {
    if (document.body.classList.contains('remark-presenter-mode')) {
      return
    }

    if (findCCelement()) {
      return
    }

    if (!navigator.mediaDevices) {
      alertNoMic()
      return
    }

    const cc = createCCelement()
    ccOpts.el = cc
    document.body.appendChild(cc)

    var recognitiontext = document.getElementById('openMic-cc-text');

    recognitiontext.style.display = "inline-block";
    recognition.start();

  }

  function stopCC () {
    var cc_el = findCCelement()
    if (!cc_el) return
    recognition.stop();
    cc_el.parentNode.removeChild(cc_el)
  }

  function capitalize(s) {
      var first_char = /\S/;
      return s.replace(first_char, function(m) {
        return m.toUpperCase();
        });
  }

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
  };

  recognition.onerror = function(event) {};

  recognition.onend = function() {
    recognizing = false;
  };

  recognition.onresult = function(event) {
    var recognitiontext = document.getElementById('openMic-cc-text');
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if(event.results[i][0].confidence > 0.7) {
        recognitiontext.innerHTML = capitalize(event.results[i][0].transcript);
       }
    }
  };

  function toggleCC () {
    findCCelement() ? stopCC() : startCC()
  }

  var lastKeypressTime = 0
  var delta = 500
  function onDoubleClick() {
    thisKeypressTime = new Date()
    if ( thisKeypressTime - lastKeypressTime <= delta ){
      toggleCC();
      thisKeypressTime = 0;
    }
    lastKeypressTime = thisKeypressTime;
  }

  function shiftCCelement (loc){
    cc = findCCelement()
    ccOpts.loc = loc
    cc.setAttribute('style', ccOpts.loc + ': 1em; z-index:1000');
  }


  // kick off recognition
  document.addEventListener('keydown', function (ev) {
    if (ev.code === 'KeyA') {
      onDoubleClick()
    }
    if(ev.code === "KeyU" || ev.code == "KeyD" & recognizing) {
      shiftCCelement(ev.code === "KeyU" ? "top": "bottom")
    }
  })

  document.addEventListener('DOMContentLoaded', function(event){
    toggleCC()
    });

})(window, document)



