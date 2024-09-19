import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { describe, it, expect, vi } from 'vitest';

describe('Button', () => {
    it('should render button with children and handle onClick', () => {
        const onClickMock = vi.fn();

        render(<Button onClick={onClickMock}>Click Me</Button>);

        const button = screen.getByText('Click Me');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(onClickMock).toHaveBeenCalled();
    });

    it('should accept and apply custom className', () => {
        render(
            <Button onClick={() => { }} className="custom-class">
                Click Me
            </Button>
        );

        const button = screen.getByText('Click Me');
        expect(button).toHaveClass('custom-class');
    });
});
