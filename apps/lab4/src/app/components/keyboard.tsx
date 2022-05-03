import { useState } from "react";
import styled from "styled-components";

const KeyboardWrapper = styled.div`
  display: flex;

  gap: 4px;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: #a0a0a7;
  padding: 15px;
  border-radius: 10px;

  > * {
    &:first-child {
       margin-bottom: 5px;
    }
  }
`;

const KeyboardRow = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  gap: 4px;
`;

const KeyboardBtn = styled.button`
  width: 50px;
  height: 55px;

  background: #2b2a33;
  color: white;
  border-radius: 5px;
`;


const Keyboard = (props: { layout: any[][] }) => {
  const [layout] = useState(props.layout);

  return (
    <KeyboardWrapper>
      {layout.map((keyRow, index) => (
        <KeyboardRow key={index}>
          {keyRow.map((key, index) => (
            <KeyboardBtn key={index} className={key.className}>{key.name}</KeyboardBtn>
          ))}
        </KeyboardRow>
      ))}
    </KeyboardWrapper>
  );
};

export default Keyboard;
