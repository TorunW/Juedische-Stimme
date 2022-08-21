import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/forms/ContactForm';

describe('Tests for Contact Form ( components/ContactForm.tsx )', () => {
  beforeEach(() => {
    render(<ContactForm />);
  });
  afterEach(() => {
    cleanup();
  });

  it('should show the "required" validation errors for name , email & message when trying to submit without input', async () => {
    const submitButton = screen.getByTestId('submit-button');
    userEvent.click(submitButton);
    await waitFor(() => {
      const emailError = screen.getByTestId('email-error');
      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveTextContent('* required!');
      const nameError = screen.getByTestId('name-error');
      expect(nameError).toBeInTheDocument();
      expect(nameError).toHaveTextContent('* required!');
      const messageError = screen.getByTestId('message-error');
      expect(messageError).toBeInTheDocument();
      expect(messageError).toHaveTextContent('* required!');
    });
  });

  it('should show an error if a name is too short', async () => {
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'ab' },
    });
    await waitFor(() => {
      const nameError = screen.getByTestId('name-error');
      expect(nameError).toBeInTheDocument();
      expect(nameError).toHaveTextContent('* too short!');
    });
  });

  it('should show an error if an email is not valid', async () => {
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: '123456' },
    });
    await waitFor(() => {
      const emailError = screen.getByTestId('email-error');
      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveTextContent('email must be a valid email');
    });
  });
});
