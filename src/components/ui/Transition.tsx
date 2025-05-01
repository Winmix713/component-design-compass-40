
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

interface TransitionProps {
  in: boolean;
  timeout?: number;
  children: React.ReactNode;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  className?: string;
  enterClassName?: string;
  enteringClassName?: string;
  enteredClassName?: string;
  exitClassName?: string;
  exitingClassName?: string;
  exitedClassName?: string;
}

const Transition: React.FC<TransitionProps> = ({
  in: inProp,
  timeout = 300,
  children,
  mountOnEnter = false,
  unmountOnExit = false,
  appear = false,
  className,
  enterClassName,
  enteringClassName,
  enteredClassName,
  exitClassName,
  exitingClassName,
  exitedClassName,
}) => {
  const [state, setState] = useState<TransitionState>(
    inProp ? (appear ? 'entering' : 'entered') : 'exited'
  );
  const [mounted, setMounted] = useState(!mountOnEnter || inProp);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (inProp) {
      // If we need to mount
      if (mountOnEnter && !mounted) {
        setMounted(true);
      }

      if (state !== 'entering' && state !== 'entered') {
        setState('entering');
        timeoutId = setTimeout(() => {
          setState('entered');
        }, timeout);
      }
    } else {
      if (state !== 'exiting' && state !== 'exited') {
        setState('exiting');
        timeoutId = setTimeout(() => {
          setState('exited');
          if (unmountOnExit) {
            setMounted(false);
          }
        }, timeout);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [inProp, mounted, mountOnEnter, state, timeout, unmountOnExit]);

  if (!mounted) return null;

  let transitionClassName = '';
  if (state === 'entering') transitionClassName = enteringClassName || '';
  else if (state === 'entered') transitionClassName = enteredClassName || '';
  else if (state === 'exiting') transitionClassName = exitingClassName || '';
  else if (state === 'exited') transitionClassName = exitedClassName || '';

  return (
    <div
      className={cn(
        className,
        transitionClassName,
        state === 'entering' && enterClassName,
        state === 'exiting' && exitClassName
      )}
      style={{
        transition: `all ${timeout}ms ease-in-out`,
      }}
    >
      {children}
    </div>
  );
};

export default Transition;
