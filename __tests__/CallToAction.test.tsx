import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CallToAction from '@/components/callToAction/CallToAction';

describe('Tests for CallToAction.tsx', () => {
  beforeEach(() => {
    render(<CallToAction />);
  });

  afterEach(() => {
    cleanup();
  });

  it('click on newsletter button should show newsletter form', async () => {
    const newsletterContainer = screen.getByTestId(
      'newsletter-button-container'
    );
    expect(newsletterContainer).toBeInTheDocument();
    const newseletterForm = screen.getByTestId('newsletter-form');
    expect(newseletterForm.className).toBe('hidden');
    userEvent.click(newsletterContainer);
    await waitFor(() => {
      expect(newseletterForm.className).toBe('visible');
    });
  });
});
