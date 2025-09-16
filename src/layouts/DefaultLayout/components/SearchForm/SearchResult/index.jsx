import { useSearchParams, Link } from "react-router"; // Sửa "react-router" thành "react-router-dom"
import { useEffect, useState, useCallback, memo } from "react";
import clsx from "clsx";

import styles from "./SearchResult.module.scss";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import youtube from "@/assets/icons/youtube.svg";
import VideoJs from "@/components/Youtube";

const CourseList = memo(({ courses }) => (
  <div className={clsx(styles.courses)}>
    <h4 className={clsx(styles.heading)}>
      KHÓA HỌC: {courses.length > 0 && <Link>Xem thêm</Link>}
    </h4>

    {courses.length > 0 ? (
      <ul className={clsx(styles["list-item"])}>
        {courses.map((item) => (
          <li key={item.id} className={clsx(styles.item)}>
            <Link className={clsx(styles.link)}>
              {item.image_url && (
                <img
                  className={clsx(styles.avatar)}
                  src={item.image_url}
                  alt={item.title}
                />
              )}
              <strong>{item.title}</strong>
            </Link>
            <p className={clsx(styles.desc)}>{item.description}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className={clsx(styles.error)}>No courses found.</p>
    )}
  </div>
));

const PostList = memo(({ posts }) => (
  <div className={clsx(styles.posts)}>
    <h4 className={clsx(styles.heading)}>
      BÀI VIẾT: {posts.length > 0 && <Link>Xem thêm</Link>}
    </h4>
    {posts.length > 0 ? (
      <ul className={clsx(styles["list-item"])}>
        {posts.map((item) => (
          <li key={item.id} className={clsx(styles.item)}>
            <Link className={clsx(styles.link)}>
              {item.image_url && (
                <img
                  className={clsx(styles.avatar)}
                  src={item.image_url}
                  alt={item.title}
                />
              )}
              <strong>{item.title}</strong>
            </Link>
            <p className={clsx(styles.desc)}>{item.meta_description}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className={clsx(styles.error)}>No posts found.</p>
    )}
  </div>
));

const VideoList = ({ videos, onSelect }) => {
  return (
    <div className={clsx(styles.videos)}>
      <h4 className={clsx(styles.heading)}>
        VIDEOS: {videos.length > 0 && <Link>Xem thêm</Link>}
      </h4>
      {videos.length > 0 ? (
        <ul className={clsx(styles["list-item"])}>
          {videos.map((item) => (
            <li key={item.id} className={clsx(styles.item)}>
              <span
                className={clsx(styles.video)}
                onClick={() => onSelect(item.video)}>
                <strong>{item.title}</strong>
                <img
                  src={youtube}
                  alt="youtube"
                  className={clsx(styles.play)}
                />
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={clsx(styles.error)}>No videos found.</p>
      )}
    </div>
  );
};

function SearchResult({ isOpen, onModalClose, onModalOpen, clearInput }) {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue] = useState(searchParams.get("q") || "");

  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    if (!query) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const debouncedFetch = debounce((value) => {
      fetch("data.json")
        .then(async (response) => {
          if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text.slice(0, 50)}...`);
          }
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            const text_1 = await response.text();
            throw new Error(
              `Expected JSON, received ${contentType}: ${text_1.slice(
                0,
                50,
              )}...`,
            );
          }
          return response.json();
        })
        .then((jsonData) => {
          const getRandomItems = (array, maxItems = 3) => {
            const shuffled = [...array].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, Math.min(maxItems, array.length));
          };

          const filteredData = {
            courses: getRandomItems(
              jsonData.data.courses.filter((item) =>
                item.title.toLowerCase().includes(value.toLowerCase()),
              ),
            ),
            posts: getRandomItems(
              jsonData.data.posts.filter((item) =>
                item.title.toLowerCase().includes(value.toLowerCase()),
              ),
            ),
            videos: getRandomItems(
              jsonData.data.videos.filter((item) =>
                item.title.toLowerCase().includes(value.toLowerCase()),
              ),
            ),
          };

          setData(filteredData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setError(error.message);
          setLoading(false);
        });
    }, 1000);

    debouncedFetch(query);
  }, [searchParams, debounce]);

  function handleVideo(video) {
    clearInput();
    video && setVideoId(video);
  }

  function handleCloseVideo() {
    setVideoId(null);
  }
  return (
    <>
      <Modal
        position={"absolute"}
        isRoot={true}
        isOpen={isOpen === "result"}
        isCloseInternal={true}
        closeOnOutsideClick={true}
        closeInternal={onModalClose}>
        <div
          className={clsx(styles["search-result"], {
            [styles.open]: inputValue,
          })}>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {loading && <Loading />}
          {data && !loading && !error && (
            <div className={clsx(styles["result-content"])}>
              <div className={clsx(styles["result-title"])}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <h3 className={clsx(styles.title)}>
                  Results for: {searchParams.get("q") || "All"}
                </h3>
              </div>
              <CourseList courses={data.courses} />
              <PostList posts={data.posts} />
              <VideoList
                videos={data.videos}
                onModalOpen={onModalOpen}
                onSelect={handleVideo}
              />
            </div>
          )}
        </div>
      </Modal>

      <VideoJs
        overlay
        closeOnOverlay
        pressEscClose
        isCloseInternal={true}
        videoId={videoId}
        isOpen={videoId}
        onClose={handleCloseVideo}
      />
    </>
  );
}

export default memo(SearchResult);
