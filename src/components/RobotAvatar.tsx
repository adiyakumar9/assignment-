// RobotAvatar.tsx
import React from 'react';


interface RobotAvatarProps {
  animationState: 'thinking' | 'looking' | 'idle';
}

const RobotAvatar: React.FC<RobotAvatarProps> = ({ animationState }) => {
  return (
    <div className={`robot-avatar ${animationState}`}>
      {/* SVG or animated image for the robot */}
      <img src="/path/to/robot.svg" alt="Robot Avatar" />
      <style >{`
        .robot-avatar {
          /* Base styles for the robot */
        }
        .robot-avatar.thinking {
          /* Animation for thinking state */
        }
        .robot-avatar.looking {
          /* Animation for looking state */
        }
        .robot-avatar.idle {
          /* Animation for idle state */
        }
      `}</style>
    </div>
  );
};

export default RobotAvatar;