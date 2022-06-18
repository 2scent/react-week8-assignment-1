export async function fetchRegions() {
  const url = `${process.env.CUSTOMER_API_URL}/regions`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchCategories() {
  const url = `${process.env.CUSTOMER_API_URL}/categories`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchRestaurants({ regionName, categoryId }) {
  const url = `${process.env.CUSTOMER_API_URL}/restaurants`
    + `?region=${regionName}&category=${categoryId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchRestaurant({ restaurantId }) {
  const url = `${process.env.CUSTOMER_API_URL}`
    + `/restaurants/${restaurantId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function postLogin({ email, password }) {
  const url = `${process.env.AUTH_API_URL}/session`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const { accessToken } = await response.json();
  return accessToken;
}

export async function postReview({
  accessToken, restaurantId, score, description,
}) {
  const url = `${process.env.CUSTOMER_API_URL}`
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
