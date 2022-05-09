import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../store";
import { Group } from "../common/group";
import * as Layout from "../layouts";
import { Profile } from "../common/profile";

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

  > button {
    background: #2b2a33;
  }
`;

const KeyboardBtn = styled.button`
  width: 50px;
  height: 55px;

  color: white;
  border-radius: 5px;
`;

interface Props {
  layout: Key[][];
}

const Keyboard = (props: Props) => {
  const dispatch = useDispatch();

  const group = useSelector((state: State) => state.group);

  const addKeyToGroup = (key: Key) => {
    console.log(key);

    if (key.selected) return;

    const payload: Key = { ...key, selected: true, color: group.color };

    dispatch(Group.addKeyGroup(payload));
    dispatch(Profile.updateGroup(group));
    dispatch(Profile.syncLayout(group));
  };

  return (
    <KeyboardWrapper>
      {props.layout.map((keyRow, index) => (
        <KeyboardRow key={index}>
          {keyRow.map((key, index) => (
            <KeyboardBtn
              data-selected={key.color}
              style={{ background: key.color }}
              key={index}
              className={key.className}
              onClick={() => addKeyToGroup(key)}
            >
              {key.name}
            </KeyboardBtn>
          ))}
        </KeyboardRow>
      ))}
    </KeyboardWrapper>
  );
};

export default Keyboard;
