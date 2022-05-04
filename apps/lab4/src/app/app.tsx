import { useSelector } from "react-redux";

import { State } from "./store";

import Keyboard from "./components/keyboard";
import styled from "styled-components";
import ToolBox from "./components/toolbox";
import Group from "./components/group";

const AppWrapper = styled.div`
  display: grid;

  grid-template-columns: 1.5fr 6fr;
  grid-template-rows: 5vh 5fr;

  width: 100%;
  height: 100vh
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
  height: 250px;

  background: white;

  padding: 10px;
`;

function App() {
  const layout = useSelector((state: State) => state.layout);

  return (
    <AppWrapper>
      <Profiles>

      </Profiles>
      <Groups>
        <Group />
        <ColorPicker><h1>Color picker</h1></ColorPicker>
      </Groups>
      <Center>
        <ToolBox></ToolBox>
        <Keyboard layout={layout} />
      </Center>
    </AppWrapper>
  );
}

export default App;
