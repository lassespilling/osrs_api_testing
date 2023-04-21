import { useState, useRef, useCallback, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import axios from "axios";

function App() {
  function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue ? JSON.parse(stickyValue) : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }
  const [players, setPlayers] = useState(null);
  const [playersData, setPlayersData] = useState(null);
  const playerInput = useRef();

  const updatePlayers = useCallback((val) => {
    setPlayers(val);
  }, []);

  // useEffect(() => {
  //   const getPlayerData = (name) =>
  //     hiscores
  //       .getPlayer({
  //         name: name,
  //         type: constants.playerTypes.hardcoreIronman,
  //       })
  //       .then((r) => {
  //         return r;
  //       })
  //       .catch(console.error);
  //   console.log(players);
  //   if (Array.isArray(players) && players?.length > 0) {
  //     let dataArray = [];
  //     players.forEach((playerName) =>
  //       getPlayerData(playerName).then((d) => dataArray.push(d))
  //     );
  //   }
  // }, [players]);

  const getPlayersData = useCallback((players) => {
    const backendUrl = `/api/m=hiscore_oldschool/index_lite.ws?player=`;
    let arr = [];
    players?.forEach((player) =>
      axios
        .get(backendUrl + player)
        .then((response) => {
          const keys = [
            "Overall",
            "Attack",
            "Defence",
            "Strength",
            "Hitpoints",
            "Ranged",
            "Prayer",
            "Magic",
            "Cooking",
            "Woodcutting",
            "Fletching",
            "Fishing",
            "Firemaking",
            "Crafting",
            "Smithing",
            "Mining",
            "Herblore",
            "Agility",
            "Thieving",
            "Slayer",
            "Farming",
            "Runecrafting",
            "Hunter",
            "Construction",
            "League Points",
            "Bounty Hunter - Hunter",
            "Bounty Hunter - Rogue",
            "Clue Scrolls (all)",
            "Clue Scrolls (beginner)",
            "Clue Scrolls (easy)",
            "Clue Scrolls (medium)",
            "Clue Scrolls (hard)",
            "Clue Scrolls (elite)",
            "Clue Scrolls (master)",
            "LMS - Rank",
            "PvP Arena - Rank",
            "Soul Wars Zeal",
            "Rifts closed",
            "Abyssal Sire",
            "Alchemical Hydra",
            "Artio",
            "Barrows Chests",
            "Bryophyta",
            "Callisto",
            "Cal'varion",
            "Cerberus",
            "Chambers of Xeric",
            "Chambers of Xeric: Challenge Mode",
            "Chaos Elemental",
            "Chaos Fanatic",
            "Commander Zilyana",
            "Corporeal Beast",
            "Crazy Archaeologist",
            "Dagannoth Prime",
            "Dagannoth Rex",
            "Dagannoth Supreme",
            "Deranged Archaeologist",
            "General Graardor",
            "Giant Mole",
            "Grotesque Guardians",
            "Hespori",
            "Kalphite Queen",
            "King Black Dragon",
            "Kraken",
            "Kree'Arra",
            "K'ril Tsutsaroth",
            "Mimic",
            "Nex",
            "Nightmare",
            "Phosani's Nightmare",
            "Obor",
            "Phantom Muspah",
            "Sarachnis",
            "Scorpia",
            "Skotizo",
            "Spindel",
            "Tempoross",
            "The Gauntlet",
            "The Corrupted Gauntlet",
            "Theatre of Blood",
            "Theatre of Blood: Hard Mode",
            "Thermonuclear Smoke Devil",
            "Tombs of Amascut",
            "Tombs of Amascut: Expert Mode",
            "TzKal-Zuk",
            "TzTok-Jad",
            "Venenatis",
            "Vet'ion",
            "Vorkath",
            "Wintertodt",
            "Zalcano",
            "Zulrah",
          ];
          let obj = {};
          response.data
            .split("\n")
            .slice(0, 24)
            .forEach((skillData, index) => {
              let arr = skillData.split(",");
              let rank = arr[0];
              let level = arr[1];
              let experience = arr[2];
              if (keys[index]) {
                obj[keys[index]] = {
                  // raw: skillData,
                  rank,
                  level,
                  experience,
                };
              }
            });
          arr.push(obj);
        })
        .then(() => {
          console.log(arr);
          setPlayersData(arr);
        })
    );
  }, []);

  useEffect(() => {
    if (players) {
      getPlayersData(players);
    } else {
      setPlayersData(null);
    }
  }, [players]);

  return (
    <section>
      <fieldset className="osrs-fields-group">
        <legend>
          <h1>OSRS Group</h1>
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
              updatePlayers(
                playerInput.current.value.replace(/,\s*/g, ",").split(",")
              );
            }
          }}
        />
        <button
          onClick={() =>
            updatePlayers(
              playerInput.current.value.replace(/,\s*/g, ",").split(",")
            )
          }
        >
          Save
        </button>
        <button
          onClick={() => {
            updatePlayers(null);
            setPlayersData(null);
          }}
        >
          Reset
        </button>
      </fieldset>
      <div className="players-grid">
        {players?.map((p, index) => (
          <div className="player-card" key={`player-card-${p}`}>
            <pre>{JSON.stringify(p)}</pre>
            <table>
              <pre style={{ width: 300 }}>{JSON.stringify(playersData)}</pre>
              {/* {playersData &&
                Object.entries(playersData[index])?.map(
                  (keyVal) =>
                    keyVal && (
                      <tr>
                        <td>{keyVal[0]}</td>
                        <td>{keyVal[1]?.level}</td>
                      </tr>
                    )
                )} */}
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
