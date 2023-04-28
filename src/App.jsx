import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";

import axios from "axios";
import Attack from "./assets/skills/Attack.jpg";
import Defence from "./assets/skills/Defence.jpg";
import Strength from "./assets/skills/Strength.jpg";
import Hitpoints from "./assets/skills/Hitpoints.jpg";
import Ranged from "./assets/skills/Ranged.jpg";
import Prayer from "./assets/skills/Prayer.jpg";
import Magic from "./assets/skills/Magic.jpg";
import Cooking from "./assets/skills/Cooking.jpg";
import Woodcutting from "./assets/skills/Woodcutting.jpg";
import Fletching from "./assets/skills/Fletching.jpg";
import Fishing from "./assets/skills/Fishing.jpg";
import Firemaking from "./assets/skills/Firemaking.jpg";
import Crafting from "./assets/skills/Crafting.jpg";
import Smithing from "./assets/skills/Smithing.jpg";
import Mining from "./assets/skills/Mining.jpg";
import Herblore from "./assets/skills/Herblore.jpg";
import Agility from "./assets/skills/Agility.jpg";
import Thieving from "./assets/skills/Thieving.jpg";
import Slayer from "./assets/skills/Slayer.jpg";
import Farming from "./assets/skills/Farming.jpg";
import Runecrafting from "./assets/skills/Runecrafting.jpg";
import Hunter from "./assets/skills/Hunter.jpg";
import Construction from "./assets/skills/Construction.jpg";

const keys = [
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
const PlayerData = ({ p, delay }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (p) {
      setTimeout(() => {
        // const backendUrl = import.meta.env.VITE_PROXY;
        axios
          .get(
            "/api/https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=" +
            p,
            {
              headers: {
                "X-Requested-With": "XMLHttpRequest",
              },
            }
          )
          .then((response) => {
            let obj = {};
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
          })
          .catch(alert);
      }, delay);
    }
  }, [p, delay]);

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
                      <img
                        src={keys[index].icon}
                        className="player-stat-icon"
                      />
                      {keyVal[0]}
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

  // const compare = useCallback(() => {
  //   keys.forEach((k) => {
  //     let title = k.title;
  //     let statsToCompare = document.querySelectorAll(`[data-key="${title}"]`);
  //     let arr = [];
  //     statsToCompare?.forEach((el) => {
  //       arr.push(parseFloat(el.dataset.val));
  //       el.classList.add("worst");
  //     });
  //     let highestLvl = Math.max(...arr);
  //     // console.log(
  //     //   `.player-stat-row[data-key="${title}"][data-val="${highestLvl}"]`
  //     // );
  //     let best = document.querySelectorAll(
  //       `.player-stat-row[data-key="${title}"][data-val="${highestLvl}"]`
  //     );
  //     best?.forEach((winningStat) => {
  //       winningStat.classList.remove("worst");
  //       if (best.length > 1) {
  //         winningStat.classList.add("tie");
  //       } else {
  //         winningStat.classList.add("best");
  //       }
  //     });
  //   });
  // }, []);

  useEffect(() => {
    if (players) {
      setSearchParams({ players: players.join(",") });
      // if (players.length > 1) {
      //   setTimeout(() => {
      //     compare();
      //   }, 3500);
      // }
    } else {
      setSearchParams({});
    }
  }, [players, setSearchParams]);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <section>
            <fieldset className="osrs-fields-group">
              <legend>
                <h1>Grindiest.</h1>
              </legend>
              <input
                type="text"
                name=""
                id=""
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
              {players && (
                <>
                  <button
                    className="reset-btn"
                    onClick={() => {
                      updatePlayers(null);
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      keys.forEach((k) => {
                        let title = k.title;
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
                    }}
                  >
                    Reveal grindiest
                  </button>
                </>
              )}
            </fieldset>
            <div className="players-grid">
              {players?.map((p, index) => (
                <div className="player-card" key={`player-card-${p}`}>
                  <h3>{p}</h3>
                  <hr />
                  <PlayerData p={p} delay={index * 100} />
                </div>
              ))}
            </div>
          </section>
        }
      />
    </Routes>
  );
}

export default App;
