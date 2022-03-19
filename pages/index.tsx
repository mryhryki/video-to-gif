import React from "react";
import Head from "next/head";
import { DropOrPasteVideo } from "../components/drop_or_paste_video";
import { SelectVideoFile } from "../components/select_video_file";
import { checkCanUseFFmpeg, convVideoToGif } from "../lib/ffmpeg";
import { useState } from "react";
import { useHistory } from "../lib/hooks/use_history";
import { Header } from "../components/header";
import { Content } from "../components/content";
import { History } from "../components/history";
import { Footer } from "../components/footer";
import { useConvertSetting } from "../lib/hooks/use_convert_setting";
import { Settings } from "../components/settings";
import { Status } from "../components/status";

const Home = () => {
  const [status, setStatus] = useState(null);
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
      setStatus(`ERROR: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <meta property="og:title" content="Video to GIF" />
        <meta property="og:description" content="Convert video to gif on browser. powered by ffmpeg.wasm." />
        <meta property="og:image" content="https://video-to-gif.vercel.app/logo_1200x1200.png" />
        <meta property="og:url" content="https://video-to-gif.vercel.app/" />
        <meta property="og:site_name" content="Video to GIF" />
        <meta property="og:locale" content="ja-JP" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Video to GIF" />
        <meta name="twitter:description" content="Convert video to gif on browser. powered by ffmpeg.wasm." />
        <meta name="twitter:image" content="https://video-to-gif.vercel.app/logo_1200x1200.png" />
        <meta name="twitter:site" content="@mryhryki" />
        <title>Video to GIF</title>
        <script src="/ffmpeg.min.js" />
      </Head>

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
    </>
  );
};

export default Home;
