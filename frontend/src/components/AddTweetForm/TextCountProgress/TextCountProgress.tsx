import React, { FC, memo, ReactElement } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { MAX_TEXT_LENGTH } from "../../../constants/common-constants";
import { useTextCountProgressStyles } from "./TextCountProgressStyles";
import { calculateTweetLength, getTweetLengthPercent } from "../../../util/tweet-text-counter";

interface TextCountProgressProps {
    text: string;
}

const TextCountProgress: FC<TextCountProgressProps> = memo(({ text }): ReactElement | null => {
    const classes = useTextCountProgressStyles();
    const currentLength = calculateTweetLength(text);
    const textLimitPercent = getTweetLengthPercent(text, MAX_TEXT_LENGTH);
    const textCount = MAX_TEXT_LENGTH - currentLength;

    if (!text) {
        return null;
    }

    return (
        <>
            <span id="textCount">{textCount}</span>
            <div className={classes.footerAddFormCircleProgress}>
                <CircularProgress
                    className={currentLength >= MAX_TEXT_LENGTH ? classes.progressColor : undefined}
                    value={currentLength >= MAX_TEXT_LENGTH ? 100 : textLimitPercent}
                    variant="determinate"
                    size={20}
                    thickness={5}
                />
                <CircularProgress
                    className={classes.defaultProgressColor}
                    variant="determinate"
                    size={20}
                    thickness={5}
                    value={100}
                />
            </div>
        </>
    );
});

export default TextCountProgress;
