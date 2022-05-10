import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as PL from "../common/profile/profileListSlice";
import * as P from "../common/profile/profileSlice";
import { State } from "../store";
import add from "../../assets/plus-outline.svg";

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
  profile: Profile;
}

const Profile = (props: Props) => {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(props.profile);

  const profiles = useSelector((state: State) => state.profileList);

  useEffect(() => {
    dispatch(PL.updateProfiles(props.profile));
  }, [props]);

  useEffect(() => {
    dispatch(P.selectProfile(profile));
  }, [profile]);

  const addProfile = () => dispatch(PL.createProfile());

  const changeProfile = (event) => {
    const id = event.target.value;

    setProfile(profiles.find((profile) => profile.id === id));
  };

  return (
    <ProfileWrapper>
      <select name="profiles" value={profile.id} onChange={changeProfile}>
        {profiles.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <img src={add} onClick={addProfile} />
    </ProfileWrapper>
  );
};

export default Profile;
