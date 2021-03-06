import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as PL from "../common/profile/profileListSlice";
import * as P from "../common/profile/profileSlice";
import { State } from "../store";
import add from "../../assets/plus-outline.svg";
import { GroupContext } from "../common/context/group-context";

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  > img {
    width: 25px;
    height: 20px;
    filter: invert(99%) sepia(3%) saturate(614%) hue-rotate(329deg)
      brightness(117%) contrast(100%);
    cursor: pointer;
    margin-left: 10px;
  }
`;

interface Props {
  defaultProfile: Profile;
}

const ProfileList = (props: Props) => {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(props.defaultProfile);

  const profiles = useSelector((state: State) => state.profileList);

  useEffect(() => {
    dispatch(PL.updateProfiles(props.defaultProfile));
  }, [props]);

  useEffect(() => {
    dispatch(P.selectProfile(profile));
  }, [profile]);

  const addProfile = () => dispatch(PL.createProfile());

  const changeProfile = (event, changeGroupId: Function) => {
    const id = event.target.value;

    setProfile(profiles.find((profile) => profile.id === id));
    
    changeGroupId(null);
  };

  return (
    <GroupContext.Consumer>
      {({ changeGroupId }) => (
        <ProfileWrapper>
          <select
            name="profiles"
            value={profile.id}
            onChange={(event) => changeProfile(event, changeGroupId)}
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <img src={add} onClick={addProfile} />
        </ProfileWrapper>
      )}
    </GroupContext.Consumer>
  );
};

export default ProfileList;
