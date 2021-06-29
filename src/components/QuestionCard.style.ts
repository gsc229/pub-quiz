import styled from "styled-components";


export const Wrapper = styled.div`
  max-width: 1100px;
  background: #ebfeff;
  border-radius: 10px;
  border: 2px solid #0085a3;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, .25);

  p {
    font-size: 1rem;
  }

`

type ButtonWrapperProps = {
  correct: boolean
  userClicked: boolean
  selected: boolean
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3 ease;
  :hover{
    opacity: 0.8;
  }
  button {
    cursor: pointer;
    user-select: none; // don't want the user to be able to select the text
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background: ${({correct, userClicked, selected}) => 
      correct 
      ? 'linear-gradient(90deg, #56ffa4, #59bc86)'
      : !correct && userClicked
      ? 'linear-gradient(90deg, #ff5656, #c16868)'
      : selected
      ? 'linear-gradient(180deg, #fff, #ffcc91);'
      : 'linear-gradient(90deg, #56ccff, #6eafb4)'
    };

    border: 3px solid #fff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, .1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, .25);
  }
`

