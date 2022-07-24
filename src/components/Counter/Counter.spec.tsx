import { fireEvent, render, screen } from '@testing-library/react';

import { Counter } from './Counter';

describe('initialize counter with defaultCount=0 and description="My Counter', () => {
  const setup = () =>
    render(<Counter description="My Counter" defaultCount={0} />);

  beforeEach(() => {});

  it('defaultCount=0, then count = 0', () => {
    setup();
    expect(screen.getByText('Current Count: 0')).toBeInTheDocument();
    expect(screen.getByText(/My Counter/)).toBeInTheDocument();
  });

  it('defaultCount=0, and + clicked then count = 1', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Add to Counter' }));
    expect(screen.getByText('Current Count: 1')).toBeInTheDocument();
    expect(screen.getByText(/My Counter/)).toBeInTheDocument();
  });

  it('defaultCount=0, and - clicked then count = -1', () => {
    setup();
    fireEvent.click(
      screen.getByRole('button', { name: 'Subtract from Counter' }),
    );
    expect(screen.getByText('Current Count: -1')).toBeInTheDocument();
    expect(screen.getByText(/My Counter/)).toBeInTheDocument();
  });
});

import user from '@testing-library/user-event';

describe('Counter', () => {
  describe('initialized with defaultCount=10 and description="WWW"', () => {
    const setup = () =>
      render(<Counter description="My Counter" defaultCount={0} />);

    beforeEach(() => {});

    it('renders "Current Count: 10"', () => {
      setup();
      expect(screen.getByText('Current Count: 10')).toBeInTheDocument();
    });

    it('renders title as "WWW"', () => {
      setup();
      expect(screen.getByText(/WWW/)).toBeInTheDocument();
    });

    describe('when the incrementor changes to 5 and "+" button is clicked', () => {
      beforeEach(() => {
        void user.type(screen.getByLabelText(/Incrementor/), '{selectall}5');
        void user.click(screen.getByRole('button', { name: 'Add to Counter' }));
      });

      it('renders "Current Count: 15"', () => {
        expect(screen.getByText('Current Count: 15')).toBeInTheDocument();
      });

      describe('when the incrementor changes to empty string and "+" button is clicked', () => {
        beforeEach(() => {
          void user.type(
            screen.getByLabelText(/Incrementor/),
            '{selectall}{delete}',
          );
          void user.click(
            screen.getByRole('button', { name: 'Add to Counter' }),
          );
        });

        it('renders "Current Count: 16"', () => {
          expect(screen.getByText('Current Count: 16')).toBeInTheDocument();
        });
      });
    });

    describe('when the incrementor changes to 25 and "-" button is clicked', () => {
      beforeEach(() => {
        void user.type(screen.getByLabelText(/Incrementor/), '{selectall}25');
        void user.click(
          screen.getByRole('button', { name: 'Subtract from Counter' }),
        );
      });

      it('renders "Current Count: -15"', () => {
        expect(screen.getByText('Current Count: -15')).toBeInTheDocument();
      });
    });
  });

  describe('initialized with defaultCount=0 and description="My Counter"', () => {
    const setup = () =>
      render(<Counter description="My Counter" defaultCount={0} />);

    beforeEach(() => {});

    it('renders "Current Count: 0"', () => {
      setup();
      expect(screen.getByText('Current Count: 0')).toBeInTheDocument();
    });

    it('renders title as "MyCounter"', () => {
      setup();
      expect(screen.getByText(/my counter/i)).toBeInTheDocument();
    });

    describe('when - is clicked', () => {
      beforeEach(() => {
        void user.click(
          screen.getByRole('button', { name: 'Subtract from Counter' }),
        );
      });

      it('renders "Current count: 1"', () => {
        expect(screen.getByText('Current Count: -1')).toBeInTheDocument();
      });
    });

    describe('when + is clicked', () => {
      beforeEach(() => {
        void user.click(screen.getByRole('button', { name: 'Add to Counter' }));
      });

      it('renders "Current count: -1"', () => {
        expect(screen.getByText('Current Count: 1')).toBeInTheDocument();
      });
    });
  });
});
