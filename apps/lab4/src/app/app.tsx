import { useDispatch, useSelector } from "react-redux";

import store, { State } from "./store";

import Keyboard from "./components/keyboard";
import styled from "styled-components";
import ToolBox from "./components/toolbox";
import Group from "./components/group";
import Profile from "./components/profile";

import { Group as G } from "./common/group";

import * as L from "./layouts";

import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import { Profile as P, ProfileList as PL } from "./common/profile";


const AppWrapper = styled.div`
  display: grid;

  grid-template-columns: 1.5fr 6fr;
  grid-template-rows: 5vh 5fr;

  width: 100%;
  height: 100vh;
`;

const Center = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #4f4b4b;

  position: relative;

  grid-row: 2;
  grid-column: 2;
`;

const Profiles = styled.section`
  grid-row: 1;
  grid-column: 2;

  background: #2b2b2b;
`;

const Groups = styled.aside`
  display: flex;

  flex-direction: column;

  grid-row-start: 1;
  grid-row-end: 3;

  grid-colum: 1;

  background: #2b2b2b;
`;

const ColorPicker = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const dispatch = useDispatch();

  const layout = useSelector((state: State) => state.layout);

  const group = useSelector((state: State) => state.group);

  const profile = useSelector((state: State) => state.profile);

  const [color, setColor] = useState();

  useEffect(() => {
    if (group?.color) {
      const payload = { ...group, color };

      dispatch(G.selectGroup(payload));
      dispatch(P.updateGroup(payload));
    }
  }, [color]);

  useEffect(() => {
    dispatch(L.syncLayout(group));
    dispatch(P.updateLayout(layout));
  }, [group]);

  useEffect(() => {
    dispatch(PL.updateProfiles(profile));
  }, [profile]);

  return (
    <AppWrapper>
      <Profiles>
        <Profile profile={profile} />
      </Profiles>

      <Groups>
        <Group />
        <ColorPicker>
          <ChromePicker
            color={color}
            onChange={(color) => setColor(color.hex)}
          />
        </ColorPicker>
      </Groups>

      <Center>
        <ToolBox></ToolBox>

        <Keyboard layout={layout} />
      </Center>
    </AppWrapper>
  );
}

export default App;
