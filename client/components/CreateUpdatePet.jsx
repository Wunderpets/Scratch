import React, { Component } from 'react';
import { useState } from 'react';

//This should fetch data from appropriate user upon successful login
// this should set state to equal the data returned from fetch request
// data to be returned: userData

const CreateUpdatePet = ({user, setPetList, petList}) => {
  const [pet, setPet] = useState({});
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [breed, setBreed] = useState('')
  const [visit, setVist] = useState('')
  const [vet, setVet] = useState('')

  const handleClick = () => {
    fetch('http://localhost:3000/pet/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/JSON'
          },
        body: JSON.stringify({
            Name: name,
            Age: age,
            Weight: weight,
            Breed: breed,
            LastVisit: visit,
            AssignedVet: vet,
            Owner: user//user.FirstName can be removed
        })
    }) 
    .then(resp => resp.json())
    .then(data => {
        setPet(data);
    });
    }

  return (
    <div className='create-container'>
      <div className="banner">Pet Profile</div>
      <div className="petInputs">
        <div>Owner: </div>
        <div>
          Name:
          <input
            id='newPetName'
            type="text"
            required
            onChange={(event) => setName(event.target.value) }
          />
        </div>
        <div>
          Breed:
          <input
            id='newPetBreed'
            type="text"
            required
            onChange={(event) => setBreed(event.target.value)}
          />
        </div>
        <div>
          Age: <input 
          id='newPetAge'
          type="age" 
          onChange={(event) => setAge(event.target.value) }
          
          />
          years
        </div>
        <div>
          Weight:
          <input
            type="text"
            id='newPetWeight'
            required
            onChange={(event) => setWeight(event.target.value) }
          />
          lbs.
        </div>
        <div>
          Vet:
          <input
            type="text"
            id='newPetVet'
            required
            onChange={(event) => setVet(event.target.value) }
          />
        </div>
        <div>
          Last Visit:
          <input
            type="text"
            id='newPetVisit'
            required
            onChange={(event) => setVist(event.target.value) }
          />
        </div>
        {/* <div>
          Image URL:{' '}
          <input type="text" id="newAvatarUrl" value={avatarURL ?? ''} />
        </div> */}
        {/* <div>
          <img className="avatarImage" src={avatarURL ?? ''}></img>
        </div> */}
      </div>
      <div className='signup-buttons-box'> 
        {/* <a href="http://localhost:8080/home"> */}
          <button className="createUpdatePetButton"
        onClick={() => handleClick()}
          >
            Save
          </button>
        {/* </a> */}
        <a href="http://localhost:8080/choose">
          <button className="createUpdatePetButton">
            Back
          </button>
        </a>
      </div>
    </div>
  );
};
export default CreateUpdatePet;


/*#newPetBreed,
#newPetName, 
#newPetWeight,
#newPetAge,
#newPetVet */