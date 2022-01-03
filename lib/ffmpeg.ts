const getFFmpeg = () => {
  if (!("FFmpeg" in window)) {
    throw new Error("FFmpeg could not be loaded.");
  } else if (!("SharedArrayBuffer" in window)) {
    throw new Error("SharedArrayBuffer could not be used.");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).FFmpeg;
};

let ffmpeg = null;
const loadFFmpeg = async () => {
  if (ffmpeg == null) {
    const { createFFmpeg } = getFFmpeg();
    ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();
  }
  return ffmpeg;
};

export interface ConvertSetting {
  frameRate: number;
  sizeType: "height" | "width";
  sizePixel: number;
}


export const convVideoToGif = async (file: File, settings: ConvertSetting): Promise<Buffer> => {
  const ffmpeg = await loadFFmpeg();
  const { frameRate, sizeType, sizePixel } = settings;

  const { fetchFile } = getFFmpeg();
  ffmpeg.FS("writeFile", file.name, await fetchFile(file));

  await ffmpeg.run(
    "-i", file.name,
    "-r", `${frameRate}`,
    "-vf", `scale=${sizeType === "width" ? sizePixel : -1}:${sizeType === "height" ? sizePixel : -1},fade=t=in:st=0:d=0.05`,
    "output.gif",
  );
  return ffmpeg.FS("readFile", "output.gif").buffer;
};

export const checkCanUseFFmpeg = (): /* errorMessage: */ string | null => {
  try {
    getFFmpeg();
    return null;
  } catch (err) {
    return err.message;
  }
};
