import styled from '@emotion/styled';

const ResultItem = styled.li(() => ({
  marginBottom: '.5em',
  borderRadius: '.5em',
  padding: '.6em 1.2em',
  '& > div:nth-child(1)': {
    marginBottom: '.5em',
  },
  '& > div:nth-child(2)': {
    color: '#424242',
    fontSize: '1.1em',
    fontWeight: 'bold',
  },
  '& > div > span:nth-child(1)': {
    color: '#424242',
    fontSize: '1em',
    fontWeight: 'bold',
  },
  '& > div > span:nth-child(2)': {
    color: '#424242',
    fontSize: '1.1em',
    fontWeight: 'bold',
    marginLeft: '.5em',
  },
}));


export default ResultItem;
