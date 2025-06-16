export type MoodConfig = {
    mood: Mood;
    expression: string;
    color: string;
    transitions?: Array<Transition>;
};

export type Transition = {
        state: State;
        nextMood: Mood;
        action: {
            actionType: ActionType;
            actionDetails: {
                duration?: number;
                count?: number;
                threshold?: number;
            }
        };
    }
export type AssistantBehaviour = {
    moods: MoodConfig[];
    globalTransitions?: Array<Transition>;
};

export type ActionType = "click" | "drag" | "interval";

export type Mood = "happy" | "bored" | "confused" | "grumpy" | "engaged";
export type State = "idle" | "clicked" | "dragged" | "chat" | "grumpy";

export const assistantBehaviour: AssistantBehaviour = {
    moods: [
        {
            mood: "happy",
            expression: "😀",
            color: "#ffe37b",
            transitions: [
                {
                    state: "idle",
                    nextMood: "bored",
                    action: {
                        actionType: "interval",
                        actionDetails: {
                            duration: 5000,
                            count: 1,
                            threshold: 1
                        }
                    }
                },
                {
                    state: "clicked",
                    nextMood: "engaged",
                    action: {
                        actionType: "click",
                        actionDetails: {
                            duration: 1000,
                            count: 1,
                            threshold: 1
                        }
                    }
                }
            ]
        },
        {
            mood: "bored",
            expression: "😐",
            color: "#d4d4d4"
        },
        {
            mood: "confused",
            expression: "🤔",
            color: "#a1c4ff"
        },
        {
            mood: "grumpy",
            expression: "😠",
            color: "#ff8a8a"
        },
        {
            mood: "engaged",
            expression: "😃",
            color: "#a6f3a6",
            transitions:[
                {
                    state: "idle",
                    nextMood: "happy",
                    action: {
                        actionType: "interval",
                        actionDetails: {
                            duration: 3000,
                            count: 1,
                            threshold: 1
                        }
                    }
                }
            ]
        }
    ],
    globalTransitions:[
        {
            state: "idle",
            nextMood: "bored",
            action: {
                actionType: "interval",
                actionDetails: {
                    duration: 10000,
                    count: 1,
                    threshold: 1
                }
            }
        },
        {
            state: "clicked",
            nextMood: "engaged",
            action: {
                actionType: "click",
                actionDetails: {
                    duration: 1000,
                    count: 1,
                    threshold: 1
                }
            }
        }
    ]
}

