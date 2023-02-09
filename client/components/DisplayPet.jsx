import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const DisplayPet = () => {
  const [petList, setPetList] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    fetch('/user/pets', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON'
      }
    }) 
    .then((res) => res.json())
    .then((data) => {
      setPetList(data);
      console.log(petList)
    })
  }

  const renderPetCard = (pet) => (
    <div className="choosePetCard" onClick={() => navigate('/home')}>
      <div className="choosePetImage">
          <img
            className="petAvatar"
            src={pet.Avatar}
            id={pet._id}
            onClick={() => navigate('/home')}
          />
      </div>
      <div className="choosePetName">{pet.Name}</div>
    </div>
  );
  
  const petCards = petList.map(renderPetCard);

  return (
    <div className="choice-container">
      <div className="petChoiceMenu">
        <div className="petImages">{petCards}</div>
      </div>
      <div className='pet-button-container'> 
      <button className='add-pet' onClick={() => navigate('/create')}>Add a Pet</button>
      <button className='add-pet' onClick={handleClick}>Choose a Pet</button>
      </div>
    </div>
  );
};

export default DisplayPet;