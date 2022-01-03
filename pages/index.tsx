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
import { useVideoFile } from "../lib/hooks/use_video_file";
import { useConvertSetting } from "../lib/hooks/use_convert_setting";

const Home = () => {
  const [status, setStatus] = useState(null);
  const { convertSetting, updateConvertSetting } = useConvertSetting();
  const { setVideoFile, videoFile, videoUrl } = useVideoFile();
  const { addHistory, histories } = useHistory();

  const { frameRate } = convertSetting;
  const FFmpegErrorMessage = checkCanUseFFmpeg();

  const transcode = async (): Promise<void> => {
    if (status != null || videoFile == null) return;
    setStatus("Converting...");
    try {
      const gifData = await convVideoToGif(videoFile, { frameRate });
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
        <meta property="og:title" content="Video to GIF"/>
        <meta property="og:description" content="Convert video to gif on browser. powered by ffmpeg.wasm."/>
        <meta property="og:image" content="https://video-to-gif.vercel.app/logo_1200x1200.png"/>
        <meta property="og:url" content="https://video-to-gif.vercel.app/"/>
        <meta property="og:site_name" content="Video to GIF"/>
        <meta property="og:locale" content="ja-JP"/>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content="Video to GIF"/>
        <meta name="twitter:description" content="Convert video to gif on browser. powered by ffmpeg.wasm."/>
        <meta name="twitter:image" content="https://video-to-gif.vercel.app/logo.png"/>
        <meta name="twitter:site" content="@mryhryki"/>
        <title>Video to GIF</title>
        <script src="/ffmpeg.min.js"/>
      </Head>

      <DropOrPasteVideo onVideoFileDrop={setVideoFile}>
        <Header/>
        <Content errorMessage={FFmpegErrorMessage}>
          {videoFile == null ? (
            <SelectVideoFile onVideoFileSelected={setVideoFile}/>
          ) : (
            <>
              <div>
                <h2>Frame Rate</h2>
                <div>
                  <input
                    type="range" min="1" max="30" step="1"
                    value={frameRate}
                    onChange={(event) => updateConvertSetting({ frameRate: parseInt(event.target.value, 10) })}
                  />
                </div>
                <div>{frameRate}FPS</div>
              </div>
              <div>
                <button onClick={transcode} disabled={status != null || videoFile == null}>
                  Convert
                </button>
              </div>
            </>
          )}
          <>
            {status != null && (
              <section>
                <div>{status}</div>
              </section>
            )}
          </>
        </Content>
        <History histories={histories}/>
        <Footer/>
      </DropOrPasteVideo>
    </>
  );
};

export default Home;
