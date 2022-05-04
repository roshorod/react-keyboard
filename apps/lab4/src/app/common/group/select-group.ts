import { useDispatch } from "react-redux";
import store from "../../store";

export const SelectGroup = (state: Group, group: Group)  =>  {
    Object.assign(state, {...group});
}
