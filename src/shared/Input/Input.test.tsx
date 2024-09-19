import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { describe, it, expect, vi } from 'vitest';

describe('Input', () => {
    it('should render input with placeholder and handle onChange', () => {
        const onChangeMock = vi.fn();

        render(
            <Input
                type="text"
                value=""
                onChange={onChangeMock}
                placeholder="Enter text"
            />
        );

        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'Test' } });

        expect(onChangeMock).toHaveBeenCalled();
    });

    it('should accept and apply custom className', () => {
        render(
            <Input
                type="text"
                value=""
                onChange={() => { }}
                className="custom-class"
            />
        );

        const input = screen.getByPlaceholderText('');
        expect(input).toHaveClass('custom-class');
    });
});
