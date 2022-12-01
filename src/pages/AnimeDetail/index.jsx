import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Card, Typography } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const AnimeDetail = () => {
  const [animeDetail, setAnimeDetail] = useState({});
  const [streamingURL, setStreamingURL] = useState();
  const [episodeId, setEpisodeId] = useState([]);
  const params = useParams();

  // Lấy Episode ID
  useEffect(() => {
    const getAnimeDetail = async () => {
      const episodeInfo = [];
      const response = await axios.get(
        `https://gogoanime.consumet.org/anime-details/${params.animeId}`
      );
      response.data.episodesList.map((element) =>
        episodeInfo.push(element.episodeId)
      );
      setEpisodeId([...episodeInfo]);
      setAnimeDetail({ ...response.data });
    };
    getAnimeDetail();
  }, []);

  // Lấy Episode URL tập đầu tiên
  const getStreamingURL = async () => {
    const response = await axios.get(
      `https://gogoanime.consumet.org/vidcdn/watch/${
        episodeId[episodeId.length - 1]
      }`
    );
    setStreamingURL(response.data.Referer);
    getStreamingURL();
  };

  console.log("Episode Id List: ", episodeId);
  console.log("Episode URL: ", streamingURL);
  console.log("Single Episode Id: ", episodeId[episodeId.length - 1]);

  return (
    <div>
      <Row gutter={[0, 16]}>
        <Col
          style={{ border: "1px solid white", color: "white", height: "500px" }}
          span={16}
          offset={4}
        >
          {/* <iframe
            height="100%"
            width="100%"
            style={{ border: "none" }}
            src={streamingURL}
          ></iframe> */}
        </Col>
        <Col style={{ border: "1px solid white" }} span={16} offset={4}>
          <Title level={2} style={{ color: "white", marginTop: "auto" }}>
            {animeDetail.animeTitle} - Episode 1
          </Title>
        </Col>
        <Col style={{ border: "1px solid white" }} span={16} offset={4}>
          <Title level={5} style={{ marginTop: "auto", color: "white" }}>
            Choose Episode
          </Title>
        </Col>
        <Col style={{ border: "1px solid white" }} span={16} offset={4}>
          <Title level={5} style={{ marginTop: "auto", color: "white" }}>
            Related Anime
          </Title>
        </Col>
      </Row>
    </div>
  );
};

export default AnimeDetail;
