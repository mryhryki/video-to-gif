const getFFmpeg = () => {
  if (!("FFmpeg" in window)) {
    throw new Error("FFmpeg がロードできません");
  } else if (!("SharedArrayBuffer" in window)) {
    throw new Error("SharedArrayBuffer が使用できません");
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

interface Options {
  frameRate: number;
}

export const convVideoToGif = async (file: File, options: Options): Promise<Buffer> => {
  const ffmpeg = await loadFFmpeg();
  const { fetchFile } = getFFmpeg();
  ffmpeg.FS("writeFile", file.name, await fetchFile(file));

  await ffmpeg.run(
    "-i", file.name,
    "-r", `${options.frameRate}`,
    "-vf", "fade=t=in:st=0:d=0.05",
    "output.gif",
  );
  return ffmpeg.FS("readFile", "output.gif").buffer;
};

let canUseFFmpeg: boolean | null = null;
export const checkCanUseFFmpeg = (): boolean => {
  try {
    if (canUseFFmpeg != null) {
      return canUseFFmpeg;
    }
    getFFmpeg();
    return (canUseFFmpeg = true);
  } catch {
    return (canUseFFmpeg = false);
  }
};
