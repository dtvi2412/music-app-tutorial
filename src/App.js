import { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './App.css';
import { musics } from './data';
function App() {
  const [musicCurrent, setMusicCurrent] = useState({
    id: null,
    linkMusic: null,
  });

  const handlePlay = (id, linkMusic) => {
    setMusicCurrent({
      id: id,
      linkMusic: linkMusic,
    });
  };

  const handleNext = () => {
    if (musicCurrent.id >= musics.length) {
      setMusicCurrent({
        id: 1,
        linkMusic: musics[0],
      });

      return;
    }

    setMusicCurrent({
      id: musicCurrent.id + 1,
      linkMusic: musics[musicCurrent.id].linkMusic,
    });
  };

  const handlePrev = () => {
    if (musicCurrent.id === 1) {
      setMusicCurrent({
        id: musics.length,
        linkMusic: musics[musics.length - 1].linkMusic,
      });
      return;
    }

    setMusicCurrent({
      id: musicCurrent.id - 1,
      linkMusic: musics[musicCurrent.id - 2].linkMusic,
    });
  };
  return (
    <div className="App">
      {musics.map((music) => (
        <div key={music.id}>
          <div
            onClick={() => handlePlay(music.id, music.linkMusic)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: `${
                music.id === musicCurrent.id ? '#3737ff' : '#000064'
              }`,
              padding: '14px',

              border: `2px solid ${
                music.id === musicCurrent.id ? '#96ff96' : '#00ba00'
              }`,
            }}
          >
            <img
              style={{
                width: 50,
                height: 50,
                borderRadius: '8px',
                marginRight: 14,
              }}
              src={music.linkImg}
              alt={music.name}
            />
            <h1 style={{ color: 'white', fontSize: '1rem' }}>{music.name}</h1>
          </div>
          {music.id === musicCurrent.id && (
            <div
              style={{
                background: `url("https://wallpaper.dog/large/20496726.jpg")`,
                width: '100%',
                padding: '14px 0',
              }}
            >
              <div className="circle">
                <img
                  src={music.linkImg}
                  alt={music.name}
                  style={{ width: 100, height: 100 }}
                />
              </div>
              <AudioPlayer
                onClickNext={handleNext}
                onClickPrevious={handlePrev}
                autoPlay
                src={music.linkMusic}
                showSkipControls={true}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
