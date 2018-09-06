export const PLAYER_WHITE = 'white';
export const PLAYER_BLACK = 'black';

export const MOVE_TYPE_DICE_ROLL = 'dice_roll';
export const MOVE_TYPE_CHECKERS_MOVE = 'checkers_move';
export const MOVE_TYPE_CUBE_ACTION = 'cube_action';
export const MOVE_TYPE_RESIGN = 'resign';

export const CUBE_ACTION_DOUBLE = 'double';
export const CUBE_ACTION_TAKE = 'take';
export const CUBE_ACTION_DROP = 'drop';
export const LEGAL_CUBE_ACTION = [
    CUBE_ACTION_DOUBLE,
    CUBE_ACTION_TAKE,
    CUBE_ACTION_DROP,
];
