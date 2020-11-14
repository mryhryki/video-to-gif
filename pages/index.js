import Head from 'next/head'
import {useState} from 'react'
import styles from '../styles/index.module.css'
import {convVideoToGif} from "./lib/ffmpeg";

const Home = () => {
  const [file, setFile] = useState(null)
  const [gifUrl, setGifUrl] = useState('')

  const transcode = () => {
    if (file == null) {
      return
    }
    convVideoToGif(file).then(setGifUrl).catch(console.error)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Video to GIF</title>
        <script src="https://unpkg.com/@ffmpeg/ffmpeg@0.9.4/dist/ffmpeg.min.js"/>
      </Head>

      <main>
        <h1>Video to GIF</h1>
        <p>
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0])
            }}
          />
        </p>
        <p>
          <button onClick={transcode}>
            Convert to GIF
          </button>
        </p>
        {gifUrl !== '' && (
          <p>
            <img alt="Output GIF" src={gifUrl}/>
          </p>
        )}
      </main>

      <footer className={styles.footer}>
        &copy; 2020 <a href="https://hyiromori.com/" target="_blank" rel="noreferrer noopener">hyiromori</a>
      </footer>
    </div>
  )
}

export default Home;
