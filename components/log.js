import styles from '../styles/components/log.module.css'

const Log = ({logs}) => (
  <textarea className={styles.log} value={logs.join("\n")} readOnly rows={5}/>
);

export default Log;
