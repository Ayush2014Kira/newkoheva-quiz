import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseConfig"; // Update the path
import "./../css/winnerlist.css";
import "animate.css";
import logo from "./../image/image2.png";
function WinnerTable() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      const winnersCollection = collection(firestore, "winners");
      const querySnapshot = await getDocs(winnersCollection);
      const winnersData = querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        return { ...data, index: index + 1 };
      });
      setWinners(winnersData);
    };

    fetchWinners();
  }, []);
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <div className="mt-4">
        <img src={logo} alt="koheva logo" width={400} />
      </div>
      <div className="winnerlist-title h2 display-6">Fortunate Users'</div>
      <div className="">
        {winners &&
          winners.map((data) => (
            <div className="name  animate__animated  animate__fadeInUp animate__slow">
              {data.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default WinnerTable;
