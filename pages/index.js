import Head from 'next/head'
import {useState, useEffect, useCallback} from 'react'
import styles from '../styles/index.module.css'
import {convVideoToGif, initFFmpeg} from "../lib/ffmpeg";
import Unsupported from "../components/unsupported";
import Log from "../components/log";

const Home = () => {
  const [support, setSupport] = useState(false)
  const [file, setFile] = useState(null)
  const [frameRate, setFrameRate] = useState(10)
  const [gifUrl, setGifUrl] = useState('')
  const [logs, setLogs] = useState([])

  useEffect(() => setSupport('SharedArrayBuffer' in window), [])

  const transcode = () => {
    if (file != null) {
      convVideoToGif(file, {frameRate}, setLogs).then(setGifUrl).catch(console.error)
    }
  }

  return (
    <>
      <Head>
        <title>Video to GIF</title>
        <script src="https://unpkg.com/@ffmpeg/ffmpeg@0.9.4/dist/ffmpeg.min.js"/>
      </Head>

      <div className={styles.wrapper}>
        <main className={styles.content}>
          <h1>Video to GIF</h1>
          {support ? (
            <>
              <div className={styles.centering}>
                <input type="file" onChange={(event) => setFile(event.target.files[0])}/>
              </div>
              <div className={styles.centering}>
                <h2>フレームレート</h2>
                <input
                  type="range" min="1" max="30" step="1"
                  value={frameRate}
                  onChange={(event) => setFrameRate(event.target.value)}
                />
                <span>{frameRate}FPS</span>
              </div>
              <div className={styles.centering}>
                <button className={styles.button} onClick={transcode} disabled={file == null}>
                  Convert to GIF
                </button>
              </div>
              <div className={styles.centering}>
                <Log logs={logs}/>
              </div>
              {gifUrl !== '' && (
                <section className={styles.output}>
                  <img className={styles.gif} alt="Output GIF" src={gifUrl}/>
                  <a className={styles.button} href={gifUrl} download={`${file.name}.gif`}>ダウンロード</a>
                </section>
              )}
            </>
          ) : <Unsupported/>}
        </main>
      </div>

      <footer className={styles.footer}>
        &copy; 2020{' '}
        <a
          href="https://hyiromori.com/"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.copyright}
        >hyiromori</a>
      </footer>
    </>
  )
}

export default Home;
