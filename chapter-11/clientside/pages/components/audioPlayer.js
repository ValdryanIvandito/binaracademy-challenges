import React, { useState, useEffect } from 'react';
import styles from "../../styles/audiowrapper.module.css";
import { BsChevronDoubleLeft } from 'react-icons/bs';

const AudioPlayer = ({ userId }) => {
  const [audioSrc, setAudioSrc] = useState(`images/default-audio.mp3`);
  const [customAudioSrc, setCustomAudioSrc] = useState(null);
  const [audioVisible, setAudioVisible] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(false);
  const audioKey = `audio-${userId}`;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAudioSrc(fileUrl);
    }
  };

  const confirmUpload = () => {
    if (customAudioSrc) {
      setAudioSrc(customAudioSrc);
      // Check if localStorage is available before using it
      if (typeof window !== 'undefined') {
        localStorage.setItem(audioKey, customAudioSrc);
      }
      setUploadVisible(false);
    }
  };

  useEffect(() => {
    axios.get('/api/audio-upload')
      .then((response) => {
        const userData = response.data;
        const fetchedUserId = userData.id;

        const audioKey = `audio-${fetchedUserId}`;
        // Check if localStorage is available before using it
        if (typeof window !== 'undefined') {
          const storedCustomAudioSrc = localStorage.getItem(audioKey);
          if (storedCustomAudioSrc) {
            setAudioSrc(storedCustomAudioSrc);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.audiowrapper}>
      <div className={styles.iconWrapper} onClick={() => setAudioVisible(!audioVisible)}>
        <BsChevronDoubleLeft className={`${styles.icon} ${audioVisible ? styles.iconRotate : ''}`} />
      </div>
      <div className={`${styles.audioWrapper} ${audioVisible ? styles.audioVisible : styles.audioHidden}`}>
        <audio controls autoPlay loop>
          <source src={audioSrc} type="audio/mpeg" />
        </audio>
        {uploadVisible ? (
          <div className={styles.uploadWrapper}>
            <div>Upload a custom audio:</div>
            <input type="file" accept="audio/*" onChange={handleFileUpload} />
            <button className={styles.btn} onClick={() => setUploadVisible(false)}>Hide</button>
            <button className={styles.btn} onClick={confirmUpload}>Confirm Upload</button>
          </div>
        ) : (
          <button
            className={styles.configbtn}
            onClick={() => setUploadVisible(true)}
          >
            Customize
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
