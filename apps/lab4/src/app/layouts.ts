import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const button = (name: string, className = "btn-regular"): Key =>
  Object({ name, className, id: uuidv4() });

const layout: Key[][] = [
  [
    button("LoGo", "btn-logo"),
    button("F1", "btn-f1"),
    button("F2"),
    button("F3"),
    button("F4"),
    button("F5", "btn-f5"),
    button("F6"),
    button("F7"),
    button("F8"),
    button("F9", "btn-f9"),
    button("F10"),
    button("F11"),
    button("F12"),
  ],

  [
    button("~"),
    button("1"),
    button("2"),
    button("3"),
    button("4"),
    button("5"),
    button("6"),
    button("7"),
    button("8"),
    button("9"),
    button("0"),
    button("-"),
    button("="),
    button("backspace", "btn-backspace"),
  ],

  [
    button("Tab", "btn-tab"),
    button("q"),
    button("w"),
    button("e"),
    button("r"),
    button("t"),
    button("y"),
    button("u"),
    button("i"),
    button("o"),
    button("p"),
    button("["),
    button("]"),
    button("\\   |", "btn-dash"),
  ],

  [
    button("Caps Lock", "btn-caps-lock"),
    button("a"),
    button("s"),
    button("d"),
    button("f"),
    button("g"),
    button("h"),
    button("j"),
    button("k"),
    button("l"),
    button(";"),
    button("'"),
    button("\\"),
    button("Enter", "btn-enter"),
  ],

  [
    button("Shift", "btn-shift"),
    button("`"),
    button("z"),
    button("x"),
    button("c"),
    button("v"),
    button("b"),
    button("n"),
    button("m"),
    button(","),
    button("."),
    button("/"),
    button("Shift", "btn-shift"),
  ],

  [
    button("ctrl", "btn-ctrl"),
    button("win", "btn-win"),
    button("alt", "btn-alt"),
    button("space", "btn-space"),
    button("alt", "btn-alt"),
    button("win", "btn-win"),
    button("options", "btn-options"),
    button("ctrl", "btn-ctrl"),
  ],
];

const preload: Key[][] = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState")).layout
  : layout;


const layoutSlice = createSlice({
  name: "layout",
  initialState: preload,
  reducers: {
    updateLayout: (state, action: PayloadAction<Key>) => {
      const id = action.payload.id;

      const newMap = state.map((row) => {
        return row.map((key) => {
          if (key.id === id) return action.payload;
          else return key;
        });
      });

      Object.assign(state, newMap);
    },

    syncLayout: (state, action: PayloadAction<Group>) => {
      const groupKeys = action.payload.groupKeys;
      const color = action.payload.color;

      let map;

      if (groupKeys.length !== 0) {
        map = state.map((row) =>
          row.map((key) => {
            let found = false;

            groupKeys.forEach((keyInGroup) =>
              keyInGroup.id === key.id ? (found = true) : false
            );

            return found ? { ...key, color } : key;
          })
        );

        Object.assign(state, map);
      }
    },
  },
});

export const { updateLayout, syncLayout } = layoutSlice.actions;
export const { reducer } = layoutSlice;
export { layout }; 