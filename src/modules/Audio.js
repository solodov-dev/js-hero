export default function createAudio() {
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  let context = new AudioContext();

  function bufferLoader(buffer) {
    context.decodeAudioData(buffer);
  }

  function playSound(buffer) {
    let source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
  }

  return { bufferLoader, playSound };
}
