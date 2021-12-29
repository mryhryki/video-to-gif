const getFFmpeg = () => {
  if (!('FFmpeg' in window)) {
    throw new Error('FFmpeg がロードできません')
  } else if (!('SharedArrayBuffer' in window)) {
    throw new Error('SharedArrayBuffer が使用できません')
  }
  return window.FFmpeg;
}

let ffmpeg = null
const loadFFmpeg = async () => {
  if (ffmpeg == null) {
    const {createFFmpeg} = getFFmpeg();
    ffmpeg = createFFmpeg({log: true});
    await ffmpeg.load()
  }
  return ffmpeg
}

export const convVideoToGif = async (file, options) => {
  if (file == null) {
    return
  }
  const ffmpeg = await loadFFmpeg()
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
