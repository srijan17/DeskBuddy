import React, { useEffect } from 'react';
import {assistantBehaviour, Mood} from './behaviour';
const Assistant: React.FC = () => {
    const [assistantMood, setAssistantMood] = React.useState<Mood>("happy");
    let clickCount = 0;
    const [lastInteractionTime, setLastInteractionTime] = React.useState<number>(Date.now());
    const interactionHistory: Record<string, { count: number; lastTime: number }> = {};

    // function triggerEvent(eventType) {
    //   const state = behaviorConfig.states[eventType];

    //   // Mood changes
    //   if (state.moodChange) currentMood = state.moodChange;
    //   if (state.moodLock) lockMood(currentMood);

    //   // Animation trigger
    //   playAnimation(state.animation);

    //   // Speech bubble
    //   const msg = getRandom(state.responses);
    //   showSpeechBubble(msg);

    //   // Update visuals
    //   setExpression(behaviorConfig.moods[currentMood].expression);
    //   setMoodColor(behaviorConfig.moods[currentMood].color);

    //   // Track for idle/anti-spam
    //   if (eventType === "clicked") clickCount++;
    //   lastInteractionTime = Date.now();
    // }



    function displayMood() {
        const mood = assistantBehaviour.moods.find(x=>x.mood==assistantMood);
        return mood?.expression
        // Here you would set the expression and color based on the mood
        // For example:
        // setExpression(mood.expression);
        // setMoodColor(mood.color);
    }
    useEffect(() => {
        const handleClick = () => {
            setLastInteractionTime(Date.now()); // Update last interaction time
            clickCount++;
            if (clickCount >= 3) {
                setAssistantMood("grumpy"); // Change mood to grumpy after 3 clicks
                clickCount = 0; // Reset click count
            } else {
                setAssistantMood("happy"); // Change mood to happy on each click
            }
        };

        const handleDrag = () => {
            setLastInteractionTime(Date.now()); // Update last interaction time
            setAssistantMood("confused"); // Change mood to confused on drag
        };

        const handleIdle = () => {
            if (Date.now() - lastInteractionTime > 5000) { // 5 seconds idle
                setAssistantMood("bored"); // Change mood to bored after 5 seconds of inactivity
            }
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('dragstart', handleDrag);
        const idleInterval = setInterval(handleIdle, 1000); // Check for idle every second

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('dragstart', handleDrag);
            clearInterval(idleInterval);
        };
    }
    , []);
    
    return (

        <div style={{ fontSize: '3rem', textAlign: 'center' }}>
            {displayMood()}
        </div>
    );
};

export default Assistant;