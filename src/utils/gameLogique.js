export const addSquireToGrid = (
  shape,
  shapeLength,
  clickPostion,
  gridState,
  playerAttributes
) => {
  let broad = gridState.broad;
  let isAvailablePlace = true;
  let isDone = false;
  let thereIsACorner = false;
  let currentRowInBroad = -20;
  let currentRowInshape = -shapeLength;
  const { corner, point, id } = playerAttributes;
  const checkTheSideSquire = (grid, initValue, SideSquires, squireValue) => {
    let isThereIsSideSquirre = false;
    for (let i = 0; i < SideSquires.length; i++) {
      if (
        grid[initValue + SideSquires[i]] === squireValue[1] ||
        grid[initValue + SideSquires[i]] === squireValue[0]
      ) {
        isThereIsSideSquirre = true;
      }
    }
    return isThereIsSideSquirre;
  };


  // reduce the empty row from the shape
  const row = Math.ceil((shape.lastIndexOf(corner) + 1) / shapeLength);
  // reduce the empty col from shape
  const firstRowInShape = shape.slice(0, shapeLength);

  const lastRowInShape = shape.slice(
    (row - 1) * shapeLength,
    row * shapeLength
  );

  let col = Math.max(
    lastRowInShape.lastIndexOf(corner) + 1,
    firstRowInShape.lastIndexOf(corner) + 1
  );


  if (shapeLength === 3 && shape[3] !== 0 && shape[5] !== 0 && row === 3) {
    col = 3;
  }
  if (
    shapeLength === 4 &&
    (shape[5] !== 0 || shape[9] !== 0) &&
    shape[12] === corner
  ) {
    col = 2;
  }
  if (
    shapeLength === 3 &&
    shape[0] === corner &&
    shape[3] === point &&
    shape[4] === corner &&
    shape[6] === corner &&
    shape[8] === 0 &&
    shape[7] === 0
  ) {
    col = 2;
  }

  // check the first move for the player
  const IsFirstShapeGreenPlayer =
    col + clickPostion - 1 + (row - 1) * 20 === 399 &&
    broad[399] === 0 &&
    shape[row * shapeLength - (shapeLength - col) - 1] === 11 &&
    id === 1;

  const IsFirstShapeBluePlayer =
    clickPostion + (row - 1) * 20 === 380 &&
    broad[380] === 0 &&
    shape[(row - 1) * shapeLength] === 14 &&
    id === 4;
  const IsFirstShapeRedPlayer =
    broad[19] === 0 &&
    id === 2 &&
    clickPostion + col - 1 === 19 &&
    shape[col - 1] === 12;
  const IsFirstShapeYellowPlayer =
    broad[0] === 0 && shape[0] === 13 && id === 3 && clickPostion === 0;

  // check if there is a correct place
  for (let i = 0; i < row; i++) {
    currentRowInBroad += 20;
    currentRowInshape += shapeLength;
    for (let j = 0; j < col; j++) {
      // check if there is a corner or the player play at the  first time

      if (
        shape[currentRowInshape + j] === corner &&
        (IsFirstShapeGreenPlayer ||
          IsFirstShapeBluePlayer ||
          IsFirstShapeRedPlayer ||
          IsFirstShapeYellowPlayer ||
          checkTheSideSquire(
            broad,
            currentRowInBroad + clickPostion,
            [j + 19, j - 19, j + 21, j - 21],
            [corner, corner]
          ))
      ) {
        thereIsACorner = true;
      }
      // check if there is an error
      if (
        (checkTheSideSquire(shape, currentRowInshape, [j], [point, corner]) &&
          checkTheSideSquire(
            broad,
            currentRowInBroad + clickPostion,
            [j - 1, j + 1, j + 20, j - 20],
            [point, corner]
          )) ||
        j + clickPostion + currentRowInBroad >
          19 - (clickPostion % 20) + currentRowInBroad + clickPostion
      ) {
        isAvailablePlace = false;
      }
      if (
        checkTheSideSquire(shape, currentRowInshape, [j], [point, corner]) &&
        currentRowInBroad + clickPostion > 399
      ) {
        isAvailablePlace = false;
      }
    }
    if (i === row - 1) {
      isDone = true;
      currentRowInBroad = -20;
      currentRowInshape = -shapeLength;
    }
  }

  // if there every thing is  ok  update the broad
  if (isDone && isAvailablePlace && thereIsACorner) {
    for (let i = 0; i < row; i++) {
      currentRowInBroad += 20;
      currentRowInshape += shapeLength;
      for (let j = 0; j < col; j++) {
        if (
          checkTheSideSquire(shape, currentRowInshape, [j], [corner, point])
        ) {
          broad[j + currentRowInBroad + clickPostion] =
            shape[currentRowInshape + j];
        }
      }
    }
    gridState.isShapePlaced = true;
    gridState.currentPlayer = id === 4 ? 1 : id + 1;
    gridState.broad = broad;
  }
  return gridState;
};

export const displayShape = (state, selectedShape, playerId) => {
  const shapes = state.players[playerId - 1].shapes;

  shapes.map((el) => {
    if (el.id === selectedShape) {
      el.isPlaced = true;
      return;
    }
    return el;
  });

  state.players[playerId - 1].shapes = shapes;
  return state;
};
export const rotateShape = (state, selectedShape, rotateDeg, playerId) => {
  const shapes = state.players[playerId - 1].shapes;
  shapes.map((el) => {
    if (el.id === selectedShape) {
      return (el.matris = el.rotation[rotateDeg]);
    }
    return el;
  });
  state.players[playerId - 1].shapes = shapes;
  return state;
};
export const calculateScore = (player) => {
  const { shapes } = player;
  let noPlacedShapes = [];
  let score = 0;
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].isPlaced === false) {
      noPlacedShapes.push(...shapes[i].matris);
    }
  }
  for (let j = 0; j < noPlacedShapes.length; j++) {
    if (noPlacedShapes[j] !== 0) {
      score = score + 1;
    }
  }
  player.score = score;

  return player;
};