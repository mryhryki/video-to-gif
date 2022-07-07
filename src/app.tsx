import React from "react";
import { useState } from "react";
import { DropOrPasteVideo } from "./components/drop_or_paste_video";
import { SelectVideoFile } from "./components/select_video_file";
import { checkCanUseFFmpeg, convVideoToGif } from "./lib/ffmpeg";
import { useHistory } from "./hooks/use_history";
import { Header } from "./components/header";
import { Content } from "./components/content";
import { History } from "./components/history";
import { Footer } from "./components/footer";
import { useConvertSetting } from "./hooks/use_convert_setting";
import { Settings } from "./components/settings";
import { Status } from "./components/status";

export const App = () => {
  const [status, setStatus] = useState<string | null>(null);
  const { setVideoFile, videoFile, videoUrl, convertSetting, updateConvertSetting } = useConvertSetting();
  const { addHistory, histories } = useHistory();

  const FFmpegErrorMessage = checkCanUseFFmpeg();

  const transcode = async (): Promise<void> => {
    if (status != null || videoFile == null) return;
    setStatus("Converting...");
    try {
      const gifData = await convVideoToGif(videoFile, convertSetting);
      setStatus(null);
      await addHistory(gifData);
    } catch (err) {
      setStatus(`ERROR: ${err}`);
      console.error(err);
    }
  };

  return (
    <DropOrPasteVideo onVideoFileDrop={setVideoFile}>
      <Header />
      <Content errorMessage={FFmpegErrorMessage}>
        {videoFile == null ? (
          <SelectVideoFile onVideoFileSelected={setVideoFile} />
        ) : (
          <Settings
            convertSetting={convertSetting}
            updateConvertSetting={updateConvertSetting}
            videoUrl={videoUrl}
            onConvert={transcode}
          />
        )}
        <Status>{status}</Status>
      </Content>
      <History histories={histories} />
      <Footer />
    </DropOrPasteVideo>
  );
};
