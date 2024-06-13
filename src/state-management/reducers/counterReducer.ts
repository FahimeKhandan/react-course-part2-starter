interface Action {
  type: "INCRIMENT" | "RESET";
}

const counterReducer = (state: number, action: Action): number => {
  if (action.type === "INCRIMENT") return state + 1;
  if (action.type === "RESET") return 0;
  return state;
};

export default counterReducer;
