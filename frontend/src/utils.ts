export const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const apiURL = `https://ibhwsqyqdziekcjyakog.supabase.co/functions/v1/${input}`;
  const res = await fetch(apiURL, {
    ...init,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaHdzcXlxZHppZWtjanlha29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMjc5MzAsImV4cCI6MjAzNzgwMzkzMH0.vr-BLfmC9ZZUuyzkhVxjcOgNqAW6_yTN8ePRBaefecc',
    },
  });
  return res.json();
};

export const getParentByEmail = async (
  endPoint: string,
  { arg }: { arg: string }
) => {
  const apiURL = `https://ibhwsqyqdziekcjyakog.supabase.co/functions/v1/${endPoint}?email=${arg}`;
  console.log(arg);
  return fetch(apiURL, {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaHdzcXlxZHppZWtjanlha29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMjc5MzAsImV4cCI6MjAzNzgwMzkzMH0.vr-BLfmC9ZZUuyzkhVxjcOgNqAW6_yTN8ePRBaefecc',
    },
  }).then((res) => res.json());
};

export const sendRequest = async (endPoint: string, arg: {}) => {
  const apiURL = `https://ibhwsqyqdziekcjyakog.supabase.co/functions/v1/${endPoint}`;
  return fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify({ ...arg }),
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaHdzcXlxZHppZWtjanlha29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMjc5MzAsImV4cCI6MjAzNzgwMzkzMH0.vr-BLfmC9ZZUuyzkhVxjcOgNqAW6_yTN8ePRBaefecc',
    },
  }).then((res) => res.json());
};

export const range = (start: number, end?: number, step: number = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
