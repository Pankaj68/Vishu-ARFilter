export default function script() {
const startBtn = document.getElementById("startBtn")
const captureBtn = document.getElementById("captureBtn")
const shareBtn = document.getElementById("share")

const startScreen = document.getElementById("startScreen")
const cameraScreen = document.getElementById("cameraScreen")
const creadScreen = document.getElementById("cread")
const creadImg = document.getElementById("creadImg")

const video = document.getElementById("video")
const frameImg = document.getElementById("frameOverlay")
const content = document.getElementById("creadsContent")

/* CAMERA */
async function openCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
    audio: false
  })
  video.srcObject = stream
}

startBtn.onclick = async () => {
  startScreen.style.display = "none"
  cameraScreen.style.display = "flex"
  await openCamera()
}

/* CAPTURE */
captureBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  /* 1️⃣ draw camera frame */
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  /* 2️⃣ draw overlay frame */
  ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

  /* 3️⃣ final image */
  const finalImage = canvas.toDataURL("image/png");

  creadImg.src = finalImage;

  cameraScreen.style.display = "none";
  creadScreen.style.display = "flex";
});

/* SHARE */
shareBtn.onclick = async () => {
  const canvas = await html2canvas(creadImg, {
    useCORS: true,
    backgroundColor: null,
    scale: 2
  })

  canvas.toBlob(async (blob) => {
    const file = new File([blob], "greeting-card.png", {
      type: "image/png"
    })

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Greeting Card"
      })
    } else {
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = "greeting-card.png"
      link.click()
    }
  })
}
}