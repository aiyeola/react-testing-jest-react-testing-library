import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Counter } from './Counter';

describe('initialize counter with defaultCount=0 and description="My Counter', () => {
  const setup = () =>
    render(<Counter description="My Counter" defaultCount={0} />);

  it('defaultCount=0, then count = 0', () => {
    setup();
    expect(screen.getByText('Current Count: 0')).toBeInTheDocument();
    expect(screen.getByText(/My Counter/)).toBeInTheDocument();
  });

  it('defaultCount=0, and + clicked then count = 1', async () => {
    const { click } = userEvent.setup();
    setup();
    await click(screen.getByRole('button', { name: 'Add to Counter' }));
    expect(screen.getByText('Current Count: 1')).toBeInTheDocument();
  });

  it('defaultCount=0, and - clicked then count = -1', async () => {
    const { click } = userEvent.setup();
    setup();
    await click(screen.getByRole('button', { name: 'Subtract from Counter' }));
    expect(screen.getByText('Current Count: -1')).toBeInTheDocument();
  });
});

describe('Counter', () => {
  describe('initialized with defaultCount=10 and description="WWW"', () => {
    const setup = () => render(<Counter description="WWW" defaultCount={10} />);

    it('renders "Current Count: 10" and description="WWW"', () => {
      setup();
      expect(screen.getByText('Current Count: 10')).toBeInTheDocument();
      expect(screen.getByText(/WWW/)).toBeInTheDocument();
    });

    describe('when the incrementor changes to 5 and "+" button is clicked', () => {
      const setup = () =>
        render(<Counter description="WWW" defaultCount={10} />);

      it('renders "Current Count: 15"', async () => {
        const { click, type } = userEvent.setup();
        setup();
        await type(
          screen.getByLabelText(/incrementor/i),
          '{Control>}[KeyA]{/Control}{Delete}5',
        );
        await click(screen.getByRole('button', { name: 'Add to Counter' }));
        expect(screen.getByText('Current Count: 15')).toBeInTheDocument();
      });
    });

    describe('when the incrementor changes to 25 and "-" button is clicked', () => {
      const setup = () =>
        render(<Counter description="WWW" defaultCount={10} />);

      it('renders "Current Count: -15"', async () => {
        const { click, type } = userEvent.setup();
        setup();
        await type(
          screen.getByLabelText(/Incrementor/),
          '{Control>}[KeyA]{/Control}{Delete}25',
        );
        await click(
          screen.getByRole('button', { name: 'Subtract from Counter' }),
        );
        expect(screen.getByText('Current Count: -15')).toBeInTheDocument();
      });
    });
  });
});
