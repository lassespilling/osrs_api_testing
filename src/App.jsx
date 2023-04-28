import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { FaCrown } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';

import axios from "axios";
import Attack from "./assets/skills-circle/Attack.jpg";
import Defence from "./assets/skills-circle/Defence.jpg";
import Strength from "./assets/skills-circle/Strength.jpg";
import Hitpoints from "./assets/skills-circle/Hitpoints.jpg";
import Ranged from "./assets/skills-circle/Ranged.jpg";
import Prayer from "./assets/skills-circle/Prayer.jpg";
import Magic from "./assets/skills-circle/Magic.jpg";
import Cooking from "./assets/skills-circle/Cooking.jpg";
import Woodcutting from "./assets/skills-circle/Woodcutting.jpg";
import Fletching from "./assets/skills-circle/Fletching.jpg";
import Fishing from "./assets/skills-circle/Fishing.jpg";
import Firemaking from "./assets/skills-circle/Firemaking.jpg";
import Crafting from "./assets/skills-circle/Crafting.jpg";
import Smithing from "./assets/skills-circle/Smithing.jpg";
import Mining from "./assets/skills-circle/Mining.jpg";
import Herblore from "./assets/skills-circle/Herblore.jpg";
import Agility from "./assets/skills-circle/Agility.jpg";
import Thieving from "./assets/skills-circle/Thieving.jpg";
import Slayer from "./assets/skills-circle/Slayer.jpg";
import Farming from "./assets/skills-circle/Farming.jpg";
import Runecrafting from "./assets/skills-circle/Runecrafting.jpg";
import Hunter from "./assets/skills-circle/Hunter.jpg";
import Construction from "./assets/skills-circle/Construction.jpg";
import { AiFillGithub } from 'react-icons/ai';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};


const keysFull = [
  { title: "Overall" },
  { title: "Attack", icon: Attack },
  { title: "Defence", icon: Defence },
  { title: "Strength", icon: Strength },
  { title: "Hitpoints", icon: Hitpoints },
  { title: "Ranged", icon: Ranged },
  { title: "Prayer", icon: Prayer },
  { title: "Magic", icon: Magic },
  { title: "Cooking", icon: Cooking },
  { title: "Woodcutting", icon: Woodcutting },
  { title: "Fletching", icon: Fletching },
  { title: "Fishing", icon: Fishing },
  { title: "Firemaking", icon: Firemaking },
  { title: "Crafting", icon: Crafting },
  { title: "Smithing", icon: Smithing },
  { title: "Mining", icon: Mining },
  { title: "Herblore", icon: Herblore },
  { title: "Agility", icon: Agility },
  { title: "Thieving", icon: Thieving },
  { title: "Slayer", icon: Slayer },
  { title: "Farming", icon: Farming },
  { title: "Runecrafting", icon: Runecrafting },
  { title: "Hunter", icon: Hunter },
  { title: "Construction", icon: Construction },
  // "League Points",
  // "Bounty Hunter - Hunter",
  // "Bounty Hunter - Rogue",
  // "Clue Scrolls (all)",
  // "Clue Scrolls (beginner)",
  // "Clue Scrolls (easy)",
  // "Clue Scrolls (medium)",
  // "Clue Scrolls (hard)",
  // "Clue Scrolls (elite)",
  // "Clue Scrolls (master)",
  // "LMS - Rank",
  // "PvP Arena - Rank",
  // "Soul Wars Zeal",
  // "Rifts closed",
  // "Abyssal Sire",
  // "Alchemical Hydra",
  // "Artio",
  // "Barrows Chests",
  // "Bryophyta",
  // "Callisto",
  // "Cal'varion",
  // "Cerberus",
  // "Chambers of Xeric",
  // "Chambers of Xeric: Challenge Mode",
  // "Chaos Elemental",
  // "Chaos Fanatic",
  // "Commander Zilyana",
  // "Corporeal Beast",
  // "Crazy Archaeologist",
  // "Dagannoth Prime",
  // "Dagannoth Rex",
  // "Dagannoth Supreme",
  // "Deranged Archaeologist",
  // "General Graardor",
  // "Giant Mole",
  // "Grotesque Guardians",
  // "Hespori",
  // "Kalphite Queen",
  // "King Black Dragon",
  // "Kraken",
  // "Kree'Arra",
  // "K'ril Tsutsaroth",
  // "Mimic",
  // "Nex",
  // "Nightmare",
  // "Phosani's Nightmare",
  // "Obor",
  // "Phantom Muspah",
  // "Sarachnis",
  // "Scorpia",
  // "Skotizo",
  // "Spindel",
  // "Tempoross",
  // "The Gauntlet",
  // "The Corrupted Gauntlet",
  // "Theatre of Blood",
  // "Theatre of Blood: Hard Mode",
  // "Thermonuclear Smoke Devil",
  // "Tombs of Amascut",
  // "Tombs of Amascut: Expert Mode",
  // "TzKal-Zuk",
  // "TzTok-Jad",
  // "Venenatis",
  // "Vet'ion",
  // "Vorkath",
  // "Wintertodt",
  // "Zalcano",
  // "Zulrah",
];

const keys = [
  { title: "Overall" },
  { title: "Att", icon: Attack },
  { title: "Def", icon: Defence },
  { title: "Str", icon: Strength },
  { title: "Hp", icon: Hitpoints },
  { title: "Rng", icon: Ranged },
  { title: "Pray", icon: Prayer },
  { title: "Mage", icon: Magic },
  { title: "Cook", icon: Cooking },
  { title: "Wc", icon: Woodcutting },
  { title: "Fletch", icon: Fletching },
  { title: "Fish", icon: Fishing },
  { title: "Fm", icon: Firemaking },
  { title: "Craft", icon: Crafting },
  { title: "Smith", icon: Smithing },
  { title: "Mining", icon: Mining },
  { title: "Herb", icon: Herblore },
  { title: "Agil", icon: Agility },
  { title: "Thiev", icon: Thieving },
  { title: "Slay", icon: Slayer },
  { title: "Farm", icon: Farming },
  { title: "Rc", icon: Runecrafting },
  { title: "Hunter", icon: Hunter },
  { title: "Con", icon: Construction }
];
const PlayerData = ({ p, delay, last, onReady }) => {
  const [data, setData] = useState(null);
  const updateReady = useCallback(
    (s) => {
      onReady(s);
    },
    [onReady],
  );

  useEffect(() => {
    if (p) {
      setTimeout(() => {
        // const backendUrl = import.meta.env.VITE_PROXY;
        axios
          .get(
            // "/api/"
            // `https://api.allorigins.win/get?url=${encodeURIComponent(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${p}`)}`
            "https://api.codetabs.com/v1/proxy?quest=https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player="
            +
            p
            // {}
          )
          .then((response) => {
            let obj = {};
            console.log(response);
            if (response?.data) {
              response.data.split("\n").forEach((skillData, index) => {
                let arr = skillData.split(",");
                let rank = arr[0];
                let level = arr[1];
                let experience = arr[2];
                if (keys[index]) {
                  obj[keys[index].title] = {
                    // raw: skillData,
                    rank,
                    level,
                    experience,
                  };
                }
              });
              setData(obj);
              if (last) {
                updateReady(true);
              }
            }
          })
          .catch(e => {
            console.error(e);
            updateReady(false);
          });
      }, delay);
    }
  }, [p, delay, last, updateReady]);
  const { width } = useWindowDimensions();
  return (
    <>
      {data ? (
        <table className="player-stats">
          <tbody>
            {Object.entries(data)?.map(
              (keyVal, index) =>
                keyVal && (
                  <tr
                    className="player-stat-row"
                    key={p + keyVal[0]}
                    data-key={keyVal[0]}
                    data-val={keyVal[1].level}
                  >
                    <td className="player-stat-col">
                      {keys[index].icon && <img
                        src={keys[index].icon}
                        className="player-stat-icon"
                      />}
                      <span className="player-stat">{width > 900 ? keysFull[index].title : keys[index].title}</span>
                    </td>
                    <td className="player-stat-col">{keyVal[1]?.level}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      ) : (
        "Loading..."
      )}
    </>
  );
};

function App() {


  let [searchParams, setSearchParams] = useSearchParams();
  // function useStickyState(defaultValue, key) {
  //   const [value, setValue] = useState(() => {
  //     const stickyValue = window.localStorage.getItem(key);
  //     return stickyValue ? JSON.parse(stickyValue) : defaultValue;
  //   });
  //   useEffect(() => {
  //     window.localStorage.setItem(key, JSON.stringify(value));
  //   }, [key, value]);
  //   return [value, setValue];
  // }
  const [players, setPlayers] = useState(null);
  const playerInput = useRef();

  const updatePlayers = useCallback((val) => {
    setPlayers(val);
  }, []);

  useEffect(() => {
    let playersQuery = searchParams.get("players");
    if (playersQuery) {
      setPlayers(playersQuery?.split(","));
    }
  }, [searchParams]);


  const [canCompare, setCanCompare] = useState(false);
  const [doneFetching, setDoneFetching] = useState(false);
  useEffect(() => {
    if (doneFetching && players?.length > 1) {
      setCanCompare(true);
    } else {
      setCanCompare(false);
    }
  }, [doneFetching, players]);

  // useEffect(() => {
  //   if (canCompare) {
  //     keys.forEach((k) => {
  //       let title = k.title;
  //       let statsToCompare = document.querySelectorAll(
  //         `[data-key="${title}"]`
  //       );
  //       let arr = [];
  //       statsToCompare?.forEach((el) => {
  //         arr.push(parseFloat(el.dataset.val));
  //         el.classList.add("worst");
  //       });
  //       let highestLvl = Math.max(...arr);
  //       // console.log(
  //       //   `.player-stat-row[data-key="${title}"][data-val="${highestLvl}"]`
  //       // );
  //       let best = document.querySelectorAll(
  //         `.player-stat-row[data-key="${title}"][data-val="${highestLvl}"]`
  //       );
  //       best?.forEach((winningStat) => {
  //         winningStat.classList.remove("worst");
  //         if (best.length > 1) {
  //           winningStat.classList.add("tie");
  //         } else {
  //           winningStat.classList.add("best");
  //         }
  //       });
  //     });
  //   }
  // }, [players, canCompare, setSearchParams]);

  useEffect(() => {
    if (players) {
      setSearchParams({ players: players.join(",") });
    } else {
      setSearchParams({});
    }
  }, [players, setSearchParams, canCompare]);
  const playersSwiperWrapper = useRef();

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <section className="content-row">
            {!players &&
              <div className="osrs-fields-group-wrapper">
                <fieldset className="osrs-fields-group">
                  <legend>
                    <h1>Grindiest.</h1>
                  </legend>
                  {/* <pre>{JSON.stringify(canCompare, null, 1)}</pre> */}
                  <input
                    type="text"
                    name=""
                    id=""
                    defaultValue={players?.join() || null}
                    placeholder="Player names (comma separated)"
                    ref={playerInput}
                    // onChange={(e) => {
                    //   if (e.target.value.length === 0) {
                    //     updatePlayers(null);
                    //   }
                    // }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (playerInput.current.value.length > 0) {
                          updatePlayers(
                            playerInput.current.value
                              .replace(/,\s*/g, ",")
                              .split(",")
                          );
                        } else {
                          alert("You need to fill out some player names");
                        }
                      }
                    }}
                  />
                  <button
                    className="search-btn"
                    onClick={() => {
                      document.querySelectorAll(".winner").forEach(el => el.classList.remove("winner"));
                      playersSwiperWrapper.current.classList.remove("winner-revealed");
                      document.querySelectorAll(".player-stat-row").forEach(el => {
                        el.classList.remove("best");
                        el.classList.remove("worst");
                        el.classList.remove("tie");
                      });
                      if (playerInput.current.value.length > 0) {
                        updatePlayers(
                          playerInput.current.value.replace(/,\s*/g, ",").split(",")
                        );
                      } else {
                        alert("You need to fill out some player names");
                      }
                    }}
                  >
                    Get stats
                  </button>
                </fieldset>
              </div>
            }
            {players && (
              <div className="ui-row">
                <button
                  className="reset-btn"
                  onClick={() => {
                    let previousPlayers = [...players];
                    updatePlayers(null);
                    setDoneFetching(false);
                    document.querySelectorAll(".winner").forEach(el => el.classList.remove("winner"));
                    playersSwiperWrapper.current.classList.remove("winner-revealed");
                    setTimeout(() => {
                      playerInput.current.value = previousPlayers.join();
                      playerInput.current.focus();
                    }, playerInput.current);
                  }}
                >
                  Reset
                </button>
                <button
                  onClick={() => {

                    setSearchParams({ players: players.join(",") });
                    keys.forEach((k) => {
                      let key = k;
                      let title = key.title;
                      let statsToCompare = document.querySelectorAll(
                        `[data-key="${title}"]`
                      );
                      let arr = [];
                      statsToCompare?.forEach((el) => {
                        arr.push(parseFloat(el.dataset.val));
                        el.classList.add("worst");
                      });
                      let highestLvl = Math.max(...arr);
                      // console.log(
                      //   `.player-stat-row[data-key="${title}"][data-val="${highestLvl}"]`
                      // );
                      let best = document.querySelectorAll(
                        `.player-stat-row[data-key="${title}"][data-val="${highestLvl}"]`
                      );
                      best?.forEach((winningStat) => {
                        winningStat.classList.remove("worst");
                        if (best.length > 1) {
                          winningStat.classList.add("tie");
                        } else {
                          winningStat.classList.add("best");
                        }
                      });
                    });
                    let cards = [];
                    document.querySelectorAll(
                      `.player-card`
                    ).forEach(card => {
                      let count = card.querySelectorAll(".best").length;
                      cards.push({ id: card.getAttribute("id"), wins: count });
                    });
                    let sorted = cards?.sort((a, b) => a.wins > b.wins ? -1 : +1);
                    let winner = sorted.shift();
                    // console.log({ winner }); // Winner
                    // console.log(sorted); // Losers
                    if (winner) {
                      document.getElementById(winner.id).classList.add("winner");
                      playersSwiperWrapper.current.classList.add("winner-revealed");
                    }
                  }}
                >
                  Reveal grindiest
                </button>
              </div>
            )}
            <div className="players-swiper-wrapper" ref={playersSwiperWrapper}>
              {players?.length > 0 &&
                <Swiper
                  grabCursor={true}
                  // slidesPerView={width < 600 ? 2 : players?.length < parseFloat(width / 250).toFixed(1)}
                  slidesPerView={"auto"}
                  enteredSlides={false}
                  centerInsufficientSlides={true}
                  className="mySwiper"
                >
                  {players?.map((p, index) => (
                    <SwiperSlide key={p + index}>
                      <div className="player-card" key={`player-card-${p}-${index}`} id={`player-card-${p}-${index}`}>
                        <FaCrown className="crown" size="2rem" />
                        <h3>{p}</h3>
                        <hr />
                        <PlayerData p={p} delay={index * 300} last={index + 1 === players?.length} onReady={setDoneFetching} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              }
            </div>

            <p style={{ color: "rgba(150,150,150,0.6)" }} className="credits">Project repo: <a href="https://github.com/lassespilling/osrs_api_testing" title="Go to github" className="row">/lassespilling/osrs_api_testing<AiFillGithub size="1em" /> </a></p>
          </section>
        }
      />
    </Routes>
  );
}

export default App;
