// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/*import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchPresenter from './Presenter/searchPresenter';
import Model from './bookModel';

// Mocka modellen som presenteren använder
const mockModel = new Model();

describe('SearchPresenter', () => {
    it('renders search form and handles search', () => {
        // Rendera SearchPresenter med mockad modell
        render(<SearchPresenter model={mockModel} />);

        // Simulera användarinteraktion
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test query' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Fiction' } });
        fireEvent.click(screen.getByText('Search!'));

        // Kontrollera att modellen har uppdaterats korrekt
        expect(mockModel.searchParams.query).toBe('test query');
        expect(mockModel.searchParams.type).toBe('Fiction');

        // Du kan även kontrollera att presenteren uppdaterar vyn korrekt
        // till exempel genom att leta efter laddningssymbolen eller resultaten
    });
});*/


