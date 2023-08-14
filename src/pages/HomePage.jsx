import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { MdExitToApp , MdArrowBack, MdClose} from 'react-icons/md';
import { fetchTableData } from "../components/fetchTables";
import not_found from "../assets/table_not_found.png"
import check from "../assets/green_check.png"
import {set_redis} from "../components/redisStore";



const Home = () => {
  const { user, signOut } = useAuth();
  const [tables, setTables] = useState([]);
  const [search, setSearch] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [tableLink, setTableLink] = useState(null);
  const [linkSuccessful, setLinkSuccessful] = useState(false);


  useEffect(() => {
    const getTables = async () => {
      const data = await fetchTableData(user?.id);
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setTables(sortedData);
    };
    getTables();
  }, [user]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    } 
  };

  const handleTableClick = (table) => {
    setIsLeaving(true);
    setTimeout(() => {
      setSelectedTable(table);
      setRestaurant(table.restaurant_name);
      setTableLink(table.link)
      setIsLeaving(false);
    }, 300);
  };

  const handleItemClick = (item) => {
    setIsLeaving(true);
    setTimeout(() => {
      setSelectedCard(item);
      setIsLeaving(false);
    }, 300);
    
  };

  const handleLinkClick = (rest_name, card, link) => {
    set_redis(rest_name, card, link);
    setLinkSuccessful(true);
  };

  const handleCloseLinkSuccess = () => {
    setLinkSuccessful(false);
    setSelectedTable(null);
    setTableLink(null);
    setRestaurant(null);
    setSelectedCard(null);
  };


  return (
    <div className="login-page">
        <button className="logout-button" onClick={handleLogout}>
            Logout
            <MdExitToApp />
        </button>
        <div className="welcome-message">
                Welcome back, <span className="user-email">{user?.email || "User"}</span>!
        </div>
        <div className={`search-card ${isLeaving ? "leaving" : ""}`}>
        {linkSuccessful ? (
          <div className="link-completed-card">
            <MdClose className="close-icon" onClick={handleCloseLinkSuccess} />
            <h2>Linked <span className="table-name">{selectedTable.name}</span> and <span className="item-name">{selectedCard.name}</span> successfully</h2>
            <img src={check} alt="Chain Link" className="chain-image" />
          </div>
        ) : selectedCard ? (
          <div className="card-layout-3" >
            <MdArrowBack className="back-icon" onClick={() => setSelectedCard(null)} />
            <h2 className="cursor-required">Let's link <span className="table-name" onClick={() => {setSelectedTable(null); setTableLink(null); setRestaurant(null); setSelectedCard(null);}}>@{selectedTable.name}</span> with <span className="item-name" onClick={() => setSelectedCard(null)}>@{selectedCard.name}</span></h2>
            <button className="link-button" onClick={() => handleLinkClick(restaurant, selectedCard.name ,tableLink)} >Link it</button>
          </div>
        ): selectedTable ? ( 
            <div>
              <MdArrowBack className="back-icon" onClick={() => {setSelectedTable(null); setTableLink(null); setRestaurant(null);}} />
              <h2 className="cursor-required">Let's link <span className="table-name" onClick={() => setSelectedTable(null)}> @{selectedTable.name}</span> with</h2>
              <div className="item-container">
              <div className="item-section">
                  <div className="item-card"  onClick={() => handleItemClick({name: 'Card-A'})}>Card A</div>
                  <div className="item-card"  onClick={() => handleItemClick({name: 'Card-B'})}>Card B </div>
                  <div className="item-card"  onClick={() => handleItemClick({name: 'Card-C'})}>Card C</div>
                  <div className="item-card"  onClick={() => handleItemClick({name: 'Card-D'})}>Card D</div>
                </div>
                <div className="item-section">
                  <div className="item-card"  onClick={() => handleItemClick({name: 'Card-E'})}>Card E</div>
                  <div className="item-card"  onClick={() => handleItemClick({name: 'Card-F'})}>Card F</div>
                  <div className="item-card"  onClick={() => handleItemClick({name: 'Card-G'})}>Card G</div>
                  <div className="item-card"  onClick={() => handleItemClick({name: 'Card-H'})}>Card H</div>
                </div>
              </div>
            </div>
          ) : (
            <>
            <input 
              type="text" 
              placeholder="Search it to link it..." 
              className="search-input"
              value={search} 
              onChange={handleSearch} 
            />
            <ul className={`table-list ${searchActive ? "active" : ""}`}>
              {tables.filter(table => table.name.toLowerCase().includes(search.toLowerCase())).map((table, index) => (
              <li key={table.id} style={{ '--i': index + 1 }} onClick={() => handleTableClick(table)}>{table.name}</li>  
              ))}
              {tables.length === 0 && 
              <div className="empty-tables">
                <img src={not_found} alt="Robot" className="robot-image" />
                <p className="no-tables-text">Uh Oh! Table Not Found</p>
              </div>
              }
            </ul>
            </>
          )}
        </div>
    </div>
  );
   
};

export default Home;