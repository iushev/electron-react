export const INIT_BOARD = 'INIT_BOARD';
export const MOVE_CHECKER = 'MOVE_CHECKER';

export const initBoard = () => ({
    type: INIT_BOARD,
});

export const moveChecker = (fromPoint, toPoint) => ({
    type: MOVE_CHECKER,
    fromPoint,
    toPoint,
});
