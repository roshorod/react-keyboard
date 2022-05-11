import React from "react";

import { EditorMode } from "../../data/editor-mode";

interface Props {
  mode: EditorMode;
  changeMode: Function;
}

export const ModeContext = React.createContext<Props>({
  mode: EditorMode.Draw,
  changeMode: () => {},
});
