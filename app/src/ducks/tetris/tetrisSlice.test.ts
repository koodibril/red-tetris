import reducer, { setAdmin, setInfo, setMalus, 
    setNextTetra,
    setPosition,
    setScore,
    setStatus,
    setTetra,
    clearTetra,
    setMerge,
    setRoom,
    setName,
    setOponents,
    TetrisState
} from "./tetrisSlice";

const tetraminos = 
{
  x: 2,
  y: 2,
  value: 2,
  color: "blue",
  shape: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

const initialState: TetrisState = {
    gameStatus: "Waiting",
    tetra: undefined,
    score: 0,
    info: [],
    admin: false,
    nextTetra: undefined,
    position: [1, 1],
    merge: undefined,
    room: "",
    name: "",
    oponents: undefined,
  };

test('initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
})

test('setAdmin', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.admin = true;
    expect(reducer(previousState, setAdmin(true))).toEqual(nextState);
})

test('setStatus', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.gameStatus = "Playing";
    expect(reducer(previousState, setStatus("Playing"))).toEqual(nextState);
})

test('setTetra', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.tetra = tetraminos;
    nextState.gameStatus = "Playing";
    expect(reducer(previousState, setTetra(tetraminos))).toEqual(nextState);
})

test('setRoom', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.room = "test";
    expect(reducer(previousState, setRoom("test"))).toEqual(nextState);
})

test('setName', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.name = "test";
    expect(reducer(previousState, setName("test"))).toEqual(nextState);
})

test('clearTetra', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    previousState.tetra = tetraminos;
    nextState.tetra = undefined;
    expect(reducer(previousState, clearTetra())).toEqual(nextState);
})

test('setMalus', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    previousState.merge = [];
    const newLine = [];
    for (let j = 0; j < 12; j++) {
      newLine.push({ value: 1, color: "grey" });
    }
    nextState.merge = [newLine];
    expect(reducer(previousState, setMalus(1))).toEqual(nextState);
})

test('setScore', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.score = 10;
    expect(reducer(previousState, setScore(10))).toEqual(nextState);
})

test('setInfo', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.info = ['test'];
    expect(reducer(previousState, setInfo("test"))).toEqual(nextState);
})

test('setNextTetra', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.nextTetra = [tetraminos];
    expect(reducer(previousState, setNextTetra([tetraminos]))).toEqual(nextState);
})

test('setPosition', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.position = [1, 2];
    expect(reducer(previousState, setPosition([1,2]))).toEqual(nextState);
})

test('setMerge', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.merge = [];
    expect(reducer(previousState, setMerge([]))).toEqual(nextState);
})

test('setOponents', () => {
    const previousState = initialState;
    const nextState = {...initialState};
    nextState.oponents = [];
    expect(reducer(previousState, setOponents([]))).toEqual(nextState);
})