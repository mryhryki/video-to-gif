import Head from 'next/head'
import {useState} from 'react'
import {createFFmpeg, fetchFile} from '@ffmpeg/core'
import styles from '../styles/index.module.css'
// import 'https://unpkg.com/@ffmpeg/ffmpeg@0.9.4/dist/ffmpeg.min.js'

// const ffmpeg = createFFmpeg({log: true});

const Home = () => {
  const [file, setFile] = useState(null)
  const [gifUrl, setGifUrl] = useState('')
  console.log(file)

  const transcode = async () => {
    if (file == null) {
      return
    }
    // const name = file.name
    // await ffmpeg.load();
    // ffmpeg.FS('writeFile', name, await fetchFile(file));
    // await ffmpeg.run('-i', name, 'output.gif');
    // const data = ffmpeg.FS('readFile', 'output.gif');
    // setGifUrl(URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'})));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Video to GIF</title>
      </Head>

      <main>
        <h1>Video to GIF</h1>
        <p>
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.value)
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
