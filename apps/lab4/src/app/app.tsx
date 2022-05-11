import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { ChromePicker } from "react-color";

import { State } from "./store";

import * as P from "./common/profile/profileSlice";
import * as PL from "./common/profile/profileListSlice";

import { ModeContext } from "./common/context/mode-context";
import { GroupContext } from "./common/context/group-context";

import { EditorMode } from "./data/editor-mode";

import {
  AppWrapper,
  ColorPickerWrapper,
  ContentWrapper,
  HeaderWrapper,
  SidebarWrapper,
} from "./styles";

import GroupList from "./components/group-list";
import Keyboard from "./components/keyboard";
import ToolBox from "./components/toolbox";
import ProfileList from "./components/profile-list";

function App() {
  const dispatch = useDispatch();

  const profile = useSelector((state: State) => state.profile);

  const layout = useSelector((state: State) => state.profile.layout);

  const [color, setColor] = useState();

  const [_groupId, _setGroupId] = useState<string | null>();

  const _group = useSelector(
    (state: State) =>
      state.profile.groups.find((group) => group.id == _groupId) || null
  );

  const [mode, setMode] = useState<EditorMode>(EditorMode.Draw);

  useEffect(() => {
    console.log(_groupId)
  }, [_groupId]);

  useEffect(() => {
    if (_groupId) {
      dispatch(P.updateGroup({ ..._group, color }));
      dispatch(P.syncLayout(_group));
    }
  }, [color]);

  useEffect(() => {
    dispatch(PL.updateProfiles(profile));
  }, [profile]);

  return (
    <GroupContext.Provider
      value={{ groupId: _groupId, changeGroupId: _setGroupId }}
    >
      <AppWrapper>
        <HeaderWrapper>
          <ProfileList defaultProfile={profile} />
        </HeaderWrapper>

        <SidebarWrapper>
          <GroupList />

          <ColorPickerWrapper>
            <ChromePicker
              color={color}
              onChange={(color) => setColor(color.hex)}
            />
          </ColorPickerWrapper>
        </SidebarWrapper>

        <ContentWrapper>
          <ModeContext.Provider value={{ mode, changeMode: setMode }}>
            <ToolBox />
            <Keyboard layout={layout} />
          </ModeContext.Provider>
        </ContentWrapper>
      </AppWrapper>
    </GroupContext.Provider>
  );
}

export default App;
