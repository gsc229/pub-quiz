import styled, { createGlobalStyle } from "styled-components"
import BGImage from './images/pub4.jpg'


export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  *{
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif
  }
`


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0,0,0, .25);
  margin-top: 20px;
  padding: 0 20px 20px 20px;
  height: 100%;
  > p {
    color: #fff;
    padding: 0;
    margin: 0;
  }

  .score{
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: 'Fascinate Inline', cursive;
    background-image: linear-gradient(180deg, #fff, #8A010D);
    background-size: 100% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px red);
    font-size: 70px;
    text-align: center;
    margin: 20px;
    padding: 10px;
  }

  .info-list{
    width: 100%;
    max-width: 500px;
    list-style: none;
    li{
      margin:0;
    }
    h3{
      color: white;
      margin: 0;
    }  
  }

  

  .start, .next, .change-settings-btn {
    cursor: pointer;
    box-shadow: 0px 5px 10px rgba(0,0,0, .25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    max-width: 400px;
  } 

  .start, .next{
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
  }

  .change-settings-btn{
    margin-left: 10px;
  }

`
