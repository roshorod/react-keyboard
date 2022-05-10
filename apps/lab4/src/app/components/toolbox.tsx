import styled from "styled-components";

import edit from "../../assets/edit-outline.svg";
import pen from "../../assets/brush-outline.svg";
import del from "../../assets/trash-2-outline.svg";
import { useState } from "react";

import { EditorMode } from "../data/editor-mode";
import { ModeContext } from "../common/context/mode-context";

const ToolBoxWrapper = styled.div`
  display: flex;

  position: absolute;

  background: #2b2b2b;

  padding: 5px 10px;
  border-radius: 5px;
  gap: 40px;

  top: 20px;

  > img {
    width: 25px;
    height: 40px;

    cursor: pointer;

    filter: invert(99%) sepia(3%) saturate(614%) hue-rotate(329deg)
      brightness(117%) contrast(100%);
  }
`;

interface ToolBoxItem {
  image: string;
  mode: EditorMode;
}

const ToolBoxItems: ToolBoxItem[] = [
  { image: pen, mode: EditorMode.Draw },
  { image: del, mode: EditorMode.Delete },
];

const ToolBox = () => {
  const [items] = useState(ToolBoxItems);

  return (
    <ModeContext.Consumer>
      {({ mode, changeMode }) => (
        <ToolBoxWrapper>
          {items.map((item: ToolBoxItem, idx) => {
            return (
              <img
                key={idx}
                src={item.image}
                className={mode === item.mode ? "active" : ""}
                onClick={() => changeMode(item.mode)}
              />
            );
          })}
        </ToolBoxWrapper>
      )}
    </ModeContext.Consumer>
  );
};

export default ToolBox;
