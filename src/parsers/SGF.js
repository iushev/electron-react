import Parser from './Parser';
import {
    PLAYER_WHITE,
    PLAYER_BLACK,
    MOVE_TYPE_DICE_ROLL,
    MOVE_TYPE_CHECKERS_MOVE,
    MOVE_TYPE_CUBE_ACTION,
    LEGAL_CUBE_ACTION,
    MOVE_TYPE_RESIGN,
} from '../core';


export default class SGF extends Parser {
    parseHeader = (gameHeader) => {
        const header = {};

        //
        //      http://www.red-bean.com/sgf/backgammon.html#MI
        //
        // Property: MI
        //
        // Specifies information about the match the game belongs to.
        // This property should specify a list of tag/value pairs, where
        // the allowable tags are case-insensitive, and include:
        //     length - the match length (number of points); value should
        //              be a number
        //     game   - the number of this game within the match (the
        //              first game is 1); value should be a number
        //     bs     - the score for Black at the start of the game;
        //              value should be a number
        //     ws     - the score for White at the start of the game;
        //              value should be a number
        const regexLength = /MI.*\[length:(\d)\]/g;
        const mLength = regexLength.exec(gameHeader);
        if (mLength !== null) {
            header.length = mLength[1];
        }

        const regexGame = /MI.*\[game:(\d)\]/g;
        const mGame = regexGame.exec(gameHeader);
        if (mGame !== null) {
            header.id = mGame[1];
        }

        const regexWS = /MI.*\[ws:(\d)\]/g;
        const mWS = regexWS.exec(gameHeader);
        if (mWS !== null) {
            header.whiteScore = mWS[1];
        }

        const regexBS = /MI.*\[bs:(\d)\]/g;
        const mBS = regexBS.exec(gameHeader);
        if (mBS !== null) {
            header.blackScore = mBS[1];
        }

        //
        //      http://www.red-bean.com/sgf/properties.html#PW
        //
        // Property:	PW
        //
        // Provides the name of the white player.
        const regexPW = /PW\[(\w+)\]/g;
        const mPW = regexPW.exec(gameHeader);
        if (mPW !== null) {
            header.whiteName = mPW[1];
        }

        //
        //      http://www.red-bean.com/sgf/properties.html#PB
        // Property:	PB
        //
        // Provides the name of the black player.
        const regexPB = /PB\[(\w+)\]/g;
        const mPB = regexPB.exec(gameHeader);
        if (mPB !== null) {
            header.blackName = mPB[1];
        }

        //
        //      http://www.red-bean.com/sgf/properties.html#RU
        //      http://www.red-bean.com/sgf/backgammon.html#RU
        //
        // Property:	RU
        // Backgammon-specific values for the general RU property
        // include the following:
        //      [Crawford]              - the Crawford rule is being used in this match,
        //                                although this is not the Crawford game.
        //      [Crawford:CrawfordGame] - this IS the Crawford game.
        //      [Jacoby]                - the Jacoby rule is in use for this game.
        const regexRU = /RU\[(Crawford|Crawford:CrawfordGame|Jacoby)\]/g;
        const mRU = regexRU.exec(gameHeader);
        if (mRU !== null) {
            header.rule = mRU[1];
        }

        //
        //      http://www.red-bean.com/sgf/properties.html#RE
        //      http://www.red-bean.com/sgf/backgammon.html#RE
        //
        // Property:	RE
        //
        // Provides the result of the game. It is MANDATORY to use the
        // following format:
        //      "0" (zero) or "Draw" for a draw (jigo),
        //      "B+" ["score"] for a black win and
        //      "W+" ["score"] for a white win
        // Score is optional (some games don't have a score e.g. chess).
        // If the score is given it has to be given as a real value,
        // e.g. "B+0.5", "W+64", "B+12.5"
        // Use "B+R" or "B+Resign" and "W+R" or "W+Resign" for a win by
        // resignation. Applications must not write "Black resigns".
        // Use "B+T" or "B+Time" and "W+T" or "W+Time" for a win on time,
        // "B+F" or "B+Forfeit" and "W+F" or "W+Forfeit" for a win by
        // forfeit,
        // "Void" for no result or suspended play and
        // "?" for an unknown result.
        //
        // The general RE property has the following
        // modification in backgammon games: in the case of a
        // resignation, the value should also specify the number of
        // points before the R(esign).  Here are three example RE
        // properties:
        //     RE[B+6R]      - White resigns a backgammon on a 2
        //                     cube (worth 6 points).
        //     RE[W+2Resign] - Black resigns a gammon on a 1 cube
        //                     (worth 2 points).
        //     RE[W+4]       - Black drops a redouble to 8 (note
        //                     this is considered a normal loss, not
        //                     a resignation).
        const regexRE = /RE\[([WB])\+(\d)?(R|Resign)?\]/g;
        const mRE = regexRE.exec(gameHeader);
        if (mRE !== null) {
            header.result = {
                winner: mRE[1] === 'W' ? PLAYER_WHITE : PLAYER_BLACK,
                points: mRE[2] || 1,
                resign: mRE[3] ? true : false,
            };
        }

        return header;
    }

    parseMovies = (gameData) => {
        let moves = [];
        // loop through the moves
        const regexMove = /;(PL\[)?([B,W])(\]DI)?\[(double|take|drop|\d{2})(\w{0,8})\]/;
        let moveId = 0;
        for (var i = 1; i < gameData.length; i++) {
            const mMove = regexMove.exec(gameData[i]);
            let player = mMove[2] === 'B' ? PLAYER_BLACK : PLAYER_WHITE;

            if (LEGAL_CUBE_ACTION.indexOf(mMove[4]) !== -1) {
                moves.push({
                    id: moveId++,
                    player: player,
                    type: MOVE_TYPE_CUBE_ACTION,
                    move: mMove[4],
                });
            } else {
                moves.push({
                    id: moveId++,
                    player: player,
                    type: MOVE_TYPE_DICE_ROLL,
                    move: [mMove[4][0], mMove[4][1]],
                });

                if (typeof mMove[5] !== 'undefined' && mMove[5] !== '') {
                    moves.push({
                        id: moveId++,
                        player: player,
                        type: MOVE_TYPE_CHECKERS_MOVE,
                        move: this.parsePoints(mMove[5]),
                    });
                }
            }
        }

        return moves;
    }

    parsePoints = (move) => {
        let points = [];
        for(let i = 0; i < move.length; i++) {
            points.push({
                from: move.charCodeAt(i++) - 96,
                to: move.charCodeAt(i) - 96,
            });
        }
        return points;
    }

    parseFromString = (data) => {
        const regexGames = /\((;FF[\[\]\w\:\s\.\d\-\+\n;]+)\)/g;
        let match = {
            games: [],
        };

        let m;
        while ((m = regexGames.exec(data)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regexGames.lastIndex) {
                regexGames.lastIndex++;
            }

            const gameData = m[1].split('\n');
            const gameHeader = gameData[0];
            const header = this.parseHeader(gameHeader);
            const moves = this.parseMovies(gameData);
            if (header.result.resign) {
                moves.push({
                    id: moves.length,
                    player: header.result.winner === PLAYER_BLACK ? PLAYER_WHITE : PLAYER_BLACK,
                    type: MOVE_TYPE_RESIGN,
                    move: 'resign',
                });
            }
            match.games.push({
                ...header,
                moves,
            });
        }

        return match;
    }
}