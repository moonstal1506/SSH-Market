/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import { ReactComponent as Send } from "../../assets/icons/send.svg";
import { ReactComponent as Close } from "../../assets/icons/close-icon.svg";
import { useChat } from "../../hooks";
import { getTradeMessage } from "../../api/trade.js";

function Chat({ tradeId, setMessageFlag }) {
  const { message, sendMessage, newMessages, ChangeMessages } = useChat({
    tradeId,
  });
  const [messages, setMessages] = useState();
  const memberId = 10;

  // TradeBox를 참조하기 위한 useRef 생성
  const tradeBoxRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      if (tradeId !== null) {
        await getTradeMessage({
          responseFunc: {
            200: (response) => {
              setMessages(response.data.data);
            },
          },
          data: { tradeId },
        });
      }
    }
    fetchData();
  }, [tradeId]);

  useEffect(() => {
    // messages나 newMessages가 업데이트될 때마다 스크롤을 맨 아래로 이동
    const tradeBox = tradeBoxRef.current;
    tradeBox.scrollTop = tradeBox.scrollHeight;
    setMessageFlag(newMessages);
  }, [messages, newMessages]);

  return (
    <TradeContainer>
      <TradeTitleContainer>
        <TradeTitleBox>
          <ProfileBox>
            <ProfileImageWrapper>
              <Profile />
            </ProfileImageWrapper>
            <ProfileWrapper>
              <NameWrapper>생소한 마켓</NameWrapper>
              <TitleWrapper>23년산 햇감자 3KG (중) 단품</TitleWrapper>
            </ProfileWrapper>
          </ProfileBox>
          <TradeWrapper>
            <PriceWrapper>20000원</PriceWrapper>
            <TradeButtonBox>
              <TradeFinishButton>
                <TradeFinishWrapper>거래완료</TradeFinishWrapper>
              </TradeFinishButton>
              <TradeCancelButton>
                <TradeCancelWrapper>거래취소</TradeCancelWrapper>
              </TradeCancelButton>
            </TradeButtonBox>
          </TradeWrapper>
        </TradeTitleBox>
        <CloseWrapper>
          <Close />
        </CloseWrapper>
      </TradeTitleContainer>
      <TradeBox ref={tradeBoxRef}>
        {messages &&
          messages.map((message) =>
            message.memberId === memberId ? (
              <RightMessageBox key={message.id}>
                {message.message}
              </RightMessageBox>
            ) : (
              <MessageBox key={message.id}>
                <ProfileImageWrapper>
                  <Profile />
                </ProfileImageWrapper>
                <LeftMessageBox>{message.message}</LeftMessageBox>
              </MessageBox>
            )
          )}
        {newMessages &&
          newMessages.map((newMessage, index) =>
            newMessage.memberId === memberId ? (
              <RightMessageBox key={index}>
                {newMessage.message}
              </RightMessageBox>
            ) : (
              <MessageBox key={index}>
                <ProfileImageWrapper>
                  <Profile />
                </ProfileImageWrapper>
                <LeftMessageBox>{newMessage.message}</LeftMessageBox>
              </MessageBox>
            )
          )}
      </TradeBox>
      <TypingBox onSubmit={sendMessage}>
        <TypingMessageWrapper
          value={message}
          onChange={ChangeMessages}
          placeholder="메세지를 입력하세요"
        />
        <SendIconWrapper type="submit">
          <Send />
        </SendIconWrapper>
      </TypingBox>
    </TradeContainer>
  );
}

const TradeContainer = styled.div``;

const TradeTitleContainer = styled.div`
  width: 656px;
  height: 95px;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.02);
  display: inline-flex;
`;

const TradeTitleBox = styled.div`
  width: 592px;
  height: 64.5px;
  margin: 12px 20px 12px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 181px;
  height: 43px;
  margin-right: 235px;
`;

const ProfileImageWrapper = styled.div`
  width: 36px;
  height: 36px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
  width: 219px;
  height: 43px;
`;

const NameWrapper = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const TradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 176px;
  height: 63px;
  margin-top: 10px;
`;

const PriceWrapper = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  text-align: end;
`;

const TradeButtonBox = styled.div`
  display: inline-flex;
  align-items: flex-start;
  margin-top: 5px;
  gap: 8px;
`;

const TradeFinishButton = styled.div`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #5f0080;
  border: 1px solid #5f0080;
  cursor: pointer;
`;

const TradeFinishWrapper = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TradeCancelButton = styled.div`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #5f0080;
  cursor: pointer;
`;

const TradeCancelWrapper = styled.div`
  color: #5f0080;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CloseWrapper = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const TradeBox = styled.div`
  width: 656px;
  height: 458px;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
  background: #f5eaf9;
  display: flex;
  flex-direction: column;
`;

const MessageBox = styled.div`
  flex-shrink: 0;
  display: flex;
  margin: 16px;
`;

const LeftMessageBox = styled.div`
  max-width: 237px;
  min-height: 16px;
  flex-shrink: 0;
  border-radius: 0px 8px 8px 8px;
  background: #fff;
  margin-left: 7px;
  padding: 10px;
`;

const RightMessageBox = styled.div`
  max-width: 237px;
  min-height: 16px;
  flex-shrink: 0;
  border-radius: 8px 0px 8px 8px;
  background: #fff;
  margin: 16px 16px 16px auto;
  padding: 10px;
`;

const TypingBox = styled.form`
  justify-content: center;
  align-items: center;
  text-align: start;
  gap: 50px;
  width: 656px;
  height: 40px;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.02);
  display: inline-flex;
`;

const TypingMessageWrapper = styled.input`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-style: normal;
  width: 650px;
  font-weight: 400;
  line-height: 20px;
  padding-left: 20px;
  border: none;
  outline: none;
`;

const SendIconWrapper = styled.button`
  border: none;
  outline: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-top: 5px;
  background: #fff;
  cursor: pointer;
`;

export default Chat;