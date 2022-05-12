import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../store";

import * as Profile from "../common/profile/profileSlice";

import { ModeContext } from "../common/context/mode-context";
import { EditorMode } from "../data/editor-mode";
import { GroupContext } from "../common/context/group-context";

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

const KeyboardButton = styled.button`
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

  const groups = useSelector((state: State) => state.profile.groups);

  const getGroupById = (id) => groups.find((group) => group.id === id || null);

  const addKeyToGroup = (key: Key, group: Group) => {
    if (key.selected) return;
    if (!group.id) return;

    dispatch(Profile.addKey({ key, group }));
  };

  const deleteKeyFromGroup = (key: Key, group: Group) => {
    dispatch(Profile.deleteKey({ key, group }));
  };

  const onClickFactory = (
    mode: EditorMode,
    key: Key,
    groupId: string | null
  ) => {
    if (groupId === null) return;

    const group = getGroupById(groupId);

    switch (mode) {
      case 0:
        addKeyToGroup(key, group);
        break;
      case EditorMode.Delete:
        deleteKeyFromGroup(key, group);
        break;
    }
  };

  return (
    <ModeContext.Consumer>
      {({ mode }) => (
        <GroupContext.Consumer>
          {({ groupId }) => (
            <KeyboardWrapper>
              {props.layout.map((keyRow, index) => (
                <KeyboardRow key={index}>
                  {keyRow.map((key, index) => (
                    <KeyboardButton
                      // style={{ boxShadow: `0 0 10px ${key.color}`, color: key.color}}
                      style={{ background: key.color }}
                      key={index}
                      className={key.className}
                      onClick={() => onClickFactory(mode, key, groupId)}
                    >
                      {key.name}
                    </KeyboardButton>
                  ))}
                </KeyboardRow>
              ))}
            </KeyboardWrapper>
          )}
        </GroupContext.Consumer>
      )}
    </ModeContext.Consumer>
  );
};

export default Keyboard;
