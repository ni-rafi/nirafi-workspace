import React from 'react';
import ClickReveal from './ClickReveal';

interface ClickRevealGroupProps {
  children: React.ReactNode;
  /** Built-in animation preset style to apply to all list items */
  preset?: 'fade' | 'fade-in' | 'up' | 'down' | 'scale' | 'none';
  className?: string;
}

/**
 * ClickRevealGroup automatically wraps all child elements (like list items)
 * in sequential relative click reveals, replicating the <v-clicks> shorthand.
 */
export const ClickRevealGroup: React.FC<ClickRevealGroupProps> = ({
  children,
  preset = 'fade-in',
  className = '',
}) => {
  return (
    <div className={className} data-click-reveal-group>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        
        // Wrap each item to trigger sequentially (+1 relative offset)
        return (
          <ClickReveal at="+1" preset={preset}>
            {child}
          </ClickReveal>
        );
      })}
    </div>
  );
};

export default ClickRevealGroup;
