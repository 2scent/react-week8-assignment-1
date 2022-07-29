import styled from '@emotion/styled';

const List = styled.ul({
  margin: 0,
  padding: '1rem',
  listStyle: 'none',
});

const Review = styled.li({
  marginBottom: '1rem',
  padding: '.5rem',
  border: '1px solid #000000',
});

const Name = styled.span({
  fontWeight: 'bold',
});

const Description = styled.div({
  marginTop: '.7rem',
});

export default function Reviews({ reviews }) {
  if (!reviews || !reviews.length) {
    return null;
  }

  const sortedReviews = [...reviews].sort((a, b) => b.id - a.id);

  return (
    <List>
      {sortedReviews.map((review) => (
        <Review key={review.id}>
          <Name>
            {review.name}
          </Name>
          {' - '}
          <span>
            {review.score}
            점
          </span>
          <Description>
            {review.description}
          </Description>
        </Review>
      ))}
    </List>
  );
}
