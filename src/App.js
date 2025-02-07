import { useState, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundMusic from "./assets/music.mp3";
import gif1 from "./assets/valentine.gif";
import gif2 from "./assets/thankyou.gif";
import mynigga from "./assets/abc.gif";
import thevideo from "./assets/for-you.gif";
import kuromi1 from "./assets/kuromi1.png";
import kuromi2 from "./assets/kuromi2.png";
import emailjs from "emailjs-com";
import "./styles.css";
import malaTang from "./assets/mala_tang.jpg";
import tiantianChickenRice from "./assets/tiantian_chicken_rice.jpg";
import malaXiangGuo from "./assets/mala_xiang_guo.jpg";
import massamanCurry from "./assets/massaman_curry.jpg";
import salmonDong from "./assets/salmon_dong.jpeg";
import sushiro from "./assets/sushiro.jpg";
import tidnoiHaidilao from "./assets/tidnoi_haidilao.jpg";
import hokkeSashimi from "./assets/hokke_sashimi.jpg";
import a5Wagyu from "./assets/a5_wagyu.jpeg";
import mookata from "./assets/mookata.jpg";
import kenomjeen from "./assets/kenomjeen.jpg";
import chiangmaiGlassNoodles from "./assets/chiangmai_glass_noodles.jpeg";
import suki from "./assets/suki.jpg";

import nomwanCafe from "./assets/nomwan_cafe.jpeg";
import afterYou from "./assets/after_you.jpg";
import noseTea from "./assets/nose_tea.jpeg";
import sevenEleven from "./assets/7_11.jpg";
import myAss from "./assets/my_ass.gif";
import salmonDong2 from "./assets/salmon_dong_2.jpg";
import iceCream from "./assets/ice_cream.jpg";
import somtam from "./assets/somtam.jpg";

import movieNight from "./assets/movie_night.jpeg";
import walkDogs from "./assets/walk_dogs.jpg";
import playSims from "./assets/play_sims.jpg";
import bowling from "./assets/bowling.jpg";
import napMoonlight from "./assets/nap_moonlight.jpg";
import paintPicture from "./assets/paint_picture.jpg";
import arcadeFun from "./assets/arcade_fun.jpeg";
import karaoke from "./assets/karaoke.jpeg";
import shoppingSpree from "./assets/shopping_spree.jpg";
import parkPicnic from "./assets/park_picnic.jpeg";
import thrifting from "./assets/thrifting.jpg";
import escapeRoom from "./assets/escape_room.jpeg";
import iceSkating from "./assets/ice_skating.jpeg";

// Function to play background music
function BackgroundMusic() {
  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.play().catch(error => console.log("Autoplay blocked", error));
    return () => audio.pause();
  }, []);
  return null;
}

// Home page component
function Home() {
  const [yesSize, setYesSize] = useState(1);
  const [popups, setPopups] = useState([]);
  const navigate = useNavigate();

  const handleNoClick = () => {
    setYesSize(yesSize + 0.2);
    setPopups([...popups, "Please say yes! 💖"]);
  };

  return (
    <div className="page bg-pink">
      <BackgroundMusic />
      {popups.map((msg, index) => (
        <motion.div key={index} className="popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{msg}</motion.div>
      ))}
      <h1>Will you be my Valentine?</h1>
      <div className="buttons">
        <motion.button className="yes-btn" style={{ transform: `scale(${yesSize})` }} onClick={() => navigate("/thankyou")}>Yes</motion.button>
        <button className="no-btn" onClick={handleNoClick}>No</button>
      </div>
      <img src={gif1} alt="Cute GIF" className="gif" />
    </div>
  );
}

// Thank you page component
function ThankYou() {
  const navigate = useNavigate();
  return (
    <div className="page bg-purple">
      <h1>Thank you for clicking Yes!</h1>
      <p>Before that, continue pressing the button, trust me!</p>
      <button className="main-btn" onClick={() => navigate("/pick-date")}>Trust Me!</button>
      <img src={gif2} alt="Cute GIF" className="gif" />
    </div>
  );
}

// Pick date page component
function PickDate({ date, setDate }) {
  const [popup, setPopup] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!date) {
      setPopup("Please pick a date! 💖 Don't you want to go out with me?");
    } else {
      navigate("/pick-food");
    }
  };

  return (
    <div className="page bg-yellow">
      <h1>Please pick a date when you're free</h1>
      <input type="date" className="date-picker" onChange={(e) => setDate(e.target.value)} />
      <button className="main-btn" onClick={handleNext}>Next</button>
      {popup && <motion.div className="popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{popup}</motion.div>}
    
      <img src={thevideo} alt="Pick a date gif" className="bottom-media" />
    </div>
  );
}

function SelectionPage({ title, options, selected, setSelected, nextPath, images }) {
  const navigate = useNavigate();

  const toggleSelection = (option) => {
    setSelected(prev => prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]);
  };

  return (
    <div className="page">
      <h1 className="selection-page-heading">{title}</h1>
      
      {/* Left random image */}
      <img src={kuromi1} alt="Random Decoration" className="random-img left" />
      
      <div className="options-grid">
        {options.map((option, index) => (
          <motion.div key={option} className={`option ${selected.includes(option) ? 'selected' : ''}`} onClick={() => toggleSelection(option)} whileHover={{ scale: 1.1 }}>
            <img src={images[index]} alt={option} className="option-img" />
            <p>{option}</p>
          </motion.div>
        ))}
      </div>

      {/* Right random image */}
      <img src={kuromi2} alt="Random Decoration" className="random-img right" />

      <button className="main-btn" onClick={() => selected.length > 0 && navigate(nextPath)}>Next</button>
    </div>
  );
}



// Confirm page component
function Confirm({ date, food, dessert, activity }) {
  const navigate = useNavigate();
  
  const sendEmail = () => {
    emailjs.send("service_kp3zigp", "template_p1a3hzs", { date, food, dessert, activity, to_email: "ftyk96@gmail.com" }, "x5_m7MwS5BHB-P7dG")
      .then(() => navigate("/success"));
  };

  const renderList = (items) => (
    <ul>
      {items.length > 0 ? (
        items.map((item, index) => (
          <li key={index}>{item}</li>
        ))
      ) : (
        <li>Not selected</li>
      )}
    </ul>
  );

  return (
    <div className="page bg-red">
      <h1>Confirmation Details</h1>
      <div className="invoice-container">
        <div className="invoice">
          <div className="invoice-header">Valentine's Day Invitation</div>
          <div className="invoice-subtitle">Confirmation Details</div>
          <div className="invoice-body">
            <div className="invoice-item">
              <span>Date:</span>
              <span>{date || "Not selected"}</span>
            </div>
            <div className="invoice-item">
              <span>🍜 Food:</span>
              <div>{renderList(food)}</div>
            </div>
            <div className="invoice-item">
              <span>🍰 Dessert:</span>
              <div>{renderList(dessert)}</div>
            </div>
            <div className="invoice-item">
              <span>🎡 Activity:</span>
              <div>{renderList(activity)}</div>
            </div>
          </div>
          <div className="invoice-footer">
            <div className="separator"></div>
            <div className="invoice-total">Total: Please Confirm Details</div>
            <div className="invoice-buttons">
              <button className="main-btn" onClick={sendEmail}>Yes, Confirm</button>
              <button className="main-btn" onClick={() => navigate("/pick-date")}>No, Go Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// Success page component
function Success() {
  const navigate = useNavigate();
  return (
    <div className="page bg-pink">
      <h1>Thank you for being my Valentine!</h1>
      <p>Invitation has been sent to your email!</p>
      <button className="main-btn" onClick={() => navigate("/")}>Back to first page</button>
    
      <img src={mynigga} alt="Valentine GIF" className="bottom-media" />
    </div>
  );
}

// Main App component
function App() {
  const [date, setDate] = useState("");
  const [food, setFood] = useState([]);
  const [dessert, setDessert] = useState([]);
  const [activity, setActivity] = useState([]);

  // Food, dessert, and activity options
  const foodOptions = [
    "Mala Tang (麻辣烫)", "Tiantian Chicken Rice", "Mala Xiang Guo (麻辣香锅)", "Massaman Curry",
    "Salmon-dong", "Sushiro", "Tidnoi / Haidilao / Hotpotman", "Hokke + Hotate + Prawn Sashimi!!!",
    "A5 Wagyu Premium Beef", "Mookata!!", "Kenomjeen", "Chiangmai Glass Noodles", "Suki"
  ];
  const foodImages = [
    malaTang, tiantianChickenRice, malaXiangGuo, massamanCurry,
    salmonDong, sushiro, tidnoiHaidilao, hokkeSashimi,
    a5Wagyu, mookata, kenomjeen, chiangmaiGlassNoodles, suki
  ];

  const dessertOptions = [
    "Nomwan Cafe", "After You", "NOSE TeA / OWL / bearhouse", "7-11", "My Ass", "Salmon Dong 2", "Ice Cream", "Somtam (the dog)"
  ];
  const dessertImages = [
    nomwanCafe, afterYou, noseTea, sevenEleven,
    myAss, salmonDong2, iceCream, somtam
  ];
  const activityOptions = [
    "Movie Night @ Major Cineplex", "Walk Dogs", "Play Sims Together", "Bowling @ ONe Bangkok", "Nap Under Moonlight Skies",
    "Paint a Picture with You in the Waves", "Arcade Fun", "Karaoke", "Shopping Spree @ Centralworld!", "Park Picnic @ Lumpini",
    "Thrifting @ Bangsue!", "Escape Room", "Ice Skating @ Futurepark!"
  ];
  const activityImages = [
    movieNight, walkDogs, playSims, bowling, napMoonlight,
    paintPicture, arcadeFun, karaoke, shoppingSpree, parkPicnic,
    thrifting, escapeRoom, iceSkating
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/pick-date" element={<PickDate date={date} setDate={setDate} />} />
        {/* Selection page for food with title */}
        <Route path="/pick-food" element={<SelectionPage title="What would you like to eat?" options={foodOptions} selected={food} setSelected={setFood} nextPath="/pick-dessert" images={foodImages} />} />
        {/* Selection page for dessert with title */}
        <Route path="/pick-dessert" element={<SelectionPage title="What we having for dessert?" options={dessertOptions} selected={dessert} setSelected={setDessert} nextPath="/pick-activity" images={dessertImages} />} />
        {/* Selection page for activity with title */}
        <Route path="/pick-activity" element={<SelectionPage title="What should we do after?" options={activityOptions} selected={activity} setSelected={setActivity} nextPath="/confirm" images={activityImages} />} />
        <Route path="/confirm" element={<Confirm date={date} food={food} dessert={dessert} activity={activity} />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;