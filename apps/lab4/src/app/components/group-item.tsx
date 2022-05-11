import { useDispatch } from "react-redux";
import styled from "styled-components";

import * as Profile from "../common/profile/profileSlice";

import del from "../../assets/trash-2-outline.svg";
import { useEffect, useRef, useState } from "react";
import { GroupContext } from "../common/context/group-context";

export const GroupItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #2b2b2b;

  width: auto;
  height: 60px;

  border: 3px solid #4f4b4b;
  border-radius: 5px;

  > img {
    width: 25px;
    height: 20px;
    filter: invert(99%) sepia(3%) saturate(614%) hue-rotate(329deg)
      brightness(117%) contrast(100%);
    cursor: pointer;
  }

  > input {
    width: 120px;
    background: none;
    color: white;
    border: 3px solid #4f4b4b !important;
  }

  > .group-name {
    overflow: scroll;
  }
`;

interface Props {
  group: Group;
  click?: () => void;
}

const GroupItem = (props: Props) => {
  const dispatch = useDispatch();

  const { group, click } = props;

  const [editable, setEditable] = useState(false);

  const editableInput = useRef(null);

  useEffect(() => {
    if (editableInput?.current) editableInput.current.focus();
  }, [editable]);

  const changeName = (event) =>
    dispatch(Profile.updateGroup({ ...group, name: event.target.value }));

  const editName = () => setEditable(true);

  const stopEditName = () => setEditable(false);

  return (
    <GroupContext.Consumer>
      {({ groupId, changeGroupId }) => (
        <GroupItemWrapper
          onClick={() =>
            click !== undefined ? click : changeGroupId(group.id)
          }
          className={group.id === groupId ? "group-selected" : null}
        >
          <span className="group-color" style={{ background: group.color }} />

          {editable && group.id === groupId ? (
            <input
              className="group-editable"
              type="text"
              ref={editableInput}
              value={group.name}
              onChange={changeName}
              onBlur={stopEditName}
            />
          ) : (
            <span className="group-name" onClick={editName}>
              {group.name}
            </span>
          )}

          <img
            src={del}
            onClick={(event) => {
              event.preventDefault();

              changeGroupId(null); // ???? Don't change to null. Why ????
              dispatch(Profile.deleteGroup(group));
            }}
          />
        </GroupItemWrapper>
      )}
    </GroupContext.Consumer>
  );
};

export default GroupItem;
