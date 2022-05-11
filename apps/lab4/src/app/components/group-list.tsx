import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../store";

import * as Profile from "../common/profile/profileSlice";

import { v4 as uuidv4 } from "uuid";

import add from "../../assets/plus-outline.svg";

import { GroupContext } from "../common/context/group-context";
import GroupItem, { GroupItemWrapper } from "./group-item";

const GroupWrapper = styled.div`
  display: flex;
  color: white;

  flex-direction: column;

  width: 100%;
  height: 100%;

  overflow: scroll;
`;

const GroupHeader = styled.section`
  align-self: center;
`;

const GroupItems = styled.section`
  padding: 10px;

  > * {
    margin-bottom: 20px;
  }
`;

const defaultGroup = () =>
  ({
    color: "white",
    name: "new group",
    id: uuidv4(),
    groupKeys: [],
  } as Group);

const GroupList = () => {
  const dispatch = useDispatch();

  const groups = useSelector((state: State) => state.profile.groups);

  const createGroup = (changeGroupId: Function) => {
    const payload = defaultGroup();

    dispatch(Profile.createGroup(payload));

    changeGroupId(payload.id);
  };

  return (
    <GroupWrapper>
      <GroupHeader>
        <h1>Light Sync</h1>
      </GroupHeader>

      <GroupItems>
        {groups.map((item, index) => (
          <GroupItem key={index} group={item} />
        ))}

        <GroupContext.Consumer>
          {({ changeGroupId }) => (
            <GroupItemWrapper
              className="group-item--new"
              onClick={() => createGroup(changeGroupId)}
            >
              <span>Add new </span>
              <img src={add} />
            </GroupItemWrapper>
          )}
        </GroupContext.Consumer>
      </GroupItems>
    </GroupWrapper>
  );
};

export default GroupList;
