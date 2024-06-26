/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { FaComment, FaHeart, FaMusic, FaShare } from "react-icons/fa";
import { useElementOnScreen } from "../App";

const VideoInfo = ({ avatar, idName, nickName, music, content }) => {
  const [isFollow, setIsFollow] = useState(false);
  const handleClick = () => {
    setIsFollow(!isFollow);
  };

  return (
    <div className="flex flex-row">
      <img className="w-[50px] h-[50px] rounded-full" src={avatar} alt="avt" />
      <div className="ml-3 min-w-[60%]">
        <div>
          <a className="text-xl font-bold hover:underline">
            {idName}
          </a>
          <a className="text-xl">
            {nickName}
          </a>
        </div>
        <div>{content}</div>
        <div className="flex flex-row items-center">
          <FaMusic /> <span className="ml-3">{music}</span>
        </div>
      </div>
      <div onClick={handleClick}>
        {isFollow ? (
          <button className="p-1 pl-3 pr-3 border-2 border-red-400 bg-red-400 text-white rounded-md">
            Following
          </button>
        ) : (
          <button className="p-1 pl-3 pr-3 border-2 border-red-400 text-red-400 rounded-md">
            Follow
          </button>
        )}
      </div>
    </div>
  );
};
const VideoContent = ({ video, like, cmt, share }) => {
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);
  const handleVideo = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisibile]);

  const [isLike, setIsLike] = useState(false);
  const handleClickLike = () => {
    setIsLike(!isLike);
  };
  return (
    <div className="flex flex-row">
      <video
        ref={videoRef}
        onClick={handleVideo}
        className="w-[80%] max-h-[615px] ml-[50px] rounded-md mt-4"
        src={video}
        loop
        style={{ cursor: "pointer", margin: "10px" }}
      />
      <div className="flex flex-col justify-end ml-7" style={{ margin:"10px 0" }}>
        <div
          className="text-center mb-4"
          onClick={handleClickLike}
          style={{ cursor: "pointer" }}
        >
          <div className="w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center">
            {isLike ? (
              <FaHeart className="text-xl text-red-500" />
            ) : (
              <FaHeart className="text-xl" />
            )}
          </div>
          {isLike ? <span>{like + 1}</span> : <span>{like}</span>}
        </div>
        <div className="text-center mb-4">
          <div className="w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center">
            <FaComment className="text-xl text-center" />
          </div>
          <span>{cmt}</span>
        </div>
        <div className="text-center">
          <div className="w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center">
            <FaShare className="text-xl text-center" />
          </div>
          <span>{share}</span>
        </div>
      </div>
    </div>
  );
};
const Video = ({ data }) => {
  return (
    <div className="snap-start max-w-[600px]  border-b-2 border-gray-200 pb-4 pt-4">
      <VideoInfo {...data} />
      <VideoContent {...data} />
    </div>
  );
};

export default Video;
