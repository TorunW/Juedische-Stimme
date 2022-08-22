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
    const user = userEvent.setup()
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);
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
    const user = userEvent.setup()
    await user.type(screen.getByTestId('name-input'), 'ab');
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);
    await waitFor(() => {
      const nameError = screen.getByTestId('name-error');
      expect(nameError).toBeInTheDocument();
      expect(nameError).toHaveTextContent('* too short!');
    });
  });

  it('should show an error if an email is not valid', async () => {
    const submitButton = screen.getByTestId('submit-button');
    const user = userEvent.setup()
    await user.click(submitButton);
    await user.type(screen.getByTestId('email-input'), '123456');
    await waitFor(() => {
      const emailError = screen.getByTestId('email-error');
      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveTextContent('email must be a valid email');
    });
  });
});
