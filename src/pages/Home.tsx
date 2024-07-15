import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import { HomePageVideos } from '../Types';
import { clearVideos } from '../store';

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  /*
First Approach(without a return func): Use useEffect(() => { dispatch(clearVideos()); }, [dispatch]); when you want to dispatch an action immediately after the component mounts, or whenever the dispatch function itself changes (though this is less common).

Second Approach(approach below): Use useEffect(() => { return () => { dispatch(clearVideos()); }; }, [dispatch]); when you want to ensure that an action (such as cleaning up or resetting state) occurs specifically when the component is about to unmount. This is useful for cleaning up subscriptions, timers, or dispatching actions that revert state changes made by the component.

*/

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);


  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  console.log(videos)


  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />

        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
              {videos.map((item: HomePageVideos) => {
                return <Card data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
