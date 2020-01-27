let AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();
let source;
let audioData = null;
let isPlaying = false;

function load(file) {
  source = context.createBufferSource();
  context.decodeAudioData(file, function(buffer) {
    source.buffer = buffer;
    source.connect(context.destination);
    audioData = decode(buffer);
  });
}

function play() {
  source.start(0);
  isPlaying = true;
}

function stop() {
  source.stop(0);
  isPlaying = false;
  audioData = null;
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

function audioState() {
  if (audioData == null) {
    return "No audio";
  } else {
    if (isPlaying == false) {
      return "Play";
    } else {
      return "Stop";
    }
  }
}

function updateTimeline(frame, gap) {
  let timeline = [];
  let firstInView = 0;
  if (frame > 600) {
    firstInView = (frame - 600) % gap;
  }

  return timeline;
}

// Dropping an audio file
// Prevent browser from opening the file by default
document.addEventListener("dragover", e => e.preventDefault());
document.addEventListener("drop", e => handleDrop(e, load));

// Playing an audio
document.getElementById("canvas").addEventListener("click", () => {
  if (audioData != null) {
    if (isPlaying == false) {
      play();
    } else {
      stop();
    }
  }
});

export { audioState, updateTimeline, isPlaying };
