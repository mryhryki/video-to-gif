const getFFmpeg = () => {
  if (!("FFmpeg" in window)) {
    throw new Error("FFmpeg could not be loaded.");
  } else if (!("SharedArrayBuffer" in window)) {
    throw new Error("SharedArrayBuffer could not be used.");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).FFmpeg;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ffmpeg: any | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadFFmpeg = async (): Promise<any> => {
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
  rangeStart: number;
  rangeEnd: number;
}

export const convVideoToGif = async (file: File, settings: ConvertSetting): Promise<Blob> => {
  const ffmpeg = await loadFFmpeg();
  const { frameRate, sizeType, sizePixel, rangeStart, rangeEnd } = settings;

  const { fetchFile } = getFFmpeg();
  ffmpeg.FS("writeFile", file.name, await fetchFile(file));

  await ffmpeg.run(
    "-i",
    file.name,
    "-r",
    `${frameRate}`,
    "-ss",
    `${rangeStart}`,
    "-to",
    `${rangeEnd}`,
    "-vf",
    `scale=${sizeType === "width" ? sizePixel : -1}:${
      sizeType === "height" ? sizePixel : -1
    },fade=t=in:st=${rangeStart}:d=0.05`,
    "output.gif"
  );
  return ffmpeg.FS("readFile", "output.gif").buffer;
};

export const checkCanUseFFmpeg = (): /* errorMessage: */ string | null => {
  try {
    getFFmpeg();
    return null;
  } catch (err) {
    return `${err}`;
  }
};
