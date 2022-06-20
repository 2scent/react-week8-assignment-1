import { render } from '@testing-library/react';

import ReviewForm from './ReviewForm';

describe('ReviewForm', () => {
  it('renders input controls', () => {
    const { getByLabelText, getByRole } = render((
      <ReviewForm />
    ));

    expect(getByLabelText('평점')).toBeInTheDocument();
    expect(getByLabelText('리뷰 내용')).toBeInTheDocument();

    expect(getByRole('button')).toHaveTextContent('리뷰 남기기');
  });
});
