"use client"

import React from "react";
import styled from "styled-components";
import { History as HistoryType } from "../hooks/use_history";
import { gifDataToUrl } from "../lib/buffer_to_url";
import { getDateTime } from "../lib/datetime";

const Wrapper = styled.main`
  border-left: 1px solid silver;
  bottom: 36px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  right: 0;
  top: 65px;
  width: calc(40vw - 1px);
`;

const HistoryTitle = styled.h2`
  text-align: center;
  margin: 24px 16px;
`;

const NoHistory = styled.div`
  font-size: 18px;
  margin: 24px 16px;
  text-align: center;
`;

const Card = styled.div`
  margin: 24px 16px;
`;

const Title = styled.a`
  text-align: center;
  font-size: 16px;
  display: block;
  margin: 0 0 2px 0;
`;

const GifWrapper = styled.div`
  text-align: center;
`;

const Gif = styled.img`
  max-width: 100%;
  max-height: 50vh;
  object-fit: contain;
`;

const Footer = styled.div`
  text-align: center;
`;

interface Props {
  histories: HistoryType[];
}

export const History: React.FC<Props> = (props) => {
  const { histories } = props;

  if (histories.length === 0) {
    return (
      <Wrapper>
        <HistoryTitle>Converted GIFs</HistoryTitle>
        <NoHistory>(No converted GIFs)</NoHistory>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <HistoryTitle>Converted GIFs</HistoryTitle>
      {histories.map((history) => {
        const gifUrl = gifDataToUrl(history.gifData, history.datetime);
        const { year, month, day, hour, minute, second } = getDateTime(new Date(history.datetime));
        return (
          <Card key={history.datetime}>
            <Title>
              {year}-{month}-{day} {hour}:{minute}:{second}
            </Title>
            <GifWrapper>
              <Gif alt={`Converted at ${history.datetime}`} src={gifUrl} decoding="async" loading="lazy" />
            </GifWrapper>
            <Footer>
              <a href={gifUrl} download={`${year}-${month}-${day}-${hour}-${minute}-${second}.gif`}>
                Download&#x2b07;
              </a>{" "}
              <a href={gifUrl} target="_blank" rel="noreferrer">
                Open&#x2197;
              </a>
            </Footer>
          </Card>
        );
      })}
    </Wrapper>
  );
};
