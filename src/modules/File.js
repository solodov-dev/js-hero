export default function handleDrop(e, callback) {
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
