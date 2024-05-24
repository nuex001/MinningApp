import React, { useEffect, useState } from "react";
import { GiSevenPointedStar } from "react-icons/gi";
import { GiMiner } from "react-icons/gi";
import axios from "axios";
import { errorMsgs, successMsg } from "../../utils/utils";

function Points() {
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://minningapp.onrender.com/api/user/");
      // console.log(res.data);
      const user = res.data;
      const MINE_HOURS = 6;
      if (user && user.lastMining) {
        const currentDate = new Date();
        const lastMiningDate = new Date(user.lastMining);
        const currentTotalHours =
          currentDate.getHours() + currentDate.getMinutes() / 60;
        const lastMiningTotalHours =
          lastMiningDate.getHours() + lastMiningDate.getMinutes() / 60;

        // Check if mining period has passed
        const hoursPassed =
          (currentTotalHours - lastMiningTotalHours + 24) % 24;

        if (user.lastMining && !user.claimed && hoursPassed < MINE_HOURS) {
          setInfo("Mining Now ........");
        }
        if (hoursPassed >= MINE_HOURS && !user.claimed) {
          setInfo("Claim Now");
        }
      } else {
        setInfo("Mine Now");
      }
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // MineOrClaim
  const MineOrClaim = async () => {
    try {
      const res = await axios.post("https://minningapp.onrender.com/api/mine/");
      fetchUser();
      successMsg(res.data.msg);
    } catch (error) {
      // console.log(error.response.data.err);
      errorMsgs(error.response.data.err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <h1>My Pionts</h1>
      <GiMiner
        className={`icon ${info && info.includes("Mining") ? "active" : ""}`}
      />
      <h4>{data && data.point}</h4>
      <button onClick={MineOrClaim}>{info ? info : "Loading"}</button>
      <button onClick={fetchUser}>Refresh Pionts</button>
    </>
  );
}

export default Points;
