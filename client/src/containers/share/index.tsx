import { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';

type Props = {
  symbol: string;
};

export default function ShareContainer({ symbol }: Props) {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
    const interval = setInterval(() => {
      if (!window.TradingView) return;

      clearInterval(interval);
      new window.TradingView.MediumWidget({
        symbols: [[symbol]],
        chartOnly: false,
        width: '100%',
        height: '100%',
        locale: 'en',
        colorTheme: 'dark',
        gridLineColor: '#2A2E39',
        trendLineColor: '#1976D2',
        fontColor: '#787B86',
        underLineColor: 'rgba(55, 166, 239, 0.15)',
        isTransparent: true,
        autosize: true,
        container_id: 'trading-view-container',
      });
    }, 100);
  }, []);

  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="https://s3.tradingview.com/tv.js"
          async
        ></script>
      </Helmet>
      <Flex p={0} wrap="wrap" h="100%">
        {rendered && <Box w="100%" h="100%" id="trading-view-container"></Box>}
      </Flex>
    </>
  );
}
