import './App.css';
import logo from './public/hostcord.png'
import step1Video from './public/step1.mp4';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div class="card">
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
  <div class="card__content">
  <img src={logo} alt="Logo" class="logo"/>
  <div class="documentation">
  <span class="text-white">1- Upload files to </span><code> #upload</code>
  </div>
  <div class="video">
  <video controls autoplay className="video-content">
                <source src={step1Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
  </div>
    <div class="next-button">
    <a href="https://discord.gg/sadc4eHYFb" target="_blank" rel="noopener noreferrer" class="Btn">
  Upload
  <svg viewBox="0 0 320 512" class="svg">
    <path
      d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"
    ></path>
  </svg>
</a>

    </div>
    </div>
</div>
      </header>
    </div>
  );
}

export default App;
