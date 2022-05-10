import { useDispatch, useSelector } from "react-redux";

import store, { State } from "./store";

import Keyboard from "./components/keyboard";
import styled from "styled-components";
import ToolBox from "./components/toolbox";
import Group from "./components/group";
import Profile from "./components/profile";

import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import * as P from "./common/profile/profileSlice";
import * as PL from "./common/profile/profileListSlice";

import { ModeContext } from "./common/context/mode-context";
import { EditorMode } from "./data/editor-mode";
import { GroupContext } from "./common/context/group-context";

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

  const profile = useSelector((state: State) => state.profile);

  const layout = useSelector((state: State) => state.profile.layout);

  const [color, setColor] = useState();

  const [_groupId, _setGroupId] = useState<string | null>(null);

  const _group = useSelector((state: State) => state.profile.groups.find(group => group.id == _groupId))

  const [mode, setMode] = useState<EditorMode>(EditorMode.Draw);

  useEffect(() => {
    if (_groupId) {
      dispatch(P.updateGroup({..._group, color}));
      // dispatch(P.syncLayout())
    }
  }, [color]);

  useEffect(() => {
    dispatch(P.updateLayout(layout));
          // dispatch(P.syncLayout())
  }, [_group]);

  useEffect(() => {
    dispatch(PL.updateProfiles(profile));
  }, [profile]);

  return (
    <GroupContext.Provider
      value={{ groupId: _groupId, changeGroupId: _setGroupId }}
    >
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
          <ModeContext.Provider value={{ mode, changeMode: setMode }}>
            <ToolBox></ToolBox>
            <Keyboard layout={layout} />
          </ModeContext.Provider>
        </Center>
      </AppWrapper>
    </GroupContext.Provider>
  );
}

export default App;
