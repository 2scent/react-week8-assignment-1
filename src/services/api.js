export async function fetchRegions() {
  const url = 'https://eatgo-customer-api.ahastudio.com/regions';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('지역 목록을 불러오지 못했습니다.');
  }

  const data = await response.json();
  return data;
}

export async function fetchCategories() {
  const url = 'https://eatgo-customer-api.ahastudio.com/categories';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchRestaurants({ regionName, categoryId }) {
  const url = 'https://eatgo-customer-api.ahastudio.com/restaurants'
    + `?region=${regionName}&category=${categoryId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchRestaurant({ restaurantId }) {
  const url = 'https://eatgo-customer-api.ahastudio.com'
    + `/restaurants/${restaurantId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function postLogin({ email, password }) {
  const url = 'https://eatgo-login-api.ahastudio.com/session';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('잘못된 요청입니다.');
  }

  const { accessToken } = await response.json();
  return accessToken;
}

export async function postReview({
  accessToken, restaurantId, score, description,
}) {
  const url = 'https://eatgo-customer-api.ahastudio.com'
    + `/restaurants/${restaurantId}/reviews`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ score, description }),
  });
  await response.json();
}
