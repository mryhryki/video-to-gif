const logs = []

const getFFmpeg = () => {
  if (('FFmpeg' in window) && ('SharedArrayBuffer' in window)) {
    return window.FFmpeg;
  }
  throw new Error('FFmpeg がロードできません')
}

let ffmpeg = null
const loadFFmpeg = async (setLogs) => {
  console.debug(ffmpeg)
  if (ffmpeg == null) {
    const {createFFmpeg} = getFFmpeg();
    ffmpeg = createFFmpeg({
      log: true,
      logger: ({type, message}) => {
        logs.push(`[${type}]: ${message}`)
        setLogs(logs)
      }
    });
    await ffmpeg.load()
  }
  return ffmpeg
}

export const convVideoToGif = async (file, options, setLogs) => {
  if (file == null) {
    return
  }
  const ffmpeg = await loadFFmpeg(setLogs)
  const {fetchFile} = getFFmpeg();
  ffmpeg.FS('writeFile', file.name, await fetchFile(file));

  await ffmpeg.run(
    '-i', file.name,
    '-r', `${options.frameRate}`,
    '-vf', 'fade=t=in:st=0:d=0.05',
    'output.gif'
  );
  return URL.createObjectURL(new Blob([ffmpeg.FS('readFile', 'output.gif').buffer], {type: 'image/gif'}))
}
