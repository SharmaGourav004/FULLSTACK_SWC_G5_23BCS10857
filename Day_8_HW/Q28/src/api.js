const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const contentLibrary = [
  { id: 1, title: 'The Crowned City', type: 'Series', year: 2024 },
  { id: 2, title: 'Neon Trails', type: 'Movie', year: 2023 },
  { id: 3, title: 'Midnight Archive', type: 'Series', year: 2022 },
  { id: 4, title: 'Echoes of Mars', type: 'Documentary', year: 2024 },
];

export async function fetchContentMock(shouldFail = false) {
  await delay(1200);
  if (shouldFail) {
    throw new Error('Unable to load content from the API.');
  }
  return contentLibrary;
}
