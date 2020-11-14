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

  useEffect(() => {
    setSupport('SharedArrayBuffer' in window)
    initFFmpeg(({type, message}) => setLogs([...logs, `${type}: ${message}`]))
  }, [])

  if (!support) {
    return (
      <h1>このブラウザでは実行できません</h1>
    )
  }

  const transcode = () => {
    if (file == null) {
      return
    }
    convVideoToGif(file, {frameRate}).then(setGifUrl).catch(console.error)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Video to GIF</title>
        <script src="https://unpkg.com/@ffmpeg/ffmpeg@0.9.4/dist/ffmpeg.min.js"/>
      </Head>

      <main>
        <h1>Video to GIF</h1>
        {support ? (
          <>
            <p>
              <input
                type="file"
                onChange={(event) => {
                  setFile(event.target.files[0])
                }}
              />
            </p>
            <p>
              <input
                type="range"
                value={frameRate}
                min="1"
                max="30"
                step="1"
                onChange={(event) => {
                  setFrameRate(event.target.value)
                }}
              />
              <span>{frameRate}</span>
            </p>
            <p>
              <button onClick={transcode}>
                Convert to GIF
              </button>
            </p>
            <p>
              <Log logs={logs} />
            </p>
            {gifUrl !== '' && (
              <div>
                <img className={styles.gif} alt="Output GIF" src={gifUrl}/>
              </div>
            )}
          </>
          ) : <Unsupported/>}
          </main>

          <footer className={styles.footer}>
          &copy; 2020 <a href="https://hyiromori.com/" target="_blank" rel="noreferrer noopener">hyiromori</a>
          </footer>
          </div>
          )
          }

          export default Home;
