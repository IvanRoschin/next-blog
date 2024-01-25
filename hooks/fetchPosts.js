import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function fetchAllPosts() {
  const URL = `https://next-blog-mtj1gjt6t-ivanroschin.vercel.app/api/post`;
  const { data, error, isLoading } = useSWR(URL, fetcher);

  return {
    allPosts: data,
    isLoading,
    isError: error,
  };
}

export default fetchAllPosts;
