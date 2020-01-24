let AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();

function load(file) {
  context.decodeAudioData(file, function(buffer) {
    fdata = decode(buffer);
    audio = play(buffer);
  });
}

function play(buffer) {
  // We have to create source every time we load a new song
  let source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
  return source;
}

function stop() {
  if (audio) {
    audio.stop();
  }
}

function decode(buffer) {
  const treshold = 0.05; // sound peak value to compare to
  const pace = 22000; // pace to go over data (1s = 44mHz, 20000 = 1/2 sec)
  const rawData = buffer.getChannelData(0); // 32bit float arrray with raw wavelength data from -1 to +1 at 44mHz
  const filteredData = [];
  for (let i = 0; i < rawData.length; i += pace) {
    if (Math.abs(rawData[i]) > treshold) {
      filteredData.push(rawData[i]);
    } else {
      filteredData.push(0);
    }
  }
  return filteredData;
}

function handleDrop(e, callback) {
  e.preventDefault();
  e.stopPropagation();

  // Only one file
  if (e.dataTransfer.files.length > 1) {
    console.log("Please drop one file!");
    return;
  }

  let file = e.dataTransfer.files[0];

  // Only audio files
  if (file.type !== "audio/mpeg") {
    console.log("Audio files only!");
    return;
  }

  var reader = new FileReader();

  reader.onload = function() {
    callback(reader.result);
  };

  reader.readAsArrayBuffer(file);
}

// Event listeners for dropping an audio file
// Prevent browser from opening the file by default
document.addEventListener("dragover", e => e.preventDefault());
document.addEventListener("click", stop);
document.addEventListener("drop", e => handleDrop(e, load));
