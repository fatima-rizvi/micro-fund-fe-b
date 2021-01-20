import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import Form from '../../common/Form';
// import UserDescription from '../../common/UserDescription';
// import logo from '../../../images/microLogo.png';



function AppCard() {
  // Start of styled-components

  const StyledHeadingContainer = styled.div`
  color: black;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  `;


  const StyledFormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 80%;
  height: 100%;
  
  `;


  const StyledFormSubmitButton = styled.button `
  width: 18%; 
  background-color: #6558F5;
  border-radius: 8%;
  `;



  // End of styled-components
  
  
  
  
  const [formState, setFormState] = useState({
    name:"",
    phoneNumber:"",
    address: "",
    description: ""
  });


  const handleChanges = e => {
    let name = e.target.name;
    let value = e.target.value;
    setFormState({...formState, [name]: value});
}; 


  const onSubmit = e => {
    // React query to submit an application
  };


  return (
    <>
    <StyledHeadingContainer class="application-container">
      <h1> Org Name </h1>
      <p> userInput_id Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat
        urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
        venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas
        ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor. Integer eu
        nibh at nisi ullamcorper sagittis id vel leo. Integer feugiat faucibus
        libero, at maximus nisl suscipit posuere. Morbi nec enim nunc. Phasellus
        bibendum turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
        pharetra mi tristique sapien vestibulum lobortis. Nam eget bibendum
        metus, non dictum mauris. Nulla at tellus sagittis, viverra est a,
        bibendum metus.</p>
    </StyledHeadingContainer>

    <StyledFormContainer>
      <form id="org-applcation-form">
      <input 
      name="name"
      value={formState.name}
      onChange={handleChanges}
      placeholder="Name"
      />

      <input 
      name="phoneNumber"
      value={formState.phoneNumber}
      onChange={handleChanges}
      placeholder="Phone Number"
      />

      <input 
      name="address"
      value={formState.address}
      onChange={handleChanges}
      placeholder="Address"
      />

      <input 
      name="description"
      value={formState.description}
      onChange={handleChanges}
      placeholder="Description"
      />

      <StyledFormSubmitButton> Apply </StyledFormSubmitButton>
      </form>
    </StyledFormContainer>
    </>
  );
}


export default AppCard;
