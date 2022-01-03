import Head from "next/head";
import Unsupported from "../components/unsupported";
import styles from "../styles/index.module.css";
import { checkCanUseFFmpeg, convVideoToGif } from "../lib/ffmpeg";
import { useHistory } from "../lib/hooks/use_history";
import { useEffect, useState } from "react";
import { gifDataToUrl } from "../lib/buffer_to_url";

const Home = () => {
  const [file, setFile] = useState(null);
  const [frameRate, setFrameRate] = useState(10);
  const [status, setStatus] = useState(null);
  const [gifUrl, setGifUrl] = useState("");
  const { addHistory, histories } = useHistory();

  const support = checkCanUseFFmpeg();

  useEffect(() => {
    const history = histories[0];
    if (history == null) return;
    const { gifData } = history;
    setGifUrl(gifDataToUrl(gifData));
  }, [histories]);

  const transcode = async (): Promise<void> => {
    if (status != null || file == null) return;
    setGifUrl("");
    setStatus("Converting...");
    try {
      const gifData = await convVideoToGif(file, { frameRate });
      setStatus(null);
      setGifUrl(gifDataToUrl(gifData));
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
        <meta property="og:image" content="https://video-to-gif.vercel.app/logo.png"/>
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

      <div className={styles.wrapper}>
        <main className={styles.content}>
          <h1 className={styles.centering}>
            <img className={styles.logo} width="320" src="/logo.png" alt="Video to GIF Logo"/>
          </h1>
          {support ? (
            <>
              <div className={styles.centering}>
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                  accept="video/*"
                />
              </div>
              <div className={styles.centering}>
                <h2>Frame Rate</h2>
                <div>
                  <input
                    type="range" min="1" max="30" step="1"
                    value={frameRate}
                    onChange={(event) => setFrameRate(parseInt(event.target.value, 10))}
                  />
                </div>
                <div>{frameRate}FPS</div>
              </div>
              <div className={styles.centering}>
                <button className={styles.button} onClick={transcode} disabled={status != null || file == null}>
                  Convert to GIF
                </button>
              </div>
              {status != null && (
                <section className={styles.centering}>
                  <div className={styles.status}>{status}</div>
                </section>
              )}
              {gifUrl !== "" && (
                <section className={styles.output}>
                  <img className={styles.gif} alt="Output GIF" src={gifUrl}/>
                  <a className={styles.button} href={gifUrl} download={`${file?.name ?? "image"}.gif`}>Download GIF</a>
                </section>
              )}
            </>
          ) : <Unsupported/>}
        </main>
      </div>

      <footer className={styles.footer}>
        &copy; 2020{" "}
        <a
          href="https://mryhryki.com/"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.copyright}
        >mryhryki</a>
      </footer>
    </>
  );
};

export default Home;
