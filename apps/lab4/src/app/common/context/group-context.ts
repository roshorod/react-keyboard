import React from "react";

interface Props {
    groupId: string | null;
    changeGroupId: Function;
}

export const GroupContext = React.createContext<Props>({
    groupId: null,
    changeGroupId: () => { }
});