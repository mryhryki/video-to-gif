import Head from 'next/head'
import {useState} from 'react'
import styles from '../styles/index.module.css'

const Home = () => {
  const [file, setFile] = useState(null)
  const [gifUrl, setGifUrl] = useState('')
  console.log(file)

  const transcode = () => {
    if (file == null) {
      return
    }
    console.log("TODO: transcode")
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
