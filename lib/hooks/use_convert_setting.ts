import { useState } from "react";
import { getIntegerInRange } from "../checker";
import { ConvertSetting } from "../ffmpeg";

const DefaultConvertSetting: ConvertSetting = {
  frameRate: 15,
  sizeType: "width",
  sizePixel: -1,
  rangeStart: 0,
  rangeEnd: 0,
};

interface UseConvertSettingState {
  convertSetting: ConvertSetting;
  updateConvertSetting: (partialConvertSetting: Partial<ConvertSetting>) => void;
  videoFile: File | null;
  videoUrl: string | null;
  setVideoFile: (videoFile: File) => void;
}

export const useConvertSetting = (): UseConvertSettingState => {
  const [videoFile, _setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [convertSetting, setConvertSetting] = useState(DefaultConvertSetting);

  const updateConvertSetting = (partialConvertSetting: Partial<ConvertSetting>): void => {
    setConvertSetting((prev) => {
      const next: ConvertSetting = { ...prev, ...partialConvertSetting };
      next.frameRate = getIntegerInRange(next.frameRate, 1, 30);
      next.sizePixel = getIntegerInRange(next.sizePixel, -1, 10000);
      return next;
    });
  };

  const setVideoFile = (videoFile: File) => {
    _setVideoFile(videoFile);
    const url = URL.createObjectURL(videoFile);
    setVideoUrl(url);
    const video = document.createElement("video");
    video.addEventListener("loadedmetadata", () => updateConvertSetting({ rangeStart: 0, rangeEnd: video.duration }));
    video.src = url;
  };

  return { setVideoFile, videoFile, videoUrl, convertSetting, updateConvertSetting };
};
