import styled from 'styled-components';

const DashFrame = styled.div`
  width: 480px;
  max-width: 100%;
  height: 340px;
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  display: flex;
`;

const Sidebar = styled.div`
  width: 56px;
  background: #18181B;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 16px;
`;

const SidebarIcon = styled.div<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ $active }) => $active ? 'rgba(255,255,255,0.15)' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: rgba(255,255,255,0.25);
`;

const MainPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  height: 44px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
`;

const TopBarTab = styled.div<{ $active?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: ${({ $active }) => $active ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.3)'};
  padding: 4px 8px;
  border-radius: 6px;
  background: ${({ $active }) => $active ? '#F4F4F5' : 'transparent'};
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  gap: 1px;
  background: rgba(0,0,0,0.03);
`;

const PreviewPanel = styled.div`
  flex: 2;
  background: #FAFAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, #DDD6FE 0%, #FBCFE8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewText = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: rgba(0,0,0,0.25);
`;

const QueuePanel = styled.div`
  flex: 1;
  background: #FFFFFF;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QueueTitle = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.25);
`;

const QueueItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 8px;
  background: #FAFAFA;
`;

const QueueThumb = styled.div<{ $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const QueueInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const QueueName = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: rgba(0,0,0,0.6);
`;

const QueueStatus = styled.span`
  font-size: 9px;
  color: rgba(0,0,0,0.25);
`;

export default function DashboardMockup() {
  return (
    <DashFrame>
      <Sidebar>
        <SidebarIcon $active><SidebarDot /></SidebarIcon>
        <SidebarIcon><SidebarDot /></SidebarIcon>
        <SidebarIcon><SidebarDot /></SidebarIcon>
        <SidebarIcon><SidebarDot /></SidebarIcon>
      </Sidebar>
      <MainPanel>
        <TopBar>
          <TopBarTab $active>Live</TopBarTab>
          <TopBarTab>Queue</TopBarTab>
          <TopBarTab>History</TopBarTab>
        </TopBar>
        <ContentArea>
          <PreviewPanel>
            <PreviewImage>
              <PreviewText>Live Preview</PreviewText>
            </PreviewImage>
          </PreviewPanel>
          <QueuePanel>
            <QueueTitle>Queue</QueueTitle>
            <QueueItem>
              <QueueThumb $color="#EDE9FE" />
              <QueueInfo>
                <QueueName>Frame #12</QueueName>
                <QueueStatus>Processing...</QueueStatus>
              </QueueInfo>
            </QueueItem>
            <QueueItem>
              <QueueThumb $color="#FCE7F3" />
              <QueueInfo>
                <QueueName>Frame #13</QueueName>
                <QueueStatus>Waiting</QueueStatus>
              </QueueInfo>
            </QueueItem>
            <QueueItem>
              <QueueThumb $color="#DCFCE7" />
              <QueueInfo>
                <QueueName>Frame #14</QueueName>
                <QueueStatus>Waiting</QueueStatus>
              </QueueInfo>
            </QueueItem>
          </QueuePanel>
        </ContentArea>
      </MainPanel>
    </DashFrame>
  );
}
