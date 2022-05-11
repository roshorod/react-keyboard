import styled from "styled-components";

const AppWrapper = styled.div`
  display: grid;

  grid-template-columns: 1.5fr 6fr;
  grid-template-rows: 5vh 5fr;

  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #4f4b4b;

  position: relative;

  grid-row: 2;
  grid-column: 2;
`;

const HeaderWrapper = styled.section`
  grid-row: 1;
  grid-column: 2;

  background: #2b2b2b;
`;

const SidebarWrapper = styled.aside`
  display: flex;

  flex-direction: column;

  grid-row-start: 1;
  grid-row-end: 3;

  grid-colum: 1;

  background: #2b2b2b;
`;

const ColorPickerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export { ColorPickerWrapper, SidebarWrapper, HeaderWrapper, ContentWrapper, AppWrapper };
