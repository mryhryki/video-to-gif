import { useState } from "react";

interface UseVideoFileState {
  setVideoFile: (videoFile: File) => void;
  videoFile: File | null;
  videoUrl: string | null;
}

export const useVideoFile = (): UseVideoFileState => {
  const [videoFile, _setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const setVideoFile = (videoFile: File) => {
    _setVideoFile(videoFile);
    setVideoUrl(URL.createObjectURL(videoFile));
  };

  return { setVideoFile, videoFile, videoUrl };
};
